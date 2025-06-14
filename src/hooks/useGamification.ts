
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useGamification = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Award experience points
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
          title: "🎉 Level Up!",
          description: `Congratulations! You've reached level ${data[0].new_level}!`,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to award experience points.",
        variant: "destructive"
      });
    }
  });

  // Update care streak
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
          title: "🔥 New Streak Record!",
          description: `Amazing! You've set a new personal record of ${data[0].longest_streak} days!`,
        });
      }
      
      // Award experience for maintaining streak
      if (data?.[0]?.current_streak) {
        const bonusXP = Math.min(data[0].current_streak * 5, 100);
        awardExperience.mutate({ amount: bonusXP, source: 'care_streak' });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update care streak.",
        variant: "destructive"
      });
    }
  });

  // Check and award achievements
  const checkAchievements = useMutation({
    mutationFn: async (statsUpdate: Record<string, number>) => {
      if (!user) throw new Error('User not authenticated');
      
      // Update user stats
      const { error: statsError } = await supabase
        .from('user_gamification_stats')
        .upsert({
          user_id: user.id,
          ...statsUpdate
        });
      
      if (statsError) throw statsError;
      
      // Fetch achievement definitions to check against
      const { data: achievements, error: achievementsError } = await supabase
        .from('achievement_definitions')
        .select('*')
        .eq('is_active', true);
      
      if (achievementsError) throw achievementsError;
      
      // Get current user stats
      const { data: userStats, error: userStatsError } = await supabase
        .from('user_gamification_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (userStatsError) throw userStatsError;
      
      // Check each achievement
      const newAchievements = [];
      for (const achievement of achievements || []) {
        // Check if user already has this achievement
        const { data: existing } = await supabase
          .from('user_achievements')
          .select('id')
          .eq('user_id', user.id)
          .eq('achievement_id', achievement.id)
          .single();
        
        if (existing) continue;
        
        // Check if achievement condition is met
        const condition = achievement.unlock_condition;
        let conditionMet = false;
        
        switch (condition.type) {
          case 'plant_count':
            conditionMet = (userStats.total_plants_cared || 0) >= condition.target;
            break;
          case 'identification_count':
            conditionMet = (userStats.total_identifications || 0) >= condition.target;
            break;
          case 'care_streak':
            // This would need to check actual streak from care_streaks table
            break;
          case 'rare_discovery':
            conditionMet = (userStats.rare_plants_discovered || 0) >= condition.target;
            break;
          case 'community_help':
            conditionMet = (userStats.community_contributions || 0) >= condition.target;
            break;
          case 'perfect_care_days':
            conditionMet = (userStats.perfect_care_days || 0) >= condition.target;
            break;
          case 'plants_saved':
            conditionMet = (userStats.plants_saved_from_disease || 0) >= condition.target;
            break;
        }
        
        if (conditionMet) {
          newAchievements.push(achievement);
        }
      }
      
      return newAchievements;
    },
    onSuccess: (newAchievements) => {
      queryClient.invalidateQueries({ queryKey: ['user-gamification-stats'] });
      
      // Award each new achievement
      newAchievements.forEach(async (achievement) => {
        const { error } = await supabase
          .from('user_achievements')
          .insert({
            user_id: user!.id,
            achievement_id: achievement.id,
            achievement_name: achievement.name,
            achievement_type: achievement.category
          });
        
        if (!error) {
          toast({
            title: "🏆 Achievement Unlocked!",
            description: `${achievement.title}: ${achievement.description}`,
          });
          
          // Award experience for achievement
          awardExperience.mutate({ 
            amount: achievement.experience_reward, 
            source: 'achievement' 
          });
        }
      });
      
      queryClient.invalidateQueries({ queryKey: ['user-achievements'] });
    }
  });

  return {
    awardExperience,
    updateCareStreak,
    checkAchievements
  };
};
