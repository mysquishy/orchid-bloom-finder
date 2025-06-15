
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, HelpCircle, Flower } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Page Not Found (404) - Orkhidly"
        description="The page you're looking for doesn't exist. Return to Orkhidly to continue identifying plants and managing your garden."
        keywords="404, page not found, error"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="py-12 px-8">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-green-200 mb-4">404</div>
              <Flower className="w-16 h-16 text-green-600 mx-auto" />
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for seems to have wandered off like a plant looking for sunlight. 
              Don't worry, we'll help you find your way back!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/database">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Plants
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/help">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Get Help
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Pages
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Link to="/pricing" className="text-green-600 hover:text-green-700 transition-colors">
                  Pricing Plans
                </Link>
                <Link to="/dashboard" className="text-green-600 hover:text-green-700 transition-colors">
                  Dashboard
                </Link>
                <Link to="/garden" className="text-green-600 hover:text-green-700 transition-colors">
                  My Garden
                </Link>
                <Link to="/contact" className="text-green-600 hover:text-green-700 transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💡 <strong>Tip:</strong> If you were looking for information about a specific plant, 
                try using our <Link to="/database" className="underline">plant database</Link> search feature!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotFound;
