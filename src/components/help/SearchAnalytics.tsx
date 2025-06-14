
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Search, Users, Eye } from 'lucide-react';

interface SearchAnalyticsData {
  topSearches: { query: string; count: number; successRate: number }[];
  contentGaps: { query: string; attempts: number }[];
  popularArticles: { title: string; views: number; trend: 'up' | 'down' | 'stable' }[];
  searchMetrics: {
    totalSearches: number;
    successRate: number;
    avgResultsPerSearch: number;
    noResultsRate: number;
  };
}

const SearchAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<SearchAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true);
      
      // Mock data - in real app this would come from your analytics service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData({
        topSearches: [
          { query: 'orchid care', count: 1250, successRate: 95 },
          { query: 'watering', count: 890, successRate: 92 },
          { query: 'identification', count: 765, successRate: 88 },
          { query: 'camera problems', count: 654, successRate: 85 },
          { query: 'light requirements', count: 543, successRate: 90 }
        ],
        contentGaps: [
          { query: 'orchid diseases pictures', attempts: 45 },
          { query: 'winter care', attempts: 38 },
          { query: 'repotting schedule', attempts: 32 },
          { query: 'fertilizer types', attempts: 28 }
        ],
        popularArticles: [
          { title: 'Welcome to Orkhidly', views: 2340, trend: 'up' },
          { title: 'Orchid Care Basics', views: 1890, trend: 'up' },
          { title: 'Watering Guide', views: 1654, trend: 'stable' },
          { title: 'Common Problems', views: 1432, trend: 'down' },
          { title: 'First Identification', views: 1290, trend: 'up' }
        ],
        searchMetrics: {
          totalSearches: 8750,
          successRate: 87.5,
          avgResultsPerSearch: 4.2,
          noResultsRate: 12.5
        }
      });
      
      setIsLoading(false);
    };

    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!analyticsData) return null;

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Searches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.searchMetrics.totalSearches.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.searchMetrics.successRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Results</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.searchMetrics.avgResultsPerSearch}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">No Results</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.searchMetrics.noResultsRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Top Search Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topSearches.map((search, index) => (
                <div key={search.query} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{search.query}</p>
                      <p className="text-sm text-gray-500">{search.count} searches</p>
                    </div>
                  </div>
                  <Badge 
                    variant={search.successRate > 90 ? "default" : "secondary"}
                    className={search.successRate > 90 ? "bg-green-600" : ""}
                  >
                    {search.successRate}% success
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Gaps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              Content Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.contentGaps.map((gap, index) => (
                <div key={gap.query} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">{gap.query}</p>
                    <p className="text-sm text-red-600">{gap.attempts} unsuccessful searches</p>
                  </div>
                  <Badge variant="outline" className="border-red-300 text-red-700">
                    Missing content
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-green-600" />
            Article Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsData.popularArticles.map((article) => (
              <div key={article.title} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                    {article.title}
                  </h4>
                  {getTrendIcon(article.trend)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {article.views.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">views</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchAnalytics;
