
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Play, Pause, Settings, CheckCircle, AlertTriangle, Smartphone, Monitor, Globe } from 'lucide-react';

interface ScheduledTest {
  id: string;
  name: string;
  schedule: string;
  environment: 'development' | 'staging' | 'production';
  enabled: boolean;
  lastRun: string;
  nextRun: string;
  status: 'success' | 'failed' | 'running' | 'scheduled';
  testType: 'regression' | 'performance' | 'mobile' | 'api';
}

interface TestEnvironment {
  id: string;
  name: string;
  url: string;
  status: 'healthy' | 'degraded' | 'down';
  lastChecked: string;
  responseTime: number;
}

const AutomatedTestManagement: React.FC = () => {
  const [scheduledTests, setScheduledTests] = useState<ScheduledTest[]>([]);
  const [environments, setEnvironments] = useState<TestEnvironment[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('all');

  useEffect(() => {
    // Mock scheduled tests data
    const mockScheduledTests: ScheduledTest[] = [
      {
        id: '1',
        name: 'Nightly Regression Suite',
        schedule: 'Daily at 2:00 AM',
        environment: 'staging',
        enabled: true,
        lastRun: '2025-06-14T02:00:00Z',
        nextRun: '2025-06-15T02:00:00Z',
        status: 'success',
        testType: 'regression'
      },
      {
        id: '2',
        name: 'Performance Benchmarks',
        schedule: 'Every 6 hours',
        environment: 'production',
        enabled: true,
        lastRun: '2025-06-14T18:00:00Z',
        nextRun: '2025-06-15T00:00:00Z',
        status: 'running',
        testType: 'performance'
      },
      {
        id: '3',
        name: 'Mobile Device Testing',
        schedule: 'Weekly on Sundays',
        environment: 'staging',
        enabled: false,
        lastRun: '2025-06-09T10:00:00Z',
        nextRun: '2025-06-16T10:00:00Z',
        status: 'scheduled',
        testType: 'mobile'
      },
      {
        id: '4',
        name: 'API Health Monitoring',
        schedule: 'Every 15 minutes',
        environment: 'production',
        enabled: true,
        lastRun: '2025-06-14T22:15:00Z',
        nextRun: '2025-06-14T22:30:00Z',
        status: 'success',
        testType: 'api'
      }
    ];

    // Mock environments data
    const mockEnvironments: TestEnvironment[] = [
      {
        id: '1',
        name: 'Development',
        url: 'https://dev.orkhidly.com',
        status: 'healthy',
        lastChecked: '2025-06-14T22:20:00Z',
        responseTime: 145
      },
      {
        id: '2',
        name: 'Staging',
        url: 'https://staging.orkhidly.com',
        status: 'healthy',
        lastChecked: '2025-06-14T22:20:00Z',
        responseTime: 132
      },
      {
        id: '3',
        name: 'Production',
        url: 'https://orkhidly.com',
        status: 'degraded',
        lastChecked: '2025-06-14T22:20:00Z',
        responseTime: 289
      }
    ];

    setScheduledTests(mockScheduledTests);
    setEnvironments(mockEnvironments);
  }, []);

  const toggleTestEnabled = (testId: string) => {
    setScheduledTests(tests =>
      tests.map(test =>
        test.id === testId ? { ...test, enabled: !test.enabled } : test
      )
    );
  };

  const runTestNow = (testId: string) => {
    setScheduledTests(tests =>
      tests.map(test =>
        test.id === testId ? { ...test, status: 'running' as const, lastRun: new Date().toISOString() } : test
      )
    );

    // Simulate test completion after 3 seconds
    setTimeout(() => {
      setScheduledTests(tests =>
        tests.map(test =>
          test.id === testId ? { ...test, status: 'success' as const } : test
        )
      );
    }, 3000);
  };

  const getStatusIcon = (status: ScheduledTest['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'running': return <Play className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ScheduledTest['status']) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
    }
  };

  const getTestTypeIcon = (type: ScheduledTest['testType']) => {
    switch (type) {
      case 'regression': return <Settings className="w-4 h-4" />;
      case 'performance': return <Monitor className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'api': return <Globe className="w-4 h-4" />;
    }
  };

  const getEnvironmentStatusColor = (status: TestEnvironment['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'down': return 'bg-red-100 text-red-800';
    }
  };

  const filteredTests = selectedEnvironment === 'all' 
    ? scheduledTests 
    : scheduledTests.filter(test => test.environment === selectedEnvironment);

  return (
    <div className="space-y-6">
      {/* Environment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Test Environment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {environments.map((env) => (
              <div key={env.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{env.name}</h3>
                  <Badge className={getEnvironmentStatusColor(env.status)}>
                    {env.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{env.url}</p>
                <div className="text-xs text-gray-500">
                  Response: {env.responseTime}ms
                </div>
                <div className="text-xs text-gray-500">
                  Last checked: {new Date(env.lastChecked).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Management Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Scheduled Test Runs</h2>
        <div className="flex items-center space-x-4">
          <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Environments</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Scheduled Tests */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTests.map((test) => (
          <Card key={test.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTestTypeIcon(test.testType)}
                    <div>
                      <h3 className="font-semibold">{test.name}</h3>
                      <p className="text-sm text-gray-600">{test.schedule}</p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="capitalize">
                    {test.environment}
                  </Badge>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(test.status)}
                    <Badge className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p className="text-gray-500">Last run:</p>
                    <p>{new Date(test.lastRun).toLocaleString()}</p>
                  </div>
                  
                  <div className="text-right text-sm">
                    <p className="text-gray-500">Next run:</p>
                    <p>{new Date(test.nextRun).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={test.enabled}
                      onCheckedChange={() => toggleTestEnabled(test.id)}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => runTestNow(test.id)}
                      disabled={test.status === 'running'}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Run Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex-col">
              <Settings className="w-6 h-6 mb-2" />
              <span>Schedule New Test</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <Monitor className="w-6 h-6 mb-2" />
              <span>Performance Suite</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <Smartphone className="w-6 h-6 mb-2" />
              <span>Mobile Testing</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <Globe className="w-6 h-6 mb-2" />
              <span>API Monitoring</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Coverage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Coverage by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Unit Tests', coverage: 85, color: 'bg-green-500' },
                { type: 'Integration Tests', coverage: 72, color: 'bg-blue-500' },
                { type: 'E2E Tests', coverage: 68, color: 'bg-purple-500' },
                { type: 'Performance Tests', coverage: 91, color: 'bg-yellow-500' }
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.coverage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{item.coverage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Test Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { test: 'API Health Check', time: '2 minutes ago', status: 'success' },
                { test: 'Mobile Regression', time: '15 minutes ago', status: 'success' },
                { test: 'Performance Suite', time: '1 hour ago', status: 'failed' },
                { test: 'E2E User Journey', time: '3 hours ago', status: 'success' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{activity.test}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {getStatusIcon(activity.status as any)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutomatedTestManagement;
