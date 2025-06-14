import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  TrendingUp, 
  Calendar, 
  Award, 
  Droplets, 
  Flower, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Flame
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useAuth } from '@/contexts/AuthContext';

interface GardenStats {
  totalOrchids: number;
  bloomingOrchids: number;
  healthyOrchids: number;
  needsAttention: number;
  careStreak: number;
  completedTasks: number;
  upcomingTasks: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  achieved: boolean;
  progress: number;
  target: number;
}

interface GardenDashboardProps {
  stats: GardenStats;
  recentActivity: Array<{
    id: string;
    action: string;
    orchidName: string;
    date: Date;
    type: 'watering' | 'fertilizing' | 'repotting' | 'blooming';
  }>;
}

const GardenDashboard: React.FC<GardenDashboardProps> = ({ stats, recentActivity }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const { user } = useAuth();
  const { updateCareStreak, checkAchievements } = useGamification();

  const achievements: Achievement[] = [
    {
      id: 'first-orchid',
      title: 'First Steps',
      description: 'Add your first orchid to the garden',
      icon: <Heart className="w-5 h-5" />,
      achieved: stats.totalOrchids >= 1,
      progress: Math.min(stats.totalOrchids, 1),
      target: 1
    },
    {
      id: 'collector',
      title: 'Orchid Collector',
      description: 'Grow your collection to 10 orchids',
      icon: <Flower className="w-5 h-5" />,
      achieved: stats.totalOrchids >= 10,
      progress: Math.min(stats.totalOrchids, 10),
      target: 10
    },
    {
      id: 'care-streak',
      title: 'Dedicated Gardener',
      description: 'Maintain a 7-day care streak',
      icon: <Calendar className="w-5 h-5" />,
      achieved: stats.careStreak >= 7,
      progress: Math.min(stats.careStreak, 7),
      target: 7
    },
    {
      id: 'bloom-master',
      title: 'Bloom Master',
      description: 'Have 5 orchids blooming simultaneously',
      icon: <Award className="w-5 h-5" />,
      achieved: stats.bloomingOrchids >= 5,
      progress: Math.min(stats.bloomingOrchids, 5),
      target: 5
    }
  ];

  const getHealthStatus = () => {
    const healthPercentage = (stats.healthyOrchids / stats.totalOrchids) * 100;
    if (healthPercentage >= 90) return { status: 'excellent', color: 'bg-green-500', message: 'Excellent garden health!' };
    if (healthPercentage >= 75) return { status: 'good', color: 'bg-blue-500', message: 'Good garden health' };
    if (healthPercentage >= 50) return { status: 'fair', color: 'bg-yellow-500', message: 'Fair garden health' };
    return { status: 'needs-attention', color: 'bg-red-500', message: 'Garden needs attention' };
  };

  const healthStatus = getHealthStatus();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'watering': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'fertilizing': return <Flower className="w-4 h-4 text-green-500" />;
      case 'repotting': return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'blooming': return <Award className="w-4 h-4 text-pink-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleCareAction = async () => {
    if (!user) return;
    
    try {
      // Update care streak
      await updateCareStreak.mutateAsync();
      
      // Check for new achievements
      await checkAchievements.mutateAsync({
        total_plants_cared: stats.totalOrchids,
        perfect_care_days: stats.healthyOrchids === stats.totalOrchids ? 1 : 0
      });
    } catch (error) {
      console.error('Error updating gamification:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Garden Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Orchids</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalOrchids}</p>
              </div>
              <Heart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-600">Currently Blooming</p>
                <p className="text-2xl font-bold text-pink-900">{stats.bloomingOrchids}</p>
              </div>
              <Flower className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Care Streak</p>
                <p className="text-2xl font-bold text-blue-900">{stats.careStreak} days</p>
              </div>
              <Flame className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Experience Points</p>
                <p className="text-2xl font-bold text-purple-900">1,250</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Garden Health Status with Gamification */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Garden Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Health</span>
              <Badge className={`${healthStatus.color} text-white`}>
                {healthStatus.message}
              </Badge>
            </div>
            
            <Progress 
              value={(stats.healthyOrchids / stats.totalOrchids) * 100} 
              className="h-3"
            />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{stats.healthyOrchids} Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span>{stats.needsAttention} Need Attention</span>
              </div>
            </div>

            {user && (
              <div className="flex justify-center pt-2">
                <Button 
                  onClick={handleCareAction}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={updateCareStreak.isPending}
                >
                  {updateCareStreak.isPending ? 'Updating...' : 'Log Daily Care'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.slice(0, 4).map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.achieved 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded ${
                    achievement.achieved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.achieved ? 'text-green-900' : 'text-gray-700'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-2 flex-1"
                      />
                      <span className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.target}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <p>No recent activity</p>
              <p className="text-sm">Start caring for your orchids to see activity here!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action} <span className="text-green-600">{activity.orchidName}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.date.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    +5 XP
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GardenDashboard;
