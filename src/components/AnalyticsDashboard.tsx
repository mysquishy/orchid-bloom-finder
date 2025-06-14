
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, DollarSign, BarChart3, Download, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import CollectionAnalytics from './analytics/CollectionAnalytics';
import CareSuccessAnalytics from './analytics/CareSuccessAnalytics';
import SeasonalAnalytics from './analytics/SeasonalAnalytics';
import HealthTrendAnalytics from './analytics/HealthTrendAnalytics';
import CostAnalytics from './analytics/CostAnalytics';
import GrowthAnalytics from './analytics/GrowthAnalytics';
import BloomAnalytics from './analytics/BloomAnalytics';
import CommunityComparison from './analytics/CommunityComparison';
import PremiumBadge from '@/components/PremiumBadge';

interface AnalyticsData {
  totalPlants: number;
  healthyPlants: number;
  careTasksCompleted: number;
  totalCareEvents: number;
  averageSuccessRate: number;
  totalSpent: number;
  bloomingPlants: number;
  lastUpdated: Date;
}

const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    end: new Date()
  });

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user, dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch collection data
      const { data: collection } = await supabase
        .from('user_orchid_collection')
        .select('*')
        .eq('user_id', user!.id);

      // Mock data for demonstration - in real implementation, this would come from actual care tracking
      const mockData: AnalyticsData = {
        totalPlants: collection?.length || 0,
        healthyPlants: Math.floor((collection?.length || 0) * 0.85),
        careTasksCompleted: 142,
        totalCareEvents: 180,
        averageSuccessRate: 87.5,
        totalSpent: 234.50,
        bloomingPlants: Math.floor((collection?.length || 0) * 0.3),
        lastUpdated: new Date()
      };

      setData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format: 'pdf' | 'csv') => {
    // This would integrate with a PDF generation library or backend service
    console.log(`Exporting report in ${format} format...`);
    // For now, just download mock data
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange,
      summary: data,
      exportFormat: format
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orchid-analytics-${format}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <PremiumBadge size="lg" />
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => exportReport('pdf')} 
            variant="outline"
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button 
            onClick={() => exportReport('csv')} 
            variant="outline"
            className="text-green-600 border-green-200 hover:bg-green-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Plants</p>
                <p className="text-2xl font-bold text-green-900">{data?.totalPlants || 0}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Success Rate</p>
                <p className="text-2xl font-bold text-blue-900">{data?.averageSuccessRate || 0}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Care Cost</p>
                <p className="text-2xl font-bold text-purple-900">${data?.totalSpent || 0}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-600">Currently Blooming</p>
                <p className="text-2xl font-bold text-pink-900">{data?.bloomingPlants || 0}</p>
              </div>
              <Calendar className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="collection" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="care">Care Success</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          <TabsTrigger value="health">Health Trends</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="blooms">Bloom Cycles</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="collection">
          <CollectionAnalytics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="care">
          <CareSuccessAnalytics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="seasonal">
          <SeasonalAnalytics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="health">
          <HealthTrendAnalytics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="costs">
          <CostAnalytics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="growth">
          <GrowthAnalytics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="blooms">
          <BloomAnalytics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="community">
          <CommunityComparison dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
