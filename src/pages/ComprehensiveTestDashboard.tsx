
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestResultsVisualization from '@/components/testing/TestResultsVisualization';
import AutomatedTestManagement from '@/components/testing/AutomatedTestManagement';
import QualityMetricsTracking from '@/components/testing/QualityMetricsTracking';
import TestingAlertSystem from '@/components/testing/TestingAlertSystem';
import TestingReports from '@/components/testing/TestingReports';

const ComprehensiveTestDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orkhidly Testing Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive testing and quality assurance monitoring</p>
        </div>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="results">Test Results</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            <TestResultsVisualization />
          </TabsContent>

          <TabsContent value="automation">
            <AutomatedTestManagement />
          </TabsContent>

          <TabsContent value="quality">
            <QualityMetricsTracking />
          </TabsContent>

          <TabsContent value="alerts">
            <TestingAlertSystem />
          </TabsContent>

          <TabsContent value="reports">
            <TestingReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveTestDashboard;
