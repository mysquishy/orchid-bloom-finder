
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';

const UsageIndicator: React.FC = () => {
  const { user } = useAuth();
  const { checkFeatureAccess, remainingIdentifications } = usePremiumAccess();

  if (!user) return null;

  const access = checkFeatureAccess('identification');

  if (!access.hasAccess) {
    return (
      <div className="flex items-center justify-center mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
        <span className="text-yellow-800 text-sm">
          Monthly limit reached - Upgrade to Premium for unlimited identifications
        </span>
      </div>
    );
  }

  if (remainingIdentifications !== undefined && remainingIdentifications >= 0) {
    return (
      <div className="flex items-center justify-center mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <span className="text-blue-800 text-sm">
          {remainingIdentifications} free identifications remaining this month
        </span>
      </div>
    );
  }

  return null;
};

export default UsageIndicator;
