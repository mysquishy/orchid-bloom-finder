
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Camera, 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  Calendar,
  Target,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PremiumBadge from '@/components/PremiumBadge';
import HealthScoreCard from './HealthScoreCard';
import PredictiveAnalysis from './PredictiveAnalysis';
import StressIndicators from './StressIndicators';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import BloomPredictions from './BloomPredictions';
import GrowthProjections from './GrowthProjections';
import CareOptimization from './CareOptimization';
import PhotoHealthAnalysis from './PhotoHealthAnalysis';

interface HealthData {
  overallScore: number;
  plantCount: number;
  healthyPlants: number;
  plantsAtRisk: number;
  criticalAlerts: number;
  lastAnalysis: Date;
}

const HealthMonitoringDashboard: React.FC = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      // Mock data - in real implementation, this would come from AI analysis
      const mockData: HealthData = {
        overallScore: 87.5,
        plantCount: 12,
        healthyPlants: 9,
        plantsAtRisk: 2,
        criticalAlerts: 1,
        lastAnalysis: new Date()
      };
      setHealthData(mockData);
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runHealthAnalysis = async () => {
    setLoading(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    await fetchHealthData();
  };

  if (loading && !healthData) {
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
          <h1 className="text-3xl font-bold text-gray-900">Plant Health Monitoring</h1>
          <PremiumBadge size="lg" />
        </div>
        <Button 
          onClick={runHealthAnalysis}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
        >
          <Brain className="w-4 h-4 mr-2" />
          {loading ? 'Analyzing...' : 'Run AI Analysis'}
        </Button>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Overall Health Score</p>
                <p className="text-2xl font-bold text-green-900">{healthData?.overallScore || 0}%</p>
              </div>
              <Heart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Healthy Plants</p>
                <p className="text-2xl font-bold text-blue-900">{healthData?.healthyPlants || 0}/{healthData?.plantCount || 0}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Plants at Risk</p>
                <p className="text-2xl font-bold text-yellow-900">{healthData?.plantsAtRisk || 0}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-900">{healthData?.criticalAlerts || 0}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="stress">Stress Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="blooms">Bloom Cycles</TabsTrigger>
          <TabsTrigger value="growth">Growth Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Care Optimization</TabsTrigger>
          <TabsTrigger value="photos">Photo Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <HealthScoreCard />
        </TabsContent>

        <TabsContent value="predictions">
          <PredictiveAnalysis />
        </TabsContent>

        <TabsContent value="stress">
          <StressIndicators />
        </TabsContent>

        <TabsContent value="recommendations">
          <PersonalizedRecommendations />
        </TabsContent>

        <TabsContent value="blooms">
          <BloomPredictions />
        </TabsContent>

        <TabsContent value="growth">
          <GrowthProjections />
        </TabsContent>

        <TabsContent value="optimization">
          <CareOptimization />
        </TabsContent>

        <TabsContent value="photos">
          <PhotoHealthAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoringDashboard;
