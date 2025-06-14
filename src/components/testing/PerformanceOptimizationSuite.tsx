
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Image, 
  Database, 
  Globe, 
  Smartphone,
  Monitor,
  TrendingUp,
  TrendingDown,
  Clock,
  Gauge,
  Wifi,
  HardDrive
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface PerformanceTest {
  id: string;
  name: string;
  type: 'page-load' | 'api-response' | 'image-optimization' | 'database' | 'mobile';
  status: 'running' | 'completed' | 'failed';
  score: number;
  metrics: {
    fcp: number;
    lcp: number;
    cls: number;
    fid: number;
    ttfb: number;
  };
  recommendations: string[];
  lastRun: string;
  trend: 'improving' | 'declining' | 'stable';
}

interface OptimizationSuggestion {
  id: string;
  category: 'images' | 'caching' | 'code' | 'database' | 'cdn';
  title: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  description: string;
  potentialImprovement: string;
  implemented: boolean;
}

const PerformanceOptimizationSuite: React.FC = () => {
  const [performanceTests, setPerformanceTests] = useState<PerformanceTest[]>([]);
  const [optimizations, setOptimizations] = useState<OptimizationSuggestion[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  useEffect(() => {
    // Mock performance test data
    const mockTests: PerformanceTest[] = [
      {
        id: '1',
        name: 'Homepage Load Performance',
        type: 'page-load',
        status: 'completed',
        score: 85,
        metrics: {
          fcp: 1.2,
          lcp: 2.1,
          cls: 0.05,
          fid: 45,
          ttfb: 0.8
        },
        recommendations: [
          'Optimize images using WebP format',
          'Enable browser caching for static assets',
          'Minimize JavaScript bundle size'
        ],
        lastRun: '2025-06-14T10:30:00Z',
        trend: 'improving'
      },
      {
        id: '2',
        name: 'API Response Time',
        type: 'api-response',
        status: 'completed',
        score: 92,
        metrics: {
          fcp: 0,
          lcp: 0,
          cls: 0,
          fid: 0,
          ttfb: 0.4
        },
        recommendations: [
          'Implement database query optimization',
          'Add caching layer for frequent requests'
        ],
        lastRun: '2025-06-14T10:25:00Z',
        trend: 'stable'
      },
      {
        id: '3',
        name: 'Mobile Performance',
        type: 'mobile',
        status: 'running',
        score: 78,
        metrics: {
          fcp: 1.8,
          lcp: 3.2,
          cls: 0.12,
          fid: 120,
          ttfb: 1.2
        },
        recommendations: [
          'Optimize for 3G connections',
          'Reduce payload size for mobile',
          'Implement progressive loading'
        ],
        lastRun: '2025-06-14T10:20:00Z',
        trend: 'declining'
      },
      {
        id: '4',
        name: 'Image Optimization',
        type: 'image-optimization',
        status: 'completed',
        score: 95,
        metrics: {
          fcp: 0.9,
          lcp: 1.5,
          cls: 0.02,
          fid: 25,
          ttfb: 0.3
        },
        recommendations: [
          'Implement lazy loading for all images',
          'Use responsive image formats'
        ],
        lastRun: '2025-06-14T10:15:00Z',
        trend: 'improving'
      }
    ];

    // Mock optimization suggestions
    const mockOptimizations: OptimizationSuggestion[] = [
      {
        id: '1',
        category: 'images',
        title: 'Convert JPEG images to WebP format',
        impact: 'high',
        effort: 'low',
        description: 'WebP format provides 25-35% better compression than JPEG while maintaining quality',
        potentialImprovement: '30% reduction in image payload',
        implemented: false
      },
      {
        id: '2',
        category: 'caching',
        title: 'Implement Redis caching for API responses',
        impact: 'high',
        effort: 'medium',
        description: 'Cache frequently requested data to reduce database load',
        potentialImprovement: '60% faster API responses',
        implemented: true
      },
      {
        id: '3',
        category: 'code',
        title: 'Enable code splitting for React components',
        impact: 'medium',
        effort: 'medium',
        description: 'Split large bundles into smaller chunks for faster initial load',
        potentialImprovement: '20% faster initial page load',
        implemented: false
      },
      {
        id: '4',
        category: 'cdn',
        title: 'Implement CDN for static assets',
        impact: 'high',
        effort: 'low',
        description: 'Serve static assets from geographically distributed locations',
        potentialImprovement: '40% faster asset delivery',
        implemented: true
      },
      {
        id: '5',
        category: 'database',
        title: 'Add database indexes for frequent queries',
        impact: 'medium',
        effort: 'low',
        description: 'Optimize database performance with strategic indexing',
        potentialImprovement: '50% faster query execution',
        implemented: false
      }
    ];

    setPerformanceTests(mockTests);
    setOptimizations(mockOptimizations);
  }, []);

  const runPerformanceTests = async () => {
    setIsRunningTests(true);
    // Simulate test execution
    setTimeout(() => {
      setIsRunningTests(false);
    }, 4000);
  };

  const implementOptimization = (id: string) => {
    setOptimizations(prev => prev.map(opt => 
      opt.id === id ? { ...opt, implemented: true } : opt
    ));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: PerformanceTest['trend']) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTypeIcon = (type: PerformanceTest['type']) => {
    switch (type) {
      case 'page-load': return <Monitor className="w-4 h-4" />;
      case 'api-response': return <Database className="w-4 h-4" />;
      case 'image-optimization': return <Image className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'database': return <HardDrive className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryIcon = (category: OptimizationSuggestion['category']) => {
    switch (category) {
      case 'images': return <Image className="w-4 h-4" />;
      case 'caching': return <Database className="w-4 h-4" />;
      case 'code': return <Zap className="w-4 h-4" />;
      case 'cdn': return <Globe className="w-4 h-4" />;
      case 'database': return <HardDrive className="w-4 h-4" />;
    }
  };

  const avgScore = Math.round(performanceTests.reduce((sum, test) => sum + test.score, 0) / performanceTests.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Optimization Suite</h2>
          <p className="text-gray-600">Automated performance testing and optimization recommendations</p>
        </div>
        <Button
          onClick={runPerformanceTests}
          disabled={isRunningTests}
          className="bg-gradient-to-r from-orange-500 to-red-600"
        >
          {isRunningTests ? (
            <>
              <Gauge className="w-4 h-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Run Performance Tests
            </>
          )}
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>{avgScore}</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1.8s</div>
            <div className="text-sm text-gray-600">Avg Load Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">0.6s</div>
            <div className="text-sm text-gray-600">TTFB</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {optimizations.filter(o => !o.implemented).length}
            </div>
            <div className="text-sm text-gray-600">Pending Optimizations</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tests">Performance Tests</TabsTrigger>
          <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="tests">
          <div className="space-y-4">
            {performanceTests.map((test) => (
              <Card key={test.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(test.type)}
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{test.type.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(test.trend)}
                      <div className={`text-2xl font-bold ${getScoreColor(test.score)}`}>
                        {test.score}
                      </div>
                      {test.status === 'running' && (
                        <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {test.status === 'running' && (
                    <div className="mb-4">
                      <Progress value={65} className="w-full" />
                    </div>
                  )}

                  {/* Core Web Vitals */}
                  {test.type === 'page-load' && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{test.metrics.fcp}s</div>
                        <div className="text-xs text-gray-600">FCP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{test.metrics.lcp}s</div>
                        <div className="text-xs text-gray-600">LCP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{test.metrics.cls}</div>
                        <div className="text-xs text-gray-600">CLS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{test.metrics.fid}ms</div>
                        <div className="text-xs text-gray-600">FID</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{test.metrics.ttfb}s</div>
                        <div className="text-xs text-gray-600">TTFB</div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Optimization Recommendations:</h4>
                    <div className="space-y-1">
                      {test.recommendations.map((rec, index) => (
                        <div key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-blue-200">
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    Last run: {new Date(test.lastRun).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimizations">
          <div className="space-y-4">
            {optimizations.map((opt) => (
              <Card key={opt.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(opt.category)}
                      <div>
                        <h3 className="font-semibold">{opt.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{opt.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <span>Impact:</span>
                            <Badge className={getImpactColor(opt.impact)}>
                              {opt.impact}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>Effort:</span>
                            <Badge className={getEffortColor(opt.effort)}>
                              {opt.effort}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {opt.implemented ? (
                        <Badge className="bg-green-100 text-green-800">
                          ✓ Implemented
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => implementOptimization(opt.id)}
                        >
                          Implement
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 font-medium">Potential Improvement:</p>
                    <p className="text-blue-700 text-sm">{opt.potentialImprovement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { time: '10:00', loadTime: 2.1, responseTime: 0.8 },
                    { time: '10:15', loadTime: 1.9, responseTime: 0.7 },
                    { time: '10:30', loadTime: 2.3, responseTime: 0.9 },
                    { time: '10:45', loadTime: 1.8, responseTime: 0.6 },
                    { time: '11:00', loadTime: 2.0, responseTime: 0.8 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="loadTime" stroke="#3B82F6" name="Load Time (s)" />
                    <Line type="monotone" dataKey="responseTime" stroke="#10B981" name="Response Time (s)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { alert: 'Page load time exceeded 3s threshold', severity: 'warning', time: '5 min ago' },
                    { alert: 'High CPU usage detected', severity: 'critical', time: '12 min ago' },
                    { alert: 'CDN response time improved', severity: 'info', time: '1 hour ago' },
                    { alert: 'Database query optimization completed', severity: 'success', time: '2 hours ago' }
                  ].map((alert, index) => (
                    <div key={index} className={`border-l-4 pl-4 py-2 ${
                      alert.severity === 'critical' ? 'border-red-500' :
                      alert.severity === 'warning' ? 'border-yellow-500' :
                      alert.severity === 'success' ? 'border-green-500' :
                      'border-blue-500'
                    }`}>
                      <p className="font-medium text-sm">{alert.alert}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceOptimizationSuite;
