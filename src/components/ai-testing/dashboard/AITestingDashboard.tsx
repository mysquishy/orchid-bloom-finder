
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccuracyTestingPanel from '@/components/ai-testing/accuracy/AccuracyTestingPanel';
import ModelPerformanceMonitor from '@/components/ai-testing/monitoring/ModelPerformanceMonitor';
import UserFeedbackIntegration from '@/components/ai-testing/feedback/UserFeedbackIntegration';
import EdgeCaseTestSuite from '@/components/ai-testing/edge-cases/EdgeCaseTestSuite';
import ContinuousImprovementSystem from '@/components/ai-testing/improvement/ContinuousImprovementSystem';
import { useTestingData } from '@/hooks/useTestingData';
import { useModelPerformance } from '@/hooks/useModelPerformance';

const AITestingDashboard: React.FC = () => {
  const testingData = useTestingData();
  const performanceData = useModelPerformance();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">AI Testing Dashboard</h1>
      </div>

      <Tabs defaultValue="accuracy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="accuracy">Accuracy Testing</TabsTrigger>
          <TabsTrigger value="performance">Performance Monitor</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          <TabsTrigger value="edge-cases">Edge Cases</TabsTrigger>
          <TabsTrigger value="improvement">Continuous Improvement</TabsTrigger>
        </TabsList>

        <TabsContent value="accuracy">
          <AccuracyTestingPanel {...testingData} />
        </TabsContent>

        <TabsContent value="performance">
          <ModelPerformanceMonitor {...performanceData} />
        </TabsContent>

        <TabsContent value="feedback">
          <UserFeedbackIntegration />
        </TabsContent>

        <TabsContent value="edge-cases">
          <EdgeCaseTestSuite />
        </TabsContent>

        <TabsContent value="improvement">
          <ContinuousImprovementSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITestingDashboard;
