
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logError } from '@/utils/errorLogger';

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = useCallback((error: Error, context?: Record<string, any>) => {
    // Log the error
    logError(error, context);

    // Show user-friendly message
    toast({
      title: "Something went wrong",
      description: "We've logged this issue and will look into it.",
      variant: "destructive",
    });
  }, [toast]);

  const handleApiError = useCallback((error: Error, operation: string) => {
    logError({
      error_type: 'API_ERROR',
      error_message: `${operation} failed: ${error.message}`,
      stack_trace: error.stack,
      context: { operation }
    });

    toast({
      title: `Failed to ${operation.toLowerCase()}`,
      description: "Please try again or contact support if the issue persists.",
      variant: "destructive",
    });
  }, [toast]);

  return { handleError, handleApiError };
};
