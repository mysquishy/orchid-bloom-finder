
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  Search,
  Users,
  Eye,
  Clock,
  Target,
  Activity
} from 'lucide-react';

interface RankingData {
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  searchVolume: number;
  traffic: number;
  trend: 'up' | 'down' | 'stable';
}

interface ContentPerformance {
  id: string;
  title: string;
  type: 'blog' | 'guide' | 'video' | 'tool';
  views: number;
  engagement: number;
  conversions: number;
  avgTimeOnPage: number;
  bounceRate: number;
  socialShares: number;
}

interface AcquisitionChannel {
  channel: string;
  users: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  goalCompletions: number;
  percentage: number;
}

interface CompetitorInsight {
  competitor: string;
  organicKeywords: number;
  estimatedTraffic: number;
  topContent: string;
  contentGap: string;
  opportunity: number;
}

const ContentAnalytics: React.FC = () => {
  const [rankingData] = useState<RankingData[]>([
    {
      keyword: 'orchid care guide',
      currentPosition: 3,
      previousPosition: 5,
      searchVolume: 8900,
      traffic: 2340,
      trend: 'up'
    },
    {
      keyword: 'how to identify orchids',
      currentPosition: 8,
      previousPosition: 12,
      searchVolume: 3400,
      traffic: 890,
      trend: 'up'
    },
    {
      keyword: 'orchid watering tips',
      currentPosition: 6,
      previousPosition: 6,
      searchVolume: 5600,
      traffic: 1560,
      trend: 'stable'
    },
    {
      keyword: 'orchid fertilizer guide',
      currentPosition: 15,
      previousPosition: 12,
      searchVolume: 2800,
      traffic: 420,
      trend: 'down'
    }
  ]);

  const [contentPerformance] = useState<ContentPerformance[]>([
    {
      id: '1',
      title: 'Complete Orchid Care Guide for Beginners',
      type: 'guide',
      views: 15600,
      engagement: 8.7,
      conversions: 12.4,
      avgTimeOnPage: 380,
      bounceRate: 28.5,
      socialShares: 234
    },
    {
      id: '2',
      title: 'How to Repot Your Orchid (Video Tutorial)',
      type: 'video',
      views: 12400,
      engagement: 9.2,
      conversions: 8.9,
      avgTimeOnPage: 420,
      bounceRate: 22.1,
      socialShares: 189
    },
    {
      id: '3',
      title: 'Orchid Health Calculator Tool',
      type: 'tool',
      views: 8900,
      engagement: 7.8,
      conversions: 15.6,
      avgTimeOnPage: 290,
      bounceRate: 35.2,
      socialShares: 156
    }
  ]);

  const [acquisitionChannels] = useState<AcquisitionChannel[]>([
    {
      channel: 'Organic Search',
      users: 18650,
      sessions: 24300,
      bounceRate: 32.4,
      avgSessionDuration: 4.5,
      goalCompletions: 1890,
      percentage: 68.2
    },
    {
      channel: 'Social Media',
      users: 4560,
      sessions: 6780,
      bounceRate: 45.8,
      avgSessionDuration: 2.8,
      goalCompletions: 456,
      percentage: 16.7
    },
    {
      channel: 'Direct',
      users: 2340,
      sessions: 3200,
      bounceRate: 28.9,
      avgSessionDuration: 5.2,
      goalCompletions: 289,
      percentage: 8.6
    },
    {
      channel: 'Referral',
      users: 1890,
      sessions: 2450,
      bounceRate: 38.7,
      avgSessionDuration: 3.8,
      goalCompletions: 234,
      percentage: 6.5
    }
  ]);

  const [competitorInsights] = useState<CompetitorInsight[]>([
    {
      competitor: 'Orchid Care Central',
      organicKeywords: 2340,
      estimatedTraffic: 45600,
      topContent: 'Disease identification guides',
      contentGap: 'Advanced propagation techniques',
      opportunity: 8.7
    },
    {
      competitor: 'Plant Parent Pro',
      organicKeywords: 1890,
      estimatedTraffic: 32400,
      topContent: 'Beginner care tutorials',
      contentGap: 'Seasonal care variations',
      opportunity: 7.2
    },
    {
      competitor: 'Houseplant Hub',
      organicKeywords: 1560,
      estimatedTraffic: 28900,
      topContent: 'Problem diagnosis tools',
      contentGap: 'Expert interview content',
      opportunity: 6.8
    }
  ]);

  const getTrendIcon = (trend: RankingData['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getContentTypeIcon = (type: ContentPerformance['type']) => {
    switch (type) {
      case 'blog': return <BarChart3 className="w-4 h-4 text-blue-500" />;
      case 'guide': return <Target className="w-4 h-4 text-green-500" />;
      case 'video': return <Eye className="w-4 h-4 text-red-500" />;
      case 'tool': return <Activity className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Content Analytics & Optimization</h3>
          <p className="text-gray-600">Performance tracking and competitive analysis</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">45.6K</div>
            <div className="text-sm text-gray-600">Monthly Organic Traffic</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+23% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,284</div>
            <div className="text-sm text-gray-600">Ranking Keywords</div>
            <div className="text-xs text-blue-700 mt-2">456 in top 10</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">6.8m</div>
            <div className="text-sm text-gray-600">Avg Time on Page</div>
            <div className="text-xs text-purple-700 mt-2">+1.2m improvement</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">12.4%</div>
            <div className="text-sm text-gray-600">Content Conversion</div>
            <div className="text-xs text-orange-700 mt-2">Above industry avg</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keyword Rankings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-500" />
              Keyword Ranking Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rankingData.map((ranking) => (
                <div key={ranking.keyword} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{ranking.keyword}</div>
                      <div className="text-sm text-gray-600">
                        {ranking.searchVolume.toLocaleString()} monthly searches
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(ranking.trend)}
                      <Badge variant={ranking.currentPosition <= 10 ? "default" : "secondary"}>
                        #{ranking.currentPosition}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">#{ranking.previousPosition}</div>
                      <div className="text-xs text-blue-800">Previous</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{ranking.traffic}</div>
                      <div className="text-xs text-green-800">Traffic</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600">
                        {ranking.currentPosition < ranking.previousPosition ? '+' : ''}
                        {ranking.previousPosition - ranking.currentPosition}
                      </div>
                      <div className="text-xs text-purple-800">Change</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        ranking.currentPosition <= 3 ? 'bg-green-500' :
                        ranking.currentPosition <= 10 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(10, 100 - ranking.currentPosition * 3)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              Top Performing Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentPerformance.map((content) => (
                <div key={content.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(content.type)}
                      <div>
                        <div className="font-medium">{content.title}</div>
                        <div className="text-sm text-gray-600 capitalize">{content.type}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{content.views.toLocaleString()} views</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{content.engagement}%</div>
                      <div className="text-xs text-green-800">Engagement</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{content.conversions}%</div>
                      <div className="text-xs text-blue-800">Conversions</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-1 bg-gray-50 rounded">
                      <div className="font-medium">{Math.round(content.avgTimeOnPage / 60)}m</div>
                      <div className="text-gray-600">Avg Time</div>
                    </div>
                    <div className="text-center p-1 bg-gray-50 rounded">
                      <div className="font-medium">{content.bounceRate}%</div>
                      <div className="text-gray-600">Bounce</div>
                    </div>
                    <div className="text-center p-1 bg-gray-50 rounded">
                      <div className="font-medium">{content.socialShares}</div>
                      <div className="text-gray-600">Shares</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Acquisition Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              User Acquisition Channels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {acquisitionChannels.map((channel) => (
                <div key={channel.channel} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{channel.channel}</div>
                      <div className="text-sm text-gray-600">
                        {channel.users.toLocaleString()} users • {channel.sessions.toLocaleString()} sessions
                      </div>
                    </div>
                    <Badge variant="outline">{channel.percentage}%</Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Traffic share</span>
                      <span>{channel.percentage}%</span>
                    </div>
                    <Progress value={channel.percentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{channel.bounceRate}%</div>
                      <div className="text-xs text-blue-800">Bounce Rate</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{channel.avgSessionDuration}m</div>
                      <div className="text-xs text-green-800">Avg Session</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600">{channel.goalCompletions}</div>
                      <div className="text-xs text-purple-800">Conversions</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competitor Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Competitor Content Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitorInsights.map((competitor) => (
                <div key={competitor.competitor} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{competitor.competitor}</div>
                      <div className="text-sm text-gray-600">
                        {competitor.organicKeywords.toLocaleString()} keywords
                      </div>
                    </div>
                    <Badge 
                      variant={competitor.opportunity > 8 ? "default" : "secondary"}
                      className={competitor.opportunity > 8 ? "bg-orange-500" : ""}
                    >
                      {competitor.opportunity}/10 opportunity
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="font-bold text-orange-600">{(competitor.estimatedTraffic / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-orange-800">Est. Traffic</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{competitor.organicKeywords}</div>
                      <div className="text-xs text-blue-800">Keywords</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 bg-green-50 rounded">
                      <div className="text-xs text-green-800 font-medium">Top Content:</div>
                      <div className="text-sm">{competitor.topContent}</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded">
                      <div className="text-xs text-red-800 font-medium">Content Gap:</div>
                      <div className="text-sm">{competitor.contentGap}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Growth Forecasting & Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Traffic Projections</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded">
                  <div className="font-bold text-green-600">68K</div>
                  <div className="text-sm text-green-800">Projected monthly traffic (3 months)</div>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <div className="font-bold text-blue-600">1,850</div>
                  <div className="text-sm text-blue-800">Target keywords in top 10</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="font-bold text-purple-600">18.5%</div>
                  <div className="text-sm text-purple-800">Expected conversion improvement</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Optimization Priorities</h4>
              <div className="space-y-2">
                {[
                  { task: 'Update seasonal content', priority: 'High', impact: '15%' },
                  { task: 'Improve page speed', priority: 'High', impact: '12%' },
                  { task: 'Add video content', priority: 'Medium', impact: '8%' },
                  { task: 'Enhance mobile UX', priority: 'Medium', impact: '6%' }
                ].map((task) => (
                  <div key={task.task} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{task.task}</div>
                      <div className="text-xs text-gray-600">Expected impact: {task.impact}</div>
                    </div>
                    <Badge variant={task.priority === 'High' ? "default" : "secondary"}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Performance Goals</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Organic traffic growth</span>
                    <span>65% of 100K goal</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Keyword ranking improvement</span>
                    <span>78% of target</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Content engagement rate</span>
                    <span>82% of benchmark</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentAnalytics;
