
export interface TestExecution {
  id: string;
  name: string;
  type: 'e2e' | 'unit' | 'integration' | 'visual' | 'performance' | 'accuracy' | 'edge-case';
  device: string;
  browser: string;
  status: 'queued' | 'running' | 'passed' | 'failed' | 'skipped';
  progress: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
  screenshot?: string;
  logs: string[];
  accuracy?: number;
  confidence?: number;
}

export interface TestConfiguration {
  browsers: string[];
  devices: string[];
  environments: string[];
  testTypes: string[];
  parallel: boolean;
  maxParallel: number;
}

export interface TestMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface ModelPerformanceData {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
}

export interface UserFeedback {
  id: string;
  testId: string;
  userId: string;
  rating: number;
  comment: string;
  timestamp: string;
  category: 'accuracy' | 'performance' | 'usability';
}

export interface EdgeCaseScenario {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastRun?: string;
  passRate: number;
}
