
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CloudRain, Sun, Thermometer } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface WeatherIntegrationProps {
  integrations: Integration[];
  onToggle: (integrationId: string) => void;
}

export const WeatherIntegration: React.FC<WeatherIntegrationProps> = ({ integrations, onToggle }) => {
  const weatherServices = [
    { id: 'openweather', name: 'OpenWeather', description: 'Comprehensive weather data' },
    { id: 'weatherapi', name: 'WeatherAPI', description: 'Real-time weather updates' },
    { id: 'darksky', name: 'Apple Weather', description: 'Hyperlocal weather forecasts' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="w-5 h-5" />
            Weather Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Smart Care Adjustments</h4>
            <p className="text-blue-700 text-sm">
              Automatically adjust care recommendations based on local weather conditions.
            </p>
          </div>

          {weatherServices.map((service) => {
            const userIntegration = integrations.find(ui => ui.id === service.id);
            const isActive = userIntegration?.isActive || false;

            return (
              <div key={service.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CloudRain className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">{service.name}</h5>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={isActive ? "default" : "secondary"}>
                      {isActive ? "Connected" : "Not Connected"}
                    </Badge>
                    <Switch 
                      checked={isActive}
                      onCheckedChange={() => onToggle(service.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Thermometer className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-medium">72°F</p>
              <p className="text-xs text-gray-500">Current</p>
            </div>
            <div className="text-center">
              <CloudRain className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium">65%</p>
              <p className="text-xs text-gray-500">Humidity</p>
            </div>
            <div className="text-center">
              <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm font-medium">8 hrs</p>
              <p className="text-xs text-gray-500">Daylight</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
