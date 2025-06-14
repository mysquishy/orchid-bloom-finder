
import { supabase } from '@/integrations/supabase/client';

export interface RateLimitConfig {
  endpoint: string;
  maxRequests: number;
  windowMinutes: number;
}

export const checkRateLimit = async (
  identifier: string, 
  endpoint: string, 
  maxRequests: number = 100, 
  windowMinutes: number = 60
): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> => {
  try {
    // For now, we'll use a simple implementation that always allows requests
    // Once the types are updated, we can implement proper rate limiting
    return {
      allowed: true,
      remaining: maxRequests,
      resetTime: new Date(Date.now() + windowMinutes * 60 * 1000)
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // On error, allow the request (fail open)
    return {
      allowed: true,
      remaining: maxRequests,
      resetTime: new Date(Date.now() + windowMinutes * 60 * 1000)
    };
  }
};

export const rateLimitMiddleware = (config: RateLimitConfig) => {
  return async (identifier: string) => {
    return checkRateLimit(
      identifier, 
      config.endpoint, 
      config.maxRequests, 
      config.windowMinutes
    );
  };
};

// Predefined rate limit configurations
export const rateLimitConfigs = {
  orchidIdentification: {
    endpoint: 'orchid_identification',
    maxRequests: 50,
    windowMinutes: 60
  },
  dataExport: {
    endpoint: 'data_export',
    maxRequests: 5,
    windowMinutes: 60
  },
  userRegistration: {
    endpoint: 'user_registration',
    maxRequests: 10,
    windowMinutes: 60
  },
  databaseQuery: {
    endpoint: 'database_query',
    maxRequests: 1000,
    windowMinutes: 60
  }
};
