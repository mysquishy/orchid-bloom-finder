
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  FlaskConical,
  PersonStanding,
  Share2,
  Heart,
  ArrowUp,
  ArrowDown,
  DollarSign
} from 'lucide-react';
import ABTestingFramework from './ABTestingFramework';
import ConversionFunnelOptimizer from './ConversionFunnelOptimizer';
import PersonalizationEngine from './PersonalizationEngine';
import GrowthHackingFeatures from './GrowthHackingFeatures';
import RetentionOptimization from './RetentionOptimization';

interface ConversionMetrics {
  overallConversionRate: number;
  registrationRate: number;
  firstIdentificationRate: number;
  premiumConversionRate: number;
  activeTestsCount: number;
  monthlyGrowthRate: number;
  retentionRate: number;
  viralCoefficient: number;
}

const ConversionOptimizationDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<ConversionMetrics>({
    overallConversionRate: 12.4,
    registrationRate: 28.6,
    firstIdentificationRate: 78.2,
    premiumConversionRate: 15.3,
    activeTestsCount: 8,
    monthlyGrowthRate: 24.7,
    retentionRate: 68.9,
    viralCoefficient: 1.3
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading conversion metrics
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getMetricTrend = (value: number, baseline: number) => {
    const change = ((value - baseline) / baseline) * 100;
    return {
      percentage: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      color: change > 0 ? 'text-green-600' : 'text-red-600',
      icon: change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
    };
  };

  if (loading) {
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conversion Optimization</h1>
          <p className="text-gray-600">Maximize user acquisition, engagement, and retention</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <Zap className="w-4 h-4 mr-2" />
          Launch Campaign
        </Button>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Overall Conversion</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-blue-900">{metrics.overallConversionRate}%</p>
                  <div className={`flex items-center ${getMetricTrend(metrics.overallConversionRate, 11.2).color}`}>
                    {getMetricTrend(metrics.overallConversionRate, 11.2).icon}
                    <span className="text-xs">{getMetricTrend(metrics.overallConversionRate, 11.2).percentage}%</span>
                  </div>
                </div>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Registration Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-900">{metrics.registrationRate}%</p>
                  <div className={`flex items-center ${getMetricTrend(metrics.registrationRate, 25.4).color}`}>
                    {getMetricTrend(metrics.registrationRate, 25.4).icon}
                    <span className="text-xs">{getMetricTrend(metrics.registrationRate, 25.4).percentage}%</span>
                  </div>
                </div>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Premium Conversion</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-purple-900">{metrics.premiumConversionRate}%</p>
                  <div className={`flex items-center ${getMetricTrend(metrics.premiumConversionRate, 13.8).color}`}>
                    {getMetricTrend(metrics.premiumConversionRate, 13.8).icon}
                    <span className="text-xs">{getMetricTrend(metrics.premiumConversionRate, 13.8).percentage}%</span>
                  </div>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Viral Coefficient</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-orange-900">{metrics.viralCoefficient}</p>
                  <div className={`flex items-center ${getMetricTrend(metrics.viralCoefficient, 1.1).color}`}>
                    {getMetricTrend(metrics.viralCoefficient, 1.1).icon}
                    <span className="text-xs">{getMetricTrend(metrics.viralCoefficient, 1.1).percentage}%</span>
                  </div>
                </div>
              </div>
              <Share2 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Tests & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Active A/B Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.activeTestsCount}</div>
              <p className="text-sm text-gray-600">Tests running</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">3 concluding this week</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Growth Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{metrics.monthlyGrowthRate}%</div>
              <p className="text-sm text-gray-600">Monthly growth</p>
              <Progress value={metrics.monthlyGrowthRate} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">{metrics.retentionRate}%</div>
              <p className="text-sm text-gray-600">30-day retention</p>
              <div className="mt-2 text-xs text-gray-500">Target: 75%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Optimization Tabs */}
      <Tabs defaultValue="ab-testing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ab-testing" className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            A/B Testing
          </TabsTrigger>
          <TabsTrigger value="funnel" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Funnel
          </TabsTrigger>
          <TabsTrigger value="personalization" className="flex items-center gap-2">
            <PersonStanding className="w-4 h-4" />
            Personalization
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Growth
          </TabsTrigger>
          <TabsTrigger value="retention" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Retention
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ab-testing">
          <ABTestingFramework />
        </TabsContent>

        <TabsContent value="funnel">
          <ConversionFunnelOptimizer />
        </TabsContent>

        <TabsContent value="personalization">
          <PersonalizationEngine />
        </TabsContent>

        <TabsContent value="growth">
          <GrowthHackingFeatures />
        </TabsContent>

        <TabsContent value="retention">
          <RetentionOptimization />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversionOptimizationDashboard;
