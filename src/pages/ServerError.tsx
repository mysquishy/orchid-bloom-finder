
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const errorId = `ERR-${Date.now().toString(36).toUpperCase()}`;

  return (
    <>
      <SEOHead 
        title="Server Error - Orkhidly"
        description="We're experiencing technical difficulties. Our team is working to resolve the issue."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-gray-900">Server Error (500)</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="text-gray-600 mb-4">
                We're experiencing technical difficulties on our end. Our team has been automatically 
                notified and is working to resolve this issue.
              </p>
              <p className="text-sm text-gray-500">
                This usually resolves quickly. Please try refreshing the page or check back in a few minutes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleRefresh}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={handleGoHome}
                variant="outline"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-3">Still having issues?</h3>
              <div className="space-y-3">
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
                <p className="text-xs text-gray-500">
                  Reference ID: <code className="bg-gray-100 px-2 py-1 rounded">{errorId}</code>
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <h4 className="font-medium text-blue-900 mb-2">What you can do:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Wait a few minutes and try again</li>
                <li>• Check our status page for known issues</li>
                <li>• Contact us if the problem persists</li>
                <li>• Try accessing a different page</li>
              </ul>
            </div>

            <div className="text-xs text-gray-400">
              <p>Timestamp: {new Date().toLocaleString()}</p>
              <p>If this error persists, please include the Reference ID when contacting support.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ServerError;
