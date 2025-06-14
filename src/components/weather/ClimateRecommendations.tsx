
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Thermometer, 
  Droplets, 
  Sun, 
  Cloud, 
  Wind, 
  Snowflake,
  Umbrella,
  Shield,
  Target,
  CheckCircle
} from 'lucide-react';

const ClimateRecommendations: React.FC = () => {
  const climateZones = [
    {
      zone: 'Tropical (10-11)',
      description: 'Year-round warm temperatures with high humidity',
      recommendations: [
        'Provide excellent air circulation to prevent fungal issues',
        'Water frequently but ensure good drainage',
        'Provide shade during intense midday sun',
        'Monitor for pests that thrive in warm, humid conditions'
      ],
      idealSpecies: ['Phalaenopsis', 'Dendrobium', 'Vanda'],
      challenges: ['Fungal infections', 'Pest pressure', 'Overheating']
    },
    {
      zone: 'Subtropical (9-10)',
      description: 'Mild winters with warm, humid summers',
      recommendations: [
        'Adjust watering seasonally - more in summer, less in winter',
        'Provide winter protection for sensitive species',
        'Increase humidity during dry winter months',
        'Monitor temperature fluctuations'
      ],
      idealSpecies: ['Cattleya', 'Oncidium', 'Epidendrum'],
      challenges: ['Seasonal adjustments', 'Winter protection', 'Humidity control']
    },
    {
      zone: 'Temperate (6-8)',
      description: 'Distinct seasons with cold winters',
      recommendations: [
        'Move plants indoors during winter months',
        'Use grow lights to supplement winter light',
        'Maintain consistent indoor humidity',
        'Gradually acclimate plants to seasonal changes'
      ],
      idealSpecies: ['Cymbidium', 'Pleione', 'Bletilla'],
      challenges: ['Winter dormancy', 'Light deficiency', 'Indoor adaptation']
    }
  ];

  const seasonalAdvice = [
    {
      season: 'Spring',
      icon: <Sun className="w-5 h-5 text-yellow-500" />,
      recommendations: [
        'Resume regular watering as growth begins',
        'Start fertilizing with nitrogen-rich formula',
        'Gradually increase light exposure',
        'Check for new growth and repot if needed'
      ],
      warnings: ['Watch for rapid temperature changes', 'Monitor for spring pests']
    },
    {
      season: 'Summer',
      icon: <Sun className="w-5 h-5 text-orange-500" />,
      recommendations: [
        'Provide afternoon shade to prevent overheating',
        'Increase humidity and air circulation',
        'Water more frequently but maintain good drainage',
        'Monitor for heat stress symptoms'
      ],
      warnings: ['Extreme heat protection needed', 'Increased pest activity']
    },
    {
      season: 'Fall',
      icon: <Cloud className="w-5 h-5 text-orange-600" />,
      recommendations: [
        'Gradually reduce watering frequency',
        'Switch to phosphorus-rich fertilizer for blooming',
        'Prepare for winter dormancy period',
        'Clean up any fallen debris'
      ],
      warnings: ['Prepare for temperature drops', 'Reduce fertilization']
    },
    {
      season: 'Winter',
      icon: <Snowflake className="w-5 h-5 text-blue-500" />,
      recommendations: [
        'Reduce watering significantly',
        'Provide supplemental lighting indoors',
        'Maintain stable indoor temperatures',
        'Monitor for dry air and increase humidity'
      ],
      warnings: ['Avoid overwatering', 'Watch for cold drafts']
    }
  ];

  const currentRecommendations = [
    {
      priority: 'high',
      category: 'Watering',
      recommendation: 'Reduce watering frequency due to high humidity forecast (78% avg next 3 days)',
      action: 'Skip next scheduled watering',
      impact: 'Prevents root rot and fungal issues'
    },
    {
      priority: 'medium',
      category: 'Light Protection',
      recommendation: 'UV index will reach 9 tomorrow - provide afternoon shade',
      action: 'Move plants or add shade cloth',
      impact: 'Prevents leaf burn and stress'
    },
    {
      priority: 'medium',
      category: 'Air Circulation',
      recommendation: 'Low wind conditions expected - ensure good indoor air movement',
      action: 'Use fans to improve circulation',
      impact: 'Reduces humidity stagnation'
    },
    {
      priority: 'low',
      category: 'Fertilization',
      recommendation: 'Stable weather conditions ideal for nutrient uptake',
      action: 'Continue regular feeding schedule',
      impact: 'Maintains healthy growth'
    }
  ];

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
      {/* Current Weather-Based Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Current Weather-Based Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                    <span className="font-medium text-gray-900">{rec.category}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-900">{rec.recommendation}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Action: </span>
                      <span className="text-gray-600">{rec.action}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Impact: </span>
                      <span className="text-gray-600">{rec.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Climate Zone Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Climate Zone Care Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {climateZones.map((zone, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{zone.zone}</h4>
                  <p className="text-gray-600">{zone.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Care Recommendations:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {zone.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Ideal Species:</h5>
                    <div className="flex flex-wrap gap-1">
                      {zone.idealSpecies.map((species, speciesIndex) => (
                        <Badge key={speciesIndex} variant="outline" className="text-xs">
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Common Challenges:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {zone.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full" />
                          {challenge}
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

      {/* Seasonal Care Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Seasonal Care Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalAdvice.map((season, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  {season.icon}
                  <h4 className="text-lg font-semibold text-gray-900">{season.season}</h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {season.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Warnings:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {season.warnings.map((warning, warningIndex) => (
                        <li key={warningIndex} className="flex items-start gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full mt-0.5 flex-shrink-0" />
                          {warning}
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

export default ClimateRecommendations;
