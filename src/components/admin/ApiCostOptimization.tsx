
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  Zap, 
  AlertTriangle, 
  TrendingDown, 
  DollarSign,
  Lightbulb,
  Target
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface OptimizationRecommendation {
  recommendation_type: string;
  description: string;
  potential_savings_cents: number;
  priority: string;
}

const ApiCostOptimization: React.FC = () => {
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['api-optimization'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_api_optimization_recommendations');
      if (error) throw error;
      return data as OptimizationRecommendation[];
    },
    refetchInterval: 300000, // 5 minutes
  });

  const { data: recentCosts } = useQuery({
    queryKey: ['recent-api-costs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_usage_costs')
        .select('*')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 60000,
  });

  if (isLoading) return <LoadingSpinner text="Loading optimization data..." />;

  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Target className="w-4 h-4 text-orange-500" />;
      default: return <Lightbulb className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'outline';
    }
  };

  // Calculate cost breakdown
  const costBreakdown = recentCosts?.reduce((acc, cost) => {
    const endpoint = cost.api_endpoint;
    if (!acc[endpoint]) {
      acc[endpoint] = { total: 0, count: 0, failures: 0 };
    }
    acc[endpoint].total += cost.cost_cents || 0;
    acc[endpoint].count += cost.usage_count || 1;
    if (!cost.success) acc[endpoint].failures += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number; failures: number }>) || {};

  const totalPotentialSavings = recommendations?.reduce(
    (sum, rec) => sum + rec.potential_savings_cents, 0
  ) || 0;

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalPotentialSavings)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Recommendations</p>
                <p className="text-2xl font-bold text-blue-600">
                  {recommendations?.length || 0}
                </p>
              </div>
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">7-Day API Calls</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Object.values(costBreakdown).reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                </p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations && recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    {getPriorityIcon(rec.priority)}
                    <div>
                      <h4 className="font-medium">{rec.recommendation_type}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={getPriorityColor(rec.priority) as any}>
                          {rec.priority} priority
                        </Badge>
                        <span className="text-sm text-green-600 font-medium">
                          Save {formatCurrency(rec.potential_savings_cents)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Implement
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No optimization recommendations at this time</p>
              <p className="text-sm mt-1">Your API usage is already optimized!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            API Cost Breakdown (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(costBreakdown).map(([endpoint, stats]) => (
              <div key={endpoint} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{endpoint}</h4>
                  <p className="text-sm text-gray-600">
                    {stats.count.toLocaleString()} calls
                    {stats.failures > 0 && (
                      <span className="text-red-600 ml-2">
                        ({stats.failures} failures)
                      </span>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(stats.total)}</p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(stats.total / stats.count)} avg
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiCostOptimization;
