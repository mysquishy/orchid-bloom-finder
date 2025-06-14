
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PremiumGate from '@/components/PremiumGate';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import SubscriptionBanner from '@/components/SubscriptionBanner';

const Analytics: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SubscriptionBanner />
        
        <PremiumGate feature="analytics">
          <AnalyticsDashboard />
        </PremiumGate>
      </div>
    </div>
  );
};

export default Analytics;
