
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Smartphone, 
  Calendar, 
  Cloud, 
  ShoppingCart, 
  Mic, 
  Camera,
  TreePine,
  CloudRain,
  Database,
  Zap,
  Link,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ApiIntegration } from './ApiIntegration';
import { SmartHomeIntegration } from './SmartHomeIntegration';
import { CalendarIntegration } from '../export/CalendarIntegration';
import { CloudStorageIntegration } from './CloudStorageIntegration';
import { ShoppingIntegration } from './ShoppingIntegration';
import { WeatherIntegration } from './WeatherIntegration';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'api' | 'smart-home' | 'calendar' | 'storage' | 'shopping' | 'garden' | 'weather';
  status: 'connected' | 'disconnected' | 'error';
  isActive: boolean;
  lastSync?: Date;
  settings?: Record<string, any>;
}

const IntegrationsHub: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'public-api',
      name: 'Public API Access',
      description: 'RESTful API for third-party developers',
      icon: <Database className="w-6 h-6" />,
      category: 'api',
      status: 'connected',
      isActive: true,
      lastSync: new Date()
    },
    {
      id: 'alexa',
      name: 'Amazon Alexa',
      description: 'Voice-activated care reminders and plant status',
      icon: <Mic className="w-6 h-6" />,
      category: 'smart-home',
      status: 'disconnected',
      isActive: false
    },
    {
      id: 'google-home',
      name: 'Google Home',
      description: 'Smart speaker integration for plant care',
      icon: <Smartphone className="w-6 h-6" />,
      category: 'smart-home',
      status: 'disconnected',
      isActive: false
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Automatic care scheduling and reminders',
      icon: <Calendar className="w-6 h-6" />,
      category: 'calendar',
      status: 'connected',
      isActive: true,
      lastSync: new Date(Date.now() - 3600000)
    },
    {
      id: 'google-photos',
      name: 'Google Photos',
      description: 'Automatic plant photo backup',
      icon: <Camera className="w-6 h-6" />,
      category: 'storage',
      status: 'disconnected',
      isActive: false
    },
    {
      id: 'icloud',
      name: 'iCloud Photos',
      description: 'iOS photo backup integration',
      icon: <Cloud className="w-6 h-6" />,
      category: 'storage',
      status: 'disconnected',
      isActive: false
    },
    {
      id: 'amazon-shopping',
      name: 'Amazon Affiliate',
      description: 'Plant care supply recommendations',
      icon: <ShoppingCart className="w-6 h-6" />,
      category: 'shopping',
      status: 'connected',
      isActive: true,
      lastSync: new Date(Date.now() - 7200000)
    },
    {
      id: 'garden-planner',
      name: 'Garden Planner Pro',
      description: 'Integration with garden design apps',
      icon: <TreePine className="w-6 h-6" />,
      category: 'garden',
      status: 'disconnected',
      isActive: false
    },
    {
      id: 'weather-api',
      name: 'Multi-Weather Services',
      description: 'WeatherAPI, OpenWeather, AccuWeather failover',
      icon: <CloudRain className="w-6 h-6" />,
      category: 'weather',
      status: 'connected',
      isActive: true,
      lastSync: new Date(Date.now() - 1800000)
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [syncProgress, setSyncProgress] = useState(0);
  const { toast } = useToast();

  const toggleIntegration = async (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === integrationId) {
        const newStatus = integration.isActive ? 'disconnected' : 'connected';
        const newActive = !integration.isActive;
        
        toast({
          title: newActive ? "Integration Enabled" : "Integration Disabled",
          description: `${integration.name} has been ${newActive ? 'connected' : 'disconnected'}`,
        });

        return {
          ...integration,
          isActive: newActive,
          status: newStatus,
          lastSync: newActive ? new Date() : integration.lastSync
        };
      }
      return integration;
    }));
  };

  const syncAllIntegrations = async () => {
    setSyncProgress(0);
    const activeIntegrations = integrations.filter(i => i.isActive);
    
    for (let i = 0; i < activeIntegrations.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSyncProgress(((i + 1) / activeIntegrations.length) * 100);
    }

    setIntegrations(prev => prev.map(integration => 
      integration.isActive 
        ? { ...integration, lastSync: new Date() }
        : integration
    ));

    toast({
      title: "Sync Complete",
      description: "All active integrations have been synchronized",
    });
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryIntegrations = (category: Integration['category']) => {
    return integrations.filter(i => i.category === category);
  };

  const activeCount = integrations.filter(i => i.isActive).length;
  const totalCount = integrations.length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Integrations</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <Link className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Available</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Sync</p>
                <p className="text-sm font-medium">
                  {Math.max(...integrations.filter(i => i.lastSync).map(i => i.lastSync!.getTime())) > 0
                    ? new Date(Math.max(...integrations.filter(i => i.lastSync).map(i => i.lastSync!.getTime()))).toLocaleTimeString()
                    : 'Never'
                  }
                </p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <Button 
              onClick={syncAllIntegrations}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Sync All
            </Button>
            {syncProgress > 0 && syncProgress < 100 && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Integration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="smart-home">Smart Home</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="shopping">Shopping</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {integration.icon}
                      <div>
                        <CardTitle className="text-sm">{integration.name}</CardTitle>
                        <p className="text-xs text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(integration.status)}`} />
                      <Switch
                        checked={integration.isActive}
                        onCheckedChange={() => toggleIntegration(integration.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant={integration.isActive ? "default" : "outline"}>
                      {integration.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {integration.lastSync && (
                      <span className="text-xs text-gray-500">
                        {integration.lastSync.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api">
          <ApiIntegration />
        </TabsContent>

        <TabsContent value="smart-home">
          <SmartHomeIntegration 
            integrations={getCategoryIntegrations('smart-home')}
            onToggle={toggleIntegration}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarIntegration onProgress={setSyncProgress} />
        </TabsContent>

        <TabsContent value="storage">
          <CloudStorageIntegration 
            integrations={getCategoryIntegrations('storage')}
            onToggle={toggleIntegration}
          />
        </TabsContent>

        <TabsContent value="shopping">
          <ShoppingIntegration 
            integrations={getCategoryIntegrations('shopping')}
            onToggle={toggleIntegration}
          />
        </TabsContent>

        <TabsContent value="weather">
          <WeatherIntegration 
            integrations={getCategoryIntegrations('weather')}
            onToggle={toggleIntegration}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsHub;
