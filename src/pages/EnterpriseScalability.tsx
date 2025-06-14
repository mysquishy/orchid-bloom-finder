
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScalabilityManager from '@/components/infrastructure/ScalabilityManager';
import EnterpriseFeatures from '@/components/enterprise/EnterpriseFeatures';
import GlobalExpansion from '@/components/international/GlobalExpansion';
import ApiMarketplace from '@/components/integrations/ApiMarketplace';
import { LoadBalancingManager } from '@/components/performance/LoadBalancingManager';

const EnterpriseScalability: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Scalability</span>
          </h1>
          <p className="text-xl text-gray-600">
            Massive scale infrastructure, enterprise features, and global operations for Orkhidly
          </p>
        </div>

        <Tabs defaultValue="infrastructure" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise Features</TabsTrigger>
            <TabsTrigger value="global">Global Expansion</TabsTrigger>
            <TabsTrigger value="integrations">API Marketplace</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="infrastructure">
            <ScalabilityManager />
          </TabsContent>

          <TabsContent value="enterprise">
            <EnterpriseFeatures />
          </TabsContent>

          <TabsContent value="global">
            <GlobalExpansion />
          </TabsContent>

          <TabsContent value="integrations">
            <ApiMarketplace />
          </TabsContent>

          <TabsContent value="operations">
            <LoadBalancingManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnterpriseScalability;
