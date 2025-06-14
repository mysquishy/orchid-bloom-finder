
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  DollarSign,
  Zap,
  TrendingUp,
  Bell,
  RefreshCw
} from 'lucide-react';
import { userAnalytics } from '@/utils/userAnalytics';
import LoadingSpinner from '@/components/LoadingSpinner';

interface LiveMetrics {
  activeUsers: number;
  systemLoad: number;
  errorRate: number;
  revenueToday: number;
  apiLatency: number;
  conversionRate: number;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const RealTimeMonitoring: React.FC = () => {
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    activeUsers: 0,
    systemLoad: 0,
    errorRate: 0,
    revenueToday: 0,
    apiLatency: 0,
    conversionRate: 0
  });
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadRealTimeData();
    const interval = setInterval(loadRealTimeData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const loadRealTimeData = async () => {
    try {
      setLoading(true);
      
      // Get live user count
      const activeUsers = await userAnalytics.getLiveUserCount();
      
      // Mock real-time metrics - in production would come from monitoring services
      const mockMetrics: LiveMetrics = {
        activeUsers,
        systemLoad: Math.random() * 100,
        errorRate: Math.random() * 5,
        revenueToday: Math.random() * 1000 + 500,
        apiLatency: Math.random() * 200 + 50,
        conversionRate: Math.random() * 20 + 10
      };
      
      setLiveMetrics(mockMetrics);
      
      // Generate mock alerts based on metrics
      const newAlerts: SystemAlert[] = [];
      
      if (mockMetrics.errorRate > 3) {
        newAlerts.push({
          id: `error-${Date.now()}`,
          type: 'error',
          message: `High error rate detected: ${mockMetrics.errorRate.toFixed(1)}%`,
          timestamp: new Date().toISOString(),
          severity: 'high'
        });
      }
      
      if (mockMetrics.systemLoad > 80) {
        newAlerts.push({
          id: `load-${Date.now()}`,
          type: 'warning',
          message: `System load is high: ${mockMetrics.systemLoad.toFixed(1)}%`,
          timestamp: new Date().toISOString(),
          severity: 'medium'
        });
      }
      
      if (mockMetrics.revenueToday > 900) {
        newAlerts.push({
          id: `revenue-${Date.now()}`,
          type: 'success',
          message: `Revenue milestone reached: $${mockMetrics.revenueToday.toFixed(0)}`,
          timestamp: new Date().toISOString(),
          severity: 'low'
        });
      }
      
      setAlerts(prev => [...newAlerts, ...prev.slice(0, 9)]); // Keep last 10 alerts
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('Failed to load real-time data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertColor = (type: SystemAlert['type']) => {
    switch (type) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getAlertIcon = (type: SystemAlert['type']) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <Bell className="w-4 h-4 text-yellow-600" />;
      case 'success': return <TrendingUp className="w-4 h-4 text-green-600" />;
      default: return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getMetricStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.warning) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading && alerts.length === 0) {
    return <LoadingSpinner text="Loading real-time monitoring..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Real-Time Monitoring</h2>
          <p className="text-gray-600">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          onClick={loadRealTimeData} 
          variant="outline"
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{liveMetrics.activeUsers}</p>
                <p className="text-xs text-green-600">Live now</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Load</p>
                <p className={`text-2xl font-bold ${getStatusColor(getMetricStatus(liveMetrics.systemLoad, { good: 50, warning: 80 }))}`}>
                  {liveMetrics.systemLoad.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">CPU & Memory</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Error Rate</p>
                <p className={`text-2xl font-bold ${getStatusColor(getMetricStatus(liveMetrics.errorRate, { good: 1, warning: 3 }))}`}>
                  {liveMetrics.errorRate.toFixed(2)}%
                </p>
                <p className="text-xs text-gray-500">Last 5 minutes</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue Today</p>
                <p className="text-2xl font-bold text-green-600">
                  ${liveMetrics.revenueToday.toFixed(0)}
                </p>
                <p className="text-xs text-gray-500">+{((liveMetrics.revenueToday / 800) * 100 - 100).toFixed(1)}% vs avg</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">API Latency</p>
                <p className={`text-2xl font-bold ${getStatusColor(getMetricStatus(liveMetrics.apiLatency, { good: 100, warning: 200 }))}`}>
                  {liveMetrics.apiLatency.toFixed(0)}ms
                </p>
                <p className="text-xs text-gray-500">Average response</p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {liveMetrics.conversionRate.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            System Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No alerts at this time. System is running smoothly.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{alert.message}</p>
                        <Badge variant="outline">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { component: 'Web Server', status: liveMetrics.systemLoad < 80 ? 'Healthy' : 'Warning', uptime: '99.9%' },
                { component: 'Database', status: liveMetrics.apiLatency < 200 ? 'Healthy' : 'Slow', uptime: '99.8%' },
                { component: 'API Gateway', status: liveMetrics.errorRate < 3 ? 'Healthy' : 'Issues', uptime: '99.7%' },
                { component: 'File Storage', status: 'Healthy', uptime: '100%' }
              ].map((item) => (
                <div key={item.component} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.component}</p>
                    <p className="text-sm text-gray-600">Uptime: {item.uptime}</p>
                  </div>
                  <Badge 
                    variant={item.status === 'Healthy' ? 'default' : 'destructive'}
                    className={item.status === 'Healthy' ? 'bg-green-500' : ''}
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                View Logs
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                User Sessions
              </Button>
              <Button variant="outline" className="w-full">
                <Activity className="w-4 h-4 mr-2" />
                Performance
              </Button>
              <Button variant="outline" className="w-full">
                <DollarSign className="w-4 h-4 mr-2" />
                Revenue Stats
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;
