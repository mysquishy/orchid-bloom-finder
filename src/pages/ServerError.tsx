
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Home, AlertTriangle, Mail } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const ServerError: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <SEOHead 
        title="Server Error (500) - Orkhidly"
        description="We're experiencing technical difficulties. Please try again or contact support if the issue persists."
        keywords="500, server error, technical difficulties"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="py-12 px-8">
            {/* Error Illustration */}
            <div className="mb-8">
              <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-4" />
              <div className="text-6xl font-bold text-red-200 mb-2">500</div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Something Went Wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're experiencing some technical difficulties on our end. Our team has been notified 
              and is working to fix the issue as quickly as possible.
            </p>

            {/* Status Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-yellow-800 mb-2">What happened?</h3>
              <p className="text-sm text-yellow-700">
                Our servers encountered an unexpected error while processing your request. 
                This is usually temporary and resolves quickly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button onClick={handleRefresh} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button asChild variant="outline">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>

            {/* Troubleshooting Tips */}
            <div className="border-t pt-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Troubleshooting Steps
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">1</span>
                  <span>Wait a few minutes and refresh the page</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">2</span>
                  <span>Clear your browser cache and cookies</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">3</span>
                  <span>Try using a different browser or device</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">4</span>
                  <span>If the problem persists, contact our support team</span>
                </div>
              </div>
            </div>

            {/* Support Information */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Still having issues?</strong> Our support team is available 24/7 to help. 
                Email us at <a href="mailto:support@orkhidly.com" className="underline">support@orkhidly.com</a> 
                or call +1 (555) 123-4567.
              </p>
            </div>

            {/* Error ID for Support */}
            <div className="mt-6 text-xs text-gray-400">
              Error ID: {Date.now().toString(36).toUpperCase()}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ServerError;
