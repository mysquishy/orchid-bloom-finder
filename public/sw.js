
const CACHE_NAME = 'orchidai-v3';
const OFFLINE_CACHE = 'orchidai-offline';
const API_CACHE = 'orchidai-api';
const IMAGE_CACHE = 'orchidai-images';

// Enhanced cache strategies
const CACHE_STRATEGIES = {
  static: 'cache-first',
  api: 'network-first',
  images: 'cache-first',
  offline: 'cache-only'
};

// URLs to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html',
  '/dashboard',
  '/garden',
  '/database',
  '/gamification'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/orchid-species/,
  /\/api\/user\/profile/,
  /\/api\/popular-species/,
  /\/api\/identifications/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS)),
      caches.open(OFFLINE_CACHE).then(cache => 
        cache.add('/offline.html')
      )
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName.startsWith('orchidai-') && 
            ![CACHE_NAME, OFFLINE_CACHE, API_CACHE, IMAGE_CACHE].includes(cacheName)
          )
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Enhanced fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
});

// Enhanced API request handler
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    // Try network first with timeout
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), 5000)
      )
    ]);
    
    if (networkResponse.ok) {
      // Cache successful responses
      if (shouldCacheApiResponse(request)) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for API calls
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        cached: false,
        timestamp: Date.now()
      }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Enhanced image request handler
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  
  // Try cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Fallback to network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache images for future use
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return placeholder image if available
    const placeholder = await cache.match('/placeholder-image.svg');
    return placeholder || new Response('', { status: 404 });
  }
}

// Enhanced static request handler
async function handleStaticRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  // Try cache first for static assets
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Fallback to network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache static assets
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineCache = await caches.open(OFFLINE_CACHE);
      return offlineCache.match('/offline.html');
    }
    
    return new Response('', { status: 404 });
  }
}

// Enhanced background sync with plant care reminders
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  } else if (event.tag === 'plant-care-reminder') {
    event.waitUntil(handlePlantCareReminder());
  }
});

async function doBackgroundSync() {
  try {
    // Handle background tasks like uploading cached data
    const cache = await caches.open('pending-requests');
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        await fetch(request);
        await cache.delete(request);
      } catch (error) {
        console.error('Background sync failed for:', request.url);
      }
    }

    // Sync plant care data
    await syncPlantCareData();
  } catch (error) {
    console.error('Background sync error:', error);
  }
}

async function syncPlantCareData() {
  // This would sync with your offline storage
  console.log('Syncing plant care data...');
}

async function handlePlantCareReminder() {
  // Show plant care reminder notification
  self.registration.showNotification('Plant Care Reminder', {
    body: 'Time to check on your orchids!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'plant-care',
    requireInteraction: true,
    actions: [
      { action: 'mark-done', title: 'Mark as Done' },
      { action: 'snooze', title: 'Remind Later' }
    ]
  });
}

// Enhanced push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: data.data,
    tag: data.tag || 'orchidai',
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Enhanced notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data;
  
  if (action === 'mark-done') {
    // Handle plant care completion
    handleCareCompletion(data);
  } else if (action === 'snooze') {
    // Schedule reminder for later
    scheduleSnoozeReminder(data);
  } else {
    // Open app
    event.waitUntil(
      clients.openWindow(data?.url || '/')
    );
  }
});

async function handleCareCompletion(data) {
  // Update care status in offline storage
  console.log('Marking care as completed:', data);
}

async function scheduleSnoozeReminder(data) {
  // Schedule notification for later
  console.log('Snoozing reminder:', data);
}

// Periodic background sync for plant care
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'plant-care-check') {
    event.waitUntil(checkPlantCareSchedule());
  }
});

async function checkPlantCareSchedule() {
  // Check if any plants need care and schedule notifications
  console.log('Checking plant care schedule...');
}

// Helper functions
function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

function shouldCacheApiResponse(request) {
  const url = new URL(request.url);
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
}
