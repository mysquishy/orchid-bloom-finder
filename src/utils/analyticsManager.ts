
import { supabase } from '@/integrations/supabase/client';
import { environment } from './environmentConfig';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  errorRate: number;
  userEngagement: number;
}

class AnalyticsManager {
  private isEnabled: boolean;
  private sessionId: string;
  private userId: string | null = null;

  constructor() {
    this.isEnabled = environment.isProduction;
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeSession() {
    if (!this.isEnabled) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      this.userId = user?.id || null;

      // Track session start
      this.track('session_start', {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pathname: window.location.pathname,
      });
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }

  public track(event: string, properties: Record<string, any> = {}): void {
    if (!this.isEnabled) {
      console.log('Analytics (dev):', event, properties);
      return;
    }

    try {
      const eventData: AnalyticsEvent = {
        event,
        properties: {
          ...properties,
          sessionId: this.sessionId,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userId: this.userId,
        },
      };

      // Store analytics data in a simple way for now
      // In production, you might want to create a custom analytics table
      console.log('Analytics event:', eventData);

    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }

  public trackError(error: Error, context?: Record<string, any>): void {
    this.track('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      ...context,
    });
  }

  public trackPerformance(metrics: Partial<PerformanceMetrics>): void {
    this.track('performance_metrics', metrics);
  }

  public trackUserAction(action: string, data?: Record<string, any>): void {
    this.track('user_action', {
      action,
      ...data,
    });
  }

  public trackPlantIdentification(confidence: number, species: string): void {
    this.track('plant_identification', {
      confidence,
      species,
      success: confidence > 0.7,
    });
  }
}

export const analyticsManager = new AnalyticsManager();
