
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Flower, 
  TrendingUp, 
  Calendar,
  Users,
  Heart,
  Star,
  Activity
} from 'lucide-react';
import { userAnalytics, OrchidMetrics } from '@/utils/userAnalytics';
import LoadingSpinner from '@/components/LoadingSpinner';

interface SpeciesPopularity {
  species: string;
  identifications: number;
  successRate: number;
  userRating: number;
}

interface CareSuccessMetrics {
  category: string;
  successRate: number;
  totalAttempts: number;
  improvementTrend: number;
}

const OrchidSpecificMetrics: React.FC = () => {
  const [orchidMetrics, setOrchidMetrics] = useState<OrchidMetrics | null>(null);
  const [speciesPopularity, setSpeciesPopularity] = useState<SpeciesPopularity[]>([]);
  const [careMetrics, setCareMetrics] = useState<CareSuccessMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrchidData();
  }, []);

  const loadOrchidData = async () => {
    try {
      setLoading(true);
      
      const metrics = await userAnalytics.getOrchidMetrics();
      setOrchidMetrics(metrics);
      
      // Mock species popularity data
      setSpeciesPopularity([
        { species: 'Phalaenopsis amabilis', identifications: 1250, successRate: 92.5, userRating: 4.8 },
        { species: 'Cattleya labiata', identifications: 890, successRate: 87.3, userRating: 4.6 },
        { species: 'Dendrobium nobile', identifications: 650, successRate: 85.1, userRating: 4.5 },
        { species: 'Oncidium sphacelatum', identifications: 520, successRate: 79.8, userRating: 4.3 },
        { species: 'Vanda coerulea', identifications: 380, successRate: 82.4, userRating: 4.7 }
      ]);
      
      // Mock care success metrics
      setCareMetrics([
        { category: 'Watering', successRate: 85.2, totalAttempts: 15600, improvementTrend: 5.2 },
        { category: 'Light Management', successRate: 78.9, totalAttempts: 12400, improvementTrend: 3.1 },
        { category: 'Humidity Control', successRate: 72.5, totalAttempts: 9800, improvementTrend: 8.7 },
        { category: 'Fertilizing', successRate: 68.3, totalAttempts: 7200, improvementTrend: -1.2 },
        { category: 'Repotting', successRate: 81.7, totalAttempts: 3400, improvementTrend: 12.5 }
      ]);
      
    } catch (error) {
      console.error('Failed to load orchid data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'Spring': return 'bg-green-500';
      case 'Summer': return 'bg-yellow-500';
      case 'Fall': return 'bg-orange-500';
      case 'Winter': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend < 0) return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  if (loading) return <LoadingSpinner text="Loading orchid analytics..." />;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ID Accuracy</p>
                <p className="text-2xl font-bold text-green-600">
                  {orchidMetrics?.identification_accuracy.toFixed(1)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Care Success</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orchidMetrics?.care_success_rate.toFixed(1)}%
                </p>
              </div>
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Species Tracked</p>
                <p className="text-2xl font-bold text-purple-600">
                  {orchidMetrics?.most_identified_species.length || 0}
                </p>
              </div>
              <Flower className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Growers</p>
                <p className="text-2xl font-bold text-orange-600">2,847</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Species Popularity and Seasonal Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Most Popular Orchid Species
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {speciesPopularity.map((species, index) => (
                <div key={species.species} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{species.species}</p>
                        <p className="text-sm text-gray-600">
                          {species.identifications} identifications
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{species.userRating}</span>
                      </div>
                      <p className={`text-sm ${getSuccessRateColor(species.successRate)}`}>
                        {species.successRate}% success
                      </p>
                    </div>
                  </div>
                  <Progress value={species.successRate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Seasonal Usage Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orchidMetrics && Object.entries(orchidMetrics.seasonal_usage).map(([season, percentage]) => (
                <div key={season} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${getSeasonColor(season)}`}></div>
                      <span className="font-medium">{season}</span>
                    </div>
                    <span className="font-bold">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Seasonal Insights</h4>
                <p className="text-sm text-blue-700">
                  Spring shows the highest engagement (35.2%) as users prepare for growing season. 
                  Winter has the lowest activity (13.9%) with focus on indoor care.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Care Success Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Care Success Rate by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careMetrics.map((metric) => (
              <div key={metric.category} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{metric.category}</h3>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.improvementTrend)}
                    <span className={`text-sm ${metric.improvementTrend > 0 ? 'text-green-600' : metric.improvementTrend < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {metric.improvementTrend > 0 ? '+' : ''}{metric.improvementTrend.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className={`font-medium ${getSuccessRateColor(metric.successRate)}`}>
                      {metric.successRate.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={metric.successRate} className="h-2" />
                  
                  <p className="text-xs text-gray-600 mt-2">
                    {metric.totalAttempts.toLocaleString()} total attempts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Identification Accuracy Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Identification Accuracy by Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: 'Beginner Species', accuracy: 94.2, count: 1580 },
                { level: 'Intermediate Species', accuracy: 87.5, count: 980 },
                { level: 'Advanced Species', accuracy: 78.9, count: 420 },
                { level: 'Expert Species', accuracy: 65.3, count: 180 }
              ].map((item) => (
                <div key={item.level} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.level}</span>
                    <div className="text-right">
                      <div className={`font-bold ${getSuccessRateColor(item.accuracy)}`}>
                        {item.accuracy}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.count} IDs
                      </div>
                    </div>
                  </div>
                  <Progress value={item.accuracy} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: 'Photos Shared', value: '15.2K', trend: '+12%', icon: <Flower className="w-5 h-5 text-pink-600" /> },
                { metric: 'Care Tips Exchanged', value: '8.7K', trend: '+8%', icon: <Heart className="w-5 h-5 text-green-600" /> },
                { metric: 'Success Stories', value: '2.1K', trend: '+15%', icon: <Star className="w-5 h-5 text-yellow-600" /> },
                { metric: 'Expert Consultations', value: '890', trend: '+22%', icon: <Users className="w-5 h-5 text-blue-600" /> }
              ].map((item) => (
                <div key={item.metric} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.metric}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.value}</div>
                    <div className="text-sm text-green-600">{item.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrchidSpecificMetrics;
