
import { useState, useEffect } from 'react';
import { ModelPerformanceData, TestMetric } from '@/utils/aiTestingTypes';

export const useModelPerformance = () => {
  const [performanceData, setPerformanceData] = useState<ModelPerformanceData>({
    accuracy: 94.5,
    precision: 92.1,
    recall: 89.7,
    f1Score: 90.9,
    responseTime: 1.2,
    throughput: 850,
    errorRate: 2.1
  });

  const [metrics, setMetrics] = useState<TestMetric[]>([
    {
      id: '1',
      name: 'Model Accuracy',
      value: 94.5,
      unit: '%',
      threshold: 90,
      status: 'good',
      trend: 'up'
    },
    {
      id: '2',
      name: 'Response Time',
      value: 1.2,
      unit: 's',
      threshold: 2.0,
      status: 'good',
      trend: 'stable'
    },
    {
      id: '3',
      name: 'Error Rate',
      value: 2.1,
      unit: '%',
      threshold: 5.0,
      status: 'good',
      trend: 'down'
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPerformanceData(prev => ({
        ...prev,
        accuracy: prev.accuracy + (Math.random() - 0.5) * 0.5,
        responseTime: Math.max(0.5, prev.responseTime + (Math.random() - 0.5) * 0.2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshMetrics = () => {
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value + (Math.random() - 0.5) * 2,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    })));
  };

  return {
    performanceData,
    metrics,
    refreshMetrics
  };
};
