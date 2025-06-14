
import { supabase } from '@/integrations/supabase/client';

export interface ErrorLogEntry {
  error_type: string;
  error_message: string;
  stack_trace?: string;
  user_id?: string;
  url?: string;
  context?: Record<string, any>;
}

export const logError = async (error: Error | ErrorLogEntry, context?: Record<string, any>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    let errorEntry: ErrorLogEntry;
    
    if (error instanceof Error) {
      errorEntry = {
        error_type: error.name || 'Error',
        error_message: error.message,
        stack_trace: error.stack,
        user_id: user?.id,
        url: window.location.href,
        context: context || {}
      };
    } else {
      errorEntry = {
        ...error,
        user_id: error.user_id || user?.id,
        url: error.url || window.location.href,
        context: { ...error.context, ...context }
      };
    }

    const { error: insertError } = await supabase.rpc('insert_error_log', {
      error_type: errorEntry.error_type,
      error_message: errorEntry.error_message,
      stack_trace: errorEntry.stack_trace,
      user_id: errorEntry.user_id,
      url: errorEntry.url,
      context: errorEntry.context,
      user_agent: navigator.userAgent
    });

    if (insertError) {
      console.error('Error logging failed:', insertError);
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorEntry);
    }
  } catch (logError) {
    console.error('Failed to log error:', logError);
    console.error('Original error:', error);
  }
};

export const logApiError = (endpoint: string, error: Error, requestData?: any) => {
  logError({
    error_type: 'API_ERROR',
    error_message: `API call failed: ${endpoint} - ${error.message}`,
    stack_trace: error.stack,
    context: {
      endpoint,
      request_data: requestData,
      timestamp: new Date().toISOString()
    }
  });
};

export const logAuthError = (action: string, error: Error) => {
  logError({
    error_type: 'AUTH_ERROR',
    error_message: `Authentication failed: ${action} - ${error.message}`,
    stack_trace: error.stack,
    context: {
      action,
      timestamp: new Date().toISOString()
    }
  });
};

export const logValidationError = (field: string, value: any, rule: string) => {
  logError({
    error_type: 'VALIDATION_ERROR',
    error_message: `Validation failed for ${field}: ${rule}`,
    context: {
      field,
      value,
      rule,
      timestamp: new Date().toISOString()
    }
  });
};
