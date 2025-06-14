
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { Users, Crown, TrendingUp, DollarSign } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface UserSegment {
  segment_name: string;
  user_count: number;
  avg_revenue_cents: number;
  retention_rate: number;
}

const UserSegmentationAnalysis: React.FC = () => {
  const { data: segments, isLoading } = useQuery({
    queryKey: ['user-segments'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_user_segments');
      if (error) throw error;
      return data as UserSegment[];
    },
    refetchInterval: 60000,
  });

  if (isLoading) return <LoadingSpinner text="Loading user segments..." />;

  const totalUsers = segments?.reduce((sum, segment) => sum + segment.user_count, 0) || 0;
  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Segmentation Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments?.map((segment) => (
            <div key={segment.segment_name} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  {segment.segment_name === 'Premium Users' ? (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Users className="w-4 h-4 text-gray-500" />
                  )}
                  {segment.segment_name}
                </h3>
                <Badge variant={segment.segment_name === 'Premium Users' ? "default" : "outline"}>
                  {segment.user_count} users
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Market Share</span>
                    <span>{((segment.user_count / totalUsers) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(segment.user_count / totalUsers) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Revenue</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <span className="font-medium">{formatCurrency(segment.avg_revenue_cents)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Retention Rate</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-blue-600" />
                    <span className="font-medium">{segment.retention_rate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="text-xs text-gray-500">
                  Total Revenue: {formatCurrency(segment.avg_revenue_cents * segment.user_count)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {segments && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Segment Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Users:</span>
                <div className="font-semibold">{totalUsers.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-600">Premium Conversion:</span>
                <div className="font-semibold">
                  {segments.length > 1 ? 
                    ((segments[1]?.user_count / totalUsers) * 100).toFixed(1) : 0}%
                </div>
              </div>
              <div>
                <span className="text-gray-600">ARPU:</span>
                <div className="font-semibold">
                  {formatCurrency(
                    segments.reduce((sum, s) => sum + s.avg_revenue_cents * s.user_count, 0) / totalUsers
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserSegmentationAnalysis;
