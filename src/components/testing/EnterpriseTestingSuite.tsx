
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Globe, 
  Shield, 
  Brain, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Server,
  Database,
  Lock,
  Eye,
  Play,
  Pause,
  BarChart
} from 'lucide-react';

interface LoadTest {
  id: string;
  name: string;
  type: 'load' | 'stress' | 'spike' | 'endurance';
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  concurrentUsers: number;
  duration: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  startTime: string;
}

interface MonitoringAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'performance' | 'business' | 'security' | 'user-experience';
  message: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  affectedUsers: number;
}

interface PredictiveInsight {
  id: string;
  type: 'bug_prediction' | 'performance_degradation' | 'user_behavior_anomaly';
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  prediction: string;
  recommendedAction: string;
  timeline: string;
}

const EnterpriseTestingSuite: React.FC = () => {
  const [loadTests, setLoadTests] = useState<LoadTest[]>([]);
  const [alerts, setAlerts] = useState<MonitoringAlert[]>([]);
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([]);
  const [isRunningChaosTest, setIsRunningChaosTest] = useState(false);

  useEffect(() => {
    // Mock load tests
    const mockLoadTests: LoadTest[] = [
      {
        id: '1',
        name: 'Viral Growth Simulation',
        type: 'spike',
        status: 'running',
        concurrentUsers: 8500,
        duration: 1800,
        responseTime: 245,
        errorRate: 0.03,
        throughput: 2400,
        startTime: '2025-06-14T10:30:00Z'
      },
      {
        id: '2',
        name: 'AI Model Stress Test',
        type: 'stress',
        status: 'completed',
        concurrentUsers: 5000,
        duration: 3600,
        responseTime: 1200,
        errorRate: 0.008,
        throughput: 850,
        startTime: '2025-06-14T09:00:00Z'
      },
      {
        id: '3',
        name: 'Global Performance Test',
        type: 'load',
        status: 'scheduled',
        concurrentUsers: 10000,
        duration: 7200,
        responseTime: 0,
        errorRate: 0,
        throughput: 0,
        startTime: '2025-06-14T14:00:00Z'
      }
    ];

    // Mock monitoring alerts
    const mockAlerts: MonitoringAlert[] = [
      {
        id: '1',
        severity: 'high',
        type: 'performance',
        message: 'AI response time increased by 45% in Asia-Pacific region',
        timestamp: '2025-06-14T10:45:00Z',
        status: 'active',
        affectedUsers: 1250
      },
      {
        id: '2',
        severity: 'medium',
        type: 'business',
        message: 'Conversion rate dropped 8% for new user onboarding',
        timestamp: '2025-06-14T10:30:00Z',
        status: 'acknowledged',
        affectedUsers: 340
      },
      {
        id: '3',
        severity: 'critical',
        type: 'security',
        message: 'Unusual login pattern detected from multiple IP ranges',
        timestamp: '2025-06-14T10:15:00Z',
        status: 'resolved',
        affectedUsers: 25
      }
    ];

    // Mock predictive insights
    const mockInsights: PredictiveInsight[] = [
      {
        id: '1',
        type: 'performance_degradation',
        confidence: 85,
        impact: 'high',
        prediction: 'Database performance will degrade by 30% within 48 hours due to query optimization needs',
        recommendedAction: 'Implement query caching and index optimization for orchid search functions',
        timeline: '48 hours'
      },
      {
        id: '2',
        type: 'bug_prediction',
        confidence: 72,
        impact: 'medium',
        prediction: 'Image upload component likely to fail on iOS Safari based on user behavior patterns',
        recommendedAction: 'Update image compression library and add fallback handling',
        timeline: '72 hours'
      },
      {
        id: '3',
        type: 'user_behavior_anomaly',
        confidence: 91,
        impact: 'low',
        prediction: 'Unusual increase in premium subscription cancellations expected next week',
        recommendedAction: 'Prepare retention campaign and investigate user feedback patterns',
        timeline: '7 days'
      }
    ];

    setLoadTests(mockLoadTests);
    setAlerts(mockAlerts);
    setPredictiveInsights(mockInsights);
  }, []);

  const runChaosEngineering = async () => {
    setIsRunningChaosTest(true);
    setTimeout(() => {
      setIsRunningChaosTest(false);
    }, 8000);
  };

  const getStatusIcon = (status: LoadTest['status']) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: MonitoringAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const runningTests = loadTests.filter(t => t.status === 'running').length;
  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const criticalInsights = predictiveInsights.filter(i => i.impact === 'critical' || i.impact === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Enterprise Testing & Quality Assurance</h2>
          <p className="text-gray-600">Comprehensive testing, monitoring, and predictive quality systems</p>
        </div>
        <Button
          onClick={runChaosEngineering}
          disabled={isRunningChaosTest}
          className="bg-gradient-to-r from-purple-500 to-red-600"
        >
          {isRunningChaosTest ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              Running Chaos Test...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Start Chaos Engineering
            </>
          )}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Tests</p>
                <p className="text-2xl font-bold text-blue-600">{runningTests}</p>
              </div>
              <Server className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{activeAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Insights</p>
                <p className="text-2xl font-bold text-purple-600">{criticalInsights}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-green-600">98.7%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="load-testing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="load-testing">Load Testing</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="predictive">Predictive QA</TabsTrigger>
          <TabsTrigger value="security">Security & Compliance</TabsTrigger>
          <TabsTrigger value="disaster-recovery">Disaster Recovery</TabsTrigger>
        </TabsList>

        <TabsContent value="load-testing">
          <div className="space-y-6">
            {/* Load Test Results */}
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Load Testing Suite</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadTests.map((test) => (
                    <div key={test.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(test.status)}
                          <div>
                            <h3 className="font-semibold">{test.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{test.type} test</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={
                            test.status === 'completed' ? 'bg-green-100 text-green-800' :
                            test.status === 'running' ? 'bg-blue-100 text-blue-800' :
                            test.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {test.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">{test.concurrentUsers.toLocaleString()}</div>
                          <div className="text-xs text-blue-800">Users</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">{test.responseTime}ms</div>
                          <div className="text-xs text-green-800">Response</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="font-bold text-yellow-600">{(test.errorRate * 100).toFixed(2)}%</div>
                          <div className="text-xs text-yellow-800">Error Rate</div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600">{test.throughput}</div>
                          <div className="text-xs text-purple-800">RPS</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-bold text-gray-600">{Math.floor(test.duration / 60)}m</div>
                          <div className="text-xs text-gray-800">Duration</div>
                        </div>
                      </div>

                      {test.status === 'running' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Test Progress</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="w-full" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Global Performance Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { region: 'North America', latency: '45ms', success: '99.8%', users: '2.3k' },
                    { region: 'Europe', latency: '62ms', success: '99.6%', users: '1.8k' },
                    { region: 'Asia-Pacific', latency: '128ms', success: '98.9%', users: '3.1k' }
                  ].map((region) => (
                    <div key={region.region} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">{region.region}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Latency:</span>
                          <span className="font-medium">{region.latency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Success Rate:</span>
                          <span className="font-medium">{region.success}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Active Users:</span>
                          <span className="font-medium">{region.users}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="space-y-6">
            {/* Real-time Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Monitoring & Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                            alert.severity === 'critical' ? 'text-red-600' :
                            alert.severity === 'high' ? 'text-orange-600' :
                            alert.severity === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`} />
                          <div>
                            <h3 className="font-semibold">{alert.message}</h3>
                            <p className="text-sm text-gray-500">
                              {alert.type} • {alert.affectedUsers} users affected
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className={
                            alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            alert.status === 'acknowledged' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Metrics Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Daily Active Users', value: '14.2k', change: '+12%', trend: 'up' },
                      { metric: 'Conversion Rate', value: '3.8%', change: '-0.2%', trend: 'down' },
                      { metric: 'Revenue Per User', value: '$12.50', change: '+8%', trend: 'up' },
                      { metric: 'Customer Satisfaction', value: '4.7/5', change: '+0.1', trend: 'up' }
                    ].map((item) => (
                      <div key={item.metric} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{item.metric}</div>
                          <div className="text-2xl font-bold">{item.value}</div>
                        </div>
                        <div className={`text-sm font-medium ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Experience Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Page Load Time', value: '1.2s', status: 'good', target: '<2s' },
                      { metric: 'AI Response Time', value: '3.4s', status: 'warning', target: '<3s' },
                      { metric: 'Mobile Performance', value: '85', status: 'good', target: '>80' },
                      { metric: 'Error Rate', value: '0.05%', status: 'excellent', target: '<0.1%' }
                    ].map((item) => (
                      <div key={item.metric} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{item.metric}</div>
                          <div className="text-sm text-gray-500">Target: {item.target}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{item.value}</div>
                          <Badge className={
                            item.status === 'excellent' ? 'bg-green-100 text-green-800' :
                            item.status === 'good' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="predictive">
          <div className="space-y-6">
            {/* Predictive Insights */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Predictive Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveInsights.map((insight) => (
                    <div key={insight.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <Brain className="w-5 h-5 mt-0.5 text-purple-600" />
                          <div>
                            <h3 className="font-semibold capitalize">{insight.type.replace('_', ' ')}</h3>
                            <p className="text-sm text-gray-600 mt-1">{insight.prediction}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            insight.impact === 'critical' ? 'bg-red-100 text-red-800' :
                            insight.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                            insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {insight.impact} impact
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <h4 className="font-medium text-blue-900 mb-1">Recommended Action:</h4>
                        <p className="text-blue-800 text-sm">{insight.recommendedAction}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">Confidence:</span>
                          <span className={`font-medium ${getConfidenceColor(insight.confidence)}`}>
                            {insight.confidence}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Timeline: {insight.timeline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ML Model Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Machine Learning Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { model: 'Bug Prediction', accuracy: '87%', precision: '82%', recall: '91%' },
                    { model: 'Performance Anomaly', accuracy: '94%', precision: '89%', recall: '96%' },
                    { model: 'User Behavior Analysis', accuracy: '78%', precision: '85%', recall: '73%' }
                  ].map((model) => (
                    <div key={model.model} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">{model.model}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Accuracy:</span>
                          <span className="font-medium">{model.accuracy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Precision:</span>
                          <span className="font-medium">{model.precision}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Recall:</span>
                          <span className="font-medium">{model.recall}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            {/* Compliance Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Compliance Status</h4>
                    <div className="space-y-3">
                      {[
                        { standard: 'GDPR Compliance', status: 'compliant', score: '98%' },
                        { standard: 'SOC 2 Type II', status: 'in-progress', score: '85%' },
                        { standard: 'PCI DSS', status: 'compliant', score: '100%' },
                        { standard: 'ISO 27001', status: 'pending', score: '72%' }
                      ].map((item) => (
                        <div key={item.standard} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <div className="font-medium">{item.standard}</div>
                            <div className="text-sm text-gray-600">{item.score}</div>
                          </div>
                          <Badge className={
                            item.status === 'compliant' ? 'bg-green-100 text-green-800' :
                            item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Security Metrics</h4>
                    <div className="space-y-3">
                      {[
                        { metric: 'Vulnerability Scans', status: 'passed', last: '2 hours ago' },
                        { metric: 'Penetration Testing', status: 'scheduled', last: '1 week ago' },
                        { metric: 'Data Encryption', status: 'active', last: 'continuous' },
                        { metric: 'Access Control Audit', status: 'completed', last: '1 day ago' }
                      ].map((item) => (
                        <div key={item.metric} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <div className="font-medium">{item.metric}</div>
                            <div className="text-sm text-gray-600">Last: {item.last}</div>
                          </div>
                          <Badge className={
                            item.status === 'passed' || item.status === 'active' || item.status === 'completed' ? 
                            'bg-green-100 text-green-800' :
                            item.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { metric: 'Data Encryption Coverage', value: '100%', status: 'excellent' },
                    { metric: 'GDPR Requests Processed', value: '24', status: 'good' },
                    { metric: 'Data Retention Compliance', value: '98.5%', status: 'good' },
                    { metric: 'Third-party Audits', value: '4/4', status: 'excellent' },
                    { metric: 'Security Training Completion', value: '95%', status: 'good' },
                    { metric: 'Incident Response Time', value: '<4h', status: 'excellent' }
                  ].map((item) => (
                    <div key={item.metric} className="text-center p-4 border rounded-lg">
                      <div className="font-medium text-sm">{item.metric}</div>
                      <div className="text-2xl font-bold mt-2">{item.value}</div>
                      <Badge className={
                        item.status === 'excellent' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disaster-recovery">
          <div className="space-y-6">
            {/* Backup & Recovery */}
            <Card>
              <CardHeader>
                <CardTitle>Disaster Recovery & Business Continuity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Backup Status</h4>
                    <div className="space-y-3">
                      {[
                        { system: 'Database Backups', frequency: 'Every 6 hours', last: '2 hours ago', status: 'healthy' },
                        { system: 'File Storage Backups', frequency: 'Daily', last: '8 hours ago', status: 'healthy' },
                        { system: 'Configuration Backups', frequency: 'Weekly', last: '2 days ago', status: 'healthy' },
                        { system: 'Code Repository', frequency: 'Continuous', last: '5 minutes ago', status: 'healthy' }
                      ].map((backup) => (
                        <div key={backup.system} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{backup.system}</h5>
                            <Badge className="bg-green-100 text-green-800">
                              {backup.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>Frequency: {backup.frequency}</div>
                            <div>Last backup: {backup.last}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Recovery Testing</h4>
                    <div className="space-y-3">
                      {[
                        { test: 'Database Recovery', rto: '15 minutes', rpo: '1 hour', last: '1 week ago', status: 'passed' },
                        { test: 'Full System Failover', rto: '30 minutes', rpo: '4 hours', last: '2 weeks ago', status: 'passed' },
                        { test: 'Data Integrity Check', rto: '5 minutes', rpo: '30 minutes', last: '3 days ago', status: 'passed' }
                      ].map((test) => (
                        <div key={test.test} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{test.test}</h5>
                            <Badge className="bg-green-100 text-green-800">
                              {test.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>RTO: {test.rto} | RPO: {test.rpo}</div>
                            <div>Last test: {test.last}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incident Response */}
            <Card>
              <CardHeader>
                <CardTitle>Incident Response & Recovery Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      scenario: 'Database Failure',
                      severity: 'critical',
                      responseTime: '< 5 minutes',
                      recoveryTime: '< 15 minutes',
                      lastTested: '1 week ago',
                      status: 'ready'
                    },
                    {
                      scenario: 'API Service Outage',
                      severity: 'high',
                      responseTime: '< 10 minutes',
                      recoveryTime: '< 30 minutes',
                      lastTested: '2 weeks ago',
                      status: 'ready'
                    },
                    {
                      scenario: 'CDN Failure',
                      severity: 'medium',
                      responseTime: '< 15 minutes',
                      recoveryTime: '< 45 minutes',
                      lastTested: '1 month ago',
                      status: 'ready'
                    },
                    {
                      scenario: 'Data Center Outage',
                      severity: 'critical',
                      responseTime: '< 5 minutes',
                      recoveryTime: '< 60 minutes',
                      lastTested: '3 months ago',
                      status: 'due'
                    }
                  ].map((scenario) => (
                    <div key={scenario.scenario} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{scenario.scenario}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            scenario.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            scenario.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {scenario.severity}
                          </Badge>
                          <Badge className={
                            scenario.status === 'ready' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {scenario.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Response Time:</span>
                          <div className="font-medium">{scenario.responseTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Recovery Time:</span>
                          <div className="font-medium">{scenario.recoveryTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Tested:</span>
                          <div className="font-medium">{scenario.lastTested}</div>
                        </div>
                      </div>
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

export default EnterpriseTestingSuite;
