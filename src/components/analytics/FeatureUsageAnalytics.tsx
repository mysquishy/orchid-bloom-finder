
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Clock, 
  Users, 
  TrendingUp,
  Search,
  Camera,
  BookOpen,
  Calendar
} from 'lucide-react';
import { userAnalytics, FeatureUsageMetrics } from '@/utils/userAnalytics';
import LoadingSpinner from '@/components/LoadingSpinner';

const FeatureUsageAnalytics: React.FC = () => {
  const [featureMetrics, setFeatureMetrics] = useState<FeatureUsageMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [userFlowData, setUserFlowData] = useState<any[]>([]);

  useEffect(() => {
    loadFeatureData();
  }, []);

  const loadFeatureData = async () => {
    try {
      setLoading(true);
      
      const metrics = await userAnalytics.getFeatureUsageMetrics();
      setFeatureMetrics(metrics);
      
      // Mock user flow data
      setUserFlowData([
        { from: 'Landing Page', to: 'Identification', users: 2500, percentage: 67.5 },
        { from: 'Identification', to: 'Results', users: 2100, percentage: 84.0 },
        { from: 'Results', to: 'Save to Collection', users: 1575, percentage: 75.0 },
        { from: 'Collection', to: 'Care Calendar', users: 945, percentage: 60.0 },
        { from: 'Care Calendar', to: 'Premium Upgrade', users: 189, percentage: 20.0 }
      ]);
    } catch (error) {
      console.error('Failed to load feature data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFeatureIcon = (featureName: string) => {
    switch (featureName) {
      case 'orchid_identification': return <Camera className="w-5 h-5 text-purple-600" />;
      case 'orchid_database': return <Search className="w-5 h-5 text-blue-600" />;
      case 'care_calendar': return <Calendar className="w-5 h-5 text-green-600" />;
      case 'care_guides': return <BookOpen className="w-5 h-5 text-orange-600" />;
      default: return <BarChart3 className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFeatureName = (name: string) => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds.toFixed(0)}s`;
    return `${(seconds / 60).toFixed(1)}m`;
  };

  if (loading) return <LoadingSpinner text="Loading feature analytics..." />;

  return (
    <div className="space-y-6">
      {/* Feature Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featureMetrics.map((feature) => (
          <Card key={feature.feature_name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getFeatureIcon(feature.feature_name)}
                  <span className="font-medium text-sm">
                    {formatFeatureName(feature.feature_name)}
                  </span>
                </div>
                {feature.conversion_rate && (
                  <Badge variant="outline">
                    {feature.conversion_rate.toFixed(1)}%
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage Count</span>
                  <span className="font-medium">{feature.usage_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unique Users</span>
                  <span className="font-medium">{feature.unique_users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Time</span>
                  <span className="font-medium">{formatTime(feature.avg_time_spent)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Feature Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Feature Popularity Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureMetrics
                .sort((a, b) => b.usage_count - a.usage_count)
                .map((feature, index) => (
                  <div key={feature.feature_name} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                          {formatFeatureName(feature.feature_name)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {feature.usage_count.toLocaleString()} uses
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(feature.usage_count / Math.max(...featureMetrics.map(f => f.usage_count))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Adoption Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureMetrics
                .sort((a, b) => b.unique_users - a.unique_users)
                .map((feature) => {
                  const adoptionRate = (feature.unique_users / 15600) * 100; // Total MAU
                  return (
                    <div key={feature.feature_name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {formatFeatureName(feature.feature_name)}
                        </span>
                        <div className="text-right">
                          <div className="font-bold">{adoptionRate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-500">
                            {feature.unique_users.toLocaleString()} users
                          </div>
                        </div>
                      </div>
                      <Progress value={adoptionRate} className="h-2" />
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Flow Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            User Flow Through Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userFlowData.map((flow, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium">{flow.from}</span>
                    <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                    <span className="font-medium">{flow.to}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {flow.users.toLocaleString()} users
                      </span>
                      <Badge variant={flow.percentage > 70 ? "default" : flow.percentage > 40 ? "outline" : "destructive"}>
                        {flow.percentage}% conversion
                      </Badge>
                    </div>
                    
                    <div className="w-32">
                      <Progress value={flow.percentage} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Engagement Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Engagement by Feature
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureMetrics
              .sort((a, b) => b.avg_time_spent - a.avg_time_spent)
              .map((feature) => (
                <div key={feature.feature_name} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    {getFeatureIcon(feature.feature_name)}
                    <span className="font-medium">
                      {formatFeatureName(feature.feature_name)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average session time</span>
                      <span className="font-bold">{formatTime(feature.avg_time_spent)}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (feature.avg_time_spent / 300) * 100)}%` 
                        }}
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {feature.avg_time_spent > 120 ? 'High engagement' : 
                       feature.avg_time_spent > 60 ? 'Medium engagement' : 'Quick usage'}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureUsageAnalytics;
