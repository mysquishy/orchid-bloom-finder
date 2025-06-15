
import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(() => {
    // Safe check for navigator with fallback
    try {
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'onLine' in navigator) {
        return navigator.onLine;
      }
    } catch (error) {
      console.warn('Navigator not available:', error);
    }
    return true; // Default to online if navigator is not available
  });
  const [lastOffline, setLastOffline] = useState<Date | null>(null);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Additional safety check for event listeners
    if (!window.addEventListener) {
      return;
    }

    const handleOnline = () => {
      setIsOnline(true);
      console.log('Network: Back online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setLastOffline(new Date());
      console.log('Network: Gone offline');
    };

    try {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    } catch (error) {
      console.warn('Failed to add network event listeners:', error);
    }
  }, []);

  return { isOnline, lastOffline };
};
