
// Service Worker utilities for offline premium features
export const registerOptimizedServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('Service Worker registered:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              showUpdateNotification();
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

const showUpdateNotification = () => {
  // Show a notification that an update is available
  if (Notification.permission === 'granted') {
    new Notification('OrchidAI Update Available', {
      body: 'A new version of OrchidAI is available. Refresh to update.',
      icon: '/favicon.ico',
      tag: 'app-update'
    });
  }
};

// Background sync for premium features
export const scheduleBackgroundSync = (tag: string, data?: any) => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then(registration => {
      return registration.sync.register(tag);
    }).catch(err => {
      console.error('Background sync registration failed:', err);
    });
  }
};

// Offline feature detection
export const isOfflineCapable = () => {
  return 'serviceWorker' in navigator && 'caches' in window;
};

// Cache management for premium features
export const cacheDataForOffline = async (url: string, data: any) => {
  if (!isOfflineCapable()) return false;

  try {
    const cache = await caches.open('orchidai-offline-data');
    const response = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(url, response);
    return true;
  } catch (error) {
    console.error('Failed to cache data for offline:', error);
    return false;
  }
};

// Retrieve offline data
export const getOfflineData = async (url: string) => {
  if (!isOfflineCapable()) return null;

  try {
    const cache = await caches.open('orchidai-offline-data');
    const response = await cache.match(url);
    if (response) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Failed to get offline data:', error);
    return null;
  }
};
