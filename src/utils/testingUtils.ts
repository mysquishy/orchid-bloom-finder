
import { TestExecution, TestMetric } from './aiTestingTypes';

export const calculateOverallProgress = (tests: TestExecution[]): number => {
  if (tests.length === 0) return 0;
  const completedTests = tests.filter(t => ['passed', 'failed', 'skipped'].includes(t.status)).length;
  return (completedTests / tests.length) * 100;
};

export const getTestStatusCounts = (tests: TestExecution[]) => {
  return {
    passed: tests.filter(t => t.status === 'passed').length,
    failed: tests.filter(t => t.status === 'failed').length,
    running: tests.filter(t => t.status === 'running').length,
    queued: tests.filter(t => t.status === 'queued').length,
    skipped: tests.filter(t => t.status === 'skipped').length,
  };
};

export const formatDuration = (duration: number): string => {
  if (duration < 60) return `${duration}s`;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}m ${seconds}s`;
};

export const getMetricStatusColor = (status: TestMetric['status']): string => {
  switch (status) {
    case 'good': return 'text-green-600';
    case 'warning': return 'text-yellow-600';
    case 'critical': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const generateMockTestData = (): TestExecution[] => {
  return [
    {
      id: '1',
      name: 'Orchid Species Accuracy Test',
      type: 'accuracy',
      device: 'Desktop',
      browser: 'Chrome',
      status: 'passed',
      progress: 100,
      startTime: '2025-06-14T10:00:00Z',
      endTime: '2025-06-14T10:03:30Z',
      duration: 210,
      accuracy: 94.5,
      confidence: 0.92,
      logs: ['✓ Load test dataset', '✓ Run identification tests', '✓ Calculate accuracy metrics']
    },
    {
      id: '2',
      name: 'Edge Case Detection',
      type: 'edge-case',
      device: 'Mobile',
      browser: 'Safari',
      status: 'running',
      progress: 65,
      startTime: '2025-06-14T10:02:00Z',
      logs: ['✓ Load edge case scenarios', '⏳ Testing blurry images...']
    },
    {
      id: '3',
      name: 'Performance Load Test',
      type: 'performance',
      device: 'Desktop',
      browser: 'Firefox',
      status: 'failed',
      progress: 100,
      startTime: '2025-06-14T09:58:00Z',
      endTime: '2025-06-14T10:01:15Z',
      duration: 195,
      logs: ['✓ Start load test', '✗ Response time exceeded threshold']
    }
  ];
};
