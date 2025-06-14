
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface TestSuite {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running';
  passRate: number;
  executionTime: number;
  lastRun: string;
  platform: string;
  category: 'unit' | 'integration' | 'e2e' | 'performance';
}

interface PerformanceData {
  date: string;
  loadTime: number;
  responseTime: number;
  errorRate: number;
  userSatisfaction: number;
}

const TestResultsVisualization: React.FC = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    // Mock test suite data
    const mockSuites: TestSuite[] = [
      {
        id: '1',
        name: 'Authentication Tests',
        status: 'passed',
        passRate: 100,
        executionTime: 1250,
        lastRun: '2025-06-14T10:30:00Z',
        platform: 'Web',
        category: 'unit'
      },
      {
        id: '2',
        name: 'Photo Upload Integration',
        status: 'passed',
        passRate: 95,
        executionTime: 3200,
        lastRun: '2025-06-14T10:25:00Z',
        platform: 'Mobile',
        category: 'integration'
      },
      {
        id: '3',
        name: 'E2E User Journey',
        status: 'failed',
        passRate: 80,
        executionTime: 8500,
        lastRun: '2025-06-14T10:20:00Z',
        platform: 'Web',
        category: 'e2e'
      },
      {
        id: '4',
        name: 'Performance Benchmarks',
        status: 'passed',
        passRate: 90,
        executionTime: 5000,
        lastRun: '2025-06-14T10:15:00Z',
        platform: 'Web',
        category: 'performance'
      }
    ];

    // Mock performance trending data
    const mockPerformanceData: PerformanceData[] = [
      { date: '2025-06-08', loadTime: 2.3, responseTime: 120, errorRate: 0.5, userSatisfaction: 4.5 },
      { date: '2025-06-09', loadTime: 2.1, responseTime: 115, errorRate: 0.3, userSatisfaction: 4.6 },
      { date: '2025-06-10', loadTime: 2.4, responseTime: 130, errorRate: 0.8, userSatisfaction: 4.3 },
      { date: '2025-06-11', loadTime: 2.0, responseTime: 110, errorRate: 0.2, userSatisfaction: 4.7 },
      { date: '2025-06-12', loadTime: 2.2, responseTime: 125, errorRate: 0.4, userSatisfaction: 4.5 },
      { date: '2025-06-13', loadTime: 1.9, responseTime: 105, errorRate: 0.1, userSatisfaction: 4.8 },
      { date: '2025-06-14', loadTime: 2.1, responseTime: 118, errorRate: 0.3, userSatisfaction: 4.6 }
    ];

    setTestSuites(mockSuites);
    setPerformanceData(mockPerformanceData);
  }, []);

  const getStatusIcon = (status: TestSuite['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running': return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: TestSuite['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <div className="w-4 h-4" />;
  };

  const passedTests = testSuites.filter(suite => suite.status === 'passed').length;
  const failedTests = testSuites.filter(suite => suite.status === 'failed').length;
  const totalTests = testSuites.length;
  const overallPassRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  const platformData = [
    { name: 'Web', value: testSuites.filter(s => s.platform === 'Web').length, color: '#3B82F6' },
    { name: 'Mobile', value: testSuites.filter(s => s.platform === 'Mobile').length, color: '#10B981' },
    { name: 'API', value: testSuites.filter(s => s.platform === 'API').length, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Pass Rate</p>
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
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(performanceData.reduce((sum, d) => sum + d.responseTime, 0) / performanceData.length)}ms
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Metrics Trending</CardTitle>
              <div className="flex space-x-2">
                {['7d', '30d', '90d'].map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range as any)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="loadTime" stroke="#3B82F6" strokeWidth={2} name="Load Time (s)" />
                <Line type="monotone" dataKey="responseTime" stroke="#10B981" strokeWidth={2} name="Response Time (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cross-Platform Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Test Suites List */}
      <Card>
        <CardHeader>
          <CardTitle>Test Suite Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testSuites.map((suite) => (
              <div key={suite.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(suite.status)}
                    <div>
                      <h3 className="font-semibold">{suite.name}</h3>
                      <p className="text-sm text-gray-500">
                        {suite.category} • {suite.platform} • {suite.executionTime}ms
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(suite.status)}>
                      {suite.status}
                    </Badge>
                    <span className="text-sm font-medium">{suite.passRate}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      suite.passRate >= 90 ? 'bg-green-500' :
                      suite.passRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${suite.passRate}%` }}
                  />
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  Last run: {new Date(suite.lastRun).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Error Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Error Frequency Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="errorRate" fill="#EF4444" name="Error Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle>User Satisfaction Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="userSatisfaction" stroke="#8B5CF6" strokeWidth={3} name="Satisfaction (1-5)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResultsVisualization;
