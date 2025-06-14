
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TestExecution, TestConfiguration } from '@/utils/aiTestingTypes';
import { calculateOverallProgress, getTestStatusCounts } from '@/utils/testingUtils';
import { Play, Square } from 'lucide-react';
import TestMetricsCard from '@/components/ai-testing/shared/TestMetricsCard';

interface AccuracyTestingPanelProps {
  testExecutions: TestExecution[];
  isRunning: boolean;
  selectedConfig: TestConfiguration;
  startTestRun: () => void;
  stopTestRun: () => void;
}

const AccuracyTestingPanel: React.FC<AccuracyTestingPanelProps> = ({
  testExecutions,
  isRunning,
  selectedConfig,
  startTestRun,
  stopTestRun
}) => {
  const overallProgress = calculateOverallProgress(testExecutions);
  const statusCounts = getTestStatusCounts(testExecutions);
  const accuracyTests = testExecutions.filter(test => test.type === 'accuracy');

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Test Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Button onClick={startTestRun} disabled={isRunning}>
              <Play className="w-4 h-4 mr-2" />
              Start Accuracy Tests
            </Button>
            <Button onClick={stopTestRun} disabled={!isRunning} variant="outline">
              <Square className="w-4 h-4 mr-2" />
              Stop Tests
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{statusCounts.passed + statusCounts.failed}/{testExecutions.length} tests completed</span>
            </div>
            <Progress value={overallProgress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accuracyTests.map((test) => (
              <div key={test.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{test.name}</h3>
                  <Badge className={test.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {test.status}
                  </Badge>
                </div>
                {test.accuracy && (
                  <p className="text-sm text-gray-600">
                    Accuracy: {test.accuracy}% | Confidence: {test.confidence}
                  </p>
                )}
                {test.status === 'running' && (
                  <Progress value={test.progress} className="mt-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccuracyTestingPanel;
