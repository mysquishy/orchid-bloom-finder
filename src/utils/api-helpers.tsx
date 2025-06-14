
import { useToast } from '@/hooks/use-toast';

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Cache Implementation
class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttlMs = 300000): void { // 5 min default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  invalidate(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }
}

export const apiCache = new SimpleCache();

// API Helper Functions
export const createApiEndpoint = (baseUrl: string) => ({
  get: async <T = any>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    try {
      const url = new URL(path, baseUrl);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const cacheKey = url.toString();
      const cached = apiCache.get(cacheKey);
      if (cached) {
        return { data: cached, error: null, loading: false };
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      apiCache.set(cacheKey, data);
      
      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      };
    }
  },

  post: async <T = any>(path: string, body?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(new URL(path, baseUrl).toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      };
    }
  },

  put: async <T = any>(path: string, body?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(new URL(path, baseUrl).toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      };
    }
  },

  delete: async (path: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(new URL(path, baseUrl).toString(), {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return { data: null, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      };
    }
  }
});

// Error Handler Hook
export const useApiErrorHandler = () => {
  const { toast } = useToast();

  return (error: string | Error, context?: string) => {
    const message = error instanceof Error ? error.message : error;
    console.error(`API Error${context ? ` in ${context}` : ''}:`, message);
    
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };
};

// Retry Logic
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }

  throw lastError!;
};

// Data Validation
export const validateApiResponse = <T>(data: any, validator: (data: any) => data is T): T => {
  if (!validator(data)) {
    throw new Error('Invalid API response format');
  }
  return data;
};

// Future API endpoints structure
export const orchidApiEndpoints = {
  // These would be connected to real APIs in the future
  search: '/api/orchids/search',
  identify: '/api/orchids/identify',
  details: '/api/orchids/:id',
  careGuide: '/api/orchids/:id/care',
  similarSpecies: '/api/orchids/:id/similar'
};

export const userApiEndpoints = {
  profile: '/api/user/profile',
  garden: '/api/user/garden',
  careHistory: '/api/user/care-history',
  preferences: '/api/user/preferences'
};
