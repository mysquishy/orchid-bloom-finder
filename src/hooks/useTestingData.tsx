
import { useState, useEffect } from 'react';
import { TestExecution, TestConfiguration } from '@/utils/aiTestingTypes';
import { generateMockTestData } from '@/utils/testingUtils';

export const useTestingData = () => {
  const [testExecutions, setTestExecutions] = useState<TestExecution[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<TestConfiguration>({
    browsers: ['Chrome', 'Firefox', 'Safari'],
    devices: ['Desktop', 'Mobile', 'Tablet'],
    environments: ['staging', 'production'],
    testTypes: ['accuracy', 'performance', 'edge-case'],
    parallel: true,
    maxParallel: 4
  });

  useEffect(() => {
    setTestExecutions(generateMockTestData());
  }, []);

  const startTestRun = async () => {
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

  const updateTestConfiguration = (config: Partial<TestConfiguration>) => {
    setSelectedConfig(prev => ({ ...prev, ...config }));
  };

  return {
    testExecutions,
    isRunning,
    selectedConfig,
    startTestRun,
    stopTestRun,
    updateTestConfiguration,
    setTestExecutions
  };
};
