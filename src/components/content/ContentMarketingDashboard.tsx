
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  TrendingUp,
  FileText,
  Share2,
  Link,
  BarChart3,
  Target,
  Calendar,
  Youtube,
  Instagram
} from 'lucide-react';
import SEOContentStrategy from './SEOContentStrategy';
import ContentAutomation from './ContentAutomation';
import OrganicDiscovery from './OrganicDiscovery';
import LinkBuildingStrategy from './LinkBuildingStrategy';
import ContentAnalytics from './ContentAnalytics';

interface ContentMetrics {
  organicTraffic: number;
  keywordRankings: number;
  contentPieces: number;
  backlinks: number;
  socialShares: number;
  emailSubscribers: number;
  videoViews: number;
  blogEngagement: number;
}

const ContentMarketingDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<ContentMetrics>({
    organicTraffic: 45600,
    keywordRankings: 1284,
    contentPieces: 156,
    backlinks: 892,
    socialShares: 5670,
    emailSubscribers: 12400,
    videoViews: 89000,
    blogEngagement: 6.8
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading content metrics
    const loadMetrics = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    loadMetrics();
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-900">Content Marketing</h1>
          <p className="text-gray-600">Organic growth and SEO optimization for Orkhidly</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <Target className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Organic Traffic</p>
                <p className="text-2xl font-bold text-green-900">{metrics.organicTraffic.toLocaleString()}</p>
                <p className="text-xs text-green-700">+23% this month</p>
              </div>
              <Search className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Keyword Rankings</p>
                <p className="text-2xl font-bold text-blue-900">{metrics.keywordRankings}</p>
                <p className="text-xs text-blue-700">Top 10 positions</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Content Pieces</p>
                <p className="text-2xl font-bold text-purple-900">{metrics.contentPieces}</p>
                <p className="text-xs text-purple-700">+12 this week</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Backlinks</p>
                <p className="text-2xl font-bold text-orange-900">{metrics.backlinks}</p>
                <p className="text-xs text-orange-700">+34 this month</p>
              </div>
              <Link className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social & Email Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{metrics.socialShares.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Social Shares</div>
            <div className="flex items-center justify-center mt-2">
              <Share2 className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-xs text-blue-600">+18% engagement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{metrics.emailSubscribers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Email Subscribers</div>
            <div className="flex items-center justify-center mt-2">
              <Calendar className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+156 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{Math.round(metrics.videoViews / 1000)}K</div>
            <div className="text-sm text-gray-600">Video Views</div>
            <div className="flex items-center justify-center mt-2">
              <Youtube className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-xs text-red-600">+45% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{metrics.blogEngagement}</div>
            <div className="text-sm text-gray-600">Avg Time on Page</div>
            <div className="flex items-center justify-center mt-2">
              <BarChart3 className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-xs text-purple-600">+2.3 min</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Marketing Tabs */}
      <Tabs defaultValue="seo" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            SEO Strategy
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="discovery" className="flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Discovery
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Link Building
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seo">
          <SEOContentStrategy />
        </TabsContent>

        <TabsContent value="automation">
          <ContentAutomation />
        </TabsContent>

        <TabsContent value="discovery">
          <OrganicDiscovery />
        </TabsContent>

        <TabsContent value="links">
          <LinkBuildingStrategy />
        </TabsContent>

        <TabsContent value="analytics">
          <ContentAnalytics />
        </TabsContent>
      </Tabs>

      {/* Quick Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Top Performing Keywords</h4>
              <div className="space-y-2">
                {[
                  { keyword: 'orchid care guide', position: 3, traffic: 2340 },
                  { keyword: 'orchid identification app', position: 5, traffic: 1890 },
                  { keyword: 'how to water orchids', position: 2, traffic: 3200 }
                ].map((kw) => (
                  <div key={kw.keyword} className="flex justify-between text-sm">
                    <span className="truncate">{kw.keyword}</span>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">#{kw.position}</Badge>
                      <span className="text-gray-500">{kw.traffic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Content Performance</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Blog engagement rate</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Email open rate</span>
                    <span>24.5%</span>
                  </div>
                  <Progress value={24.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Video completion rate</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Growth Targets</h4>
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded text-center">
                  <div className="font-bold text-green-600">50K</div>
                  <div className="text-xs text-green-800">Monthly organic traffic goal</div>
                </div>
                <div className="p-2 bg-blue-50 rounded text-center">
                  <div className="font-bold text-blue-600">1500</div>
                  <div className="text-xs text-blue-800">Target keyword rankings</div>
                </div>
                <div className="p-2 bg-purple-50 rounded text-center">
                  <div className="font-bold text-purple-600">15K</div>
                  <div className="text-xs text-purple-800">Email subscriber goal</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentMarketingDashboard;
