
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LevelProgressCard from './LevelProgressCard';
import CareStreakCard from './CareStreakCard';
import AchievementBadge from './AchievementBadge';
import LeaderboardCard from './LeaderboardCard';
import SeasonalChallenges from './SeasonalChallenges';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Trophy, Award, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GamificationDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user level and experience
  const { data: userLevel } = useQuery({
    queryKey: ['user-level', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_levels')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      
      // If no level exists, create one
      if (!data) {
        const { data: newLevel } = await supabase
          .from('user_levels')
          .insert({ user_id: user.id })
          .select()
          .single();
        return newLevel;
      }
      
      return data;
    },
    enabled: !!user
  });

  // Fetch care streak
  const { data: careStreak } = useQuery({
    queryKey: ['care-streak', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('care_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch user achievements
  const { data: userAchievements = [] } = useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement_definitions (*)
        `)
        .eq('user_id', user.id);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Fetch all achievement definitions
  const { data: allAchievements = [] } = useQuery({
    queryKey: ['achievement-definitions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievement_definitions')
        .select('*')
        .eq('is_active', true)
        .order('difficulty', { ascending: true });
        
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch seasonal challenges
  const { data: challenges = [] } = useQuery({
    queryKey: ['seasonal-challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seasonal_challenges')
        .select('*')
        .eq('is_active', true)
        .order('start_date', { ascending: false });
        
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch challenge participations
  const { data: participations = [] } = useQuery({
    queryKey: ['challenge-participations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('challenge_participations')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Mock leaderboard data (would come from actual leaderboard queries)
  const { data: leaderboards = {} } = useQuery({
    queryKey: ['leaderboards'],
    queryFn: async () => {
      // This would be replaced with actual leaderboard queries
      return {
        experience: [
          { user_id: '1', user_name: 'Alice', score: 2500, rank: 1 },
          { user_id: '2', user_name: 'Bob', score: 2200, rank: 2 },
          { user_id: user?.id || '3', user_name: 'You', score: 1800, rank: 3 },
        ],
        care_streak: [
          { user_id: '1', user_name: 'Charlie', score: 45, rank: 1 },
          { user_id: '2', user_name: 'Diana', score: 38, rank: 2 },
        ]
      };
    }
  });

  const handleJoinChallenge = async (challengeId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('challenge_participations')
        .insert({
          user_id: user.id,
          challenge_id: challengeId
        });
        
      if (error) throw error;
      
      toast({
        title: "Challenge Joined!",
        description: "You've successfully joined the challenge. Good luck!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join challenge. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to view your gamification progress.</p>
      </div>
    );
  }

  const experienceForNextLevel = userLevel ? 
    (userLevel.current_level * userLevel.current_level * 100) - 
    ((userLevel.current_level - 1) * (userLevel.current_level - 1) * 100) : 100;

  const earnedAchievementIds = userAchievements.map(ua => ua.achievement_id);
  const availableAchievements = allAchievements.filter(
    achievement => !earnedAchievementIds.includes(achievement.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Your <span className="text-purple-600">Journey</span>
        </h1>
        <p className="text-xl text-gray-600">
          Track your progress and achievements in the world of orchid care
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {userLevel && (
          <LevelProgressCard 
            userLevel={userLevel} 
            experienceForNextLevel={experienceForNextLevel}
          />
        )}
        
        {careStreak && (
          <CareStreakCard careStreak={careStreak} />
        )}
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboards" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboards
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          {/* Earned Achievements */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Achievements ({userAchievements.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userAchievements.map((userAchievement) => (
                <AchievementBadge
                  key={userAchievement.id}
                  achievement={{
                    ...userAchievement.achievement_definitions,
                    earned_at: userAchievement.earned_at
                  }}
                  earned={true}
                />
              ))}
            </div>
          </div>

          {/* Available Achievements */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableAchievements.slice(0, 8).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  earned={false}
                  showProgress={true}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges">
          <SeasonalChallenges
            challenges={challenges}
            participations={participations}
            onJoinChallenge={handleJoinChallenge}
          />
        </TabsContent>

        <TabsContent value="leaderboards">
          <LeaderboardCard
            leaderboards={leaderboards}
            currentUserId={user.id}
          />
        </TabsContent>

        <TabsContent value="community">
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Community Features</h3>
            <p className="text-gray-600">
              Connect with other orchid enthusiasts, share achievements, and participate in group challenges.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationDashboard;
