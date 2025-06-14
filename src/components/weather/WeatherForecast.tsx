
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { Sun, Cloud, CloudRain, Droplets, Thermometer, Wind, AlertTriangle } from 'lucide-react';

const WeatherForecast: React.FC = () => {
  const forecastData = [
    { day: 'Today', temp: 72, humidity: 65, condition: 'Partly Cloudy', careImpact: 'Normal watering', uv: 6, wind: 8 },
    { day: 'Tomorrow', temp: 75, humidity: 58, condition: 'Sunny', careImpact: 'Increase watering', uv: 8, wind: 5 },
    { day: 'Wed', temp: 68, humidity: 78, condition: 'Rainy', careImpact: 'Skip watering', uv: 3, wind: 12 },
    { day: 'Thu', temp: 70, humidity: 72, condition: 'Cloudy', careImpact: 'Monitor closely', uv: 4, wind: 7 },
    { day: 'Fri', temp: 73, humidity: 60, condition: 'Partly Cloudy', careImpact: 'Normal care', uv: 6, wind: 9 },
    { day: 'Sat', temp: 76, humidity: 55, condition: 'Sunny', careImpact: 'Extra humidity', uv: 9, wind: 6 },
    { day: 'Sun', temp: 74, humidity: 62, condition: 'Partly Cloudy', careImpact: 'Normal care', uv: 7, wind: 8 },
    { day: 'Mon', temp: 71, humidity: 69, condition: 'Cloudy', careImpact: 'Reduce watering', uv: 4, wind: 10 },
    { day: 'Tue', temp: 69, humidity: 75, condition: 'Rainy', careImpact: 'Indoor protection', uv: 2, wind: 15 },
    { day: 'Wed', temp: 72, humidity: 63, condition: 'Partly Cloudy', careImpact: 'Resume normal care', uv: 6, wind: 7 }
  ];

  const temperatureHumidityData = forecastData.map(day => ({
    day: day.day,
    temperature: day.temp,
    humidity: day.humidity
  }));

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': case 'partly cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getCareImpactColor = (impact: string) => {
    if (impact.includes('Skip') || impact.includes('protection')) return 'bg-red-100 text-red-800';
    if (impact.includes('Increase') || impact.includes('Extra')) return 'bg-orange-100 text-orange-800';
    if (impact.includes('Monitor') || impact.includes('Reduce')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      {/* 10-Day Forecast Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            10-Day Weather Forecast & Plant Care Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecastData.map((day, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="text-center mb-3">
                  <h4 className="font-semibold text-gray-900 mb-1">{day.day}</h4>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="text-sm text-gray-600">{day.condition}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3" />
                      Temp
                    </span>
                    <span className="font-medium">{day.temp}°F</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3" />
                      Humidity
                    </span>
                    <span className="font-medium">{day.humidity}%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Sun className="w-3 h-3" />
                      UV
                    </span>
                    <span className="font-medium">{day.uv}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Wind className="w-3 h-3" />
                      Wind
                    </span>
                    <span className="font-medium">{day.wind} mph</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Badge className={`text-xs ${getCareImpactColor(day.careImpact)}`}>
                    {day.careImpact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Temperature and Humidity Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Temperature & Humidity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <LineChart data={temperatureHumidityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={3} name="Temperature (°F)" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} name="Humidity (%)" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Care Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Weather-Based Care Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastData.slice(0, 7).map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  {getWeatherIcon(day.condition)}
                  <div>
                    <h4 className="font-medium text-gray-900">{day.day}</h4>
                    <p className="text-sm text-gray-600">{day.temp}°F, {day.humidity}% humidity</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getCareImpactColor(day.careImpact)}>
                    {day.careImpact}
                  </Badge>
                  {(day.careImpact.includes('Skip') || day.careImpact.includes('protection')) && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherForecast;
