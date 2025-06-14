
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Code, Home, Calendar, Cloud, ShoppingBag, CloudRain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { integrationManager } from '@/utils/integrationManager';
import { ApiIntegration } from './ApiIntegration';
import { SmartHomeIntegration } from './SmartHomeIntegration';
import { CloudStorageIntegration } from './CloudStorageIntegration';
import { ShoppingIntegration } from './ShoppingIntegration';
import { WeatherIntegration } from './WeatherIntegration';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

// Simple Calendar Integration component
const CalendarIntegration = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Sync your orchid care schedule with Google Calendar for automated reminders.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Google Calendar</h4>
              <p className="text-sm text-gray-500">Sync care schedules and reminders</p>
            </div>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const IntegrationsHub: React.FC = () => {
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'alexa', name: 'Amazon Alexa', isActive: false },
    { id: 'google-home', name: 'Google Home', isActive: false },
    { id: 'google-calendar', name: 'Google Calendar', isActive: false },
    { id: 'google-photos', name: 'Google Photos', isActive: false },
    { id: 'amazon-shopping', name: 'Amazon Shopping', isActive: false },
    { id: 'weather-api', name: 'Weather Services', isActive: false }
  ]);

  const [activeTab, setActiveTab] = useState('api');

  useEffect(() => {
    if (user) {
      loadUserIntegrations();
    }
  }, [user]);

  const loadUserIntegrations = async () => {
    if (!user) return;
    
    try {
      const userIntegrations = await integrationManager.loadUserIntegrations(user.id);
      // Update integration states based on loaded data
      setIntegrations(prev => prev.map(integration => ({
        ...integration,
        isActive: userIntegrations.some(ui => ui.id === integration.id && ui.isActive)
      })));
    } catch (error) {
      console.error('Failed to load integrations:', error);
    }
  };

  const handleToggleIntegration = async (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, isActive: !integration.isActive }
        : integration
    ));
  };

  const getActiveIntegrationsCount = () => {
    return integrations.filter(i => i.isActive).length;
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Integrations</p>
                <p className="text-2xl font-bold text-green-600">{getActiveIntegrationsCount()}</p>
              </div>
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Services</p>
                <p className="text-2xl font-bold text-blue-600">{integrations.length}</p>
              </div>
              <Code className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Integration Health</p>
                <p className="text-2xl font-bold text-purple-600">100%</p>
              </div>
              <Badge variant="default" className="bg-green-500">
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            API
          </TabsTrigger>
          <TabsTrigger value="smart-home" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Smart Home
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            Storage
          </TabsTrigger>
          <TabsTrigger value="shopping" className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Shopping
          </TabsTrigger>
          <TabsTrigger value="weather" className="flex items-center gap-2">
            <CloudRain className="w-4 h-4" />
            Weather
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <ApiIntegration />
        </TabsContent>

        <TabsContent value="smart-home">
          <SmartHomeIntegration 
            integrations={integrations}
            onToggle={handleToggleIntegration}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarIntegration />
        </TabsContent>

        <TabsContent value="storage">
          <CloudStorageIntegration 
            integrations={integrations}
            onToggle={handleToggleIntegration}
          />
        </TabsContent>

        <TabsContent value="shopping">
          <ShoppingIntegration 
            integrations={integrations}
            onToggle={handleToggleIntegration}
          />
        </TabsContent>

        <TabsContent value="weather">
          <WeatherIntegration 
            integrations={integrations}
            onToggle={handleToggleIntegration}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsHub;
