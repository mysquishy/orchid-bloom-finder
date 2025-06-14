
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Monitor, 
  Smartphone, 
  Globe, 
  Zap, 
  Eye, 
  Lock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Play,
  Pause
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface TestSuite {
  id: string;
  name: string;
  type: 'e2e' | 'visual' | 'security' | 'performance' | 'api';
  status: 'running' | 'passed' | 'failed' | 'pending';
  lastRun: string;
  duration: number;
  coverage: number;
  devices: string[];
  environment: 'development' | 'staging' | 'production';
}

interface SecurityScan {
  id: string;
  type: 'vulnerability' | 'penetration' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'scanning' | 'completed' | 'failed';
  findings: number;
  lastScan: string;
  target: string;
}

interface PerformanceMetric {
  date: string;
  pageLoad: number;
  apiResponse: number;
  imageOptimization: number;
  mobilePerformance: number;
  overallScore: number;
}

const QualityAssuranceDashboard: React.FC = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [isRunningFullSuite, setIsRunningFullSuite] = useState(false);

  useEffect(() => {
    // Mock test suites data
    const mockSuites: TestSuite[] = [
      {
        id: '1',
        name: 'User Journey E2E Tests',
        type: 'e2e',
        status: 'passed',
        lastRun: '2025-06-14T10:30:00Z',
        duration: 8500,
        coverage: 95,
        devices: ['Chrome Desktop', 'Safari Mobile', 'Firefox'],
        environment: 'staging'
      },
      {
        id: '2',
        name: 'Visual Regression Suite',
        type: 'visual',
        status: 'failed',
        lastRun: '2025-06-14T10:25:00Z',
        duration: 3200,
        coverage: 88,
        devices: ['iPhone 14', 'Samsung Galaxy', 'iPad Pro'],
        environment: 'staging'
      },
      {
        id: '3',
        name: 'API Integration Tests',
        type: 'api',
        status: 'passed',
        lastRun: '2025-06-14T10:20:00Z',
        duration: 1850,
        coverage: 92,
        devices: ['Server'],
        environment: 'production'
      },
      {
        id: '4',
        name: 'Security Compliance Check',
        type: 'security',
        status: 'running',
        lastRun: '2025-06-14T10:15:00Z',
        duration: 5600,
        coverage: 87,
        devices: ['All Endpoints'],
        environment: 'production'
      },
      {
        id: '5',
        name: 'Performance Benchmarks',
        type: 'performance',
        status: 'passed',
        lastRun: '2025-06-14T10:10:00Z',
        duration: 4200,
        coverage: 90,
        devices: ['Mobile', 'Desktop', 'Tablet'],
        environment: 'production'
      }
    ];

    // Mock security scans
    const mockSecurityScans: SecurityScan[] = [
      {
        id: '1',
        type: 'vulnerability',
        severity: 'medium',
        status: 'completed',
        findings: 3,
        lastScan: '2025-06-14T09:00:00Z',
        target: 'Web Application'
      },
      {
        id: '2',
        type: 'penetration',
        severity: 'low',
        status: 'completed',
        findings: 1,
        lastScan: '2025-06-14T08:30:00Z',
        target: 'API Endpoints'
      },
      {
        id: '3',
        type: 'compliance',
        severity: 'high',
        status: 'scanning',
        findings: 0,
        lastScan: '2025-06-14T10:00:00Z',
        target: 'Data Privacy (GDPR)'
      }
    ];

    // Mock performance metrics
    const mockPerformanceMetrics: PerformanceMetric[] = [
      { date: '2025-06-08', pageLoad: 2.3, apiResponse: 120, imageOptimization: 85, mobilePerformance: 78, overallScore: 82 },
      { date: '2025-06-09', pageLoad: 2.1, apiResponse: 115, imageOptimization: 88, mobilePerformance: 81, overallScore: 85 },
      { date: '2025-06-10', pageLoad: 2.4, apiResponse: 130, imageOptimization: 82, mobilePerformance: 76, overallScore: 80 },
      { date: '2025-06-11', pageLoad: 2.0, apiResponse: 110, imageOptimization: 90, mobilePerformance: 83, overallScore: 87 },
      { date: '2025-06-12', pageLoad: 2.2, apiResponse: 125, imageOptimization: 86, mobilePerformance: 80, overallScore: 84 },
      { date: '2025-06-13', pageLoad: 1.9, apiResponse: 105, imageOptimization: 92, mobilePerformance: 85, overallScore: 89 },
      { date: '2025-06-14', pageLoad: 2.1, apiResponse: 118, imageOptimization: 89, mobilePerformance: 82, overallScore: 86 }
    ];

    setTestSuites(mockSuites);
    setSecurityScans(mockSecurityScans);
    setPerformanceMetrics(mockPerformanceMetrics);
  }, []);

  const runFullTestSuite = async () => {
    setIsRunningFullSuite(true);
    // Simulate full test suite execution
    setTimeout(() => {
      setIsRunningFullSuite(false);
    }, 5000);
  };

  const getStatusIcon = (status: TestSuite['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'running': return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'pending': return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TestSuite['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: TestSuite['type']) => {
    switch (type) {
      case 'e2e': return <Monitor className="w-4 h-4" />;
      case 'visual': return <Eye className="w-4 h-4" />;
      case 'security': return <Lock className="w-4 h-4" />;
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'api': return <Globe className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: SecurityScan['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const passedTests = testSuites.filter(suite => suite.status === 'passed').length;
  const failedTests = testSuites.filter(suite => suite.status === 'failed').length;
  const runningTests = testSuites.filter(suite => suite.status === 'running').length;
  const overallPassRate = testSuites.length > 0 ? Math.round((passedTests / testSuites.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quality Assurance Dashboard</h1>
          <p className="text-gray-600 mt-2">Automated testing and quality monitoring for Orkhidly</p>
        </div>
        <Button
          onClick={runFullTestSuite}
          disabled={isRunningFullSuite}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isRunningFullSuite ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Full Suite
            </>
          )}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-green-600">{overallPassRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tests Passed</p>
                <p className="text-2xl font-bold text-gray-900">{passedTests}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tests Failed</p>
                <p className="text-2xl font-bold text-red-600">{failedTests}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Running</p>
                <p className="text-2xl font-bold text-blue-600">{runningTests}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coverage</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(testSuites.reduce((sum, suite) => sum + suite.coverage, 0) / testSuites.length)}%
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="automation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="automation">Test Automation</TabsTrigger>
          <TabsTrigger value="visual">Visual Testing</TabsTrigger>
          <TabsTrigger value="security">Security Scans</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="ci-cd">CI/CD Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="automation">
          <div className="space-y-6">
            {/* Test Suites List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Test Suites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testSuites.map((suite) => (
                    <div key={suite.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(suite.type)}
                          <div>
                            <h3 className="font-semibold">{suite.name}</h3>
                            <p className="text-sm text-gray-500">
                              {suite.environment} • {suite.duration}ms • {suite.devices.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(suite.status)}
                          <Badge className={getStatusColor(suite.status)}>
                            {suite.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Coverage: {suite.coverage}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Last run: {new Date(suite.lastRun).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            suite.coverage >= 90 ? 'bg-green-500' :
                            suite.coverage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${suite.coverage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Coverage */}
            <Card>
              <CardHeader>
                <CardTitle>Cross-Device Testing Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Chrome Desktop', coverage: 95, icon: Monitor },
                    { name: 'Safari Mobile', coverage: 88, icon: Smartphone },
                    { name: 'Firefox', coverage: 92, icon: Monitor },
                    { name: 'Samsung Galaxy', coverage: 85, icon: Smartphone }
                  ].map((device) => (
                    <div key={device.name} className="text-center p-4 border rounded-lg">
                      <device.icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                      <p className="font-medium">{device.name}</p>
                      <p className="text-2xl font-bold text-blue-600">{device.coverage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visual">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visual Regression Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Recent Visual Changes Detected</h4>
                    <div className="space-y-3">
                      {[
                        { page: 'Login Page', change: 'Button alignment shift', severity: 'low', status: 'approved' },
                        { page: 'Dashboard', change: 'Color inconsistency', severity: 'medium', status: 'pending' },
                        { page: 'Mobile Menu', change: 'Layout overflow', severity: 'high', status: 'rejected' }
                      ].map((change, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{change.page}</h5>
                            <Badge className={
                              change.severity === 'high' ? 'bg-red-100 text-red-800' :
                              change.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {change.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{change.change}</p>
                          <Badge variant="outline">{change.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Brand Consistency Score</h4>
                    <div className="space-y-4">
                      {[
                        { aspect: 'Color Palette', score: 98 },
                        { aspect: 'Typography', score: 95 },
                        { aspect: 'Spacing', score: 92 },
                        { aspect: 'Icons', score: 97 }
                      ].map((aspect) => (
                        <div key={aspect.aspect} className="flex items-center justify-between">
                          <span className="text-sm">{aspect.aspect}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${aspect.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10">{aspect.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Scan Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityScans.map((scan) => (
                    <div key={scan.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-semibold capitalize">{scan.type} Scan</h3>
                            <p className="text-sm text-gray-500">{scan.target}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(scan.severity)}>
                            {scan.severity}
                          </Badge>
                          <Badge variant="outline">{scan.status}</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Findings: {scan.findings}</span>
                        <span>Last scan: {new Date(scan.lastScan).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Vulnerability Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-600">A+</div>
                  <p className="text-sm text-gray-600 mt-2">Excellent security posture</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">GDPR Compliance</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <p className="text-sm text-gray-600 mt-2">Data protection compliance</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">SSL Security</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <p className="text-sm text-gray-600 mt-2">Encrypted connections</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Trending</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="overallScore" stroke="#3B82F6" strokeWidth={2} name="Overall Score" />
                  <Line type="monotone" dataKey="pageLoad" stroke="#10B981" strokeWidth={2} name="Page Load (s)" />
                  <Line type="monotone" dataKey="mobilePerformance" stroke="#F59E0B" strokeWidth={2} name="Mobile Performance" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ci-cd">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Pipeline Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: 'Code Commit', status: 'completed', duration: '2s' },
                    { stage: 'Automated Testing', status: 'completed', duration: '3m 45s' },
                    { stage: 'Security Scan', status: 'completed', duration: '1m 22s' },
                    { stage: 'Performance Test', status: 'running', duration: '2m 15s' },
                    { stage: 'Deployment', status: 'pending', duration: '-' }
                  ].map((stage, index) => (
                    <div key={stage.stage} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        {stage.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {stage.status === 'running' && <Clock className="w-5 h-5 text-blue-600 animate-pulse" />}
                        {stage.status === 'pending' && <Clock className="w-5 h-5 text-gray-400" />}
                        <span className="font-medium">{stage.stage}</span>
                      </div>
                      <span className="text-sm text-gray-600">{stage.duration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment Frequency</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { day: 'Mon', deployments: 3 },
                      { day: 'Tue', deployments: 5 },
                      { day: 'Wed', deployments: 2 },
                      { day: 'Thu', deployments: 4 },
                      { day: 'Fri', deployments: 6 },
                      { day: 'Sat', deployments: 1 },
                      { day: 'Sun', deployments: 0 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="deployments" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environment Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { env: 'Production', status: 'healthy', uptime: '99.9%' },
                      { env: 'Staging', status: 'healthy', uptime: '99.7%' },
                      { env: 'Development', status: 'degraded', uptime: '98.2%' }
                    ].map((env) => (
                      <div key={env.env} className="flex items-center justify-between p-2 border rounded">
                        <span className="font-medium">{env.env}</span>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            env.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }>
                            {env.status}
                          </Badge>
                          <span className="text-sm text-gray-600">{env.uptime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityAssuranceDashboard;
