
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import BehavioralTriggerSystem from './BehavioralTriggerSystem';
import ProgressiveUserJourney from './ProgressiveUserJourney';
import HabitFormationFeatures from './HabitFormationFeatures';
import SocialEngagement from './SocialEngagement';
import PremiumEngagement from './PremiumEngagement';
import { 
  Brain,
  TrendingUp,
  Calendar,
  Users,
  Crown,
  Target,
  Zap,
  Heart,
  Trophy
} from 'lucide-react';

interface EngagementMetrics {
  dailyActiveUsers: number;
  weeklyRetention: number;
  monthlyRetention: number;
  averageSessionTime: number;
  notificationClickRate: number;
  achievementCompletion: number;
  socialInteractions: number;
  premiumConversion: number;
}

const UserEngagementDashboard: React.FC = () => {
  const [engagementMetrics] = useState<EngagementMetrics>({
    dailyActiveUsers: 2847,
    weeklyRetention: 78.5,
    monthlyRetention: 64.2,
    averageSessionTime: 8.5,
    notificationClickRate: 23.8,
    achievementCompletion: 67.3,
    socialInteractions: 1456,
    premiumConversion: 12.4
  });

  const [activeTab, setActiveTab] = useState('behavioral');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Engagement</h2>
          <p className="text-gray-600">Comprehensive engagement and retention optimization</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Brain className="w-4 h-4 mr-2" />
          Engagement Insights
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{engagementMetrics.dailyActiveUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Daily Active Users</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+12% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{engagementMetrics.weeklyRetention}%</div>
            <div className="text-sm text-gray-600">Weekly Retention</div>
            <Progress value={engagementMetrics.weeklyRetention} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{engagementMetrics.averageSessionTime}m</div>
            <div className="text-sm text-gray-600">Avg Session Time</div>
            <div className="flex items-center justify-center mt-2">
              <Target className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-xs text-blue-600">Target: 10m</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{engagementMetrics.premiumConversion}%</div>
            <div className="text-sm text-gray-600">Premium Conversion</div>
            <div className="flex items-center justify-center mt-2">
              <Crown className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-xs text-yellow-600">Monthly target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Systems Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="behavioral" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Behavioral
          </TabsTrigger>
          <TabsTrigger value="journey" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Journey
          </TabsTrigger>
          <TabsTrigger value="habits" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Habits
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="premium" className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            Premium
          </TabsTrigger>
        </TabsList>

        <TabsContent value="behavioral">
          <BehavioralTriggerSystem />
        </TabsContent>

        <TabsContent value="journey">
          <ProgressiveUserJourney />
        </TabsContent>

        <TabsContent value="habits">
          <HabitFormationFeatures />
        </TabsContent>

        <TabsContent value="social">
          <SocialEngagement />
        </TabsContent>

        <TabsContent value="premium">
          <PremiumEngagement />
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Engagement Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Notification CTR</span>
                <Badge variant="secondary">{engagementMetrics.notificationClickRate}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Achievement Rate</span>
                <Badge variant="secondary">{engagementMetrics.achievementCompletion}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Interactions</span>
                <Badge variant="secondary">{engagementMetrics.socialInteractions}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Top Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">First ID</Badge>
                <span className="text-sm">89% completion</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Care Streak</Badge>
                <span className="text-sm">67% completion</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800">Expert</Badge>
                <span className="text-sm">23% completion</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Monthly Retention</span>
                  <span>{engagementMetrics.monthlyRetention}%</span>
                </div>
                <Progress value={engagementMetrics.monthlyRetention} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Feature Adoption</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserEngagementDashboard;
