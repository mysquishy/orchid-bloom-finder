
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Server, 
  Zap, 
  Globe, 
  Shield, 
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ScalingMetrics {
  currentLoad: number;
  autoScaleInstances: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUtilization: number;
  memoryUtilization: number;
  dbConnections: number;
}

const ScalabilityManager: React.FC = () => {
  const [metrics, setMetrics] = useState<ScalingMetrics>({
    currentLoad: 75,
    autoScaleInstances: 8,
    responseTime: 120,
    throughput: 15500,
    errorRate: 0.02,
    cpuUtilization: 68,
    memoryUtilization: 72,
    dbConnections: 245
  });

  const [autoScalingEnabled, setAutoScalingEnabled] = useState(true);

  const traffic_data = [
    { time: '00:00', requests: 1200, latency: 95, instances: 4 },
    { time: '04:00', requests: 800, latency: 85, instances: 3 },
    { time: '08:00', requests: 3500, latency: 120, instances: 6 },
    { time: '12:00', requests: 8500, latency: 180, instances: 12 },
    { time: '16:00', requests: 12000, latency: 220, instances: 16 },
    { time: '20:00', requests: 15500, latency: 250, instances: 18 },
    { time: '24:00', requests: 9500, latency: 150, instances: 10 }
  ];

  const scaling_events = [
    { type: 'scale_up', time: '14:30', reason: 'High CPU utilization (>80%)', instances: '12 → 16' },
    { type: 'scale_down', time: '10:15', reason: 'Low traffic period', instances: '8 → 6' },
    { type: 'emergency_scale', time: '19:45', reason: 'Viral content spike detected', instances: '16 → 24' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        currentLoad: Math.max(10, prev.currentLoad + (Math.random() - 0.5) * 10),
        responseTime: Math.max(50, prev.responseTime + (Math.random() - 0.5) * 20),
        throughput: Math.max(1000, prev.throughput + (Math.random() - 0.5) * 1000)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return { color: 'text-green-600', bg: 'bg-green-100', status: 'good' };
    if (value <= thresholds.warning) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'warning' };
    return { color: 'text-red-600', bg: 'bg-red-100', status: 'critical' };
  };

  return (
    <div className="space-y-6">
      {/* Infrastructure Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Instances</p>
                <p className="text-2xl font-bold">{metrics.autoScaleInstances}</p>
              </div>
              <Server className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Badge className={autoScalingEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                Auto-scaling {autoScalingEnabled ? 'ON' : 'OFF'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold">{metrics.responseTime}ms</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <Badge className={getHealthStatus(metrics.responseTime, { good: 150, warning: 300 }).bg}>
                {getHealthStatus(metrics.responseTime, { good: 150, warning: 300 }).status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Throughput</p>
                <p className="text-2xl font-bold">{metrics.throughput.toLocaleString()}/s</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-blue-100 text-blue-800">
                +12% vs last hour
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold">{(metrics.errorRate * 100).toFixed(2)}%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="mt-2">
              <Badge className={getHealthStatus(metrics.errorRate * 100, { good: 0.1, warning: 1 }).bg}>
                {getHealthStatus(metrics.errorRate * 100, { good: 0.1, warning: 1 }).status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">Traffic & Scaling</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="database">Database Performance</TabsTrigger>
          <TabsTrigger value="cdn">CDN & Global</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic & Auto-Scaling Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={traffic_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area yAxisId="left" type="monotone" dataKey="requests" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Requests/min" />
                    <Line yAxisId="right" type="monotone" dataKey="instances" stroke="#10B981" strokeWidth={2} name="Active Instances" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Scaling Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scaling_events.map((event, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {event.type === 'emergency_scale' ? (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          ) : event.type === 'scale_up' ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-blue-500 rotate-180" />
                          )}
                          <span className="font-medium">{event.type.replace('_', ' ').toUpperCase()}</span>
                        </div>
                        <span className="text-sm text-gray-500">{event.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{event.reason}</p>
                      <p className="text-sm font-medium">Instances: {event.instances}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>CPU Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Average CPU</span>
                        <span className="font-medium">{metrics.cpuUtilization}%</span>
                      </div>
                      <Progress value={metrics.cpuUtilization} className="h-3" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Peak</div>
                        <div className="font-medium">89%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Minimum</div>
                        <div className="font-medium">34%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Memory Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Average Memory</span>
                        <span className="font-medium">{metrics.memoryUtilization}%</span>
                      </div>
                      <Progress value={metrics.memoryUtilization} className="h-3" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Peak</div>
                        <div className="font-medium">85%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Available</div>
                        <div className="font-medium">2.8GB</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resource Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'warning', message: 'Consider increasing memory allocation for image processing workers', priority: 'Medium' },
                    { type: 'info', message: 'CPU utilization shows good efficiency, auto-scaling is working optimally', priority: 'Low' },
                    { type: 'critical', message: 'Database connection pool nearing limits, scale database tier', priority: 'High' }
                  ].map((rec, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {rec.type === 'critical' ? (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          ) : rec.type === 'warning' ? (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="text-sm">{rec.message}</span>
                        </div>
                        <Badge className={
                          rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {rec.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.dbConnections}</div>
                    <div className="text-sm text-gray-600">Active Connections</div>
                    <Progress value={(metrics.dbConnections / 500) * 100} className="mt-2" />
                    <div className="text-xs text-gray-500 mt-1">Limit: 500</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12ms</div>
                    <div className="text-sm text-gray-600">Query Response Time</div>
                    <Badge className="bg-green-100 text-green-800 mt-2">Excellent</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">99.97%</div>
                    <div className="text-sm text-gray-600">Database Uptime</div>
                    <Badge className="bg-green-100 text-green-800 mt-2">SLA Met</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Database Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Query Optimization Status</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Slow Queries</div>
                        <div className="font-bold">3</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Index Usage</div>
                        <div className="font-bold">94%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Cache Hit Rate</div>
                        <div className="font-bold">98.5%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Read Replicas</div>
                        <div className="font-bold">4 Active</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Scaling Recommendations</h3>
                    <div className="space-y-2 text-sm">
                      <div>• Add read replica in EU region for global performance</div>
                      <div>• Implement table partitioning for orchid_species table (2M+ records)</div>
                      <div>• Consider MongoDB for unstructured user analytics data</div>
                      <div>• Implement connection pooling optimization for peak hours</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cdn">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { region: 'North America', latency: '45ms', cache_hit: '96%', status: 'optimal' },
                { region: 'Europe', latency: '52ms', cache_hit: '94%', status: 'optimal' },
                { region: 'Asia Pacific', latency: '78ms', cache_hit: '89%', status: 'good' },
                { region: 'South America', latency: '95ms', cache_hit: '85%', status: 'fair' }
              ].map((region) => (
                <Card key={region.region}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Globe className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <div className="font-medium">{region.region}</div>
                      <div className="text-sm text-gray-600">Latency: {region.latency}</div>
                      <div className="text-sm text-gray-600">Cache: {region.cache_hit}</div>
                      <Badge className={
                        region.status === 'optimal' ? 'bg-green-100 text-green-800 mt-2' :
                        region.status === 'good' ? 'bg-blue-100 text-blue-800 mt-2' :
                        'bg-yellow-100 text-yellow-800 mt-2'
                      }>
                        {region.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Global Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">CDN Performance</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Global Cache Hit Rate</span>
                          <span className="font-medium">91%</span>
                        </div>
                        <Progress value={91} />
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Bandwidth Saved: 2.4TB/day</span>
                          <span>Cost Reduction: $1,200/month</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Edge Optimization</h3>
                      <div className="space-y-2 text-sm">
                        <div>• Image optimization: WebP format (65% size reduction)</div>
                        <div>• Gzip compression: 78% bandwidth savings</div>
                        <div>• HTTP/2 push: Critical resource preloading</div>
                        <div>• Edge computing: AI processing at CDN nodes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Infrastructure Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={autoScalingEnabled ? "default" : "outline"}
              onClick={() => setAutoScalingEnabled(!autoScalingEnabled)}
            >
              {autoScalingEnabled ? 'Disable' : 'Enable'} Auto-Scaling
            </Button>
            <Button variant="outline">
              Configure Load Balancer
            </Button>
            <Button variant="outline">
              Database Maintenance
            </Button>
            <Button variant="outline">
              CDN Cache Invalidation
            </Button>
            <Button variant="destructive">
              Emergency Scale Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScalabilityManager;
