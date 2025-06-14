
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
      
      // Mock implementation since tables don't exist yet
      const mockData = {
        user_id: user.id,
        current_streak: 1,
        longest_streak: 1,
        last_care_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      };
      
      console.log('Care streak updated:', mockData);
      return mockData;
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
    mutationFn: async ({ experienceAmount, source }: { experienceAmount: number; source?: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Awarding experience:', experienceAmount, 'to user:', user.id);
      
      // Mock implementation since tables don't exist yet
      const mockData = {
        user_id: user.id,
        total_experience: experienceAmount,
        current_level: Math.floor(Math.sqrt(experienceAmount / 100)) + 1,
        experience_this_level: experienceAmount - ((Math.floor(Math.sqrt(experienceAmount / 100))) * Math.floor(Math.sqrt(experienceAmount / 100)) * 100),
        updated_at: new Date().toISOString()
      };
      
      console.log('Experience awarded:', mockData);
      return mockData;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-level'] });
      
      toast({
        title: "Experience Gained!",
        description: `+${variables.experienceAmount} XP earned`,
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
      
      // Mock implementation since tables don't exist yet
      const mockData = {
        user_id: user.id,
        ...stats,
        updated_at: new Date().toISOString()
      };
      
      console.log('Achievements checked:', mockData);
      return mockData;
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
