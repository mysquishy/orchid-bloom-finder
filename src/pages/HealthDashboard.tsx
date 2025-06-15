
import React from 'react';
import HealthMonitoringDashboard from '@/components/health/HealthMonitoringDashboard';
import SEOHead from '@/components/SEOHead';

const HealthDashboard: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Health Dashboard - Monitor Your Orchid Health"
        description="Advanced health monitoring for your orchid collection with AI-powered analysis, growth tracking, and personalized care recommendations."
        keywords="orchid health, plant monitoring, AI analysis, growth tracking"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <HealthMonitoringDashboard />
      </div>
    </>
  );
};

export default HealthDashboard;
