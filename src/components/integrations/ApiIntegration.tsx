
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Code, Copy, Plus, Key, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ApiIntegration: React.FC = () => {
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API', key: 'orchid_live_pk_***', permissions: ['read', 'write'] },
    { id: '2', name: 'Development', key: 'orchid_dev_pk_***', permissions: ['read'] }
  ]);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            API Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Getting Started</h4>
            <p className="text-blue-700 text-sm">
              Create API keys to integrate OrchidAI with your applications. 
              Use our RESTful API to access plant identification, care data, and user collections.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Your API Keys</h4>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </div>

            {apiKeys.map((key) => (
              <div key={key.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">{key.name}</h5>
                    <p className="text-sm text-gray-500">{key.key}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(key.key)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  {key.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">API Endpoints</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>GET /api/identify - Plant identification</div>
              <div>GET /api/species - Orchid species database</div>
              <div>GET /api/care-guides - Care instructions</div>
              <div>POST /api/collections - Manage plant collections</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
