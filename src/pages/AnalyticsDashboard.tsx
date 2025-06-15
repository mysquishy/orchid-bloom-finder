
import React from 'react';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import SEOHead from '@/components/SEOHead';

const AnalyticsDashboardPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Analytics Dashboard - Orchid Care Insights"
        description="Comprehensive analytics for your orchid care journey with detailed insights, trends, and performance metrics."
        keywords="orchid analytics, plant care insights, data dashboard, care metrics"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <AnalyticsDashboard />
      </div>
    </>
  );
};

export default AnalyticsDashboardPage;
