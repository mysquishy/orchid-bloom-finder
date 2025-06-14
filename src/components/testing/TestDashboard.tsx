
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, AlertTriangle, Play, RefreshCw } from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration: number;
  error?: string;
  category: 'unit' | 'integration' | 'e2e' | 'performance' | 'compatibility';
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
}

const TestDashboard: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock test data
  useEffect(() => {
    const mockResults: TestResult[] = [
      {
        id: '1',
        name: 'User Authentication Tests',
        status: 'passed',
        duration: 1250,
        category: 'unit'
      },
      {
        id: '2',
        name: 'Photo Upload Integration',
        status: 'passed',
        duration: 2100,
        category: 'integration'
      },
      {
        id: '3',
        name: 'Complete Identification Journey',
        status: 'failed',
        duration: 5800,
        error: 'Timeout waiting for results page',
        category: 'e2e'
      },
      {
        id: '4',
        name: 'Database Operations',
        status: 'passed',
        duration: 890,
        category: 'unit'
      },
      {
        id: '5',
        name: 'API Endpoint Tests',
        status: 'passed',
        duration: 1640,
        category: 'integration'
      },
      {
        id: '6',
        name: 'Page Load Performance',
        status: 'passed',
        duration: 3200,
        category: 'performance'
      },
      {
        id: '7',
        name: 'Mobile Browser Compatibility',
        status: 'passed',
        duration: 4100,
        category: 'compatibility'
      }
    ];

    const mockMetrics: PerformanceMetric[] = [
      {
        name: 'Page Load Time',
        value: 2.3,
        unit: 'seconds',
        threshold: 3.0,
        status: 'good'
      },
      {
        name: 'Image Processing Speed',
        value: 4.7,
        unit: 'seconds',
        threshold: 5.0,
        status: 'good'
      },
      {
        name: 'API Response Time',
        value: 850,
        unit: 'ms',
        threshold: 1000,
        status: 'good'
      },
      {
        name: 'Mobile Responsiveness',
        value: 98,
        unit: '%',
        threshold: 95,
        status: 'good'
      }
    ];

    setTestResults(mockResults);
    setPerformanceMetrics(mockMetrics);
  }, []);

  const runAllTests = async () => {
    setIsRunningTests(true);
    
    // Simulate running tests
    for (let i = 0; i < testResults.length; i++) {
      setTimeout(() => {
        setTestResults(prev => prev.map((test, index) => 
          index === i ? { ...test, status: 'running' as const } : test
        ));
      }, i * 500);
      
      setTimeout(() => {
        setTestResults(prev => prev.map((test, index) => 
          index === i ? { ...test, status: 'passed' as const } : test
        ));
      }, (i + 1) * 500);
    }
    
    setTimeout(() => {
      setIsRunningTests(false);
    }, testResults.length * 500);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      passed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      running: 'bg-blue-100 text-blue-800',
      pending: 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getMetricStatus = (metric: PerformanceMetric) => {
    if (metric.status === 'good') return 'text-green-600';
    if (metric.status === 'warning') return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredResults = selectedCategory === 'all' 
    ? testResults 
    : testResults.filter(test => test.category === selectedCategory);

  const totalTests = testResults.length;
  const passedTests = testResults.filter(test => test.status === 'passed').length;
  const failedTests = testResults.filter(test => test.status === 'failed').length;
  const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Test Dashboard</h1>
        <Button
          onClick={runAllTests}
          disabled={isRunningTests}
          className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
        >
          <Play className="w-4 h-4 mr-2" />
          {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passed</p>
                <p className="text-2xl font-bold text-green-600">{passedTests}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{failedTests}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-gray-900">{passRate}%</p>
              </div>
              <AlertTriangle className={`w-8 h-8 ${passRate >= 90 ? 'text-green-600' : passRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="text-center">
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className={`text-2xl font-bold ${getMetricStatus(metric)}`}>
                  {metric.value}
                  <span className="text-sm font-normal ml-1">{metric.unit}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Threshold: {metric.threshold}{metric.unit}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Test Results</CardTitle>
            <div className="flex space-x-2">
              {['all', 'unit', 'integration', 'e2e', 'performance', 'compatibility'].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResults.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{test.name}</h3>
                    <p className="text-sm text-gray-500">
                      {test.category.charAt(0).toUpperCase() + test.category.slice(1)} • {test.duration}ms
                    </p>
                    {test.error && (
                      <p className="text-sm text-red-600 mt-1">{test.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(test.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestDashboard;
