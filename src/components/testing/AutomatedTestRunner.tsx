
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Pause, 
  Square, 
  Monitor, 
  Smartphone, 
  Tablet,
  Globe,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface TestExecution {
  id: string;
  name: string;
  type: 'e2e' | 'unit' | 'integration' | 'visual' | 'performance';
  device: string;
  browser: string;
  status: 'queued' | 'running' | 'passed' | 'failed' | 'skipped';
  progress: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
  screenshot?: string;
  logs: string[];
}

interface TestConfiguration {
  browsers: string[];
  devices: string[];
  environments: string[];
  testTypes: string[];
  parallel: boolean;
  maxParallel: number;
}

const AutomatedTestRunner: React.FC = () => {
  const [testExecutions, setTestExecutions] = useState<TestExecution[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<TestConfiguration>({
    browsers: ['Chrome', 'Firefox', 'Safari'],
    devices: ['Desktop', 'Mobile', 'Tablet'],
    environments: ['staging', 'production'],
    testTypes: ['e2e', 'visual', 'performance'],
    parallel: true,
    maxParallel: 4
  });

  useEffect(() => {
    // Mock test executions
    const mockExecutions: TestExecution[] = [
      {
        id: '1',
        name: 'User Registration Flow',
        type: 'e2e',
        device: 'Desktop',
        browser: 'Chrome',
        status: 'passed',
        progress: 100,
        startTime: '2025-06-14T10:00:00Z',
        endTime: '2025-06-14T10:03:30Z',
        duration: 210,
        logs: ['✓ Navigate to registration page', '✓ Fill registration form', '✓ Submit form', '✓ Verify success message']
      },
      {
        id: '2',
        name: 'Orchid Identification Process',
        type: 'e2e',
        device: 'Mobile',
        browser: 'Safari',
        status: 'running',
        progress: 65,
        startTime: '2025-06-14T10:02:00Z',
        logs: ['✓ Open camera interface', '✓ Upload test image', '⏳ Processing identification...']
      },
      {
        id: '3',
        name: 'Visual Regression - Dashboard',
        type: 'visual',
        device: 'Tablet',
        browser: 'Chrome',
        status: 'failed',
        progress: 100,
        startTime: '2025-06-14T09:58:00Z',
        endTime: '2025-06-14T10:01:15Z',
        duration: 195,
        logs: ['✓ Take baseline screenshot', '✓ Take current screenshot', '✗ Visual difference detected in header area']
      },
      {
        id: '4',
        name: 'API Response Time Test',
        type: 'performance',
        device: 'Desktop',
        browser: 'Firefox',
        status: 'queued',
        progress: 0,
        logs: []
      }
    ];

    setTestExecutions(mockExecutions);
  }, []);

  const startTestRun = () => {
    setIsRunning(true);
    // Simulate test execution
    const interval = setInterval(() => {
      setTestExecutions(prev => prev.map(test => {
        if (test.status === 'running' && test.progress < 100) {
          return { ...test, progress: Math.min(test.progress + 10, 100) };
        }
        return test;
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
    }, 10000);
  };

  const stopTestRun = () => {
    setIsRunning(false);
    setTestExecutions(prev => prev.map(test => 
      test.status === 'running' ? { ...test, status: 'skipped' as const } : test
    ));
  };

  const getStatusIcon = (status: TestExecution['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'running': return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'queued': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'skipped': return <Square className="w-4 h-4 text-orange-600" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: TestExecution['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'queued': return 'bg-gray-100 text-gray-800';
      case 'skipped': return 'bg-orange-100 text-orange-800';
    }
  };

  const completedTests = testExecutions.filter(t => ['passed', 'failed', 'skipped'].includes(t.status)).length;
  const totalTests = testExecutions.length;
  const overallProgress = totalTests > 0 ? (completedTests / totalTests) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Test Runner Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Configuration */}
            <div className="space-y-4">
              <h3 className="font-semibold">Test Configuration</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Browsers</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedConfig.browsers.map((browser) => (
                      <Badge key={browser} variant="outline">{browser}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Devices</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedConfig.devices.map((device) => (
                      <Badge key={device} variant="outline">{device}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Test Types</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedConfig.testTypes.map((type) => (
                      <Badge key={type} variant="outline" className="capitalize">{type}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Parallel Execution:</label>
                  <Badge className={selectedConfig.parallel ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {selectedConfig.parallel ? 'Enabled' : 'Disabled'}
                  </Badge>
                  {selectedConfig.parallel && (
                    <span className="text-sm text-gray-600">Max: {selectedConfig.maxParallel}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Execution Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold">Execution Controls</h3>
              
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Button
                    onClick={startTestRun}
                    disabled={isRunning}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Tests
                  </Button>
                  <Button
                    onClick={stopTestRun}
                    disabled={!isRunning}
                    variant="outline"
                    className="flex-1"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop Tests
                  </Button>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{completedTests}/{totalTests} tests completed</span>
                  </div>
                  <Progress value={overallProgress} className="w-full" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 p-3 rounded">
                    <div className="text-green-800 font-semibold">
                      {testExecutions.filter(t => t.status === 'passed').length}
                    </div>
                    <div className="text-green-600">Passed</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <div className="text-red-800 font-semibold">
                      {testExecutions.filter(t => t.status === 'failed').length}
                    </div>
                    <div className="text-red-600">Failed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Execution Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Execution Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testExecutions.map((test) => (
              <div key={test.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <h3 className="font-semibold">{test.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {getDeviceIcon(test.device)}
                        <span>{test.device}</span>
                        <span>•</span>
                        <span>{test.browser}</span>
                        <span>•</span>
                        <span className="capitalize">{test.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                    {test.duration && (
                      <span className="text-sm text-gray-600">{test.duration}s</span>
                    )}
                  </div>
                </div>

                {test.status === 'running' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{test.progress}%</span>
                    </div>
                    <Progress value={test.progress} className="w-full" />
                  </div>
                )}

                {test.logs.length > 0 && (
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="text-sm font-medium mb-2">Execution Log:</h4>
                    <div className="space-y-1">
                      {test.logs.map((log, index) => (
                        <div key={index} className="text-sm font-mono text-gray-700">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {test.screenshot && (
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      View Screenshot
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedTestRunner;
