
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserJourneyAnalytics from '@/components/analytics/UserJourneyAnalytics';
import FeatureUsageAnalytics from '@/components/analytics/FeatureUsageAnalytics';
import BusinessMetricsDashboard from '@/components/admin/BusinessMetricsDashboard';
import OrchidSpecificMetrics from '@/components/analytics/OrchidSpecificMetrics';
import RealTimeMonitoring from '@/components/analytics/RealTimeMonitoring';

const UserAnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive insights into user behavior, feature adoption, and business metrics
          </p>
        </div>

        <Tabs defaultValue="journey" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="journey">User Journey</TabsTrigger>
            <TabsTrigger value="features">Feature Usage</TabsTrigger>
            <TabsTrigger value="business">Business Metrics</TabsTrigger>
            <TabsTrigger value="orchid">Orchid Metrics</TabsTrigger>
            <TabsTrigger value="realtime">Real-Time</TabsTrigger>
          </TabsList>

          <TabsContent value="journey" className="space-y-6">
            <UserJourneyAnalytics />
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <FeatureUsageAnalytics />
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <BusinessMetricsDashboard />
          </TabsContent>

          <TabsContent value="orchid" className="space-y-6">
            <OrchidSpecificMetrics />
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <RealTimeMonitoring />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAnalyticsPage;
