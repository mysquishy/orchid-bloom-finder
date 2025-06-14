
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter } from 'recharts';
import { 
  MapPin, 
  Home, 
  Trees, 
  Building, 
  Compass,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  Target
} from 'lucide-react';

const MicroclimatAnalysis: React.FC = () => {
  const microclimates = [
    {
      location: 'South-Facing Window',
      type: 'High Light Zone',
      temperature: 78,
      humidity: 52,
      lightIntensity: 95,
      airFlow: 'Low',
      suitability: 'Excellent for light-loving species',
      advantages: ['Maximum light exposure', 'Warm temperatures', 'Good for blooming'],
      challenges: ['Risk of overheating', 'Low humidity', 'Potential leaf burn'],
      recommendedSpecies: ['Cattleya', 'Vanda', 'Dendrobium'],
      optimizations: [
        'Add humidity tray',
        'Provide afternoon shade',
        'Monitor for heat stress'
      ]
    },
    {
      location: 'North-Facing Window',
      type: 'Low Light Zone',
      temperature: 70,
      humidity: 62,
      lightIntensity: 45,
      airFlow: 'Moderate',
      suitability: 'Good for shade-tolerant species',
      advantages: ['Stable temperatures', 'Good humidity', 'No direct sun stress'],
      challenges: ['Low light levels', 'Slower growth', 'Reduced flowering'],
      recommendedSpecies: ['Phalaenopsis', 'Paphiopedilum', 'Jewel orchids'],
      optimizations: [
        'Add grow lights',
        'Supplement with LED strips',
        'Rotate plants weekly'
      ]
    },
    {
      location: 'Bathroom',
      type: 'High Humidity Zone',
      temperature: 74,
      humidity: 78,
      lightIntensity: 30,
      airFlow: 'Poor',
      suitability: 'Excellent humidity, poor light',
      advantages: ['High humidity', 'Stable moisture', 'Warm environment'],
      challenges: ['Low light', 'Poor air circulation', 'Risk of fungal issues'],
      recommendedSpecies: ['Phalaenopsis', 'Some Pleurothallids'],
      optimizations: [
        'Install grow lights',
        'Add ventilation fan',
        'Monitor for mold'
      ]
    },
    {
      location: 'Kitchen Counter',
      type: 'Variable Environment',
      temperature: 76,
      humidity: 68,
      lightIntensity: 60,
      airFlow: 'Variable',
      suitability: 'Good with careful monitoring',
      advantages: ['Good humidity from cooking', 'Decent light', 'Easy to monitor'],
      challenges: ['Temperature fluctuations', 'Cooking fumes', 'Oil exposure'],
      recommendedSpecies: ['Dendrobium', 'Oncidium'],
      optimizations: [
        'Use hood fan while cooking',
        'Monitor temperature swings',
        'Protect from oil splatter'
      ]
    }
  ];

  const elevationEffects = [
    { height: 'Floor Level (0-2ft)', temp: 68, humidity: 65, airflow: 25, light: 40 },
    { height: 'Table Level (2-4ft)', temp: 72, humidity: 60, airflow: 70, light: 80 },
    { height: 'Shelf Level (4-6ft)', temp: 75, humidity: 55, airflow: 85, light: 95 },
    { height: 'Ceiling Level (6-8ft)', temp: 78, humidity: 50, airflow: 90, light: 85 }
  ];

  const proximityFactors = [
    {
      factor: 'Heat Sources',
      items: ['Radiators', 'Heat vents', 'Electronics', 'Appliances'],
      effect: 'Increases temperature, decreases humidity',
      distance: 'Keep 3+ feet away',
      impact: 'High risk of overheating and rapid drying'
    },
    {
      factor: 'Windows',
      items: ['Single-pane', 'Double-pane', 'Skylights', 'Bay windows'],
      effect: 'Variable temperature, high light',
      distance: '1-3 feet optimal',
      impact: 'Temperature fluctuations, light availability'
    },
    {
      factor: 'Water Sources',
      items: ['Sinks', 'Showers', 'Aquariums', 'Fountains'],
      effect: 'Increases humidity, stable temperature',
      distance: 'Within 6 feet beneficial',
      impact: 'Natural humidity boost'
    },
    {
      factor: 'Air Circulation',
      items: ['Fans', 'Vents', 'Doorways', 'Open spaces'],
      effect: 'Improves air movement, prevents stagnation',
      distance: 'Gentle breeze ideal',
      impact: 'Prevents fungal issues, improves transpiration'
    }
  ];

  const seasonalVariations = [
    {
      season: 'Winter',
      changes: [
        'Lower humidity due to heating',
        'Reduced daylight hours',
        'Cold window drafts',
        'Dry air from forced heating'
      ],
      adaptations: [
        'Add humidifiers near plants',
        'Move away from cold windows',
        'Supplement with grow lights',
        'Group plants for microclimate'
      ]
    },
    {
      season: 'Summer',
      changes: [
        'Higher temperatures',
        'Intense sunlight',
        'Air conditioning effects',
        'Variable humidity'
      ],
      adaptations: [
        'Provide afternoon shade',
        'Increase watering frequency',
        'Monitor AC placement',
        'Enhance air circulation'
      ]
    }
  ];

  const getSuitabilityScore = (microclimate: any) => {
    const tempScore = microclimate.temperature >= 65 && microclimate.temperature <= 80 ? 25 : 15;
    const humidityScore = microclimate.humidity >= 50 && microclimate.humidity <= 70 ? 25 : 15;
    const lightScore = microclimate.lightIntensity >= 40 ? 25 : 15;
    const airFlowScore = microclimate.airFlow !== 'Poor' ? 25 : 15;
    return tempScore + humidityScore + lightScore + airFlowScore;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Microclimate Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Indoor Microclimate Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {microclimates.map((microclimate, index) => {
              const score = getSuitabilityScore(microclimate);
              return (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{microclimate.location}</h4>
                      <Badge variant="outline">{microclimate.type}</Badge>
                    </div>
                    <Badge className={getScoreColor(score)}>
                      {score}% Score
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Thermometer className="w-3 h-3" />
                          Temp
                        </span>
                        <span className="font-medium">{microclimate.temperature}°F</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Droplets className="w-3 h-3" />
                          Humidity
                        </span>
                        <span className="font-medium">{microclimate.humidity}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Sun className="w-3 h-3" />
                          Light
                        </span>
                        <span className="font-medium">{microclimate.lightIntensity}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Wind className="w-3 h-3" />
                          Airflow
                        </span>
                        <span className="font-medium">{microclimate.airFlow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h6 className="font-medium text-green-900 mb-1">Advantages:</h6>
                      <ul className="space-y-1">
                        {microclimate.advantages.map((advantage, advIndex) => (
                          <li key={advIndex} className="text-sm text-green-700 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h6 className="font-medium text-orange-900 mb-1">Challenges:</h6>
                      <ul className="space-y-1">
                        {microclimate.challenges.map((challenge, chalIndex) => (
                          <li key={chalIndex} className="text-sm text-orange-700 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h6 className="font-medium text-blue-900 mb-1">Recommended Species:</h6>
                      <div className="flex flex-wrap gap-1">
                        {microclimate.recommendedSpecies.map((species, speciesIndex) => (
                          <Badge key={speciesIndex} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h6 className="font-medium text-purple-900 mb-1">Optimizations:</h6>
                      <ul className="space-y-1">
                        {microclimate.optimizations.map((opt, optIndex) => (
                          <li key={optIndex} className="text-sm text-purple-700 flex items-start gap-2">
                            <Target className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Vertical Elevation Effects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Vertical Climate Variations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <ChartContainer config={{}} className="h-[300px]">
              <AreaChart data={elevationEffects}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="height" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="temp" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Temperature (°F)" />
                <Area type="monotone" dataKey="humidity" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Humidity %" />
                <Area type="monotone" dataKey="light" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="Light %" />
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {elevationEffects.map((level, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg text-center">
                <h5 className="font-medium text-gray-900 mb-2">{level.height}</h5>
                <div className="space-y-1 text-sm">
                  <div>Temp: {level.temp}°F</div>
                  <div>Humidity: {level.humidity}%</div>
                  <div>Light: {level.light}%</div>
                  <div>Airflow: {level.airflow}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Proximity Factor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-5 h-5" />
            Proximity Factor Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proximityFactors.map((factor, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{factor.factor}</h4>
                
                <div className="space-y-3">
                  <div>
                    <h6 className="font-medium text-gray-900 mb-1">Common Items:</h6>
                    <div className="flex flex-wrap gap-1">
                      {factor.items.map((item, itemIndex) => (
                        <Badge key={itemIndex} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Effect: </span>
                      <span className="text-gray-600">{factor.effect}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Optimal Distance: </span>
                      <span className="text-gray-600">{factor.distance}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Impact: </span>
                      <span className="text-gray-600">{factor.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Microclimate Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trees className="w-5 h-5" />
            Seasonal Microclimate Adaptations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seasonalVariations.map((season, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{season.season} Adaptations</h4>
                
                <div className="space-y-4">
                  <div>
                    <h6 className="font-medium text-orange-900 mb-2">Seasonal Changes:</h6>
                    <ul className="space-y-1">
                      {season.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="text-sm text-orange-700 flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-green-900 mb-2">Recommended Adaptations:</h6>
                    <ul className="space-y-1">
                      {season.adaptations.map((adaptation, adaptIndex) => (
                        <li key={adaptIndex} className="text-sm text-green-700 flex items-start gap-2">
                          <Target className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {adaptation}
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

export default MicroclimatAnalysis;
