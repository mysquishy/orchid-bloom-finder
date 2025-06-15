
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Log error to monitoring service
    this.logErrorToService(error, errorInfo);
    
    this.setState({ errorInfo });
  }

  private logErrorToService = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      // In production, send to error monitoring service
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      console.error('Error logged to monitoring:', errorData);
      
      // Send to backend error logging service
      // await fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData)
      // });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-900">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                We encountered an unexpected error. Our team has been notified and is working on a fix.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-sm text-gray-500 text-left bg-gray-50 p-3 rounded">
                  <summary className="cursor-pointer font-medium">Error Details (Development)</summary>
                  <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.error.stack && '\n\nStack Trace:\n' + this.state.error.stack}
                    {this.state.errorInfo?.componentStack && '\n\nComponent Stack:' + this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleRefresh}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  If this problem persists, please contact our support team at{' '}
                  <a href="mailto:support@orkhidly.com" className="underline">
                    support@orkhidly.com
                  </a>
                </p>
              </div>
              
              {/* Error ID for support reference */}
              <div className="text-xs text-gray-400 mt-4">
                Error ID: {Date.now().toString(36).toUpperCase()}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
