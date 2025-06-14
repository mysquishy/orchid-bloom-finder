
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Eye, 
  Share2, 
  Clock, 
  TrendingUp,
  ThumbsUp,
  MessageSquare,
  BarChart3
} from 'lucide-react';

interface ContentMetrics {
  id: string;
  title: string;
  type: 'blog' | 'guide' | 'video' | 'infographic';
  views: number;
  shares: number;
  likes: number;
  comments: number;
  timeOnPage: number;
  bounceRate: number;
  publishedAt: string;
}

const ContentAnalytics: React.FC = () => {
  const [contentMetrics] = useState<ContentMetrics[]>([
    {
      id: '1',
      title: 'Complete Guide to Orchid Repotting',
      type: 'guide',
      views: 15420,
      shares: 234,
      likes: 189,
      comments: 42,
      timeOnPage: 340,
      bounceRate: 25,
      publishedAt: '2024-06-01'
    },
    {
      id: '2',
      title: 'Why Your Orchid Leaves Are Turning Yellow',
      type: 'blog',
      views: 8950,
      shares: 156,
      likes: 124,
      comments: 28,
      timeOnPage: 280,
      bounceRate: 35,
      publishedAt: '2024-05-28'
    },
    {
      id: '3',
      title: 'Orchid Care Calendar: Monthly Tasks',
      type: 'infographic',
      views: 6730,
      shares: 89,
      likes: 67,
      comments: 15,
      timeOnPage: 120,
      bounceRate: 45,
      publishedAt: '2024-05-25'
    },
    {
      id: '4',
      title: 'Identifying Common Orchid Diseases',
      type: 'video',
      views: 12340,
      shares: 198,
      likes: 156,
      comments: 34,
      timeOnPage: 450,
      bounceRate: 20,
      publishedAt: '2024-05-20'
    }
  ]);

  const getContentTypeIcon = (type: ContentMetrics['type']) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4" />;
      case 'guide': return <FileText className="w-4 h-4" />;
      case 'video': return <Eye className="w-4 h-4" />;
      case 'infographic': return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getContentTypeColor = (type: ContentMetrics['type']) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800';
      case 'guide': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'infographic': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const totalViews = contentMetrics.reduce((sum, content) => sum + content.views, 0);
  const totalShares = contentMetrics.reduce((sum, content) => sum + content.shares, 0);
  const averageTimeOnPage = contentMetrics.reduce((sum, content) => sum + content.timeOnPage, 0) / contentMetrics.length;
  const averageBounceRate = contentMetrics.reduce((sum, content) => sum + content.bounceRate, 0) / contentMetrics.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Analytics</h2>
          <p className="text-gray-600">Track performance of your content marketing efforts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Shares</p>
                <p className="text-2xl font-bold text-green-600">{totalShares.toLocaleString()}</p>
                <p className="text-xs text-green-600">+8% this month</p>
              </div>
              <Share2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Time on Page</p>
                <p className="text-2xl font-bold text-purple-600">{formatDuration(Math.round(averageTimeOnPage))}</p>
                <p className="text-xs text-green-600">+5% this month</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-orange-600">{averageBounceRate.toFixed(1)}%</p>
                <p className="text-xs text-red-600">-3% this month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentMetrics
              .sort((a, b) => b.views - a.views)
              .map((content) => (
                <div key={content.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getContentTypeIcon(content.type)}
                        <h3 className="font-semibold">{content.title}</h3>
                        <Badge className={getContentTypeColor(content.type)}>
                          {content.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Views:</span>
                          <div className="font-medium">{content.views.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Shares:</span>
                          <div className="font-medium">{content.shares}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Likes:</span>
                          <div className="font-medium">{content.likes}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Comments:</span>
                          <div className="font-medium">{content.comments}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Time on Page:</span>
                          <div className="font-medium">{formatDuration(content.timeOnPage)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Bounce Rate:</span>
                          <div className="font-medium">{content.bounceRate}%</div>
                        </div>
                      </div>

                      {/* Engagement Progress */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Engagement Score</span>
                          <span className="text-sm font-medium">
                            {Math.round((content.likes + content.comments + content.shares) / content.views * 1000)}‰
                          </span>
                        </div>
                        <Progress 
                          value={(content.likes + content.comments + content.shares) / content.views * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Content Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['guide', 'video', 'blog', 'infographic'].map((type) => {
                const typeContent = contentMetrics.filter(c => c.type === type);
                const totalTypeViews = typeContent.reduce((sum, c) => sum + c.views, 0);
                const avgEngagement = typeContent.length > 0 
                  ? typeContent.reduce((sum, c) => sum + (c.likes + c.comments + c.shares), 0) / typeContent.length 
                  : 0;

                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(type as ContentMetrics['type'])}
                      <span className="font-medium capitalize">{type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{totalTypeViews.toLocaleString()} views</div>
                      <div className="text-sm text-gray-500">{avgEngagement.toFixed(0)} avg engagement</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Likes</span>
                </div>
                <span className="font-medium text-blue-600">
                  {contentMetrics.reduce((sum, c) => sum + c.likes, 0)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Comments</span>
                </div>
                <span className="font-medium text-green-600">
                  {contentMetrics.reduce((sum, c) => sum + c.comments, 0)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Shares</span>
                </div>
                <span className="font-medium text-purple-600">
                  {contentMetrics.reduce((sum, c) => sum + c.shares, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentAnalytics;
