
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QualityAssuranceDashboard from '@/components/testing/QualityAssuranceDashboard';
import AutomatedTestRunner from '@/components/testing/AutomatedTestRunner';
import VisualRegressionTesting from '@/components/testing/VisualRegressionTesting';
import SecurityTestingSuite from '@/components/testing/SecurityTestingSuite';
import PerformanceOptimizationSuite from '@/components/testing/PerformanceOptimizationSuite';

const QualityAssurance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quality Assurance <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Center</span>
          </h1>
          <p className="text-xl text-gray-600">
            Advanced automated testing and quality monitoring for Orkhidly
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="automation">Test Automation</TabsTrigger>
            <TabsTrigger value="visual">Visual Testing</TabsTrigger>
            <TabsTrigger value="security">Security Testing</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <QualityAssuranceDashboard />
          </TabsContent>

          <TabsContent value="automation">
            <AutomatedTestRunner />
          </TabsContent>

          <TabsContent value="visual">
            <VisualRegressionTesting />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTestingSuite />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceOptimizationSuite />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QualityAssurance;
