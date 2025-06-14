
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TestMetric } from '@/utils/aiTestingTypes';
import { getMetricStatusColor } from '@/utils/testingUtils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TestMetricsCardProps {
  metric: TestMetric;
}

const TestMetricsCard: React.FC<TestMetricsCardProps> = ({ metric }) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{metric.name}</p>
            <p className={`text-2xl font-bold ${getMetricStatusColor(metric.status)}`}>
              {metric.value.toFixed(1)}
              <span className="text-sm font-normal ml-1">{metric.unit}</span>
            </p>
            <p className="text-xs text-gray-500">
              Threshold: {metric.threshold}{metric.unit}
            </p>
          </div>
          <div className="flex flex-col items-end">
            {getTrendIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestMetricsCard;
