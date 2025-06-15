
interface ProductionConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  features: {
    analytics: boolean;
    errorTracking: boolean;
    performanceMonitoring: boolean;
  };
  security: {
    enableCSP: boolean;
    enableHSTS: boolean;
    enableCORS: boolean;
  };
  caching: {
    enableServiceWorker: boolean;
    cacheStrategy: 'networkFirst' | 'cacheFirst';
    maxAge: number;
  };
}

export const productionConfig: ProductionConfig = {
  api: {
    baseUrl: window.location.origin,
    timeout: 30000,
    retries: 3,
  },
  features: {
    analytics: true,
    errorTracking: true,
    performanceMonitoring: true,
  },
  security: {
    enableCSP: true,
    enableHSTS: true,
    enableCORS: true,
  },
  caching: {
    enableServiceWorker: true,
    cacheStrategy: 'networkFirst',
    maxAge: 86400000, // 24 hours
  },
};

// Environment-specific overrides
export const getConfig = (): ProductionConfig => {
  const config = { ...productionConfig };
  
  if (import.meta.env.DEV) {
    config.features.analytics = false;
    config.features.errorTracking = false;
    config.caching.enableServiceWorker = false;
  }
  
  return config;
};
