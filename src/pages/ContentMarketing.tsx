
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ContentMarketingDashboard from '@/components/content/ContentMarketingDashboard';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import SEOHead from '@/components/SEOHead';

const ContentMarketing: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SEOHead 
        title="Content Marketing & SEO"
        description="Optimize your content strategy for organic growth with advanced SEO tools and analytics"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SubscriptionBanner />
          <ContentMarketingDashboard />
        </div>
      </div>
    </>
  );
};

export default ContentMarketing;
