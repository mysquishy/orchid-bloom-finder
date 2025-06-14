
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { userAnalytics } from '@/utils/userAnalytics';

export const useAnalyticsTracking = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Track page view
      userAnalytics.trackPageView(user.id, location.pathname);
    }
  }, [location, user]);

  const trackUserAction = (action: string, metadata?: Record<string, any>) => {
    if (user) {
      userAnalytics.trackUserAction(user.id, action, metadata);
    }
  };

  const trackFeatureUsage = (feature: string, timeSpent: number) => {
    if (user) {
      userAnalytics.trackFeatureUsage(user.id, feature, timeSpent);
    }
  };

  const trackJourneyEvent = (eventType: 'registration_start' | 'registration_complete' | 'first_identification' | 'feature_adoption' | 'churn_risk', data: Record<string, any>) => {
    if (user) {
      userAnalytics.trackUserJourney({
        user_id: user.id,
        event_type: eventType,
        event_data: data,
        timestamp: new Date().toISOString()
      });
    }
  };

  return {
    trackUserAction,
    trackFeatureUsage,
    trackJourneyEvent
  };
};
