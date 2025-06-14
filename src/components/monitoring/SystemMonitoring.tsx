
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, AlertTriangle, CheckCircle, Clock, Database, Globe, Server, Zap } from 'lucide-react';
import { errorMonitor } from '@/utils/errorMonitoring';

interface SystemHealth {
  service: string;
  status: 'healthy' | 'warning' | 'critical' | 'down';
  responseTime: number;
  uptime: number;
  lastChecked: string;
}

interface Alert {
  id: string;
  type: 'error' | 'performance' | 'security' | 'availability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const SystemMonitoring: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([
    {
      service: 'API Gateway',
      status: 'healthy',
      responseTime: 120,
      uptime: 99.9,
      lastChecked: new Date().toISOString()
    },
    {
      service: 'Database',
      status: 'healthy',
      responseTime: 45,
      uptime: 99.8,
      lastChecked: new Date().toISOString()
    },
    {
      service: 'AI Service',
      status: 'warning',
      responseTime: 2400,
      uptime: 98.5,
      lastChecked: new Date().toISOString()
    },
    {
      service: 'Image Storage',
      status: 'healthy',
      responseTime: 200,
      uptime: 99.7,
      lastChecked: new Date().toISOString()
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'performance',
      severity: 'medium',
      message: 'AI service response time above threshold (2.4s)',
      timestamp: new Date().toISOString(),
      resolved: false
    },
    {
      id: '2',
      type: 'error',
      severity: 'low',
      message: 'Increased 404 errors on /api/identify endpoint',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      resolved: true
    }
  ]);

  const [errorStats, setErrorStats] = useState({
    total: 0,
    last24h: 0,
    critical: 0,
    warnings: 0
  });

  useEffect(() => {
    // Load error statistics
    const stats = errorMonitor.getErrorStats();
    setErrorStats(stats);

    // Load active alerts
    const activeAlerts = errorMonitor.getActiveAlerts();
    console.log('Active error alerts:', activeAlerts);
  }, []);

  const getStatusIcon = (status: SystemHealth['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'down':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: SystemHealth['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'down':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const overallHealth = systemHealth.every(service => service.status === 'healthy') ? 'healthy' : 'degraded';
  const avgResponseTime = Math.round(systemHealth.reduce((sum, service) => sum + service.responseTime, 0) / systemHealth.length);
  const avgUptime = (systemHealth.reduce((sum, service) => sum + service.uptime, 0) / systemHealth.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-green-600">
                  {overallHealth === 'healthy' ? 'Healthy' : 'Degraded'}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-blue-600">{avgResponseTime}ms</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-purple-600">{avgUptime}%</p>
              </div>
              <Server className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => !a.resolved).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Tabs */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="errors">Error Tracking</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <div className="space-y-4">
            {systemHealth.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <h4 className="font-medium">{service.service}</h4>
                        <p className="text-sm text-gray-500">
                          Last checked: {new Date(service.lastChecked).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Response Time</p>
                        <p className="font-medium">{service.responseTime}ms</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Uptime</p>
                        <p className="font-medium">{service.uptime}%</p>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                        alert.resolved ? 'text-gray-400' : 'text-red-500'
                      }`} />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline">{alert.type}</Badge>
                        </div>
                        <h4 className="font-medium">{alert.message}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {alert.resolved ? (
                        <Badge variant="outline" className="text-green-600">
                          Resolved
                        </Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="errors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Errors</span>
                  <span className="font-bold">{errorStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last 24 Hours</span>
                  <span className="font-bold">{errorStats.last24h}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Critical Errors</span>
                  <span className="font-bold text-red-600">{errorStats.critical}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Warnings</span>
                  <span className="font-bold text-yellow-600">{errorStats.warnings}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">JavaScript Errors</span>
                      <span className="text-sm">12</span>
                    </div>
                    <Progress value={30} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">API Errors</span>
                      <span className="text-sm">8</span>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Network Errors</span>
                      <span className="text-sm">5</span>
                    </div>
                    <Progress value={12} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{service.service}</span>
                      <span className="text-sm">{service.responseTime}ms</span>
                    </div>
                    <Progress 
                      value={Math.min((service.responseTime / 3000) * 100, 100)} 
                      className={service.responseTime > 2000 ? "bg-red-100" : ""}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm">72%</span>
                  </div>
                  <Progress value={72} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Database Load</span>
                    <span className="text-sm">38%</span>
                  </div>
                  <Progress value={38} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitoring;
