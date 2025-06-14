
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import ProductionLaunchDashboard from '@/components/launch/ProductionLaunchDashboard';
import UserOnboardingFlow from '@/components/onboarding/UserOnboardingFlow';
import HelpCenter from '@/components/support/HelpCenter';
import SystemMonitoring from '@/components/monitoring/SystemMonitoring';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductionLaunch: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Production Launch - OrchidAI</title>
        <meta name="description" content="Production launch preparation and system monitoring for OrchidAI." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Production Launch Center</h1>
            <p className="text-gray-600">
              Comprehensive production readiness dashboard and launch preparation tools.
            </p>
          </div>

          <Tabs defaultValue="launch" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="launch">Launch Dashboard</TabsTrigger>
              <TabsTrigger value="onboarding">User Onboarding</TabsTrigger>
              <TabsTrigger value="help">Help Center</TabsTrigger>
              <TabsTrigger value="monitoring">System Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="launch">
              <ProductionLaunchDashboard />
            </TabsContent>

            <TabsContent value="onboarding">
              <UserOnboardingFlow />
            </TabsContent>

            <TabsContent value="help">
              <HelpCenter />
            </TabsContent>

            <TabsContent value="monitoring">
              <SystemMonitoring />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProductionLaunch;
