
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Zap,
  AlertTriangle,
  Target,
  Clock
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BusinessMetrics {
  total_users: number;
  active_users_7d: number;
  active_users_30d: number;
  total_revenue_cents: number;
  mrr_cents: number;
  churn_rate_30d: number;
  avg_session_time_minutes: number;
  total_identifications: number;
  identification_success_rate: number;
  total_api_cost_cents: number;
}

const BusinessMetricsDashboard: React.FC = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['business-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_business_metrics');
      if (error) throw error;
      return data?.[0] as BusinessMetrics;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) return <LoadingSpinner text="Loading business metrics..." />;
  if (error) return <div className="text-red-600">Error loading metrics</div>;
  if (!metrics) return <div>No metrics available</div>;

  const formatCurrency = (cents: number) => `$${(cents / 100).toLocaleString()}`;
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.total_users.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {metrics.active_users_7d} active (7d)
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(metrics.mrr_cents)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Total: {formatCurrency(metrics.total_revenue_cents)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatPercentage(metrics.identification_success_rate)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {metrics.total_identifications.toLocaleString()} total IDs
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Costs</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatCurrency(metrics.total_api_cost_cents)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Avg session: {metrics.avg_session_time_minutes.toFixed(1)}m
                </p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>7-day Active Users</span>
                  <span>{formatPercentage((metrics.active_users_7d / metrics.total_users) * 100)}</span>
                </div>
                <Progress value={(metrics.active_users_7d / metrics.total_users) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>30-day Active Users</span>
                  <span>{formatPercentage((metrics.active_users_30d / metrics.total_users) * 100)}</span>
                </div>
                <Progress value={(metrics.active_users_30d / metrics.total_users) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Retention Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Churn Rate (30d)</span>
                  <Badge variant={metrics.churn_rate_30d > 10 ? "destructive" : "outline"}>
                    {formatPercentage(metrics.churn_rate_30d)}
                  </Badge>
                </div>
                <Progress 
                  value={Math.min(metrics.churn_rate_30d, 20)} 
                  className="h-2" 
                />
              </div>
              <div className="text-sm text-gray-600">
                {metrics.churn_rate_30d > 10 ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    High churn rate detected
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <Target className="w-4 h-4" />
                    Healthy retention
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Session Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold">
                  {metrics.avg_session_time_minutes.toFixed(1)} min
                </p>
                <p className="text-sm text-gray-600">Average session time</p>
              </div>
              <div className="text-sm">
                <Badge variant={metrics.avg_session_time_minutes > 5 ? "default" : "outline"}>
                  {metrics.avg_session_time_minutes > 5 ? "Good engagement" : "Room for improvement"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessMetricsDashboard;
