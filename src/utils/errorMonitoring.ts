
import { logError } from './errorLogger';

// Enhanced error monitoring with alerting
export interface ErrorAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  count: number;
  firstSeen: Date;
  lastSeen: Date;
  resolved: boolean;
}

class ErrorMonitoringService {
  private errors = new Map<string, ErrorAlert>();
  private thresholds = {
    critical: 5, // 5 errors in 5 minutes
    warning: 10,  // 10 errors in 15 minutes
    timeWindow: 300000 // 5 minutes
  };

  track(error: Error, context?: Record<string, any>) {
    const errorKey = this.getErrorKey(error);
    const now = new Date();

    // Log the error
    logError(error, context);

    // Track for alerting
    const existing = this.errors.get(errorKey);
    if (existing) {
      existing.count++;
      existing.lastSeen = now;
    } else {
      this.errors.set(errorKey, {
        id: errorKey,
        type: this.getErrorType(error),
        message: error.message,
        count: 1,
        firstSeen: now,
        lastSeen: now,
        resolved: false
      });
    }

    this.checkAlerts(errorKey);
    this.cleanupOldErrors();
  }

  private getErrorKey(error: Error): string {
    return `${error.name}-${error.message.substring(0, 50)}`;
  }

  private getErrorType(error: Error): 'critical' | 'warning' | 'info' {
    if (error.name === 'ChunkLoadError' || error.message.includes('Network')) {
      return 'critical';
    }
    if (error.name === 'TypeError' || error.message.includes('undefined')) {
      return 'warning';
    }
    return 'info';
  }

  private checkAlerts(errorKey: string) {
    const error = this.errors.get(errorKey);
    if (!error || error.resolved) return;

    const timeSinceFirst = Date.now() - error.firstSeen.getTime();
    
    if (timeSinceFirst <= this.thresholds.timeWindow) {
      if (error.count >= this.thresholds.critical && error.type === 'critical') {
        this.sendAlert(error, 'critical');
      } else if (error.count >= this.thresholds.warning) {
        this.sendAlert(error, 'warning');
      }
    }
  }

  private async sendAlert(error: ErrorAlert, severity: 'critical' | 'warning') {
    console.error(`${severity.toUpperCase()} ALERT:`, error);

    // Send to monitoring service
    try {
      await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'error_alert',
          severity,
          error: {
            message: error.message,
            count: error.count,
            timespan: Date.now() - error.firstSeen.getTime()
          },
          timestamp: new Date().toISOString()
        })
      });
    } catch (alertError) {
      console.error('Failed to send alert:', alertError);
    }

    // Browser notification for critical errors
    if (severity === 'critical' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Critical Error Detected', {
        body: `${error.message} (${error.count} occurrences)`,
        icon: '/favicon.ico',
        tag: 'critical-error'
      });
    }
  }

  private cleanupOldErrors() {
    const cutoff = Date.now() - (this.thresholds.timeWindow * 2);
    
    for (const [key, error] of this.errors.entries()) {
      if (error.lastSeen.getTime() < cutoff) {
        this.errors.delete(key);
      }
    }
  }

  getActiveAlerts(): ErrorAlert[] {
    return Array.from(this.errors.values()).filter(error => !error.resolved);
  }

  resolveAlert(alertId: string) {
    const error = this.errors.get(alertId);
    if (error) {
      error.resolved = true;
    }
  }

  getErrorStats() {
    const errors = Array.from(this.errors.values());
    const now = Date.now();
    const last24h = errors.filter(e => now - e.lastSeen.getTime() < 86400000);
    
    return {
      total: errors.length,
      last24h: last24h.length,
      critical: errors.filter(e => e.type === 'critical' && !e.resolved).length,
      warnings: errors.filter(e => e.type === 'warning' && !e.resolved).length
    };
  }
}

export const errorMonitor = new ErrorMonitoringService();

// Global error handler
window.addEventListener('error', (event) => {
  errorMonitor.track(event.error || new Error(event.message), {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    type: 'javascript_error'
  });
});

window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
  errorMonitor.track(error, {
    type: 'unhandled_promise_rejection'
  });
});
