
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useErrorHandler = () => {
  console.log('useErrorHandler: Initializing...');
  
  const { toast } = useToast();

  const handleError = useCallback((error: Error, context?: Record<string, any>) => {
    console.log('useErrorHandler: Handling error:', error);
    console.log('useErrorHandler: Error context:', context);
    
    // Show user-friendly message
    toast({
      title: "Something went wrong",
      description: "We've logged this issue and will look into it.",
      variant: "destructive",
    });
  }, [toast]);

  const handleApiError = useCallback((error: Error, operation: string) => {
    console.log('useErrorHandler: Handling API error for operation:', operation);
    console.log('useErrorHandler: API error details:', error);
    
    toast({
      title: `Failed to ${operation.toLowerCase()}`,
      description: "Please try again or contact support if the issue persists.",
      variant: "destructive",
    });
  }, [toast]);

  const handleDatabaseError = useCallback((error: Error, operation: string) => {
    console.error('useErrorHandler: Database error for operation:', operation, error);
    
    toast({
      title: `Database Error`,
      description: `Failed to ${operation}. Please try again.`,
      variant: "destructive",
    });
  }, [toast]);

  return { handleError, handleApiError, handleDatabaseError };
};
