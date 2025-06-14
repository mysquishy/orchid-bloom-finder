
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ModelPerformanceData, TestMetric } from '@/utils/aiTestingTypes';
import TestMetricsCard from '@/components/ai-testing/shared/TestMetricsCard';
import { RefreshCw } from 'lucide-react';

interface ModelPerformanceMonitorProps {
  performanceData: ModelPerformanceData;
  metrics: TestMetric[];
  refreshMetrics: () => void;
}

const ModelPerformanceMonitor: React.FC<ModelPerformanceMonitorProps> = ({
  performanceData,
  metrics,
  refreshMetrics
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Model Performance Monitor</h2>
        <Button onClick={refreshMetrics} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Metrics
        </Button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <TestMetricsCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Detailed Performance Data */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {performanceData.accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {performanceData.precision.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Precision</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {performanceData.recall.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Recall</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {performanceData.f1Score.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">F1 Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelPerformanceMonitor;
