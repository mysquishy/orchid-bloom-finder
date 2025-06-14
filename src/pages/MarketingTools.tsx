
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PremiumGate from '@/components/PremiumGate';
import MarketingDashboard from '@/components/marketing/MarketingDashboard';
import SubscriptionBanner from '@/components/SubscriptionBanner';

const MarketingTools: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SubscriptionBanner />
        
        <PremiumGate feature="analytics">
          <MarketingDashboard />
        </PremiumGate>
      </div>
    </div>
  );
};

export default MarketingTools;
