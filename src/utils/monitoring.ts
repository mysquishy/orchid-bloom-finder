
import { analyticsManager } from './analyticsManager';
import { getConfig } from '@/config/production';

class MonitoringService {
  private config = getConfig();
  private performanceObserver?: PerformanceObserver;

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    if (!this.config.features.performanceMonitoring) return;

    // Monitor page load performance
    this.trackPageLoad();
    
    // Monitor API calls
    this.monitorApiCalls();
    
    // Monitor errors
    this.monitorErrors();
    
    // Monitor user interactions
    this.monitorUserInteractions();
  }

  private trackPageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      analyticsManager.trackPerformance({
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
      });
    });
  }

  private monitorApiCalls() {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = performance.now();
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        
        analyticsManager.trackPerformance({
          apiResponseTime: endTime - startTime,
        });
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        
        analyticsManager.trackError(error as Error, {
          context: 'api_call',
          duration: endTime - startTime,
          url: args[0],
        });
        
        throw error;
      }
    };
  }

  private monitorErrors() {
    window.addEventListener('error', (event) => {
      analyticsManager.trackError(event.error, {
        context: 'global_error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      analyticsManager.trackError(new Error(event.reason), {
        context: 'unhandled_promise_rejection',
      });
    });
  }

  private monitorUserInteractions() {
    let lastInteraction = Date.now();
    let sessionDuration = 0;

    const trackInteraction = () => {
      const now = Date.now();
      sessionDuration += now - lastInteraction;
      lastInteraction = now;
    };

    ['click', 'scroll', 'keypress'].forEach(event => {
      document.addEventListener(event, trackInteraction, { passive: true });
    });

    // Track session duration periodically
    setInterval(() => {
      if (sessionDuration > 0) {
        analyticsManager.trackPerformance({
          userEngagement: sessionDuration / 1000, // in seconds
        });
        sessionDuration = 0;
      }
    }, 30000); // Every 30 seconds
  }
}

export const monitoringService = new MonitoringService();
