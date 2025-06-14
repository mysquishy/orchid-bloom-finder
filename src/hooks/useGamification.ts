
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useGamification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateCareStreak = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase.rpc('update_care_streak', {
        user_id_param: user.id
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['care-streak'] });
      
      if (data?.[0]?.is_new_record) {
        toast({
          title: "New Record!",
          description: `Congratulations! You've set a new care streak record of ${data[0].current_streak} days!`,
        });
      } else {
        toast({
          title: "Streak Updated!",
          description: `Current streak: ${data?.[0]?.current_streak || 0} days`,
        });
      }
    },
    onError: (error) => {
      console.error('Error updating care streak:', error);
      toast({
        title: "Error",
        description: "Failed to update care streak. Please try again.",
        variant: "destructive"
      });
    }
  });

  const awardExperience = useMutation({
    mutationFn: async ({ amount, source }: { amount: number; source?: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase.rpc('award_experience', {
        user_id_param: user.id,
        experience_amount: amount,
        source: source || 'general'
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-level'] });
      
      if (data?.[0]?.level_up) {
        toast({
          title: "Level Up!",
          description: `Congratulations! You've reached level ${data[0].new_level}!`,
        });
      }
    },
    onError: (error) => {
      console.error('Error awarding experience:', error);
    }
  });

  const checkAchievements = useMutation({
    mutationFn: async (stats: any) => {
      if (!user) throw new Error('User not authenticated');
      
      // This would contain logic to check and award achievements
      // For now, we'll just update user stats
      const { data, error } = await supabase
        .from('user_gamification_stats' as any)
        .upsert({
          user_id: user.id,
          ...stats,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-achievements'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
    onError: (error) => {
      console.error('Error checking achievements:', error);
    }
  });

  return {
    updateCareStreak,
    awardExperience,
    checkAchievements
  };
};
