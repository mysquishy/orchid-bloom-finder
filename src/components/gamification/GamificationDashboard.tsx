
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

// Define types for the components
interface UserLevel {
  id: string;
  user_id: string;
  current_level: number;
  total_experience: number;
  experience_this_level: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface CareStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_care_date: string | null;
  streak_start_date: string | null;
  streak_type: string;
  bonus_multiplier: number;
  created_at: string;
  updated_at: string;
}

interface Achievement {
  id: string;
  name: string;
  title: string;
  description: string;
  badge_icon: string;
  badge_color: string;
  category: string;
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  experience_reward: number;
  earned_at?: string;
}

const GamificationDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user level and experience with error handling
  const { data: userLevel } = useQuery({
    queryKey: ['user-level', user?.id],
    queryFn: async (): Promise<UserLevel | null> => {
      if (!user) return null;
      
      try {
        console.log('Fetching user level for:', user.id);
        const { data, error } = await supabase
          .from('user_levels' as any)
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user level:', error);
          return null;
        }
        
        // If no level exists, return a default one
        if (!data) {
          console.log('No user level found, returning default');
          return {
            id: '',
            user_id: user.id,
            current_level: 1,
            total_experience: 0,
            experience_this_level: 0,
            title: 'Novice Orchid Enthusiast',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        }
        
        console.log('User level fetched:', data);
        return data as UserLevel;
      } catch (error) {
        console.error('Error in user level query:', error);
        return null;
      }
    },
    enabled: !!user
  });

  // Fetch care streak with error handling
  const { data: careStreak } = useQuery({
    queryKey: ['care-streak', user?.id],
    queryFn: async (): Promise<CareStreak | null> => {
      if (!user) return null;
      
      try {
        console.log('Fetching care streak for:', user.id);
        const { data, error } = await supabase
          .from('care_streaks' as any)
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching care streak:', error);
          return null;
        }
        
        const result = data || {
          id: '',
          user_id: user.id,
          current_streak: 0,
          longest_streak: 0,
          last_care_date: null,
          streak_start_date: null,
          streak_type: 'daily',
          bonus_multiplier: 1.0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        console.log('Care streak fetched:', result);
        return result as CareStreak;
      } catch (error) {
        console.error('Error in care streak query:', error);
        return null;
      }
    },
    enabled: !!user
  });

  // Mock data for achievements since tables might not exist yet
  const mockEarnedAchievements: Achievement[] = [
    {
      id: '1',
      name: 'first_plant',
      title: 'First Plant Parent',
      description: 'Add your first orchid to your collection',
      badge_icon: 'flower',
      badge_color: '#10B981',
      category: 'collection',
      difficulty: 'bronze',
      experience_reward: 50,
      earned_at: new Date().toISOString()
    }
  ];

  const mockAvailableAchievements: Achievement[] = [
    {
      id: '2',
      name: 'plant_collector',
      title: 'Plant Collector',
      description: 'Collect 5 different orchid species',
      badge_icon: 'trophy',
      badge_color: '#F59E0B',
      category: 'collection',
      difficulty: 'silver',
      experience_reward: 200
    },
    {
      id: '3',
      name: 'care_streak_7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day plant care streak',
      badge_icon: 'calendar',
      badge_color: '#8B5CF6',
      category: 'streak',
      difficulty: 'bronze',
      experience_reward: 100
    }
  ];

  const mockLeaderboards = {
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

  const mockChallenges: any[] = [];
  const mockParticipations: any[] = [];

  const handleJoinChallenge = async (challengeId: string) => {
    toast({
      title: "Coming Soon!",
      description: "Challenge participation will be available soon.",
    });
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

  console.log('Rendering dashboard with:', { userLevel, careStreak });

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
            <h3 className="text-lg font-semibold mb-4">Your Achievements ({mockEarnedAchievements.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockEarnedAchievements.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  earned={true}
                />
              ))}
            </div>
          </div>

          {/* Available Achievements */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockAvailableAchievements.map((achievement) => (
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
            challenges={mockChallenges}
            participations={mockParticipations}
            onJoinChallenge={handleJoinChallenge}
          />
        </TabsContent>

        <TabsContent value="leaderboards">
          <LeaderboardCard
            leaderboards={mockLeaderboards}
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
