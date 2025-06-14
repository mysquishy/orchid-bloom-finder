
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { 
  Thermometer, 
  Droplets, 
  Target, 
  TrendingUp, 
  Settings,
  AlertCircle,
  CheckCircle,
  Zap
} from 'lucide-react';

const HumidityTemperatureOptimization: React.FC = () => {
  const currentConditions = {
    temperature: 72,
    humidity: 58,
    dewPoint: 54,
    vaporPressureDeficit: 0.8,
    comfortIndex: 78
  };

  const idealRanges = {
    phalaenopsis: { tempMin: 70, tempMax: 80, humidityMin: 60, humidityMax: 80 },
    cattleya: { tempMin: 65, tempMax: 85, humidityMin: 50, humidityMax: 70 },
    dendrobium: { tempMin: 60, tempMax: 85, humidityMin: 50, humidityMax: 70 },
    cymbidium: { tempMin: 50, tempMax: 75, humidityMin: 40, humidityMax: 60 },
    vanda: { tempMin: 75, tempMax: 90, humidityMin: 60, humidityMax: 80 }
  };

  const optimizationData = [
    { hour: '6:00', temp: 68, humidity: 65, ideal: 72, comfort: 75 },
    { hour: '8:00', temp: 70, humidity: 62, ideal: 74, comfort: 78 },
    { hour: '10:00', temp: 72, humidity: 58, ideal: 75, comfort: 80 },
    { hour: '12:00', temp: 74, humidity: 55, ideal: 76, comfort: 82 },
    { hour: '14:00', temp: 76, humidity: 52, ideal: 75, comfort: 80 },
    { hour: '16:00', temp: 75, humidity: 54, ideal: 74, comfort: 78 },
    { hour: '18:00', temp: 73, humidity: 57, ideal: 73, comfort: 76 },
    { hour: '20:00', temp: 71, humidity: 60, ideal: 72, comfort: 75 },
    { hour: '22:00', temp: 69, humidity: 63, ideal: 71, comfort: 74 }
  ];

  const speciesOptimization = [
    {
      species: 'Phalaenopsis',
      currentMatch: 82,
      tempStatus: 'optimal',
      humidityStatus: 'low',
      recommendations: [
        'Increase humidity by 5-10%',
        'Use humidity trays or grouping',
        'Maintain current temperature',
        'Monitor for dry air stress'
      ],
      priority: 'medium'
    },
    {
      species: 'Cattleya',
      currentMatch: 95,
      tempStatus: 'optimal',
      humidityStatus: 'optimal',
      recommendations: [
        'Conditions are ideal',
        'Monitor for consistency',
        'Prepare for seasonal changes',
        'Continue current management'
      ],
      priority: 'low'
    },
    {
      species: 'Dendrobium',
      currentMatch: 88,
      tempStatus: 'optimal',
      humidityStatus: 'good',
      recommendations: [
        'Slight humidity increase beneficial',
        'Temperature range is perfect',
        'Monitor for flowering triggers',
        'Adjust care for growth phase'
      ],
      priority: 'low'
    },
    {
      species: 'Cymbidium',
      currentMatch: 75,
      tempStatus: 'high',
      humidityStatus: 'high',
      recommendations: [
        'Reduce temperature by 2-4°F',
        'Decrease humidity slightly',
        'Increase air circulation',
        'Consider cooler location'
      ],
      priority: 'high'
    }
  ];

  const optimizationStrategies = [
    {
      goal: 'Increase Humidity',
      currentLevel: 58,
      targetLevel: '65-70%',
      methods: [
        {
          method: 'Humidity Trays',
          effectiveness: 85,
          cost: '$10-20',
          difficulty: 'Easy',
          description: 'Water-filled trays with pebbles under plants'
        },
        {
          method: 'Plant Grouping',
          effectiveness: 70,
          cost: '$0',
          difficulty: 'Easy',
          description: 'Group plants together to create microclimate'
        },
        {
          method: 'Room Humidifier',
          effectiveness: 95,
          cost: '$30-100',
          difficulty: 'Moderate',
          description: 'Electric humidifier for consistent levels'
        },
        {
          method: 'Misting Systems',
          effectiveness: 75,
          cost: '$50-200',
          difficulty: 'Hard',
          description: 'Automated misting with timers'
        }
      ]
    },
    {
      goal: 'Stabilize Temperature',
      currentLevel: 72,
      targetLevel: '70-75°F',
      methods: [
        {
          method: 'Thermal Mass',
          effectiveness: 80,
          cost: '$5-15',
          difficulty: 'Easy',
          description: 'Water containers to moderate temperature'
        },
        {
          method: 'Window Insulation',
          effectiveness: 75,
          cost: '$20-50',
          difficulty: 'Moderate',
          description: 'Insulating films or curtains'
        },
        {
          method: 'Smart Thermostat',
          effectiveness: 90,
          cost: '$100-300',
          difficulty: 'Moderate',
          description: 'Automated temperature control'
        },
        {
          method: 'Heat Mats',
          effectiveness: 85,
          cost: '$25-75',
          difficulty: 'Easy',
          description: 'Gentle bottom heating for roots'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'low': case 'high': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Optimization Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Current Climate Optimization Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Thermometer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-blue-900">Temperature</div>
              <div className="text-xl font-bold text-blue-600">{currentConditions.temperature}°F</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Droplets className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-green-900">Humidity</div>
              <div className="text-xl font-bold text-green-600">{currentConditions.humidity}%</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-purple-900">Dew Point</div>
              <div className="text-xl font-bold text-purple-600">{currentConditions.dewPoint}°F</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-orange-900">VPD</div>
              <div className="text-xl font-bold text-orange-600">{currentConditions.vaporPressureDeficit}</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Comfort Index</div>
              <div className="text-xl font-bold text-gray-600">{currentConditions.comfortIndex}%</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Quick Assessment:</h4>
            <p className="text-sm text-blue-800">
              Temperature is optimal for most orchid species. Humidity could be increased by 5-10% for better 
              growing conditions. Consider adding humidity trays or grouping plants together.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Optimization Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Hourly Optimization Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <AreaChart data={optimizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="comfort" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Comfort Zone %" />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} name="Temperature (°F)" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity %" />
              <Line type="monotone" dataKey="ideal" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Ideal Conditions" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Species-Specific Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Species-Specific Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {speciesOptimization.map((species, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">{species.species}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(species.tempStatus)}>
                        Temp: {species.tempStatus}
                      </Badge>
                      <Badge className={getStatusColor(species.humidityStatus)}>
                        Humidity: {species.humidityStatus}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{species.currentMatch}%</div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                    <Badge className={getPriorityColor(species.priority)}>
                      {species.priority} priority
                    </Badge>
                  </div>
                </div>

                <div>
                  <h6 className="font-medium text-gray-900 mb-2">Optimization Recommendations:</h6>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {species.recommendations.map((rec, recIndex) => (
                      <li key={recIndex} className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Climate Optimization Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {optimizationStrategies.map((strategy, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">{strategy.goal}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Current:</span>
                    <span className="font-medium">{strategy.currentLevel}</span>
                    <span className="text-sm text-gray-600">→ Target:</span>
                    <span className="font-medium text-green-600">{strategy.targetLevel}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {strategy.methods.map((method, methodIndex) => (
                    <div key={methodIndex} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{method.method}</h5>
                        <Badge variant="outline">{method.effectiveness}%</Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{method.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Cost:</span>
                          <span className="font-medium">{method.cost}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Difficulty:</span>
                          <span className="font-medium">{method.difficulty}</span>
                        </div>
                        <Button size="sm" className="w-full">
                          Implement
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HumidityTemperatureOptimization;
