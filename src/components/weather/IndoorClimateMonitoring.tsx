
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Home,
  Gauge,
  TrendingUp,
  AlertCircle,
  Settings
} from 'lucide-react';

const IndoorClimateMonitoring: React.FC = () => {
  const currentConditions = {
    temperature: 72,
    humidity: 58,
    airFlow: 'Good',
    lightLevel: 'Moderate',
    airQuality: 95,
    lastUpdated: new Date()
  };

  const hourlyData = [
    { time: '6:00', temp: 68, humidity: 65, light: 20, airflow: 60 },
    { time: '8:00', temp: 70, humidity: 62, light: 40, airflow: 65 },
    { time: '10:00', temp: 72, humidity: 58, light: 80, airflow: 70 },
    { time: '12:00', temp: 74, humidity: 55, light: 100, airflow: 75 },
    { time: '14:00', temp: 76, humidity: 52, light: 95, airflow: 80 },
    { time: '16:00', temp: 75, humidity: 54, light: 85, airflow: 75 },
    { time: '18:00', temp: 73, humidity: 57, light: 60, airflow: 70 },
    { time: '20:00', temp: 71, humidity: 60, light: 30, airflow: 65 },
    { time: '22:00', temp: 69, humidity: 63, light: 10, airflow: 60 }
  ];

  const roomAnalysis = [
    {
      room: 'Living Room',
      suitability: 'Excellent',
      temperature: 72,
      humidity: 58,
      lightHours: 8,
      airflow: 'Good',
      recommendations: [
        'Ideal for most orchid species',
        'Consider adding humidity tray',
        'Monitor afternoon sun intensity'
      ],
      idealPlants: ['Phalaenopsis', 'Oncidium', 'Dendrobium']
    },
    {
      room: 'Bathroom',
      suitability: 'Good',
      temperature: 74,
      humidity: 75,
      lightHours: 4,
      airflow: 'Limited',
      recommendations: [
        'Excellent humidity levels',
        'Add supplemental lighting',
        'Improve ventilation with small fan'
      ],
      idealPlants: ['Phalaenopsis', 'Paphiopedilum']
    },
    {
      room: 'Kitchen',
      suitability: 'Fair',
      temperature: 76,
      humidity: 65,
      lightHours: 6,
      airflow: 'Variable',
      recommendations: [
        'Good humidity from cooking',
        'Watch for temperature fluctuations',
        'Protect from cooking oils and fumes'
      ],
      idealPlants: ['Dendrobium', 'Cattleya']
    },
    {
      room: 'Bedroom',
      suitability: 'Poor',
      temperature: 70,
      humidity: 45,
      lightHours: 3,
      airflow: 'Poor',
      recommendations: [
        'Too low humidity for most orchids',
        'Insufficient natural light',
        'Consider humidifier and grow lights'
      ],
      idealPlants: ['Very few species suitable']
    }
  ];

  const optimizationTips = [
    {
      area: 'Humidity Control',
      currentLevel: 58,
      targetLevel: '60-70%',
      methods: [
        'Use humidity trays with pebbles',
        'Group plants together',
        'Install room humidifier',
        'Mist air around plants (not leaves)'
      ],
      costRange: '$10-$100'
    },
    {
      area: 'Air Circulation',
      currentLevel: 'Moderate',
      targetLevel: 'Good',
      methods: [
        'Add oscillating fan on low speed',
        'Open windows for cross-ventilation',
        'Use ceiling fan on lowest setting',
        'Position plants away from direct airflow'
      ],
      costRange: '$15-$80'
    },
    {
      area: 'Light Enhancement',
      currentLevel: 'Moderate',
      targetLevel: 'Bright Indirect',
      methods: [
        'Add LED grow lights (full spectrum)',
        'Use reflective surfaces to bounce light',
        'Rotate plants weekly for even exposure',
        'Consider light timers for consistency'
      ],
      costRange: '$25-$200'
    },
    {
      area: 'Temperature Stability',
      currentLevel: 'Good',
      targetLevel: 'Excellent',
      methods: [
        'Avoid placing near heating/cooling vents',
        'Use thermal mass (water containers)',
        'Monitor with digital thermometer',
        'Insulate windows in winter'
      ],
      costRange: '$5-$50'
    }
  ];

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Indoor Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Current Indoor Climate Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-blue-900">Temperature</div>
              <div className="text-xl font-bold text-blue-600">{currentConditions.temperature}°F</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Droplets className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-green-900">Humidity</div>
              <div className="text-xl font-bold text-green-600">{currentConditions.humidity}%</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Wind className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-purple-900">Air Flow</div>
              <div className="text-lg font-bold text-purple-600">{currentConditions.airFlow}</div>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-yellow-900">Light Level</div>
              <div className="text-lg font-bold text-yellow-600">{currentConditions.lightLevel}</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Gauge className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Air Quality</div>
              <div className="text-xl font-bold text-gray-600">{currentConditions.airQuality}%</div>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            Last updated: {currentConditions.lastUpdated.toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>

      {/* Hourly Indoor Climate Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            24-Hour Indoor Climate Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} name="Temperature (°F)" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity %" />
              <Line type="monotone" dataKey="light" stroke="#f59e0b" strokeWidth={2} name="Light Level %" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Room-by-Room Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Room-by-Room Suitability Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roomAnalysis.map((room, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{room.room}</h4>
                  <Badge className={getSuitabilityColor(room.suitability)}>
                    {room.suitability}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Temperature:</span>
                      <span className="font-medium">{room.temperature}°F</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Humidity:</span>
                      <span className="font-medium">{room.humidity}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Light Hours:</span>
                      <span className="font-medium">{room.lightHours}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Airflow:</span>
                      <span className="font-medium">{room.airflow}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h6 className="font-medium text-gray-900 mb-1">Recommendations:</h6>
                    <ul className="space-y-1">
                      {room.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="text-sm text-gray-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-gray-900 mb-1">Ideal Plants:</h6>
                    <div className="flex flex-wrap gap-1">
                      {room.idealPlants.map((plant, plantIndex) => (
                        <Badge key={plantIndex} variant="outline" className="text-xs">
                          {plant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Climate Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Indoor Climate Optimization Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {optimizationTips.map((tip, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{tip.area}</h4>
                  <Badge variant="outline">{tip.costRange}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Current Level:</span>
                    <div className="font-medium text-gray-900">{tip.currentLevel}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Target Level:</span>
                    <div className="font-medium text-green-600">{tip.targetLevel}</div>
                  </div>
                  <div>
                    <Button size="sm" className="w-full">
                      Start Optimization
                    </Button>
                  </div>
                </div>

                <div>
                  <h6 className="font-medium text-gray-900 mb-2">Improvement Methods:</h6>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tip.methods.map((method, methodIndex) => (
                      <li key={methodIndex} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndoorClimateMonitoring;
