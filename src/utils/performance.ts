
// Performance monitoring and optimization utilities
export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  memoryUsage?: number;
}

export const measurePerformance = (): PerformanceMetrics => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
  const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0;
  
  return {
    loadTime: navigation.loadEventEnd - navigation.fetchStart,
    firstContentfulPaint: fcp,
    largestContentfulPaint: lcp,
    cumulativeLayoutShift: 0, // Would need CLS observer
    firstInputDelay: 0, // Would need FID observer
    memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
  };
};

export const trackPerformanceMetrics = async () => {
  const metrics = measurePerformance();
  
  // Send to analytics
  try {
    await fetch('/api/performance-metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...metrics,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      })
    });
  } catch (error) {
    console.error('Failed to track performance metrics:', error);
  }
};

// Memory management utilities
export const optimizeMemoryUsage = () => {
  // Clear unused caches periodically
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        if (name.includes('old-') || name.includes('temp-')) {
          caches.delete(name);
        }
      });
    });
  }
  
  // Clear large objects from memory
  if ((window as any).clearTemporaryData) {
    (window as any).clearTemporaryData();
  }
};

// Network optimization
export const optimizeNetworkRequests = () => {
  // Preload critical resources
  const criticalResources = [
    '/api/orchid-species?popular=true&limit=10',
    '/api/user/profile'
  ];
  
  criticalResources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};
