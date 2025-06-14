
import { QueryClient } from '@tanstack/react-query';

// Future-ready API configuration
export const API_CONFIG = {
  baseURL: process.env.VITE_API_URL || '/api',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
};

// Error types for consistent error handling
export enum APIErrorType {
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER_ERROR',
  RATE_LIMIT = 'RATE_LIMIT'
}

export interface APIError {
  type: APIErrorType;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Generic API response wrapper
export interface APIResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  meta?: Record<string, any>;
}

// Future API endpoints structure
export const API_ENDPOINTS = {
  orchids: {
    list: '/orchids',
    search: '/orchids/search',
    detail: (id: string) => `/orchids/${id}`,
    similar: (id: string) => `/orchids/${id}/similar`,
    care: (id: string) => `/orchids/${id}/care-guide`,
  },
  user: {
    profile: '/user/profile',
    collection: '/user/collection',
    careHistory: '/user/care-history',
    achievements: '/user/achievements',
  },
  identification: {
    analyze: '/identification/analyze',
    history: '/identification/history',
  },
  admin: {
    orchids: '/admin/orchids',
    users: '/admin/users',
    analytics: '/admin/analytics',
  }
} as const;

// Query key factory for consistent caching
export const queryKeys = {
  orchids: {
    all: ['orchids'] as const,
    lists: () => [...queryKeys.orchids.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.orchids.lists(), filters] as const,
    details: () => [...queryKeys.orchids.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.orchids.details(), id] as const,
    similar: (id: string) => [...queryKeys.orchids.all, 'similar', id] as const,
  },
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    collection: () => [...queryKeys.user.all, 'collection'] as const,
    careHistory: () => [...queryKeys.user.all, 'care-history'] as const,
  }
} as const;

// Cache invalidation helpers
export const invalidateQueries = {
  orchids: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.orchids.all });
  },
  userCollection: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.collection() });
  },
  userProfile: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
  }
};

// Future monitoring and analytics preparation
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Analytics Event: ${eventName}`, properties);
  }
  // Future: Send to analytics service
};

export const logError = (error: APIError | Error, context?: string) => {
  console.error(`Error in ${context || 'unknown context'}:`, error);
  // Future: Send to error monitoring service
};

// Data validation helpers
export const validateOrchidData = (data: any): boolean => {
  return !!(
    data &&
    typeof data.id === 'string' &&
    typeof data.scientific_name === 'string' &&
    typeof data.common_name === 'string'
  );
};

export const sanitizeSearchQuery = (query: string): string => {
  return query.trim().toLowerCase().replace(/[^\w\s-]/g, '');
};

// Performance monitoring helpers
export const measurePerformance = <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  const start = performance.now();
  
  return operation().finally(() => {
    const duration = performance.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log(`${operationName} took ${duration.toFixed(2)}ms`);
    }
    // Future: Send performance metrics to monitoring service
  });
};
