
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Instagram,
  Youtube,
  MapPin,
  Mic,
  Eye,
  Share2,
  TrendingUp,
  Camera,
  Play
} from 'lucide-react';

interface PlatformMetrics {
  platform: string;
  followers: number;
  engagement: number;
  monthlyReach: number;
  topContent: string;
  growthRate: number;
}

interface VideoContent {
  id: string;
  title: string;
  views: number;
  duration: string;
  engagement: number;
  publishDate: string;
  status: 'published' | 'scheduled' | 'draft';
}

interface LocalListings {
  platform: string;
  status: 'verified' | 'pending' | 'needs_attention';
  rating: number;
  reviews: number;
  visibility: number;
}

const OrganicDiscovery: React.FC = () => {
  const [platformMetrics] = useState<PlatformMetrics[]>([
    {
      platform: 'Pinterest',
      followers: 25600,
      engagement: 6.8,
      monthlyReach: 145000,
      topContent: 'Orchid care infographics',
      growthRate: 18.5
    },
    {
      platform: 'Instagram',
      followers: 18400,
      engagement: 4.2,
      monthlyReach: 89000,
      topContent: 'Plant progress stories',
      growthRate: 12.3
    },
    {
      platform: 'YouTube',
      followers: 8900,
      engagement: 8.7,
      monthlyReach: 67000,
      topContent: 'Care tutorials',
      growthRate: 22.1
    },
    {
      platform: 'TikTok',
      followers: 12300,
      engagement: 12.4,
      monthlyReach: 234000,
      topContent: 'Quick plant tips',
      growthRate: 45.2
    }
  ]);

  const [videoContent] = useState<VideoContent[]>([
    {
      id: '1',
      title: 'Complete Orchid Repotting Guide',
      views: 23400,
      duration: '8:45',
      engagement: 9.2,
      publishDate: '2024-06-10',
      status: 'published'
    },
    {
      id: '2',
      title: 'Identifying Orchid Root Problems',
      views: 18700,
      duration: '6:30',
      engagement: 8.8,
      publishDate: '2024-06-08',
      status: 'published'
    },
    {
      id: '3',
      title: 'Summer Orchid Care Essentials',
      views: 0,
      duration: '10:15',
      engagement: 0,
      publishDate: '2024-06-16',
      status: 'scheduled'
    }
  ]);

  const [localListings] = useState<LocalListings[]>([
    {
      platform: 'Google My Business',
      status: 'verified',
      rating: 4.8,
      reviews: 342,
      visibility: 89
    },
    {
      platform: 'Yelp',
      status: 'verified',
      rating: 4.6,
      reviews: 156,
      visibility: 67
    },
    {
      platform: 'Apple Maps',
      status: 'pending',
      rating: 0,
      reviews: 0,
      visibility: 12
    }
  ]);

  const [storyTemplates] = useState([
    {
      id: '1',
      name: 'Before & After Progress',
      type: 'transformation',
      usage: 89,
      engagement: 7.2
    },
    {
      id: '2',
      name: 'Daily Care Routine',
      type: 'educational',
      usage: 67,
      engagement: 5.8
    },
    {
      id: '3',
      name: 'Plant Problem Solutions',
      type: 'problem_solving',
      usage: 92,
      engagement: 8.4
    }
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />;
      case 'pinterest': return <Camera className="w-4 h-4 text-red-600" />;
      case 'tiktok': return <Play className="w-4 h-4 text-black" />;
      default: return <Share2 className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: LocalListings['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'needs_attention': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Organic Discovery Optimization</h3>
          <p className="text-gray-600">Multi-platform content strategy for maximum organic reach</p>
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <Eye className="w-4 h-4 mr-2" />
          Optimize Discovery
        </Button>
      </div>

      {/* Platform Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformMetrics.map((platform) => (
          <Card key={platform.platform}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(platform.platform)}
                  <span className="font-medium">{platform.platform}</span>
                </div>
                <Badge variant={platform.growthRate > 20 ? "default" : "secondary"}>
                  +{platform.growthRate}%
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Followers</span>
                  <span className="font-medium">{(platform.followers / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Engagement</span>
                  <span className="font-medium">{platform.engagement}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Reach</span>
                  <span className="font-medium">{(platform.monthlyReach / 1000).toFixed(0)}K</span>
                </div>
              </div>

              <div className="mt-3 p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-600">Top Content:</div>
                <div className="text-sm font-medium">{platform.topContent}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* YouTube Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              YouTube Content Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videoContent.map((video) => (
                <div key={video.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{video.title}</div>
                      <div className="text-sm text-gray-600">
                        {video.duration} • {new Date(video.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant={video.status === 'published' ? "default" : "secondary"}>
                      {video.status}
                    </Badge>
                  </div>

                  {video.status === 'published' ? (
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="font-bold text-red-600">{video.views.toLocaleString()}</div>
                        <div className="text-xs text-red-800">Views</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-bold text-blue-600">{video.engagement}%</div>
                        <div className="text-xs text-blue-800">Engagement</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-50 rounded mb-3">
                      <div className="text-sm text-yellow-800">
                        Scheduled for {new Date(video.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  <Button size="sm" className="w-full">
                    {video.status === 'published' ? 'View Analytics' : 
                     video.status === 'scheduled' ? 'Edit Schedule' : 'Publish'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instagram Story Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-500" />
              Instagram Story Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storyTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-gray-600 capitalize">{template.type.replace('_', ' ')}</div>
                    </div>
                    <Badge variant="outline">{template.usage} uses</Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Engagement rate</span>
                      <span>{template.engagement}%</span>
                    </div>
                    <Progress value={template.engagement * 10} className="h-2" />
                  </div>

                  <Button size="sm" className="w-full">
                    Use Template
                  </Button>
                </div>
              ))}

              <Button className="w-full" variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Create New Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local SEO & Discovery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Local Discovery Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {localListings.map((listing) => (
                <div key={listing.platform} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{listing.platform}</div>
                      <div className="text-sm text-gray-600">Business listing</div>
                    </div>
                    <Badge className={getStatusColor(listing.status)}>
                      {listing.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {listing.status === 'verified' ? (
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="font-bold text-yellow-600">{listing.rating}</div>
                        <div className="text-xs text-yellow-800">Rating</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-bold text-blue-600">{listing.reviews}</div>
                        <div className="text-xs text-blue-800">Reviews</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-bold text-green-600">{listing.visibility}%</div>
                        <div className="text-xs text-green-800">Visibility</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-50 rounded mb-3">
                      <div className="text-sm text-yellow-800">
                        {listing.status === 'pending' ? 'Verification in progress' : 'Requires attention'}
                      </div>
                    </div>
                  )}

                  <Button size="sm" className="w-full">
                    {listing.status === 'verified' ? 'Manage Listing' : 'Complete Setup'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Voice Search Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-green-500" />
              Voice Search Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2">Optimized Voice Queries</h4>
                <div className="space-y-2">
                  {[
                    'How do I care for my orchid?',
                    'What does an unhealthy orchid look like?',
                    'When should I water my orchid?',
                    'Where can I buy orchid fertilizer near me?'
                  ].map((query) => (
                    <div key={query} className="p-2 bg-white rounded text-sm">
                      "{query}"
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-gray-700">85%</div>
                  <div className="text-xs text-gray-600">Voice search ready</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-gray-700">45</div>
                  <div className="text-xs text-gray-600">Featured snippets</div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Mic className="w-4 h-4 mr-2" />
                Optimize Voice Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pinterest Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-red-600" />
            Pinterest Content Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Top Performing Pins</h4>
              <div className="space-y-2">
                {[
                  { title: 'Orchid Care Cheat Sheet', saves: 2340, clicks: 890 },
                  { title: 'Watering Guide Infographic', saves: 1890, clicks: 670 },
                  { title: 'Problem Diagnosis Chart', saves: 1560, clicks: 420 }
                ].map((pin) => (
                  <div key={pin.title} className="p-2 bg-red-50 rounded">
                    <div className="font-medium text-sm">{pin.title}</div>
                    <div className="text-xs text-gray-600">
                      {pin.saves} saves • {pin.clicks} clicks
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Seasonal Boards</h4>
              <div className="space-y-2">
                {[
                  'Spring Orchid Care',
                  'Summer Growing Tips',
                  'Fall Preparation Guide',
                  'Winter Protection Methods'
                ].map((board) => (
                  <div key={board} className="p-2 bg-blue-50 rounded text-sm">
                    {board}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Pin Templates</h4>
              <div className="space-y-2">
                {[
                  'Before/After Care Results',
                  'Step-by-Step Tutorials',
                  'Problem & Solution Guides',
                  'Plant Care Checklists'
                ].map((template) => (
                  <div key={template} className="p-2 bg-purple-50 rounded text-sm">
                    {template}
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

export default OrganicDiscovery;
