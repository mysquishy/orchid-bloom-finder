
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

export const usePremiumAccess = () => {
  const { subscribed, canIdentify, remainingIdentifications } = useSubscription();
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    setHasAccess(!!subscribed);
  }, [subscribed]);

  const checkFeatureAccess = (feature: 'identification' | 'disease-detection' | 'analytics' | 'weather' | 'export' | 'collection') => {
    if (!user) return { hasAccess: false, reason: 'authentication' };
    
    switch (feature) {
      case 'identification':
        return {
          hasAccess: subscribed || canIdentify,
          reason: subscribed ? 'premium' : canIdentify ? 'free-limit' : 'limit-exceeded',
          remainingUses: subscribed ? -1 : remainingIdentifications
        };
      
      case 'disease-detection':
      case 'analytics':
      case 'weather':
      case 'export':
        return {
          hasAccess: subscribed,
          reason: subscribed ? 'premium' : 'premium-only'
        };
      
      case 'collection':
        return {
          hasAccess: subscribed || true, // Basic collection is free, unlimited is premium
          reason: subscribed ? 'premium' : 'free-limited'
        };
      
      default:
        return { hasAccess: false, reason: 'unknown' };
    }
  };

  return {
    isPremium: subscribed,
    hasAccess,
    checkFeatureAccess,
    canIdentify,
    remainingIdentifications
  };
};
