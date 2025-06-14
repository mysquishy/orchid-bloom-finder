
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Home, Smartphone, Wifi } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface SmartHomeIntegrationProps {
  integrations: Integration[];
  onToggle: (integrationId: string) => void;
}

export const SmartHomeIntegration: React.FC<SmartHomeIntegrationProps> = ({ integrations, onToggle }) => {
  const smartHomeIntegrations = [
    { id: 'alexa', name: 'Amazon Alexa', description: 'Voice control for plant care reminders' },
    { id: 'google-home', name: 'Google Home', description: 'Smart home automation integration' },
    { id: 'apple-homekit', name: 'Apple HomeKit', description: 'iOS smart home integration' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Smart Home Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Connect Your Smart Devices</h4>
            <p className="text-blue-700 text-sm">
              Integrate OrchidAI with your smart home devices for automated plant care reminders and environmental monitoring.
            </p>
          </div>

          {smartHomeIntegrations.map((integration) => {
            const userIntegration = integrations.find(ui => ui.id === integration.id);
            const isActive = userIntegration?.isActive || false;

            return (
              <div key={integration.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">{integration.name}</h5>
                      <p className="text-sm text-gray-500">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={isActive ? "default" : "secondary"}>
                      {isActive ? "Connected" : "Not Connected"}
                    </Badge>
                    <Switch 
                      checked={isActive}
                      onCheckedChange={() => onToggle(integration.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Available Commands
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>"Hey Alexa, ask OrchidAI when to water my orchids"</div>
              <div>"OK Google, check my plant health with OrchidAI"</div>
              <div>"Set reminder to fertilize orchids next week"</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
