
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnterpriseTestingSuite from '@/components/testing/EnterpriseTestingSuite';
import AdvancedMonitoringDashboard from '@/components/testing/AdvancedMonitoringDashboard';
import AutomatedTestRunner from '@/components/testing/AutomatedTestRunner';
import SecurityTestingSuite from '@/components/testing/SecurityTestingSuite';
import QualityAssuranceDashboard from '@/components/testing/QualityAssuranceDashboard';

const EnterpriseQualityAssurance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Quality Assurance</span>
          </h1>
          <p className="text-xl text-gray-600">
            Advanced testing, monitoring, and quality systems for enterprise-scale operations
          </p>
        </div>

        <Tabs defaultValue="enterprise-testing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="enterprise-testing">Enterprise Testing</TabsTrigger>
            <TabsTrigger value="advanced-monitoring">Advanced Monitoring</TabsTrigger>
            <TabsTrigger value="automation">Test Automation</TabsTrigger>
            <TabsTrigger value="security">Security & Compliance</TabsTrigger>
            <TabsTrigger value="overview">QA Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="enterprise-testing">
            <EnterpriseTestingSuite />
          </TabsContent>

          <TabsContent value="advanced-monitoring">
            <AdvancedMonitoringDashboard />
          </TabsContent>

          <TabsContent value="automation">
            <AutomatedTestRunner />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTestingSuite />
          </TabsContent>

          <TabsContent value="overview">
            <QualityAssuranceDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnterpriseQualityAssurance;
