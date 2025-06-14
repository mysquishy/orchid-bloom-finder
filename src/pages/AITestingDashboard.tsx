
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIAccuracyDashboard from '@/components/ai-testing/AIAccuracyDashboard';
import IdentificationTesting from '@/components/ai-testing/IdentificationTesting';
import FeedbackCollectionSystem from '@/components/ai-testing/FeedbackCollectionSystem';

const AITestingDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Accuracy Testing Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive monitoring and improvement of orchid identification accuracy</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Accuracy Overview</TabsTrigger>
            <TabsTrigger value="testing">Identification Testing</TabsTrigger>
            <TabsTrigger value="feedback">Feedback System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AIAccuracyDashboard />
          </TabsContent>

          <TabsContent value="testing">
            <IdentificationTesting />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackCollectionSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITestingDashboard;
