
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  FileText,
  Mail,
  Share2,
  Users,
  Calendar,
  Zap,
  Clock,
  TrendingUp,
  Settings
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  type: 'blog' | 'email' | 'social' | 'guest_post';
  trigger: string;
  frequency: string;
  isActive: boolean;
  lastRun: string;
  successRate: number;
}

interface ContentTemplate {
  id: string;
  name: string;
  type: 'blog_post' | 'email_newsletter' | 'social_post' | 'guest_article';
  category: string;
  engagement: number;
  conversions: number;
  isActive: boolean;
}

interface InfluencerCollaboration {
  id: string;
  influencer: string;
  platform: string;
  followers: number;
  engagementRate: number;
  niche: string;
  status: 'planned' | 'active' | 'completed';
  expectedReach: number;
}

const ContentAutomation: React.FC = () => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Weekly Care Tips Email',
      type: 'email',
      trigger: 'User signup + 7 days',
      frequency: 'Weekly',
      isActive: true,
      lastRun: '2024-06-12',
      successRate: 87.5
    },
    {
      id: '2',
      name: 'Blog from FAQs',
      type: 'blog',
      trigger: 'FAQ threshold reached',
      frequency: 'Bi-weekly',
      isActive: true,
      lastRun: '2024-06-10',
      successRate: 92.3
    },
    {
      id: '3',
      name: 'Social Media Scheduler',
      type: 'social',
      trigger: 'New content published',
      frequency: 'Daily',
      isActive: true,
      lastRun: '2024-06-13',
      successRate: 78.9
    }
  ]);

  const [contentTemplates] = useState<ContentTemplate[]>([
    {
      id: '1',
      name: 'Beginner Orchid Care Guide',
      type: 'blog_post',
      category: 'Care Guides',
      engagement: 8.7,
      conversions: 12.4,
      isActive: true
    },
    {
      id: '2',
      name: 'Weekly Plant Parent Newsletter',
      type: 'email_newsletter',
      category: 'Education',
      engagement: 24.8,
      conversions: 8.9,
      isActive: true
    },
    {
      id: '3',
      name: 'Plant Progress Story Template',
      type: 'social_post',
      category: 'Social Media',
      engagement: 6.2,
      conversions: 3.4,
      isActive: true
    }
  ]);

  const [influencerCollabs] = useState<InfluencerCollaboration[]>([
    {
      id: '1',
      influencer: '@PlantMomLife',
      platform: 'Instagram',
      followers: 125000,
      engagementRate: 4.2,
      niche: 'Houseplant Care',
      status: 'active',
      expectedReach: 45000
    },
    {
      id: '2',
      influencer: '@OrchidExpert',
      platform: 'YouTube',
      followers: 89000,
      engagementRate: 6.8,
      niche: 'Orchid Specialists',
      status: 'planned',
      expectedReach: 32000
    },
    {
      id: '3',
      influencer: '@GreenThumbGuru',
      platform: 'TikTok',
      followers: 250000,
      engagementRate: 8.4,
      niche: 'Plant Education',
      status: 'completed',
      expectedReach: 78000
    }
  ]);

  const toggleAutomation = (id: string) => {
    setAutomationRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const getTypeIcon = (type: AutomationRule['type']) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'email': return <Mail className="w-4 h-4 text-green-500" />;
      case 'social': return <Share2 className="w-4 h-4 text-purple-500" />;
      case 'guest_post': return <Users className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: InfluencerCollaboration['status']) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Content Marketing Automation</h3>
          <p className="text-gray-600">Automated content creation and distribution workflows</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Zap className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automation Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-500" />
              Automation Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationRules.map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(rule.type)}
                      <div>
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-sm text-gray-600">{rule.trigger}</div>
                      </div>
                    </div>
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => toggleAutomation(rule.id)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-gray-700">{rule.frequency}</div>
                      <div className="text-xs text-gray-500">Frequency</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{rule.successRate}%</div>
                      <div className="text-xs text-green-800">Success Rate</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{new Date(rule.lastRun).toLocaleDateString()}</div>
                      <div className="text-xs text-blue-800">Last Run</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? 'Active' : 'Paused'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Content Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-gray-600">{template.category}</div>
                    </div>
                    <Badge variant={template.isActive ? "default" : "secondary"}>
                      {template.type.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600">{template.engagement}%</div>
                      <div className="text-xs text-purple-800">Engagement</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{template.conversions}%</div>
                      <div className="text-xs text-green-800">Conversions</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Performance score</span>
                      <span>{Math.round((template.engagement + template.conversions) / 2)}%</span>
                    </div>
                    <Progress value={(template.engagement + template.conversions) / 2} className="h-2" />
                  </div>

                  <div className="flex justify-between mt-3">
                    <Button size="sm" variant="outline">
                      Edit Template
                    </Button>
                    <Button size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Influencer Collaborations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Influencer Collaboration Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {influencerCollabs.map((collab) => (
              <div key={collab.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{collab.influencer}</div>
                    <div className="text-sm text-gray-600">{collab.platform} • {collab.niche}</div>
                  </div>
                  <Badge className={getStatusColor(collab.status)}>
                    {collab.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-bold text-blue-600">{(collab.followers / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-blue-800">Followers</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-600">{collab.engagementRate}%</div>
                    <div className="text-xs text-green-800">Engagement</div>
                  </div>
                </div>

                <div className="text-center p-2 bg-purple-50 rounded mb-3">
                  <div className="font-bold text-purple-600">{(collab.expectedReach / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-purple-800">Expected Reach</div>
                </div>

                <Button size="sm" className="w-full">
                  {collab.status === 'planned' ? 'Start Campaign' : 
                   collab.status === 'active' ? 'View Progress' : 'View Results'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Marketing Automation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-500" />
              Email Marketing Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2">Active Email Sequences</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Welcome Series', subscribers: 1250, openRate: 28.5 },
                    { name: 'Care Tips Weekly', subscribers: 3400, openRate: 24.8 },
                    { name: 'Re-engagement Campaign', subscribers: 890, openRate: 18.2 }
                  ].map((sequence) => (
                    <div key={sequence.name} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{sequence.name}</div>
                        <div className="text-xs text-gray-600">{sequence.subscribers} subscribers</div>
                      </div>
                      <Badge variant="outline">{sequence.openRate}% open rate</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-gray-700">12.4K</div>
                  <div className="text-xs text-gray-600">Total subscribers</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-gray-700">24.8%</div>
                  <div className="text-xs text-gray-600">Avg open rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Content Calendar Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Upcoming Automated Posts</h4>
                <div className="space-y-2">
                  {[
                    { date: 'Jun 15', content: 'Watering tips for summer', platform: 'Instagram' },
                    { date: 'Jun 16', content: 'Orchid species spotlight', platform: 'Blog' },
                    { date: 'Jun 17', content: 'Community Q&A highlights', platform: 'Email' }
                  ].map((post) => (
                    <div key={post.date} className="flex justify-between text-sm">
                      <span>{post.date}: {post.content}</span>
                      <Badge variant="outline" className="text-xs">{post.platform}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Manage Content Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentAutomation;
