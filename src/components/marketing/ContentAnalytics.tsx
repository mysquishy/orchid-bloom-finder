
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Eye, 
  Share2, 
  TrendingUp, 
  Search, 
  Calendar,
  Users,
  Target,
  ExternalLink
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: Date;
  views: number;
  shares: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversions: number;
  seoScore: number;
}

const ContentAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [blogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Complete Guide to Orchid Watering',
      slug: 'complete-guide-orchid-watering',
      category: 'care-guide',
      publishedAt: new Date('2024-01-15'),
      views: 12540,
      shares: 89,
      avgTimeOnPage: 4.2,
      bounceRate: 25.8,
      conversions: 45,
      seoScore: 92
    },
    {
      id: '2',
      title: '10 Best Orchid Species for Beginners',
      slug: 'best-orchid-species-beginners',
      category: 'species-guide',
      publishedAt: new Date('2024-01-20'),
      views: 8920,
      shares: 156,
      avgTimeOnPage: 3.8,
      bounceRate: 32.1,
      conversions: 67,
      seoScore: 88
    },
    {
      id: '3',
      title: 'Understanding Orchid Light Requirements',
      slug: 'orchid-light-requirements',
      category: 'care-guide',
      publishedAt: new Date('2024-01-25'),
      views: 6780,
      shares: 78,
      avgTimeOnPage: 5.1,
      bounceRate: 28.5,
      conversions: 32,
      seoScore: 85
    },
    {
      id: '4',
      title: 'Troubleshooting Common Orchid Problems',
      slug: 'troubleshooting-orchid-problems',
      category: 'troubleshooting',
      publishedAt: new Date('2024-02-01'),
      views: 15230,
      shares: 234,
      avgTimeOnPage: 6.2,
      bounceRate: 18.9,
      conversions: 89,
      seoScore: 95
    },
    {
      id: '5',
      title: 'Seasonal Orchid Care Calendar',
      slug: 'seasonal-orchid-care-calendar',
      category: 'seasonal',
      publishedAt: new Date('2024-02-05'),
      views: 4560,
      shares: 45,
      avgTimeOnPage: 3.2,
      bounceRate: 35.7,
      conversions: 23,
      seoScore: 78
    }
  ]);

  const categories = ['all', 'care-guide', 'species-guide', 'troubleshooting', 'seasonal'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const totalShares = blogPosts.reduce((sum, post) => sum + post.shares, 0);
  const totalConversions = blogPosts.reduce((sum, post) => sum + post.conversions, 0);
  const avgTimeOnPage = blogPosts.reduce((sum, post) => sum + post.avgTimeOnPage, 0) / blogPosts.length;

  const getSeoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'care-guide': return 'bg-green-100 text-green-800';
      case 'species-guide': return 'bg-blue-100 text-blue-800';
      case 'troubleshooting': return 'bg-red-100 text-red-800';
      case 'seasonal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Analytics</h2>
          <p className="text-gray-600">Track performance of your blog posts and SEO content</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Social Shares</p>
                <p className="text-2xl font-bold text-purple-600">{totalShares}</p>
              </div>
              <Share2 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-green-600">{totalConversions}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Time</p>
                <p className="text-2xl font-bold text-orange-600">{avgTimeOnPage.toFixed(1)}m</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-lg">{post.title}</h3>
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category.replace('-', ' ')}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.publishedAt.toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {post.views.toLocaleString()} views
                      </div>
                      <div className="flex items-center">
                        <Share2 className="w-3 h-3 mr-1" />
                        {post.shares} shares
                      </div>
                      <div className="flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        {post.conversions} conversions
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Avg. Time: </span>
                        <span className="font-medium">{post.avgTimeOnPage.toFixed(1)}m</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Bounce Rate: </span>
                        <span className="font-medium">{post.bounceRate.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Conv. Rate: </span>
                        <span className="font-medium">
                          {((post.conversions / post.views) * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">SEO Score: </span>
                        <span className={`font-medium ${getSeoScoreColor(post.seoScore)}`}>
                          {post.seoScore}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No posts found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Performing Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Viewed Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blogPosts
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((post, index) => (
                  <div key={post.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <span className="text-sm truncate">{post.title}</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {post.views.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Converting Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blogPosts
                .sort((a, b) => (b.conversions / b.views) - (a.conversions / a.views))
                .slice(0, 5)
                .map((post, index) => (
                  <div key={post.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <span className="text-sm truncate">{post.title}</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {((post.conversions / post.views) * 100).toFixed(2)}%
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentAnalytics;
