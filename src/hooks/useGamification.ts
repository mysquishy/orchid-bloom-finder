
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
      
      console.log('Updating care streak for user:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('care_streaks' as any)
          .upsert({
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            last_care_date: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Care streak updated:', data);
        return data;
      } catch (error) {
        console.error('Error in updateCareStreak:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['care-streak'] });
      
      toast({
        title: "Streak Updated!",
        description: `Current streak: ${data?.current_streak || 1} days`,
      });
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
      
      console.log('Awarding experience:', amount, 'to user:', user.id);
      
      try {
        // Check for existing level
        const { data: existingLevel, error: fetchError } = await supabase
          .from('user_levels' as any)
          .select('*')
          .eq('user_id', user.id)
          .single();

        let newExperience = amount;
        let newLevel = 1;

        if (!fetchError && existingLevel) {
          newExperience = (existingLevel.total_experience || 0) + amount;
          newLevel = Math.floor(Math.sqrt(newExperience / 100)) + 1;
        }

        const { data, error } = await supabase
          .from('user_levels' as any)
          .upsert({
            user_id: user.id,
            total_experience: newExperience,
            current_level: newLevel,
            experience_this_level: newExperience - ((newLevel - 1) * (newLevel - 1) * 100),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Experience awarded:', data);
        return data;
      } catch (error) {
        console.error('Error in awardExperience:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-level'] });
      
      toast({
        title: "Experience Gained!",
        description: `+${amount} XP earned`,
      });
    },
    onError: (error) => {
      console.error('Error awarding experience:', error);
    }
  });

  const checkAchievements = useMutation({
    mutationFn: async (stats: any) => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Checking achievements for user:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('user_gamification_stats' as any)
          .upsert({
            user_id: user.id,
            ...stats,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Achievements checked:', data);
        return data;
      } catch (error) {
        console.error('Error in checkAchievements:', error);
        throw error;
      }
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
