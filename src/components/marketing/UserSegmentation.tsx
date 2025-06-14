
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Crown,
  UserPlus,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { UserSegment } from '@/utils/marketingAnalytics';

const UserSegmentation: React.FC = () => {
  const [segments] = useState<UserSegment[]>([
    {
      id: '1',
      name: 'Power Users',
      description: 'Highly engaged users with 10+ plant identifications',
      criteria: {
        behaviors: { identifications: { min: 10 } },
        engagement: { last_active: { days: 7 } }
      },
      userCount: 1245,
      averageValue: 45.80,
      retentionRate: 92.5
    },
    {
      id: '2',
      name: 'Premium Subscribers',
      description: 'Users with active premium subscriptions',
      criteria: {
        subscription: { tier: 'premium', status: 'active' }
      },
      userCount: 589,
      averageValue: 78.90,
      retentionRate: 94.2
    },
    {
      id: '3',
      name: 'New Users',
      description: 'Recently registered users (last 30 days)',
      criteria: {
        demographics: { signup_date: { days: 30 } }
      },
      userCount: 2150,
      averageValue: 12.30,
      retentionRate: 65.8
    },
    {
      id: '4',
      name: 'At-Risk Users',
      description: 'Previously active users who haven\'t engaged recently',
      criteria: {
        behaviors: { last_identification: { days: 60 } },
        engagement: { last_active: { days: 30 } }
      },
      userCount: 890,
      averageValue: 23.40,
      retentionRate: 45.2
    },
    {
      id: '5',
      name: 'Orchid Collectors',
      description: 'Users with large plant collections (5+ orchids)',
      criteria: {
        behaviors: { plant_collection_size: { min: 5 } }
      },
      userCount: 456,
      averageValue: 89.60,
      retentionRate: 88.7
    },
    {
      id: '6',
      name: 'Mobile-First Users',
      description: 'Users primarily accessing via mobile app',
      criteria: {
        behaviors: { primary_device: 'mobile' }
      },
      userCount: 3420,
      averageValue: 28.90,
      retentionRate: 78.3
    }
  ]);

  const getSegmentIcon = (name: string) => {
    switch (true) {
      case name.includes('Power'): return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case name.includes('Premium'): return <Crown className="w-5 h-5 text-yellow-600" />;
      case name.includes('New'): return <UserPlus className="w-5 h-5 text-green-600" />;
      case name.includes('Risk'): return <Clock className="w-5 h-5 text-red-600" />;
      case name.includes('Collector'): return <Heart className="w-5 h-5 text-pink-600" />;
      case name.includes('Mobile'): return <ShoppingCart className="w-5 h-5 text-blue-600" />;
      default: return <Users className="w-5 h-5 text-gray-600" />;
    }
  };

  const getValueColor = (value: number) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRetentionColor = (rate: number) => {
    if (rate >= 85) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalUsers = segments.reduce((sum, segment) => sum + segment.userCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Segmentation</h2>
          <p className="text-gray-600">Analyze and target different user groups effectively</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Users className="w-4 h-4 mr-2" />
          Create Segment
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{segments.length}</p>
              <p className="text-sm text-gray-600">Active Segments</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                ${(segments.reduce((sum, s) => sum + (s.averageValue * s.userCount), 0) / totalUsers).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Avg. Value/User</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {((segments.reduce((sum, s) => sum + (s.retentionRate * s.userCount), 0) / totalUsers)).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">Avg. Retention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segments.map((segment) => (
          <Card key={segment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getSegmentIcon(segment.name)}
                  <div>
                    <CardTitle className="text-lg">{segment.name}</CardTitle>
                    <p className="text-sm text-gray-600">{segment.description}</p>
                  </div>
                </div>
                <Badge variant="outline">
                  {((segment.userCount / totalUsers) * 100).toFixed(1)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* User Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Users</span>
                </div>
                <span className="font-medium">{segment.userCount.toLocaleString()}</span>
              </div>

              {/* Average Value */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Avg. Value</span>
                </div>
                <span className={`font-medium ${getValueColor(segment.averageValue)}`}>
                  ${segment.averageValue.toFixed(2)}
                </span>
              </div>

              {/* Retention Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Retention Rate</span>
                  </div>
                  <span className={`font-medium ${getRetentionColor(segment.retentionRate)}`}>
                    {segment.retentionRate.toFixed(1)}%
                  </span>
                </div>
                <Progress value={segment.retentionRate} className="h-2" />
              </div>

              {/* Segment Criteria */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Segment Criteria</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  {Object.entries(segment.criteria).map(([category, rules]) => (
                    <div key={category}>
                      <span className="font-medium capitalize">{category}: </span>
                      <span>{JSON.stringify(rules, null, 0)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Users
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Segment Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Segment Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Highest Value Segments</h4>
              <div className="space-y-2">
                {segments
                  .sort((a, b) => b.averageValue - a.averageValue)
                  .slice(0, 3)
                  .map((segment, index) => (
                    <div key={segment.id} className="flex items-center justify-between text-sm">
                      <span>{index + 1}. {segment.name}</span>
                      <span className="font-medium text-green-600">${segment.averageValue.toFixed(2)}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Best Retention Rates</h4>
              <div className="space-y-2">
                {segments
                  .sort((a, b) => b.retentionRate - a.retentionRate)
                  .slice(0, 3)
                  .map((segment, index) => (
                    <div key={segment.id} className="flex items-center justify-between text-sm">
                      <span>{index + 1}. {segment.name}</span>
                      <span className="font-medium text-blue-600">{segment.retentionRate.toFixed(1)}%</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSegmentation;
