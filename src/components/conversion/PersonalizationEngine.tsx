
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  PersonStanding, 
  Brain, 
  Target,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Zap
} from 'lucide-react';

interface UserSegment {
  id: string;
  name: string;
  description: string;
  userCount: number;
  conversionRate: number;
  characteristics: string[];
  personalizations: PersonalizationRule[];
}

interface PersonalizationRule {
  id: string;
  name: string;
  type: 'content' | 'feature' | 'timing' | 'ui';
  description: string;
  isActive: boolean;
  impact: number;
  confidence: number;
}

interface PersonalizationMetrics {
  totalPersonalizations: number;
  activeRules: number;
  avgImprovementRate: number;
  engagementIncrease: number;
}

const PersonalizationEngine: React.FC = () => {
  const [segments, setSegments] = useState<UserSegment[]>([
    {
      id: 'beginners',
      name: 'Plant Care Beginners',
      description: 'New users with little to no plant care experience',
      userCount: 3240,
      conversionRate: 18.5,
      characteristics: ['First-time plant owners', 'Age 25-35', 'Urban dwellers', 'High app engagement'],
      personalizations: [
        {
          id: 'beginner-onboarding',
          name: 'Extended Onboarding Flow',
          type: 'feature',
          description: 'Show detailed tutorials and basic plant care tips',
          isActive: true,
          impact: 23.4,
          confidence: 0.92
        },
        {
          id: 'beginner-content',
          name: 'Simplified Language',
          type: 'content',
          description: 'Use beginner-friendly terminology and explanations',
          isActive: true,
          impact: 15.7,
          confidence: 0.88
        },
        {
          id: 'beginner-features',
          name: 'Basic Features First',
          type: 'feature',
          description: 'Highlight essential features before advanced ones',
          isActive: true,
          impact: 28.9,
          confidence: 0.95
        }
      ]
    },
    {
      id: 'experienced',
      name: 'Experienced Gardeners',
      description: 'Users with significant plant care experience',
      userCount: 1890,
      conversionRate: 34.2,
      characteristics: ['Multiple plant owners', 'Age 35-55', 'High feature usage', 'Community active'],
      personalizations: [
        {
          id: 'expert-dashboard',
          name: 'Advanced Dashboard',
          type: 'ui',
          description: 'Show comprehensive plant health analytics',
          isActive: true,
          impact: 31.2,
          confidence: 0.91
        },
        {
          id: 'expert-features',
          name: 'Advanced Feature Access',
          type: 'feature',
          description: 'Early access to beta features and tools',
          isActive: true,
          impact: 42.1,
          confidence: 0.97
        },
        {
          id: 'expert-content',
          name: 'Technical Content',
          type: 'content',
          description: 'In-depth care guides and scientific information',
          isActive: false,
          impact: 0,
          confidence: 0
        }
      ]
    },
    {
      id: 'enthusiasts',
      name: 'Orchid Enthusiasts',
      description: 'Users specifically passionate about orchids',
      userCount: 2156,
      conversionRate: 28.7,
      characteristics: ['Orchid specialists', 'High engagement', 'Premium subscribers', 'Community leaders'],
      personalizations: [
        {
          id: 'orchid-content',
          name: 'Orchid-Specific Content',
          type: 'content',
          description: 'Curated orchid care guides and species information',
          isActive: true,
          impact: 37.8,
          confidence: 0.94
        },
        {
          id: 'orchid-community',
          name: 'Orchid Community Features',
          type: 'feature',
          description: 'Access to orchid-specific forums and expert advice',
          isActive: true,
          impact: 45.3,
          confidence: 0.96
        },
        {
          id: 'orchid-timing',
          name: 'Seasonal Orchid Tips',
          type: 'timing',
          description: 'Time-sensitive orchid care recommendations',
          isActive: true,
          impact: 25.6,
          confidence: 0.89
        }
      ]
    },
    {
      id: 'mobile-users',
      name: 'Mobile-First Users',
      description: 'Users who primarily access the app on mobile devices',
      userCount: 4520,
      conversionRate: 22.1,
      characteristics: ['Mobile-only access', 'Quick sessions', 'Visual learners', 'Photo-heavy usage'],
      personalizations: [
        {
          id: 'mobile-ui',
          name: 'Mobile-Optimized Interface',
          type: 'ui',
          description: 'Larger buttons, simplified navigation, touch-friendly design',
          isActive: true,
          impact: 19.4,
          confidence: 0.86
        },
        {
          id: 'mobile-content',
          name: 'Visual Content Priority',
          type: 'content',
          description: 'Image-based tutorials and visual guides',
          isActive: true,
          impact: 33.7,
          confidence: 0.93
        },
        {
          id: 'mobile-features',
          name: 'Camera-First Features',
          type: 'feature',
          description: 'Prioritize photo identification and visual features',
          isActive: true,
          impact: 27.8,
          confidence: 0.90
        }
      ]
    }
  ]);

  const [metrics] = useState<PersonalizationMetrics>({
    totalPersonalizations: 12,
    activeRules: 9,
    avgImprovementRate: 28.3,
    engagementIncrease: 34.7
  });

  const togglePersonalization = (segmentId: string, ruleId: string) => {
    setSegments(prev => prev.map(segment => {
      if (segment.id === segmentId) {
        return {
          ...segment,
          personalizations: segment.personalizations.map(rule => 
            rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
          )
        };
      }
      return segment;
    }));
  };

  const getPersonalizationTypeIcon = (type: PersonalizationRule['type']) => {
    switch (type) {
      case 'content': return <Brain className="w-4 h-4 text-blue-600" />;
      case 'feature': return <Zap className="w-4 h-4 text-purple-600" />;
      case 'timing': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'ui': return <Sparkles className="w-4 h-4 text-green-600" />;
    }
  };

  const getPersonalizationTypeColor = (type: PersonalizationRule['type']) => {
    switch (type) {
      case 'content': return 'bg-blue-100 text-blue-800';
      case 'feature': return 'bg-purple-100 text-purple-800';
      case 'timing': return 'bg-orange-100 text-orange-800';
      case 'ui': return 'bg-green-100 text-green-800';
    }
  };

  const totalUsers = segments.reduce((sum, segment) => sum + segment.userCount, 0);
  const avgConversionRate = segments.reduce((sum, segment) => sum + (segment.conversionRate * segment.userCount), 0) / totalUsers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personalization Engine</h2>
          <p className="text-gray-600">Deliver customized experiences for different user segments</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Brain className="w-4 h-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{metrics.totalPersonalizations}</div>
            <div className="text-sm text-gray-600">Total Rules</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.activeRules}</div>
            <div className="text-sm text-gray-600">Active Rules</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.avgImprovementRate}%</div>
            <div className="text-sm text-gray-600">Avg. Improvement</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{metrics.engagementIncrease}%</div>
            <div className="text-sm text-gray-600">Engagement Boost</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="segments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
          <TabsTrigger value="rules">Personalization Rules</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="segments">
          <div className="space-y-4">
            {segments.map((segment) => (
              <Card key={segment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <PersonStanding className="w-5 h-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{segment.name}</CardTitle>
                        <p className="text-sm text-gray-600">{segment.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{segment.userCount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">users</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Segment Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-lg font-bold text-green-600">{segment.conversionRate}%</div>
                        <div className="text-xs text-gray-600">Conversion Rate</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-lg font-bold text-blue-600">
                          {Math.round((segment.userCount / totalUsers) * 100)}%
                        </div>
                        <div className="text-xs text-gray-600">Of Total Users</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-lg font-bold text-purple-600">
                          {segment.personalizations.filter(p => p.isActive).length}
                        </div>
                        <div className="text-xs text-gray-600">Active Rules</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-lg font-bold text-orange-600">
                          {segment.personalizations.reduce((sum, p) => sum + (p.isActive ? p.impact : 0), 0).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">Total Impact</div>
                      </div>
                    </div>

                    {/* Characteristics */}
                    <div>
                      <h4 className="font-medium mb-2">Segment Characteristics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {segment.characteristics.map((characteristic, index) => (
                          <Badge key={index} variant="outline">
                            {characteristic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Personalizations */}
                    <div>
                      <h4 className="font-medium mb-3">Active Personalizations:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {segment.personalizations.map((rule) => (
                          <div key={rule.id} className={`border rounded-lg p-4 ${
                            rule.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getPersonalizationTypeIcon(rule.type)}
                                <h5 className="font-medium">{rule.name}</h5>
                              </div>
                              <Switch
                                checked={rule.isActive}
                                onCheckedChange={() => togglePersonalization(segment.id, rule.id)}
                              />
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <Badge className={getPersonalizationTypeColor(rule.type)}>
                                {rule.type}
                              </Badge>
                              {rule.isActive && (
                                <div className="text-right">
                                  <div className="text-sm font-medium text-green-600">+{rule.impact}%</div>
                                  <div className="text-xs text-gray-500">{(rule.confidence * 100).toFixed(0)}% confidence</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['content', 'feature', 'timing', 'ui'].map((type) => {
              const typeRules = segments.flatMap(s => s.personalizations).filter(r => r.type === type);
              const activeRules = typeRules.filter(r => r.isActive).length;
              
              return (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 capitalize">
                      {getPersonalizationTypeIcon(type as PersonalizationRule['type'])}
                      {type} Personalizations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Active Rules</span>
                        <span>{activeRules} of {typeRules.length}</span>
                      </div>
                      <Progress value={(activeRules / typeRules.length) * 100} />
                    </div>
                    
                    <div className="space-y-3">
                      {typeRules.slice(0, 3).map((rule) => (
                        <div key={rule.id} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{rule.name}</span>
                          <div className="flex items-center space-x-2">
                            {rule.isActive && (
                              <span className="text-xs text-green-600">+{rule.impact}%</span>
                            )}
                            <Badge variant={rule.isActive ? 'default' : 'outline'}>
                              {rule.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Segment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div key={segment.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{segment.name}</div>
                        <div className="text-sm text-gray-600">{segment.userCount.toLocaleString()} users</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{segment.conversionRate}%</div>
                        <div className="text-xs text-gray-500">conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Overall Impact</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900 mb-1">{metrics.avgImprovementRate}%</div>
                    <div className="text-sm text-green-700">Average conversion improvement across all segments</div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">User Engagement</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 mb-1">{metrics.engagementIncrease}%</div>
                    <div className="text-sm text-blue-700">Increase in user engagement and session duration</div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-800">Personalization Coverage</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      {Math.round((totalUsers / 12000) * 100)}%
                    </div>
                    <div className="text-sm text-purple-700">Of users receiving personalized experiences</div>
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

export default PersonalizationEngine;
