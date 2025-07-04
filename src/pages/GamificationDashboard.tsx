
import React from 'react';
import GamificationDashboard from '@/components/gamification/GamificationDashboard';
import SEOHead from '@/components/SEOHead';

const GamificationDashboardPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Gamification - Track Your Orchid Care Journey"
        description="Track your progress, earn achievements, maintain care streaks, and compete with fellow orchid enthusiasts in our engaging gamification system."
        keywords="gamification, achievements, orchid care, plant tracking"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <GamificationDashboard />
      </div>
    </>
  );
};

export default GamificationDashboardPage;
