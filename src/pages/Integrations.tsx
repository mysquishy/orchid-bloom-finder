
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Link, Globe, Shield } from 'lucide-react';
import IntegrationsHub from '@/components/integrations/IntegrationsHub';

const Integrations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Advanced Integrations
              </h1>
              <p className="text-gray-600">
                Connect OrchidAI with your favorite services and smart devices
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <Link className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <h3 className="font-semibold text-green-800">Public API</h3>
                <p className="text-sm text-green-700">RESTful API for developers</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <Globe className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <h3 className="font-semibold text-blue-800">Smart Home</h3>
                <p className="text-sm text-blue-700">Alexa & Google Home</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <h3 className="font-semibold text-purple-800">Cloud Sync</h3>
                <p className="text-sm text-purple-700">Multi-platform backup</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                <h3 className="font-semibold text-orange-800">Enterprise</h3>
                <p className="text-sm text-orange-700">Business integrations</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Integration Hub */}
        <IntegrationsHub />
      </div>
    </div>
  );
};

export default Integrations;
