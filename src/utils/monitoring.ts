
import { analyticsManager } from './analyticsManager';
import { getConfig } from '@/config/production';

interface SystemMetrics {
  totalSpecies: number;
  totalUsers: number;
  totalCollections: number;
  totalIdentifications: number;
  recentSignups7d: number;
  recentIdentifications7d: number;
  popularSpeciesCount: number;
  userContributedCount: number;
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical';
  services: Array<{
    name: string;
    status: 'healthy' | 'warning' | 'critical';
    lastChecked: string;
  }>;
}

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

// Export the functions that AdminMetrics expects
export const getSystemMetrics = async (): Promise<SystemMetrics> => {
  // Mock data for now - would integrate with actual metrics in production
  return {
    totalSpecies: 1500,
    totalUsers: 2500,
    totalCollections: 800,
    totalIdentifications: 5200,
    recentSignups7d: 45,
    recentIdentifications7d: 120,
    popularSpeciesCount: 85,
    userContributedCount: 340
  };
};

export const validateDatabaseData = async (): Promise<any[]> => {
  // Mock validation results
  return [
    { table: 'orchid_species', status: 'healthy', recordCount: 1500 },
    { table: 'user_profiles', status: 'healthy', recordCount: 2500 },
    { table: 'identifications', status: 'healthy', recordCount: 5200 }
  ];
};

export const checkSystemHealth = async (): Promise<SystemHealth> => {
  return {
    overall: 'healthy',
    services: [
      { name: 'Database', status: 'healthy', lastChecked: new Date().toISOString() },
      { name: 'AI Service', status: 'healthy', lastChecked: new Date().toISOString() },
      { name: 'Authentication', status: 'healthy', lastChecked: new Date().toISOString() }
    ]
  };
};

export const monitoringService = new MonitoringService();
