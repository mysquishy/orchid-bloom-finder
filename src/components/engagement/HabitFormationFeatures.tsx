import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Calendar,
  Target,
  Camera,
  Heart,
  Zap,
  TrendingUp,
  Clock,
  Award,
  Smile
} from 'lucide-react';

interface CareStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastCareDate: string;
  streakType: 'daily' | 'weekly';
  bonusMultiplier: number;
}

interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  category: 'care' | 'identification' | 'learning' | 'social';
  isActive: boolean;
  reward: string;
}

interface HabitMetrics {
  totalUsers: number;
  activeStreakers: number;
  averageStreak: number;
  goalCompletionRate: number;
  photoProgressUsers: number;
  mindfulnessSessionMinutes: number;
}

const HabitFormationFeatures: React.FC = () => {
  const [habitMetrics] = useState<HabitMetrics>({
    totalUsers: 2847,
    activeStreakers: 1234,
    averageStreak: 8.5,
    goalCompletionRate: 73.2,
    photoProgressUsers: 892,
    mindfulnessSessionMinutes: 15670
  });

  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([
    {
      id: '1',
      title: 'Daily Plant Check',
      description: 'Check on your orchids every day this week',
      target: 7,
      current: 4,
      category: 'care',
      isActive: true,
      reward: '+50 XP bonus'
    },
    {
      id: '2',
      title: 'Learning Explorer',
      description: 'Complete 3 learning modules',
      target: 3,
      current: 1,
      category: 'learning',
      isActive: true,
      reward: 'Expert badge'
    },
    {
      id: '3',
      title: 'Photo Journal',
      description: 'Document 5 plant progress photos',
      target: 5,
      current: 3,
      category: 'care',
      isActive: true,
      reward: 'Time-lapse feature'
    },
    {
      id: '4',
      title: 'Community Helper',
      description: 'Help 3 community members',
      target: 3,
      current: 0,
      category: 'social',
      isActive: false,
      reward: 'Mentor badge'
    }
  ]);

  const [streakLeaderboard] = useState([
    { rank: 1, name: 'GreenThumb_Sarah', streak: 67, avatar: '🌿' },
    { rank: 2, name: 'OrchidMaster_Mike', streak: 54, avatar: '🌺' },
    { rank: 3, name: 'PlantParent_Alex', streak: 42, avatar: '🌸' },
    { rank: 4, name: 'FlowerPower_Lisa', streak: 38, avatar: '🌼' },
    { rank: 5, name: 'You', streak: 15, avatar: '🌱' }
  ]);

  const toggleGoal = (id: string) => {
    setWeeklyGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, isActive: !goal.isActive } : goal
    ));
  };

  const getCategoryIcon = (category: WeeklyGoal['category']) => {
    switch (category) {
      case 'care': return <Heart className="w-4 h-4 text-red-500" />;
      case 'identification': return <Camera className="w-4 h-4 text-blue-500" />;
      case 'learning': return <Target className="w-4 h-4 text-purple-500" />;
      case 'social': return <Smile className="w-4 h-4 text-green-500" />;
    }
  };

  const getCategoryColor = (category: WeeklyGoal['category']) => {
    switch (category) {
      case 'care': return 'bg-red-100 text-red-800';
      case 'identification': return 'bg-blue-100 text-blue-800';
      case 'learning': return 'bg-purple-100 text-purple-800';
      case 'social': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Habit Formation Features</h3>
          <p className="text-gray-600">Building healthy plant care habits through gamification</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Calendar className="w-4 h-4 mr-2" />
          View Habits
        </Button>
      </div>

      {/* Habit Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{habitMetrics.activeStreakers}</div>
            <div className="text-sm text-gray-600">Active Streakers</div>
            <div className="text-xs text-green-700 mt-1">
              {((habitMetrics.activeStreakers / habitMetrics.totalUsers) * 100).toFixed(1)}% of users
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{habitMetrics.averageStreak}</div>
            <div className="text-sm text-gray-600">Avg Streak Days</div>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+2.3 vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{habitMetrics.goalCompletionRate}%</div>
            <div className="text-sm text-gray-600">Goal Completion</div>
            <Progress value={habitMetrics.goalCompletionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round(habitMetrics.mindfulnessSessionMinutes / 60)}</div>
            <div className="text-sm text-gray-600">Mindfulness Hours</div>
            <div className="text-xs text-orange-700 mt-1">This week</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Care Streak Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Care Streak Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {streakLeaderboard.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">#{user.rank} • {user.streak} day streak</div>
                    </div>
                  </div>
                  {user.rank <= 3 && (
                    <Badge className={
                      user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }>
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Streak Bonuses</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• 7 days: +10% XP bonus</div>
                <div>• 30 days: Exclusive badge</div>
                <div>• 90 days: Premium features trial</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(goal.category)}
                      <span className="font-medium">{goal.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <Switch
                        checked={goal.isActive}
                        onCheckedChange={() => toggleGoal(goal.id)}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.current}/{goal.target}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Reward: {goal.reward}</span>
                    {goal.current >= goal.target && (
                      <Badge className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Complete!
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Progress & Mindfulness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-500" />
              Photo Progress Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{habitMetrics.photoProgressUsers}</div>
                <div className="text-sm text-blue-800">Users tracking photo progress</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Daily photo uploads</span>
                  <Badge variant="outline">+23% this week</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Time-lapse creations</span>
                  <Badge variant="outline">156 this month</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Progress comparisons</span>
                  <Badge variant="outline">89% positive feedback</Badge>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                View Photo Gallery
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Mindfulness & Plant Therapy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-3xl font-bold text-pink-600">
                  {Math.round(habitMetrics.mindfulnessSessionMinutes / 60)}h
                </div>
                <div className="text-sm text-pink-800">Total mindfulness time this week</div>
              </div>

              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-1">Daily Plant Meditation</div>
                  <div className="text-xs text-gray-600">5-minute guided sessions with your orchids</div>
                  <Progress value={78} className="mt-2 h-2" />
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-1">Gratitude Journaling</div>
                  <div className="text-xs text-gray-600">Weekly reflection on plant care journey</div>
                  <Progress value={65} className="mt-2 h-2" />
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-1">Stress Relief Sessions</div>
                  <div className="text-xs text-gray-600">Plant-focused mindfulness exercises</div>
                  <Progress value={42} className="mt-2 h-2" />
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Smile className="w-4 h-4 mr-2" />
                Start Mindfulness Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habit Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Habit Formation Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium mb-3">Engagement Patterns</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Morning care routine</span>
                  <span className="font-medium">67% of users</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Evening check-ins</span>
                  <span className="font-medium">45% of users</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Weekend deep care</span>
                  <span className="font-medium">78% of users</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Streak Retention</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>7-day retention</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>30-day retention</span>
                  <span className="font-medium">56%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>90-day retention</span>
                  <span className="font-medium">34%</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Impact on Engagement</h5>
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded text-center">
                  <div className="font-bold text-green-600">+45%</div>
                  <div className="text-xs text-green-800">Session duration</div>
                </div>
                <div className="p-2 bg-blue-50 rounded text-center">
                  <div className="font-bold text-blue-600">+67%</div>
                  <div className="text-xs text-blue-800">Feature usage</div>
                </div>
                <div className="p-2 bg-purple-50 rounded text-center">
                  <div className="font-bold text-purple-600">+34%</div>
                  <div className="text-xs text-purple-800">Premium conversion</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitFormationFeatures;
