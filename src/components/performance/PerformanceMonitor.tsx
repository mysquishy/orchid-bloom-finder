
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, Clock, Database } from 'lucide-react';
import { measurePerformance, trackPerformanceMetrics, optimizeMemoryUsage } from '@/utils/performance';
import { advancedCache } from '@/utils/advancedCache';

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [cacheStats, setCacheStats] = useState<any>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const performanceMetrics = measurePerformance();
      const cacheData = advancedCache.getStats();
      
      setMetrics(performanceMetrics);
      setCacheStats(cacheData);
    };

    // Initial measurement
    updateMetrics();

    // Update every 30 seconds
    const interval = setInterval(updateMetrics, 30000);

    // Track performance metrics
    trackPerformanceMetrics();

    // Optimize memory usage periodically
    const memoryOptimizer = setInterval(optimizeMemoryUsage, 300000); // 5 minutes

    return () => {
      clearInterval(interval);
      clearInterval(memoryOptimizer);
    };
  }, []);

  const formatTime = (time: number) => {
    return time < 1000 ? `${Math.round(time)}ms` : `${(time / 1000).toFixed(2)}s`;
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const getPerformanceScore = () => {
    if (!metrics) return 0;
    
    let score = 100;
    if (metrics.loadTime > 3000) score -= 30;
    if (metrics.firstContentfulPaint > 1800) score -= 20;
    if (metrics.largestContentfulPaint > 2500) score -= 25;
    if (metrics.memoryUsage > 50 * 1024 * 1024) score -= 15; // 50MB
    
    return Math.max(0, score);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (!metrics) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Activity className="w-6 h-6 animate-spin mr-2" />
            <span>Measuring performance...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const performanceScore = getPerformanceScore();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Performance Monitor
            <Badge className={getScoreColor(performanceScore)}>
              Score: {performanceScore}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Load Time</p>
              <p className="font-semibold">{formatTime(metrics.loadTime)}</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">First Paint</p>
              <p className="font-semibold">{formatTime(metrics.firstContentfulPaint)}</p>
            </div>
            <div className="text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">Memory Usage</p>
              <p className="font-semibold">{formatBytes(metrics.memoryUsage || 0)}</p>
            </div>
            <div className="text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-sm text-gray-600">LCP</p>
              <p className="font-semibold">{formatTime(metrics.largestContentfulPaint)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {cacheStats && (
        <Card>
          <CardHeader>
            <CardTitle>Cache Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Cache Entries</p>
                <p className="font-semibold">{cacheStats.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cache Size</p>
                <p className="font-semibold">{formatBytes(cacheStats.currentSize)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hit Rate</p>
                <p className="font-semibold">{(cacheStats.hitRate * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Max Size</p>
                <p className="font-semibold">{formatBytes(cacheStats.maxSize)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceMonitor;
