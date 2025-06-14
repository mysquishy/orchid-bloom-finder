
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
  user_id?: string;
  session_id?: string;
}

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase.from('app_analytics').insert({
      event_type: event.event_type,
      event_data: event.event_data || {},
      user_id: event.user_id || user?.id,
      session_id: event.session_id || generateSessionId(),
      user_agent: navigator.userAgent
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

export const trackPageView = (page: string) => {
  trackEvent({
    event_type: 'page_view',
    event_data: { page, timestamp: new Date().toISOString() }
  });
};

export const trackUserAction = (action: string, data?: Record<string, any>) => {
  trackEvent({
    event_type: 'user_action',
    event_data: { action, ...data }
  });
};

export const trackOrchidIdentification = (speciesName: string, confidence: number) => {
  trackEvent({
    event_type: 'orchid_identification',
    event_data: { 
      species_name: speciesName, 
      confidence_score: confidence,
      timestamp: new Date().toISOString()
    }
  });
};

export const trackSearchQuery = (query: string, resultsCount: number) => {
  trackEvent({
    event_type: 'search_query',
    event_data: { 
      query, 
      results_count: resultsCount,
      timestamp: new Date().toISOString()
    }
  });
};

const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
