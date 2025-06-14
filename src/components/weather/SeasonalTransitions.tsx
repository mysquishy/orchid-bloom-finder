
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { 
  Calendar, 
  TrendingUp, 
  Thermometer, 
  Droplets, 
  Sun, 
  Snowflake,
  ArrowRight,
  Clock,
  Target
} from 'lucide-react';

const SeasonalTransitions: React.FC = () => {
  const transitionCalendar = [
    {
      period: 'Spring Transition (Mar-Apr)',
      currentPhase: 'Early Spring',
      daysUntilNext: 15,
      nextPhase: 'Mid Spring',
      keyChanges: [
        'Increase watering frequency gradually',
        'Resume fertilization with nitrogen focus',
        'Gradually increase light exposure',
        'Monitor for new growth emergence'
      ],
      plantResponse: 'Root activity increasing, new shoots visible',
      careAdjustments: [
        { aspect: 'Watering', from: 'Every 14 days', to: 'Every 10 days', timing: '2 weeks' },
        { aspect: 'Fertilizing', from: 'None', to: 'Bi-weekly dilute', timing: '1 week' },
        { aspect: 'Light', from: '6 hours', to: '8 hours', timing: '3 weeks' }
      ]
    },
    {
      period: 'Summer Preparation (May-Jun)',
      currentPhase: 'Late Spring',
      daysUntilNext: 45,
      nextPhase: 'Early Summer',
      keyChanges: [
        'Prepare shade structures for intense sun',
        'Increase humidity measures',
        'Boost air circulation',
        'Monitor for heat stress signs'
      ],
      plantResponse: 'Active growth phase, increased metabolic activity',
      careAdjustments: [
        { aspect: 'Watering', from: 'Every 10 days', to: 'Every 7 days', timing: '2 weeks' },
        { aspect: 'Humidity', from: '60%', to: '70%', timing: '1 week' },
        { aspect: 'Ventilation', from: 'Moderate', to: 'High', timing: 'Immediate' }
      ]
    }
  ];

  const seasonalTrends = [
    { month: 'Jan', temp: 45, humidity: 40, lightHours: 10, careIntensity: 20 },
    { month: 'Feb', temp: 48, humidity: 42, lightHours: 11, careIntensity: 25 },
    { month: 'Mar', temp: 55, humidity: 45, lightHours: 12, careIntensity: 40 },
    { month: 'Apr', temp: 62, humidity: 50, lightHours: 13, careIntensity: 60 },
    { month: 'May', temp: 68, humidity: 55, lightHours: 14, careIntensity: 80 },
    { month: 'Jun', temp: 75, humidity: 60, lightHours: 15, careIntensity: 90 },
    { month: 'Jul', temp: 80, humidity: 65, lightHours: 15, careIntensity: 95 },
    { month: 'Aug', temp: 78, humidity: 63, lightHours: 14, careIntensity: 90 },
    { month: 'Sep', temp: 70, humidity: 58, lightHours: 13, careIntensity: 75 },
    { month: 'Oct', temp: 60, humidity: 52, lightHours: 12, careIntensity: 55 },
    { month: 'Nov', temp: 52, humidity: 48, lightHours: 11, careIntensity: 35 },
    { month: 'Dec', temp: 47, humidity: 45, lightHours: 10, careIntensity: 25 }
  ];

  const adaptationStrategies = [
    {
      transition: 'Winter to Spring',
      timeframe: 'February - April',
      strategies: [
        'Gradually increase watering as daylight extends',
        'Resume feeding with diluted fertilizer',
        'Slowly introduce more light exposure',
        'Monitor for signs of new growth'
      ],
      commonMistakes: [
        'Rushing to increase care too quickly',
        'Overwatering before roots are active',
        'Exposing to intense light suddenly'
      ]
    },
    {
      transition: 'Spring to Summer',
      timeframe: 'April - June',
      strategies: [
        'Install shade protection systems',
        'Increase air circulation significantly',
        'Boost humidity levels gradually',
        'Prepare emergency heat protection'
      ],
      commonMistakes: [
        'Inadequate heat protection preparation',
        'Insufficient humidity increase',
        'Poor air circulation planning'
      ]
    },
    {
      transition: 'Summer to Fall',
      timeframe: 'August - October',
      strategies: [
        'Gradually reduce watering frequency',
        'Switch to phosphorus-rich fertilizers',
        'Prepare for reduced light conditions',
        'Monitor for blooming preparation'
      ],
      commonMistakes: [
        'Continuing heavy summer watering',
        'Forgetting to adjust fertilizer ratios',
        'Not preparing for light reduction'
      ]
    },
    {
      transition: 'Fall to Winter',
      timeframe: 'October - December',
      strategies: [
        'Significantly reduce watering',
        'Provide supplemental lighting if needed',
        'Ensure stable indoor temperatures',
        'Prepare dormancy conditions'
      ],
      commonMistakes: [
        'Maintaining summer care routines',
        'Inadequate winter light preparation',
        'Temperature fluctuation exposure'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Transition Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Current Seasonal Transition Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {transitionCalendar.map((transition, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-blue-50 to-green-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{transition.period}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{transition.currentPhase}</Badge>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <Badge className="bg-blue-100 text-blue-800">{transition.nextPhase}</Badge>
                      <Clock className="w-4 h-4 text-gray-500 ml-2" />
                      <span className="text-sm text-gray-600">{transition.daysUntilNext} days</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Start Transition
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Key Changes Required:</h5>
                    <ul className="space-y-2">
                      {transition.keyChanges.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start gap-2 text-sm">
                          <Target className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Care Adjustments Timeline:</h5>
                    <div className="space-y-3">
                      {transition.careAdjustments.map((adjustment, adjIndex) => (
                        <div key={adjIndex} className="p-3 bg-white rounded border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-gray-900">{adjustment.aspect}</span>
                            <Badge variant="outline" className="text-xs">{adjustment.timing}</Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            {adjustment.from} → {adjustment.to}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h6 className="font-medium text-blue-900 mb-1">Expected Plant Response:</h6>
                  <p className="text-sm text-blue-800">{transition.plantResponse}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Annual Seasonal Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Annual Seasonal Trends & Care Intensity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px]">
            <AreaChart data={seasonalTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="careIntensity" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Care Intensity %" />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} name="Temperature (°F)" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity %" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Seasonal Adaptation Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Seasonal Adaptation Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adaptationStrategies.map((strategy, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{strategy.transition}</h4>
                  <Badge variant="outline" className="mt-1">{strategy.timeframe}</Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Adaptation Strategies:</h5>
                    <ul className="space-y-1">
                      {strategy.strategies.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Common Mistakes to Avoid:</h5>
                    <ul className="space-y-1">
                      {strategy.commonMistakes.map((mistake, mistakeIndex) => (
                        <li key={mistakeIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-gray-700">{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonalTransitions;
