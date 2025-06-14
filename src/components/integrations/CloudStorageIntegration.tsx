
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Cloud, Upload, Download } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface CloudStorageIntegrationProps {
  integrations: Integration[];
  onToggle: (integrationId: string) => void;
}

export const CloudStorageIntegration: React.FC<CloudStorageIntegrationProps> = ({ integrations, onToggle }) => {
  const storageProviders = [
    { id: 'google-photos', name: 'Google Photos', description: 'Auto-backup plant photos' },
    { id: 'icloud', name: 'iCloud Photos', description: 'Sync with iOS photo library' },
    { id: 'dropbox', name: 'Dropbox', description: 'Store plant collections in Dropbox' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Cloud Storage Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Automatic Photo Backup</h4>
            <p className="text-green-700 text-sm">
              Automatically backup your plant photos to your preferred cloud storage service.
            </p>
          </div>

          {storageProviders.map((provider) => {
            const userIntegration = integrations.find(ui => ui.id === provider.id);
            const isActive = userIntegration?.isActive || false;

            return (
              <div key={provider.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">{provider.name}</h5>
                      <p className="text-sm text-gray-500">{provider.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={isActive ? "default" : "secondary"}>
                      {isActive ? "Connected" : "Not Connected"}
                    </Badge>
                    <Switch 
                      checked={isActive}
                      onCheckedChange={() => onToggle(provider.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Sync Photos
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
