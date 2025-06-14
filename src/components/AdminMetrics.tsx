
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSystemMetrics, validateDatabaseData, checkSystemHealth } from '@/utils/monitoring';
import { 
  Activity, 
  Database, 
  Users, 
  Flower, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const AdminMetrics: React.FC = () => {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['system-metrics'],
    queryFn: getSystemMetrics,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: validationIssues, isLoading: validationLoading } = useQuery({
    queryKey: ['validation-issues'],
    queryFn: validateDatabaseData,
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const { data: systemHealth, isLoading: healthLoading } = useQuery({
    queryKey: ['system-health'],
    queryFn: checkSystemHealth,
    refetchInterval: 60000, // Refresh every minute
  });

  if (metricsLoading || validationLoading || healthLoading) {
    return (
      <div className="space-y-6">
        <LoadingSpinner text="Loading metrics..." />
      </div>
    );
  }

  const totalIssues = validationIssues?.reduce((sum: number, issue: any) => sum + Number(issue.affected_count), 0) || 0;

  return (
    <div className="space-y-6">
      {/* System Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {systemHealth?.overall ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">All Systems Operational</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-medium">System Issues Detected</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {systemHealth && Object.entries(systemHealth).map(([service, status]) => {
              if (service === 'overall') return null;
              return (
                <div key={service} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm capitalize">{service.replace('_', ' ')}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Species</p>
                <p className="text-2xl font-bold">{metrics?.totalSpecies || 0}</p>
              </div>
              <Flower className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{metrics?.totalUsers || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collections</p>
                <p className="text-2xl font-bold">{metrics?.totalCollections || 0}</p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Identifications</p>
                <p className="text-2xl font-bold">{metrics?.totalIdentifications || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>New Signups</span>
              <Badge variant="outline">{metrics?.recentSignups7d || 0}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>New Identifications</span>
              <Badge variant="outline">{metrics?.recentIdentifications7d || 0}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Popular Species</span>
              <Badge variant="outline">{metrics?.popularSpeciesCount || 0}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>User Contributions</span>
              <Badge variant="outline">{metrics?.userContributedCount || 0}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Data Quality Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalIssues === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>No data quality issues found</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{totalIssues} issues found</span>
                </div>
                {validationIssues?.map((issue: any, index: number) => (
                  <div key={index} className="text-sm text-gray-600">
                    {issue.issue_description}: {issue.affected_count}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMetrics;
