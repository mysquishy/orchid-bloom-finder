
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Share2, 
  Gift, 
  Users, 
  Mail,
  TrendingUp,
  Trophy,
  Zap,
  Heart,
  MessageCircle,
  Star,
  Copy,
  Send,
  Plus
} from 'lucide-react';

interface ReferralMetrics {
  totalReferrals: number;
  successfulReferrals: number;
  conversionRate: number;
  viralCoefficient: number;
  revenueFromReferrals: number;
}

interface SharingCampaign {
  id: string;
  name: string;
  type: 'identification' | 'achievement' | 'milestone' | 'content';
  shares: number;
  clicks: number;
  conversions: number;
  engagementRate: number;
  isActive: boolean;
}

interface ViralMechanic {
  id: string;
  name: string;
  description: string;
  implementation: string;
  metrics: {
    users: number;
    shares: number;
    newUsers: number;
    engagement: number;
  };
  isActive: boolean;
}

const GrowthHackingFeatures: React.FC = () => {
  const [referralMetrics] = useState<ReferralMetrics>({
    totalReferrals: 1247,
    successfulReferrals: 423,
    conversionRate: 33.9,
    viralCoefficient: 1.34,
    revenueFromReferrals: 12450
  });

  const [sharingCampaigns, setSharingCampaigns] = useState<SharingCampaign[]>([
    {
      id: '1',
      name: 'Plant Identification Success',
      type: 'identification',
      shares: 3420,
      clicks: 8934,
      conversions: 267,
      engagementRate: 24.5,
      isActive: true
    },
    {
      id: '2',
      name: 'First Month Milestone',
      type: 'milestone',
      shares: 1890,
      clicks: 4567,
      conversions: 189,
      engagementRate: 31.2,
      isActive: true
    },
    {
      id: '3',
      name: 'Plant Collection Showcase',
      type: 'achievement',
      shares: 2156,
      clicks: 6234,
      conversions: 234,
      engagementRate: 27.8,
      isActive: true
    },
    {
      id: '4',
      name: 'Expert Care Tips',
      type: 'content',
      shares: 945,
      clicks: 2341,
      conversions: 98,
      engagementRate: 19.4,
      isActive: false
    }
  ]);

  const [viralMechanics, setViralMechanics] = useState<ViralMechanic[]>([
    {
      id: 'referral-program',
      name: 'Friend Referral Program',
      description: 'Reward users for successful friend referrals',
      implementation: 'Give 1 month free premium for each successful referral',
      metrics: {
        users: 2340,
        shares: 4567,
        newUsers: 1234,
        engagement: 78.5
      },
      isActive: true
    },
    {
      id: 'social-sharing',
      name: 'Plant Identification Sharing',
      description: 'One-click sharing of plant identification results',
      implementation: 'Auto-generate beautiful share cards with plant info',
      metrics: {
        users: 5678,
        shares: 12340,
        newUsers: 2890,
        engagement: 45.2
      },
      isActive: true
    },
    {
      id: 'plant-challenges',
      name: 'Monthly Plant Challenges',
      description: 'Community challenges that encourage sharing',
      implementation: 'Monthly themes with leaderboards and prizes',
      metrics: {
        users: 1890,
        shares: 3456,
        newUsers: 567,
        engagement: 67.8
      },
      isActive: true
    },
    {
      id: 'success-stories',
      name: 'Plant Success Stories',
      description: 'Share before/after plant transformation stories',
      implementation: 'Encourage users to share plant recovery journeys',
      metrics: {
        users: 945,
        shares: 2134,
        newUsers: 423,
        engagement: 89.1
      },
      isActive: false
    }
  ]);

  const [emailInvites] = useState({
    totalSent: 8945,
    opened: 3567,
    clicked: 1234,
    converted: 234
  });

  const toggleCampaign = (id: string) => {
    setSharingCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, isActive: !campaign.isActive } : campaign
    ));
  };

  const toggleMechanic = (id: string) => {
    setViralMechanics(prev => prev.map(mechanic => 
      mechanic.id === id ? { ...mechanic, isActive: !mechanic.isActive } : mechanic
    ));
  };

  const getCampaignTypeIcon = (type: SharingCampaign['type']) => {
    switch (type) {
      case 'identification': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-600" />;
      case 'milestone': return <Star className="w-4 h-4 text-purple-600" />;
      case 'content': return <MessageCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getCampaignTypeColor = (type: SharingCampaign['type']) => {
    switch (type) {
      case 'identification': return 'bg-blue-100 text-blue-800';
      case 'achievement': return 'bg-yellow-100 text-yellow-800';
      case 'milestone': return 'bg-purple-100 text-purple-800';
      case 'content': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Growth Hacking Features</h2>
          <p className="text-gray-600">Viral mechanics and referral systems to accelerate growth</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Share2 className="w-4 h-4 mr-2" />
          Launch Campaign
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{referralMetrics.totalReferrals}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{referralMetrics.conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{referralMetrics.viralCoefficient}</div>
            <div className="text-sm text-gray-600">Viral Coefficient</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              ${(referralMetrics.revenueFromReferrals / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-gray-600">Referral Revenue</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">
              {sharingCampaigns.reduce((sum, c) => sum + c.shares, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Shares</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="referrals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="referrals">Referral Program</TabsTrigger>
          <TabsTrigger value="sharing">Social Sharing</TabsTrigger>
          <TabsTrigger value="viral">Viral Mechanics</TabsTrigger>
          <TabsTrigger value="invites">Email Invites</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Referral Program Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{referralMetrics.totalReferrals}</div>
                      <div className="text-sm text-blue-800">Total Sent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{referralMetrics.successfulReferrals}</div>
                      <div className="text-sm text-green-800">Successful</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Conversion Rate</span>
                      <span>{referralMetrics.conversionRate}%</span>
                    </div>
                    <Progress value={referralMetrics.conversionRate} className="h-3" />
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-lg font-bold text-purple-600 mb-1">Viral Coefficient: {referralMetrics.viralCoefficient}</div>
                    <div className="text-sm text-purple-700">
                      Each user refers {referralMetrics.viralCoefficient} new users on average
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referral Rewards Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Current Rewards Structure</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Friend signs up:</span>
                        <Badge className="bg-blue-100 text-blue-800">+7 days free</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Friend upgrades to premium:</span>
                        <Badge className="bg-green-100 text-green-800">+1 month free</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>5 successful referrals:</span>
                        <Badge className="bg-purple-100 text-purple-800">Free for 6 months</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Quick Actions</h4>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Link
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="w-3 h-3 mr-1" />
                        Send Invite
                      </Button>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-800">
                      💡 <strong>Tip:</strong> Users who refer friends within their first week have 3x higher retention rates
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sharing">
          <div className="space-y-4">
            {sharingCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCampaignTypeIcon(campaign.type)}
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <Badge className={getCampaignTypeColor(campaign.type)}>
                          {campaign.type.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={campaign.isActive ? 'default' : 'outline'}>
                        {campaign.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleCampaign(campaign.id)}
                      >
                        {campaign.isActive ? 'Pause' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">{campaign.shares.toLocaleString()}</div>
                      <div className="text-xs text-blue-800">Shares</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">{campaign.clicks.toLocaleString()}</div>
                      <div className="text-xs text-green-800">Clicks</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-lg font-bold text-purple-600">{campaign.conversions}</div>
                      <div className="text-xs text-purple-800">Conversions</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">{campaign.engagementRate}%</div>
                      <div className="text-xs text-orange-800">Engagement</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Click-through Rate</span>
                      <span>{((campaign.clicks / campaign.shares) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(campaign.clicks / campaign.shares) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="viral">
          <div className="space-y-4">
            {viralMechanics.map((mechanic) => (
              <Card key={mechanic.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                      <p className="text-sm text-gray-600">{mechanic.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={mechanic.isActive ? 'default' : 'outline'}>
                        {mechanic.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleMechanic(mechanic.id)}
                      >
                        {mechanic.isActive ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Implementation:</h4>
                      <p className="text-sm text-gray-700">{mechanic.implementation}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold text-blue-600">
                          {mechanic.metrics.users.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Active Users</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold text-green-600">
                          {mechanic.metrics.shares.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Total Shares</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold text-purple-600">
                          {mechanic.metrics.newUsers.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">New Users</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold text-orange-600">
                          {mechanic.metrics.engagement}%
                        </div>
                        <div className="text-xs text-gray-600">Engagement</div>
                      </div>
                    </div>

                    {mechanic.isActive && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">Performance Impact</span>
                        </div>
                        <div className="text-sm text-green-700 mt-1">
                          Viral coefficient: {(mechanic.metrics.newUsers / mechanic.metrics.users).toFixed(2)} • 
                          Engagement boost: +{mechanic.metrics.engagement}%
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invites">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Invitation System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{emailInvites.totalSent.toLocaleString()}</div>
                      <div className="text-sm text-blue-800">Invites Sent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{emailInvites.converted}</div>
                      <div className="text-sm text-green-800">Conversions</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Open Rate</span>
                        <span>{((emailInvites.opened / emailInvites.totalSent) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(emailInvites.opened / emailInvites.totalSent) * 100} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Click Rate</span>
                        <span>{((emailInvites.clicked / emailInvites.totalSent) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(emailInvites.clicked / emailInvites.totalSent) * 100} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span>{((emailInvites.converted / emailInvites.totalSent) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(emailInvites.converted / emailInvites.totalSent) * 100} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invitation Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Standard Invitation</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      "Hey! I've been using this amazing plant identification app called Orkhidly. 
                      It's helped me identify and care for all my plants. You should check it out!"
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-100 text-green-800">42% conversion rate</Badge>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Personal Success Story</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      "I just saved my dying orchid using Orkhidly! The app identified exactly what was wrong 
                      and gave me step-by-step care instructions. My plant is thriving now!"
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-100 text-blue-800">38% conversion rate</Badge>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrowthHackingFeatures;
