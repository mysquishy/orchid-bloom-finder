
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Heart, 
  Mail, 
  Zap, 
  Trophy,
  Bell,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Clock,
  Star,
  Gift,
  MessageCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface RetentionMetrics {
  day1: number;
  day7: number;
  day30: number;
  day90: number;
  averageSessionTime: number;
  dailyActiveUsers: number;
  churnRate: number;
}

interface EngagementCampaign {
  id: string;
  name: string;
  type: 're-engagement' | 'feature-unlock' | 'achievement' | 'habit-formation';
  status: 'active' | 'paused' | 'scheduled';
  targetSegment: string;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  isActive: boolean;
}

interface AchievementSystem {
  id: string;
  name: string;
  description: string;
  trigger: string;
  reward: string;
  usersEarned: number;
  completionRate: number;
  retentionImpact: number;
  isActive: boolean;
}

interface HabitFormation {
  id: string;
  name: string;
  description: string;
  frequency: string;
  participants: number;
  completionRate: number;
  retentionBoost: number;
  isActive: boolean;
}

const RetentionOptimization: React.FC = () => {
  const [retentionMetrics] = useState<RetentionMetrics>({
    day1: 85.4,
    day7: 67.8,
    day30: 42.3,
    day90: 28.9,
    averageSessionTime: 8.5,
    dailyActiveUsers: 12450,
    churnRate: 15.7
  });

  const [engagementCampaigns, setEngagementCampaigns] = useState<EngagementCampaign[]>([
    {
      id: '1',
      name: 'Inactive User Re-engagement',
      type: 're-engagement',
      status: 'active',
      targetSegment: 'Users inactive for 7+ days',
      sent: 2450,
      opened: 892,
      clicked: 234,
      converted: 89,
      isActive: true
    },
    {
      id: '2',
      name: 'Premium Feature Introduction',
      type: 'feature-unlock',
      status: 'active',
      targetSegment: 'Free users with 5+ identifications',
      sent: 1890,
      opened: 756,
      clicked: 289,
      converted: 145,
      isActive: true
    },
    {
      id: '3',
      name: 'First Week Milestone',
      type: 'achievement',
      status: 'active',
      targetSegment: 'Users completing first week',
      sent: 3240,
      opened: 1456,
      clicked: 567,
      converted: 234,
      isActive: true
    },
    {
      id: '4',
      name: 'Daily Check-in Reminder',
      type: 'habit-formation',
      status: 'paused',
      targetSegment: 'Active premium users',
      sent: 5670,
      opened: 2134,
      clicked: 890,
      converted: 456,
      isActive: false
    }
  ]);

  const [achievementSystems, setAchievementSystems] = useState<AchievementSystem[]>([
    {
      id: '1',
      name: 'Plant Identifier',
      description: 'Successfully identify your first plant',
      trigger: 'First successful plant identification',
      reward: 'Unlock plant care calendar',
      usersEarned: 8934,
      completionRate: 78.5,
      retentionImpact: 34.2,
      isActive: true
    },
    {
      id: '2',
      name: 'Green Thumb',
      description: 'Identify 10 different plant species',
      trigger: '10 unique plant identifications',
      reward: '1 week premium trial',
      usersEarned: 2456,
      completionRate: 45.7,
      retentionImpact: 56.8,
      isActive: true
    },
    {
      id: '3',
      name: 'Plant Parent',
      description: 'Complete 30 days of plant care tracking',
      trigger: '30 consecutive days of care logging',
      reward: 'Expert consultation session',
      usersEarned: 1234,
      completionRate: 23.4,
      retentionImpact: 78.9,
      isActive: true
    },
    {
      id: '4',
      name: 'Community Helper',
      description: 'Help 5 community members with plant questions',
      trigger: '5 helpful community responses',
      reward: 'Community badge + premium features',
      usersEarned: 567,
      completionRate: 12.3,
      retentionImpact: 89.4,
      isActive: false
    }
  ]);

  const [habitFormation, setHabitFormation] = useState<HabitFormation[]>([
    {
      id: '1',
      name: 'Daily Plant Check-in',
      description: 'Check and log plant status daily',
      frequency: 'Daily',
      participants: 3456,
      completionRate: 67.8,
      retentionBoost: 45.2,
      isActive: true
    },
    {
      id: '2',
      name: 'Weekly Plant Identification',
      description: 'Identify at least one new plant per week',
      frequency: 'Weekly',
      participants: 2890,
      completionRate: 52.4,
      retentionBoost: 38.7,
      isActive: true
    },
    {
      id: '3',
      name: 'Monthly Plant Care Review',
      description: 'Review and update plant care schedules monthly',
      frequency: 'Monthly',
      participants: 1567,
      completionRate: 78.9,
      retentionBoost: 62.3,
      isActive: true
    }
  ]);

  const retentionTrendData = [
    { week: 'Week 1', retention: 85.4 },
    { week: 'Week 2', retention: 67.8 },
    { week: 'Week 3', retention: 58.2 },
    { week: 'Week 4', retention: 42.3 },
    { week: 'Week 8', retention: 35.6 },
    { week: 'Week 12', retention: 28.9 }
  ];

  const cohortAnalysisData = [
    { cohort: 'Jan 2024', day1: 88, day7: 72, day30: 45 },
    { cohort: 'Feb 2024', day1: 85, day7: 69, day30: 43 },
    { cohort: 'Mar 2024', day1: 87, day7: 71, day30: 44 },
    { cohort: 'Apr 2024', day1: 89, day7: 74, day30: 47 },
    { cohort: 'May 2024', day1: 86, day7: 68, day30: 42 },
    { cohort: 'Jun 2024', day1: 85, day7: 68, day30: 42 }
  ];

  const toggleCampaign = (id: string) => {
    setEngagementCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, isActive: !campaign.isActive } : campaign
    ));
  };

  const toggleAchievement = (id: string) => {
    setAchievementSystems(prev => prev.map(achievement => 
      achievement.id === id ? { ...achievement, isActive: !achievement.isActive } : achievement
    ));
  };

  const toggleHabit = (id: string) => {
    setHabitFormation(prev => prev.map(habit => 
      habit.id === id ? { ...habit, isActive: !habit.isActive } : habit
    ));
  };

  const getCampaignTypeIcon = (type: EngagementCampaign['type']) => {
    switch (type) {
      case 're-engagement': return <Mail className="w-4 h-4 text-blue-600" />;
      case 'feature-unlock': return <Zap className="w-4 h-4 text-purple-600" />;
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-600" />;
      case 'habit-formation': return <Calendar className="w-4 h-4 text-green-600" />;
    }
  };

  const getCampaignTypeColor = (type: EngagementCampaign['type']) => {
    switch (type) {
      case 're-engagement': return 'bg-blue-100 text-blue-800';
      case 'feature-unlock': return 'bg-purple-100 text-purple-800';
      case 'achievement': return 'bg-yellow-100 text-yellow-800';
      case 'habit-formation': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Retention Optimization</h2>
          <p className="text-gray-600">Keep users engaged and reduce churn through targeted interventions</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <Heart className="w-4 h-4 mr-2" />
          Launch Retention Campaign
        </Button>
      </div>

      {/* Retention Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{retentionMetrics.day1}%</div>
            <div className="text-sm text-gray-600">Day 1</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{retentionMetrics.day7}%</div>
            <div className="text-sm text-gray-600">Day 7</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{retentionMetrics.day30}%</div>
            <div className="text-sm text-gray-600">Day 30</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{retentionMetrics.day90}%</div>
            <div className="text-sm text-gray-600">Day 90</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">{retentionMetrics.averageSessionTime}m</div>
            <div className="text-sm text-gray-600">Avg. Session</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{retentionMetrics.dailyActiveUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">DAU</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{retentionMetrics.churnRate}%</div>
            <div className="text-sm text-gray-600">Churn Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Re-engagement</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="habits">Habit Formation</TabsTrigger>
          <TabsTrigger value="analytics">Retention Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <div className="space-y-4">
            {engagementCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCampaignTypeIcon(campaign.type)}
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <p className="text-sm text-gray-600">{campaign.targetSegment}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCampaignTypeColor(campaign.type)}>
                        {campaign.type.replace('-', ' ')}
                      </Badge>
                      <Switch
                        checked={campaign.isActive}
                        onCheckedChange={() => toggleCampaign(campaign.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">{campaign.sent.toLocaleString()}</div>
                      <div className="text-xs text-blue-800">Sent</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">{campaign.opened.toLocaleString()}</div>
                      <div className="text-xs text-green-800">Opened</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-lg font-bold text-purple-600">{campaign.clicked.toLocaleString()}</div>
                      <div className="text-xs text-purple-800">Clicked</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">{campaign.converted}</div>
                      <div className="text-xs text-orange-800">Converted</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Open Rate</span>
                        <span>{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(campaign.opened / campaign.sent) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Click Rate</span>
                        <span>{((campaign.clicked / campaign.sent) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(campaign.clicked / campaign.sent) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span>{((campaign.converted / campaign.sent) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(campaign.converted / campaign.sent) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="space-y-4">
            {achievementSystems.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={achievement.isActive ? 'default' : 'outline'}>
                        {achievement.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Switch
                        checked={achievement.isActive}
                        onCheckedChange={() => toggleAchievement(achievement.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded">
                        <h4 className="font-medium text-sm mb-1">Trigger:</h4>
                        <p className="text-sm text-gray-700">{achievement.trigger}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <h4 className="font-medium text-sm mb-1">Reward:</h4>
                        <p className="text-sm text-gray-700">{achievement.reward}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold text-blue-600">{achievement.usersEarned.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Users Earned</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold text-green-600">{achievement.completionRate}%</div>
                        <div className="text-xs text-gray-600">Completion Rate</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold text-purple-600">+{achievement.retentionImpact}%</div>
                        <div className="text-xs text-gray-600">Retention Impact</div>
                      </div>
                    </div>

                    {achievement.isActive && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">Achievement Impact</span>
                        </div>
                        <div className="text-sm text-green-700 mt-1">
                          Users with this achievement have {achievement.retentionImpact}% higher 30-day retention
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="habits">
          <div className="space-y-4">
            {habitFormation.map((habit) => (
              <Card key={habit.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <div>
                        <CardTitle className="text-lg">{habit.name}</CardTitle>
                        <p className="text-sm text-gray-600">{habit.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">{habit.frequency}</Badge>
                      <Switch
                        checked={habit.isActive}
                        onCheckedChange={() => toggleHabit(habit.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">{habit.participants.toLocaleString()}</div>
                      <div className="text-xs text-blue-800">Participants</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">{habit.completionRate}%</div>
                      <div className="text-xs text-green-800">Completion Rate</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-lg font-bold text-purple-600">+{habit.retentionBoost}%</div>
                      <div className="text-xs text-purple-800">Retention Boost</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Habit Completion Rate</span>
                      <span>{habit.completionRate}%</span>
                    </div>
                    <Progress value={habit.completionRate} className="h-3" />
                  </div>

                  {habit.isActive && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Habit Formation Impact</span>
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Users who complete this habit have {habit.retentionBoost}% better retention rates
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Retention Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={retentionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Retention Rate']} />
                    <Line type="monotone" dataKey="retention" stroke="#EC4899" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cohort Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cohortAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cohort" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="day1" fill="#10B981" name="Day 1" />
                    <Bar dataKey="day7" fill="#3B82F6" name="Day 7" />
                    <Bar dataKey="day30" fill="#8B5CF6" name="Day 30" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Push Notification Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Plant Care Reminders</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Daily reminders for users to check and care for their plants
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-100 text-green-800">85% open rate</Badge>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Weekly App Summary</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Weekly summary of user's plant identification and care activities
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-100 text-blue-800">67% open rate</Badge>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Achievement Unlocked</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Instant notifications when users unlock new achievements
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-purple-100 text-purple-800">92% open rate</Badge>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Community Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Weekly Plant Care Tips</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Expert tips shared in community forums to encourage engagement
                    </p>
                    <div className="text-sm text-green-600">
                      📈 +23% community engagement
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Plant of the Month</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Monthly featured plant with care guides and community discussions
                    </p>
                    <div className="text-sm text-blue-600">
                      📈 +34% monthly retention
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Expert Q&A Sessions</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Live Q&A sessions with plant care experts
                    </p>
                    <div className="text-sm text-purple-600">
                      📈 +45% premium conversion
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetentionOptimization;
