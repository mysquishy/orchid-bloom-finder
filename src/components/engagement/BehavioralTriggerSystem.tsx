
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Bell,
  Brain,
  Calendar,
  Gift,
  MessageCircle,
  Target,
  Zap,
  Clock,
  TrendingUp
} from 'lucide-react';

interface BehavioralTrigger {
  id: string;
  name: string;
  type: 'notification' | 'modal' | 'email' | 'banner';
  condition: string;
  message: string;
  timing: string;
  isActive: boolean;
  triggeredCount: number;
  conversionRate: number;
}

const BehavioralTriggerSystem: React.FC = () => {
  const [triggers, setTriggers] = useState<BehavioralTrigger[]>([
    {
      id: '1',
      name: 'Struggling User Help',
      type: 'modal',
      condition: 'Failed identification 3+ times in 10 minutes',
      message: 'Need help identifying your orchid? Try our guided identification!',
      timing: 'Immediate',
      isActive: true,
      triggeredCount: 234,
      conversionRate: 67.5
    },
    {
      id: '2',
      name: 'Achievement Celebration',
      type: 'notification',
      condition: 'User completes first successful identification',
      message: '🎉 Congratulations! You\'ve identified your first orchid!',
      timing: 'Immediate',
      isActive: true,
      triggeredCount: 1456,
      conversionRate: 89.2
    },
    {
      id: '3',
      name: 'Dormant User Re-engagement',
      type: 'email',
      condition: 'No activity for 7 days',
      message: 'Your orchids miss you! Check in on your garden.',
      timing: 'Day 7, 9AM local time',
      isActive: true,
      triggeredCount: 567,
      conversionRate: 23.4
    },
    {
      id: '4',
      name: 'Seasonal Care Reminder',
      type: 'banner',
      condition: 'Season change + user has orchids',
      message: 'Spring is here! Update your orchid care routine.',
      timing: 'Weekly during season transitions',
      isActive: true,
      triggeredCount: 2890,
      conversionRate: 45.6
    },
    {
      id: '5',
      name: 'Premium Feature Prompt',
      type: 'modal',
      condition: 'Used 80% of free identifications',
      message: 'Almost out of free IDs! Upgrade for unlimited access.',
      timing: 'After 8th identification',
      isActive: true,
      triggeredCount: 892,
      conversionRate: 31.8
    }
  ]);

  const toggleTrigger = (id: string) => {
    setTriggers(prev => prev.map(trigger => 
      trigger.id === id ? { ...trigger, isActive: !trigger.isActive } : trigger
    ));
  };

  const getTriggerIcon = (type: BehavioralTrigger['type']) => {
    switch (type) {
      case 'notification': return <Bell className="w-4 h-4 text-blue-600" />;
      case 'modal': return <MessageCircle className="w-4 h-4 text-purple-600" />;
      case 'email': return <Calendar className="w-4 h-4 text-green-600" />;
      case 'banner': return <Target className="w-4 h-4 text-orange-600" />;
    }
  };

  const getTypeColor = (type: BehavioralTrigger['type']) => {
    switch (type) {
      case 'notification': return 'bg-blue-100 text-blue-800';
      case 'modal': return 'bg-purple-100 text-purple-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'banner': return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Behavioral Trigger System</h3>
          <p className="text-gray-600">Smart triggers based on user behavior patterns</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Brain className="w-4 h-4 mr-2" />
          Create Trigger
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {triggers.filter(t => t.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Triggers</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {triggers.reduce((sum, t) => sum + t.triggeredCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Triggers Fired</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(triggers.reduce((sum, t) => sum + t.conversionRate, 0) / triggers.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Avg Conversion Rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">24h</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Trigger Management */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">Trigger Configuration</h4>
        
        {triggers.map((trigger) => (
          <Card key={trigger.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTriggerIcon(trigger.type)}
                  <div>
                    <CardTitle className="text-lg">{trigger.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getTypeColor(trigger.type)}>
                        {trigger.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {trigger.timing}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{trigger.conversionRate}%</div>
                    <div className="text-xs text-gray-500">Conversion</div>
                  </div>
                  <Switch
                    checked={trigger.isActive}
                    onCheckedChange={() => toggleTrigger(trigger.id)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-sm mb-2">Trigger Condition</h5>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{trigger.condition}</p>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-2">Message</h5>
                  <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                    {trigger.message}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="font-bold text-green-600">{trigger.triggeredCount}</div>
                    <div className="text-xs text-green-800">Times Triggered</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="font-bold text-blue-600">{trigger.conversionRate}%</div>
                    <div className="text-xs text-blue-800">Conversion Rate</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600">
                      {Math.round(trigger.triggeredCount * trigger.conversionRate / 100)}
                    </div>
                    <div className="text-xs text-purple-800">Conversions</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Test</Button>
                  <Button size="sm" variant="outline">Analytics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trigger Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Top Performing Triggers</h5>
              <div className="space-y-2">
                {triggers
                  .sort((a, b) => b.conversionRate - a.conversionRate)
                  .slice(0, 3)
                  .map((trigger) => (
                    <div key={trigger.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{trigger.name}</span>
                      <Badge className="bg-green-100 text-green-800">{trigger.conversionRate}%</Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Optimization Opportunities</h5>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="text-sm font-medium text-yellow-800">Re-engagement Timing</div>
                  <div className="text-xs text-yellow-700">Test 5-day vs 7-day intervals</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="text-sm font-medium text-blue-800">Message Personalization</div>
                  <div className="text-xs text-blue-700">Add user's orchid names to messages</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="text-sm font-medium text-purple-800">Trigger Frequency</div>
                  <div className="text-xs text-purple-700">Optimize notification cadence</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BehavioralTriggerSystem;
