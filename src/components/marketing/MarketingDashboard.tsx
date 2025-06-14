import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Mail, 
  Share2, 
  DollarSign, 
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { marketingAnalytics } from '@/utils/marketingAnalytics';
import CampaignManager from './CampaignManager';
import ABTestingManager from './ABTestingManager';
import UserSegmentation from './UserSegmentation';
import ContentAnalytics from './ContentAnalytics';

interface MarketingMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  emailOpenRate: number;
  socialShares: number;
  conversions: number;
  revenue: number;
  retentionRate: number;
  churnRate: number;
}

const MarketingDashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<MarketingMetrics>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    emailOpenRate: 0,
    socialShares: 0,
    conversions: 0,
    revenue: 0,
    retentionRate: 0,
    churnRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMarketingMetrics();
    }
  }, [user]);

  const loadMarketingMetrics = async () => {
    try {
      setLoading(true);
      
      // Load campaigns
      const campaigns = await marketingAnalytics.getCampaigns();
      
      // Mock metrics for demonstration
      const mockMetrics: MarketingMetrics = {
        totalCampaigns: campaigns.length,
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
        emailOpenRate: 24.5,
        socialShares: 1284,
        conversions: 89,
        revenue: 5670,
        retentionRate: 87.5,
        churnRate: 12.5
      };

      setMetrics(mockMetrics);
    } catch (error) {
      console.error('Failed to load marketing metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Analytics</h1>
          <p className="text-gray-600">Track campaigns, analyze user behavior, and optimize growth</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <Zap className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-blue-900">{metrics.totalCampaigns}</p>
                <p className="text-xs text-blue-700">{metrics.activeCampaigns} active</p>
              </div>
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Email Open Rate</p>
                <p className="text-2xl font-bold text-green-900">{metrics.emailOpenRate}%</p>
                <p className="text-xs text-green-700">+2.3% vs last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Social Shares</p>
                <p className="text-2xl font-bold text-purple-900">{metrics.socialShares.toLocaleString()}</p>
                <p className="text-xs text-purple-700">+15% this week</p>
              </div>
              <Share2 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Revenue</p>
                <p className="text-2xl font-bold text-orange-900">${metrics.revenue.toLocaleString()}</p>
                <p className="text-xs text-orange-700">{metrics.conversions} conversions</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Retention Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">30-day retention rate</span>
                  <Badge variant="default" className="bg-green-500">
                    {metrics.retentionRate}%
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.retentionRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Churn rate</span>
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    {metrics.churnRate}%
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.churnRate}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { stage: 'Visitors', count: 10000, rate: 100 },
                { stage: 'Signups', count: 1200, rate: 12 },
                { stage: 'First ID', count: 800, rate: 8 },
                { stage: 'Subscription', count: 89, rate: 0.89 }
              ].map((stage, index) => (
                <div key={stage.stage} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{stage.count.toLocaleString()}</span>
                    <Badge variant="outline" className="text-xs">
                      {stage.rate}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Tools Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="testing">A/B Testing</TabsTrigger>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
          <TabsTrigger value="content">Content Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <CampaignManager />
        </TabsContent>

        <TabsContent value="testing">
          <ABTestingManager />
        </TabsContent>

        <TabsContent value="segments">
          <UserSegmentation />
        </TabsContent>

        <TabsContent value="content">
          <ContentAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingDashboard;
