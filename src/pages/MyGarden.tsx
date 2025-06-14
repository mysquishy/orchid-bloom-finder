
import React from 'react';
import MyGarden from '@/components/MyGarden';
import SubscriptionBanner from '@/components/SubscriptionBanner';

const MyGardenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SubscriptionBanner />
        <MyGarden />
      </div>
    </div>
  );
};

export default MyGardenPage;
