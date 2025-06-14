
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  AlertTriangle,
  MapPin,
  Calendar,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PremiumBadge from '@/components/PremiumBadge';
import WeatherForecast from './WeatherForecast';
import ClimateRecommendations from './ClimateRecommendations';
import SeasonalTransitions from './SeasonalTransitions';
import WeatherAlerts from './WeatherAlerts';
import IndoorClimateMonitoring from './IndoorClimateMonitoring';
import ClimateZoneAnalysis from './ClimateZoneAnalysis';
import HumidityTemperatureOptimization from './HumidityTemperatureOptimization';
import MicroclimatAnalysis from './MicroclimatAnalysis';

interface WeatherData {
  location: string;
  currentTemp: number;
  currentHumidity: number;
  currentCondition: string;
  uvIndex: number;
  windSpeed: number;
  pressure: number;
  lastUpdated: Date;
}

const WeatherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<string>('Auto-detect');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      // Mock weather data - in real implementation, this would come from weather API
      const mockData: WeatherData = {
        location: 'San Francisco, CA',
        currentTemp: 72,
        currentHumidity: 65,
        currentCondition: 'Partly Cloudy',
        uvIndex: 6,
        windSpeed: 8,
        pressure: 30.15,
        lastUpdated: new Date()
      };
      setWeatherData(mockData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': case 'partly cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  if (loading && !weatherData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Weather-Based Care System</h1>
          <PremiumBadge size="lg" />
        </div>
        <Button 
          onClick={fetchWeatherData}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700"
        >
          <Zap className="w-4 h-4 mr-2" />
          {loading ? 'Updating...' : 'Refresh Weather'}
        </Button>
      </div>

      {/* Current Weather Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Current Temperature</p>
                <p className="text-2xl font-bold text-blue-900">{weatherData?.currentTemp || 0}°F</p>
              </div>
              <Thermometer className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Humidity</p>
                <p className="text-2xl font-bold text-green-900">{weatherData?.currentHumidity || 0}%</p>
              </div>
              <Droplets className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">UV Index</p>
                <p className="text-2xl font-bold text-purple-900">{weatherData?.uvIndex || 0}</p>
              </div>
              <Sun className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData?.windSpeed || 0} mph</p>
              </div>
              <Wind className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location and Current Conditions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{weatherData?.location}</h3>
                <p className="text-gray-600">Last updated: {weatherData?.lastUpdated.toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {weatherData && getWeatherIcon(weatherData.currentCondition)}
              <span className="text-lg font-medium text-gray-900">{weatherData?.currentCondition}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="forecast">10-Day Forecast</TabsTrigger>
          <TabsTrigger value="recommendations">Care Recommendations</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Transitions</TabsTrigger>
          <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
          <TabsTrigger value="indoor">Indoor Climate</TabsTrigger>
          <TabsTrigger value="zones">Climate Zones</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="microclimate">Microclimate</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast">
          <WeatherForecast />
        </TabsContent>

        <TabsContent value="recommendations">
          <ClimateRecommendations />
        </TabsContent>

        <TabsContent value="seasonal">
          <SeasonalTransitions />
        </TabsContent>

        <TabsContent value="alerts">
          <WeatherAlerts />
        </TabsContent>

        <TabsContent value="indoor">
          <IndoorClimateMonitoring />
        </TabsContent>

        <TabsContent value="zones">
          <ClimateZoneAnalysis />
        </TabsContent>

        <TabsContent value="optimization">
          <HumidityTemperatureOptimization />
        </TabsContent>

        <TabsContent value="microclimate">
          <MicroclimatAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeatherDashboard;
