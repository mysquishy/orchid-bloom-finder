
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CloudRain, 
  Sun, 
  Thermometer, 
  Droplets, 
  Wind, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface WeatherIntegrationProps {
  integrations: Integration[];
  onToggle: (id: string) => void;
}

interface WeatherProvider {
  id: string;
  name: string;
  status: 'active' | 'backup' | 'error' | 'disabled';
  priority: number;
  lastUpdate: Date;
  responseTime: number;
  accuracy: number;
  apiKey?: string;
}

interface WeatherAlert {
  id: string;
  type: 'temperature' | 'humidity' | 'frost' | 'storm';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: Date;
}

export const WeatherIntegration: React.FC<WeatherIntegrationProps> = ({
  integrations,
  onToggle
}) => {
  const [providers, setProviders] = useState<WeatherProvider[]>([
    {
      id: 'openweather',
      name: 'OpenWeatherMap',
      status: 'active',
      priority: 1,
      lastUpdate: new Date(),
      responseTime: 245,
      accuracy: 92,
      apiKey: 'configured'
    },
    {
      id: 'weatherapi',
      name: 'WeatherAPI',
      status: 'backup',
      priority: 2,
      lastUpdate: new Date(Date.now() - 300000),
      responseTime: 180,
      accuracy: 89
    },
    {
      id: 'accuweather',
      name: 'AccuWeather',
      status: 'error',
      priority: 3,
      lastUpdate: new Date(Date.now() - 1800000),
      responseTime: 520,
      accuracy: 95,
      apiKey: 'missing'
    }
  ]);

  const [alerts, setAlerts] = useState<WeatherAlert[]>([
    {
      id: '1',
      type: 'temperature',
      severity: 'medium',
      message: 'High temperature alert: 85°F - Consider increasing humidity for your orchids',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      type: 'humidity',
      severity: 'low',
      message: 'Low humidity detected: 35% - Your orchids prefer 50-70% humidity',
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);

  const [failoverEnabled, setFailoverEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [newApiKey, setNewApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('accuweather');

  const { toast } = useToast();

  const weatherIntegration = integrations.find(i => i.id === 'weather-api');

  const testProvider = async (providerId: string) => {
    setProviders(prev => prev.map(provider => {
      if (provider.id === providerId) {
        return {
          ...provider,
          status: 'active',
          lastUpdate: new Date(),
          responseTime: Math.floor(Math.random() * 300) + 100
        };
      }
      return provider;
    }));

    toast({
      title: "Provider Tested",
      description: `${providers.find(p => p.id === providerId)?.name} connection successful`,
    });
  };

  const updateApiKey = () => {
    if (!newApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setProviders(prev => prev.map(provider => {
      if (provider.id === selectedProvider) {
        return {
          ...provider,
          apiKey: 'configured',
          status: 'backup'
        };
      }
      return provider;
    }));

    setNewApiKey('');
    toast({
      title: "API Key Updated",
      description: "Provider configuration saved successfully",
    });
  };

  const triggerFailover = () => {
    const activeProvider = providers.find(p => p.status === 'active');
    const backupProvider = providers.find(p => p.status === 'backup');

    if (activeProvider && backupProvider) {
      setProviders(prev => prev.map(provider => {
        if (provider.id === activeProvider.id) {
          return { ...provider, status: 'error' };
        }
        if (provider.id === backupProvider.id) {
          return { ...provider, status: 'active', lastUpdate: new Date() };
        }
        return provider;
      }));

      toast({
        title: "Failover Activated",
        description: `Switched to ${backupProvider.name}`,
      });
    }
  };

  const getStatusIcon = (status: WeatherProvider['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'backup':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: WeatherProvider['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'backup':
        return 'bg-blue-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getAlertIcon = (type: WeatherAlert['type']) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="w-4 h-4" />;
      case 'humidity':
        return <Droplets className="w-4 h-4" />;
      case 'frost':
        return <Sun className="w-4 h-4" />;
      case 'storm':
        return <CloudRain className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const activeProvider = providers.find(p => p.status === 'active');

  return (
    <div className="space-y-6">
      {/* Weather Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Provider</p>
                <p className="text-lg font-bold">{activeProvider?.name || 'None'}</p>
              </div>
              <CloudRain className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-lg font-bold">{activeProvider?.responseTime || 0}ms</p>
              </div>
              <RotateCcw className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-lg font-bold">{activeProvider?.accuracy || 0}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-lg font-bold text-orange-600">{alerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Providers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="w-5 h-5" />
            Weather Service Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providers.map((provider) => (
              <div key={provider.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(provider.status)}
                    <div>
                      <h4 className="font-medium">{provider.name}</h4>
                      <p className="text-sm text-gray-600">
                        Priority: {provider.priority} • Last update: {provider.lastUpdate.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={provider.status === 'active' ? 'default' : 'outline'}
                      className={`${getStatusColor(provider.status)} text-white`}
                    >
                      {provider.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testProvider(provider.id)}
                    >
                      Test
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">{provider.responseTime}ms</div>
                    <div className="text-xs text-gray-600">Response Time</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{provider.accuracy}%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                  <div>
                    <div className={`w-2 h-2 rounded-full mx-auto ${getStatusColor(provider.status)}`} />
                    <div className="text-xs text-gray-600 mt-1">
                      {provider.apiKey === 'configured' ? 'Configured' : 'API Key Missing'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Failover Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Failover Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Auto Failover</span>
              <p className="text-sm text-gray-600">Automatically switch to backup provider on failure</p>
            </div>
            <Switch checked={failoverEnabled} onCheckedChange={setFailoverEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Weather Alerts</span>
              <p className="text-sm text-gray-600">Receive notifications for weather conditions</p>
            </div>
            <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
          </div>

          <Button onClick={triggerFailover} variant="outline" className="w-full">
            Test Failover System
          </Button>
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="provider">Weather Provider</Label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter API key"
              />
            </div>
          </div>
          <Button onClick={updateApiKey} className="w-full">
            Update API Key
          </Button>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-4 ${
                alert.severity === 'high' ? 'border-red-200 bg-red-50' :
                alert.severity === 'medium' ? 'border-orange-200 bg-orange-50' :
                'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${
                    alert.severity === 'high' ? 'text-red-600' :
                    alert.severity === 'medium' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant={
                    alert.severity === 'high' ? 'destructive' :
                    alert.severity === 'medium' ? 'default' :
                    'outline'
                  }>
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
