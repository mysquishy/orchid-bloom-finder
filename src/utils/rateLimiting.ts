
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
    const windowStart = new Date();
    windowStart.setMinutes(windowStart.getMinutes() - windowMinutes);

    // Check existing rate limit entries
    const { data: existing, error } = await supabase
      .from('api_rate_limits')
      .select('*')
      .eq('identifier', identifier)
      .eq('endpoint', endpoint)
      .gte('window_start', windowStart.toISOString())
      .maybeSingle();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw error;
    }

    if (existing) {
      if (existing.request_count >= maxRequests) {
        const resetTime = new Date(existing.window_start);
        resetTime.setMinutes(resetTime.getMinutes() + windowMinutes);
        
        return {
          allowed: false,
          remaining: 0,
          resetTime
        };
      }

      // Update request count
      await supabase
        .from('api_rate_limits')
        .update({ 
          request_count: existing.request_count + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      const resetTime = new Date(existing.window_start);
      resetTime.setMinutes(resetTime.getMinutes() + windowMinutes);

      return {
        allowed: true,
        remaining: maxRequests - existing.request_count - 1,
        resetTime
      };
    } else {
      // Create new rate limit entry
      const newWindowStart = new Date();
      await supabase
        .from('api_rate_limits')
        .insert({
          identifier,
          endpoint,
          request_count: 1,
          window_start: newWindowStart.toISOString()
        });

      const resetTime = new Date(newWindowStart);
      resetTime.setMinutes(resetTime.getMinutes() + windowMinutes);

      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime
      };
    }
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
