
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Sun, 
  Snowflake,
  Globe,
  TrendingUp,
  Target,
  Info
} from 'lucide-react';

const ClimateZoneAnalysis: React.FC = () => {
  const currentLocation = {
    city: 'San Francisco',
    state: 'California',
    zone: '10a',
    description: 'Subtropical Climate',
    averageTemp: '58-72°F',
    averageHumidity: '60-75%',
    frostDates: 'Rare frost events',
    growingSeason: 'Year-round'
  };

  const zoneComparison = [
    {
      zone: '9a (20-25°F)',
      location: 'Houston, TX',
      characteristics: 'Warm subtropical with hot summers',
      orchidSuitability: 'Excellent',
      challenges: ['High humidity', 'Hurricane season', 'Heat stress'],
      advantages: ['Long growing season', 'Natural humidity', 'Warm winters'],
      recommendedSpecies: ['Cattleya', 'Dendrobium', 'Vanda', 'Epidendrum']
    },
    {
      zone: '9b (25-30°F)',
      location: 'Miami, FL',
      characteristics: 'Tropical with year-round warmth',
      orchidSuitability: 'Outstanding',
      challenges: ['Hurricane season', 'Excessive heat', 'Fungal issues'],
      advantages: ['Ideal temperatures', 'High humidity', 'No frost'],
      recommendedSpecies: ['Phalaenopsis', 'Vanda', 'Dendrobium', 'Oncidium']
    },
    {
      zone: '10a (30-35°F)',
      location: 'San Francisco, CA',
      characteristics: 'Mediterranean coastal climate',
      orchidSuitability: 'Very Good',
      challenges: ['Dry summers', 'Cool fog', 'Limited winter light'],
      advantages: ['Mild temperatures', 'No extreme weather', 'Good air quality'],
      recommendedSpecies: ['Cymbidium', 'Cattleya', 'Oncidium', 'Pleione']
    },
    {
      zone: '10b (35-40°F)',
      location: 'Key West, FL',
      characteristics: 'True tropical climate',
      orchidSuitability: 'Perfect',
      challenges: ['Hurricanes', 'Salt air', 'Extreme humidity'],
      advantages: ['Consistent warmth', 'High humidity', 'No frost ever'],
      recommendedSpecies: ['All tropical species', 'Vanda', 'Phalaenopsis']
    }
  ];

  const seasonalPatterns = [
    {
      season: 'Spring',
      temperature: '60-68°F',
      humidity: '65-70%',
      rainfall: 'Moderate',
      careAdjustments: [
        'Increase watering gradually',
        'Resume fertilization',
        'Monitor for new growth',
        'Prepare for summer heat'
      ]
    },
    {
      season: 'Summer',
      temperature: '65-75°F',
      humidity: '55-65%',
      rainfall: 'Low',
      careAdjustments: [
        'Provide afternoon shade',
        'Increase humidity measures',
        'Monitor for drought stress',
        'Ensure good air circulation'
      ]
    },
    {
      season: 'Fall',
      temperature: '58-70°F',
      humidity: '60-70%',
      rainfall: 'Low to Moderate',
      careAdjustments: [
        'Reduce watering frequency',
        'Prepare for bloom season',
        'Monitor temperature drops',
        'Adjust fertilizer ratios'
      ]
    },
    {
      season: 'Winter',
      temperature: '50-65°F',
      humidity: '70-80%',
      rainfall: 'High',
      careAdjustments: [
        'Significant watering reduction',
        'Monitor for overwatering',
        'Ensure drainage',
        'Provide winter protection'
      ]
    }
  ];

  const microclimateTips = [
    {
      area: 'Urban Heat Islands',
      description: 'Cities can be 2-5°F warmer than surrounding areas',
      impact: 'Increased heat stress, faster drying',
      adjustments: [
        'Provide extra shade during summer',
        'Increase watering frequency',
        'Use reflective mulch',
        'Position plants for morning sun only'
      ]
    },
    {
      area: 'Coastal Effects',
      description: 'Ocean proximity moderates temperature but increases humidity',
      impact: 'Stable temperatures, salt air exposure',
      adjustments: [
        'Rinse leaves regularly to remove salt',
        'Monitor for fungal issues',
        'Take advantage of stable temperatures',
        'Protect from strong ocean winds'
      ]
    },
    {
      area: 'Valley Climate',
      description: 'Protected areas with temperature extremes',
      impact: 'Hot days, cool nights, still air',
      adjustments: [
        'Monitor daily temperature swings',
        'Ensure good air circulation',
        'Provide heat protection',
        'Take advantage of cool nights'
      ]
    },
    {
      area: 'Mountain Areas',
      description: 'Higher elevation with cooler temperatures',
      impact: 'Shorter growing season, intense UV',
      adjustments: [
        'Extend indoor growing period',
        'Provide UV protection',
        'Monitor for early/late frost',
        'Adjust for lower humidity'
      ]
    }
  ];

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability.toLowerCase()) {
      case 'perfect': case 'outstanding': return 'bg-green-100 text-green-800';
      case 'excellent': case 'very good': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Climate Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Your Climate Zone Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentLocation.city}, {currentLocation.state}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">Zone {currentLocation.zone}</Badge>
                  <Badge variant="outline">{currentLocation.description}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <div>
                    <div className="text-sm text-gray-600">Temperature</div>
                    <div className="font-medium">{currentLocation.averageTemp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">Humidity</div>
                    <div className="font-medium">{currentLocation.averageHumidity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Snowflake className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Frost</div>
                    <div className="font-medium">{currentLocation.frostDates}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600">Growing Season</div>
                    <div className="font-medium">{currentLocation.growingSeason}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h5 className="font-medium text-green-900 mb-2">Zone Advantages:</h5>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Mild year-round temperatures ideal for orchids</li>
                <li>• No extreme weather events</li>
                <li>• Excellent air quality</li>
                <li>• Consistent growing conditions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Climate Zone Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {zoneComparison.map((zone, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{zone.zone}</h4>
                    <p className="text-sm text-gray-600">{zone.location}</p>
                  </div>
                  <Badge className={getSuitabilityColor(zone.orchidSuitability)}>
                    {zone.orchidSuitability}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-4">{zone.characteristics}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h6 className="font-medium text-red-900 mb-2">Challenges:</h6>
                    <ul className="space-y-1">
                      {zone.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex} className="text-sm text-red-700 flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-green-900 mb-2">Advantages:</h6>
                    <ul className="space-y-1">
                      {zone.advantages.map((advantage, advantageIndex) => (
                        <li key={advantageIndex} className="text-sm text-green-700 flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-blue-900 mb-2">Recommended Species:</h6>
                    <div className="flex flex-wrap gap-1">
                      {zone.recommendedSpecies.map((species, speciesIndex) => (
                        <Badge key={speciesIndex} variant="outline" className="text-xs">
                          {species}
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

      {/* Seasonal Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Local Seasonal Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonalPatterns.map((season, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{season.season}</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Temperature: </span>
                    <span className="font-medium">{season.temperature}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Humidity: </span>
                    <span className="font-medium">{season.humidity}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Rainfall: </span>
                    <span className="font-medium">{season.rainfall}</span>
                  </div>
                </div>

                <div>
                  <h6 className="font-medium text-gray-900 mb-2">Care Adjustments:</h6>
                  <ul className="space-y-1">
                    {season.careAdjustments.map((adjustment, adjustmentIndex) => (
                      <li key={adjustmentIndex} className="text-xs text-gray-700 flex items-start gap-1">
                        <Target className="w-2 h-2 text-blue-500 mt-1 flex-shrink-0" />
                        {adjustment}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Microclimate Considerations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Microclimate Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {microclimateTips.map((tip, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{tip.area}</h4>
                <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
                
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-900">Impact: </span>
                  <span className="text-sm text-gray-700">{tip.impact}</span>
                </div>

                <div>
                  <h6 className="font-medium text-gray-900 mb-2">Adjustments:</h6>
                  <ul className="space-y-1">
                    {tip.adjustments.map((adjustment, adjustmentIndex) => (
                      <li key={adjustmentIndex} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        {adjustment}
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

export default ClimateZoneAnalysis;
