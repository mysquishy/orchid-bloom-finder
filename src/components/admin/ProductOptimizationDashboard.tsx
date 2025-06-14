import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Target, 
  Users, 
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

interface FeatureMetric {
  feature: string;
  adoption_rate: number;
  satisfaction_score: number;
  usage_frequency: number;
  revenue_impact: number;
  development_cost: number;
  roi_score: number;
}

interface UserSegmentMetric {
  segment: string;
  size: number;
  engagement_score: number;
  feature_requests: string[];
  pain_points: string[];
  conversion_rate: number;
  ltv: number;
}

const ProductOptimizationDashboard: React.FC = () => {
  const [featureMetrics, setFeatureMetrics] = useState<FeatureMetric[]>([]);
  const [segmentMetrics, setSegmentMetrics] = useState<UserSegmentMetric[]>([]);
  const [loading, setLoading] = useState(true);

  const feature_adoption_data = [
    { week: 'W1', identification: 85, care_calendar: 65, community: 45, experts: 25 },
    { week: 'W2', identification: 88, care_calendar: 68, community: 48, experts: 28 },
    { week: 'W3', identification: 91, care_calendar: 72, community: 52, experts: 32 },
    { week: 'W4', identification: 93, care_calendar: 75, community: 55, experts: 35 },
    { week: 'W5', identification: 94, care_calendar: 78, community: 58, experts: 38 },
    { week: 'W6', identification: 96, care_calendar: 82, community: 62, experts: 42 }
  ];

  const user_satisfaction_data = [
    { month: 'Jan', overall: 4.2, identification: 4.5, care: 4.1, community: 3.8, support: 4.3 },
    { month: 'Feb', overall: 4.3, identification: 4.6, care: 4.2, community: 3.9, support: 4.4 },
    { month: 'Mar', overall: 4.4, identification: 4.7, care: 4.3, community: 4.0, support: 4.5 },
    { month: 'Apr', overall: 4.5, identification: 4.8, care: 4.4, community: 4.1, support: 4.6 },
    { month: 'May', overall: 4.6, identification: 4.8, care: 4.5, community: 4.2, support: 4.7 },
    { month: 'Jun', overall: 4.7, identification: 4.9, care: 4.6, community: 4.3, support: 4.8 }
  ];

  const product_market_fit_data = [
    { segment: 'Beginners', fit_score: 85, growth_rate: 25, satisfaction: 4.4 },
    { segment: 'Hobbyists', fit_score: 92, growth_rate: 18, satisfaction: 4.7 },
    { segment: 'Experts', fit_score: 78, growth_rate: 12, satisfaction: 4.2 },
    { segment: 'Commercial', fit_score: 65, growth_rate: 8, satisfaction: 3.9 }
  ];

  useEffect(() => {
    loadProductData();
  }, []);

  const loadProductData = async () => {
    try {
      setLoading(true);
      
      // Mock feature metrics
      const mockFeatures: FeatureMetric[] = [
        {
          feature: 'AI Orchid Identification',
          adoption_rate: 94,
          satisfaction_score: 4.8,
          usage_frequency: 8.5,
          revenue_impact: 245000,
          development_cost: 85000,
          roi_score: 188
        },
        {
          feature: 'Care Calendar & Reminders',
          adoption_rate: 78,
          satisfaction_score: 4.5,
          usage_frequency: 12.2,
          revenue_impact: 125000,
          development_cost: 35000,
          roi_score: 257
        },
        {
          feature: 'Expert Consultations',
          adoption_rate: 42,
          satisfaction_score: 4.9,
          usage_frequency: 2.1,
          revenue_impact: 180000,
          development_cost: 55000,
          roi_score: 227
        },
        {
          feature: 'Community Features',
          adoption_rate: 58,
          satisfaction_score: 4.2,
          usage_frequency: 5.8,
          revenue_impact: 78000,
          development_cost: 45000,
          roi_score: 73
        },
        {
          feature: 'Plant Health Analytics',
          adoption_rate: 35,
          satisfaction_score: 4.1,
          usage_frequency: 3.2,
          revenue_impact: 45000,
          development_cost: 65000,
          roi_score: -31
        }
      ];

      // Mock user segment metrics
      const mockSegments: UserSegmentMetric[] = [
        {
          segment: 'Beginner Enthusiasts',
          size: 45,
          engagement_score: 78,
          feature_requests: ['Simplified care guides', 'Video tutorials', 'Beginner challenges'],
          pain_points: ['Information overload', 'Complex terminology', 'Expensive mistakes'],
          conversion_rate: 12.5,
          ltv: 145
        },
        {
          segment: 'Experienced Hobbyists',
          size: 35,
          engagement_score: 92,
          feature_requests: ['Advanced analytics', 'Breeding tracking', 'Species database expansion'],
          pain_points: ['Limited advanced features', 'Want more data export', 'Missing rare species'],
          conversion_rate: 28.2,
          ltv: 285
        },
        {
          segment: 'Professional Growers',
          size: 15,
          engagement_score: 85,
          feature_requests: ['Inventory management', 'Business analytics', 'Bulk operations'],
          pain_points: ['Not business-focused', 'Need team features', 'Want API access'],
          conversion_rate: 45.8,
          ltv: 850
        },
        {
          segment: 'Casual Plant Lovers',
          size: 5,
          engagement_score: 45,
          feature_requests: ['Simple reminders', 'Basic identification', 'Quick tips'],
          pain_points: ['Too complex', 'Too many features', 'Price sensitivity'],
          conversion_rate: 3.2,
          ltv: 45
        }
      ];

      setFeatureMetrics(mockFeatures);
      setSegmentMetrics(mockSegments);
    } catch (error) {
      console.error('Failed to load product data:', error);
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-2xl font-bold">Product Optimization Dashboard</h2>
          <p className="text-gray-600">Data-driven insights for product development and market fit</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <Lightbulb className="w-4 h-4 mr-2" />
          Generate Recommendations
        </Button>
      </div>

      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Feature Analysis</TabsTrigger>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="market-fit">Product-Market Fit</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <div className="space-y-6">
            {/* Feature Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {featureMetrics.map((feature) => (
                <Card key={feature.feature}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="mb-2">
                        {feature.roi_score > 150 ? <CheckCircle className="w-6 h-6 mx-auto text-green-500" /> :
                         feature.roi_score > 50 ? <Clock className="w-6 h-6 mx-auto text-yellow-500" /> :
                         <AlertCircle className="w-6 h-6 mx-auto text-red-500" />}
                      </div>
                      <div className="text-xs font-medium text-gray-600 mb-1">{feature.feature}</div>
                      <div className="text-lg font-bold">{feature.adoption_rate}%</div>
                      <div className="text-xs text-gray-500">Adoption Rate</div>
                      <Badge className={
                        feature.roi_score > 150 ? 'bg-green-100 text-green-800 mt-2' :
                        feature.roi_score > 50 ? 'bg-yellow-100 text-yellow-800 mt-2' :
                        'bg-red-100 text-red-800 mt-2'
                      }>
                        {feature.roi_score}% ROI
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feature Adoption Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={feature_adoption_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="identification" stroke="#10B981" strokeWidth={2} name="Identification" />
                    <Line type="monotone" dataKey="care_calendar" stroke="#3B82F6" strokeWidth={2} name="Care Calendar" />
                    <Line type="monotone" dataKey="community" stroke="#8B5CF6" strokeWidth={2} name="Community" />
                    <Line type="monotone" dataKey="experts" stroke="#F59E0B" strokeWidth={2} name="Expert Consultations" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Feature Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Performance Deep Dive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureMetrics.map((feature) => (
                    <div key={feature.feature} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{feature.feature}</h3>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{feature.satisfaction_score}/5.0</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Adoption</div>
                          <div className="font-bold">{feature.adoption_rate}%</div>
                          <Progress value={feature.adoption_rate} className="mt-1" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Usage/Week</div>
                          <div className="font-bold">{feature.usage_frequency}x</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Revenue Impact</div>
                          <div className="font-bold">${feature.revenue_impact.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Dev Cost</div>
                          <div className="font-bold">${feature.development_cost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">ROI</div>
                          <div className={`font-bold ${
                            feature.roi_score > 100 ? 'text-green-600' :
                            feature.roi_score > 0 ? 'text-blue-600' :
                            'text-red-600'
                          }`}>
                            {feature.roi_score}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments">
          <div className="space-y-6">
            {/* Segment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {segmentMetrics.map((segment) => (
                <Card key={segment.segment}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-lg font-bold">{segment.size}%</div>
                      <div className="text-sm text-gray-600 mb-2">{segment.segment}</div>
                      <Badge className={
                        segment.engagement_score > 80 ? 'bg-green-100 text-green-800' :
                        segment.engagement_score > 60 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {segment.engagement_score} engagement
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Segment Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {segmentMetrics.map((segment) => (
                <Card key={segment.segment}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {segment.segment}
                      <Badge className="bg-blue-100 text-blue-800">
                        ${segment.ltv} LTV
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Engagement Score</span>
                          <span className="text-sm font-medium">{segment.engagement_score}/100</span>
                        </div>
                        <Progress value={segment.engagement_score} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Conversion Rate</span>
                          <span className="text-sm font-medium">{segment.conversion_rate}%</span>
                        </div>
                        <Progress value={segment.conversion_rate} />
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Top Feature Requests:</div>
                        <div className="space-y-1">
                          {segment.feature_requests.map((request, index) => (
                            <div key={index} className="text-xs bg-blue-50 px-2 py-1 rounded">
                              {request}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Main Pain Points:</div>
                        <div className="space-y-1">
                          {segment.pain_points.map((pain, index) => (
                            <div key={index} className="text-xs bg-red-50 px-2 py-1 rounded">
                              {pain}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction">
          <div className="space-y-6">
            {/* Overall Satisfaction Trends */}
            <Card>
              <CardHeader>
                <CardTitle>User Satisfaction Trends by Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={user_satisfaction_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5.0]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="overall" stroke="#1F2937" strokeWidth={3} name="Overall" />
                    <Line type="monotone" dataKey="identification" stroke="#10B981" strokeWidth={2} name="Identification" />
                    <Line type="monotone" dataKey="care" stroke="#3B82F6" strokeWidth={2} name="Care Features" />
                    <Line type="monotone" dataKey="community" stroke="#8B5CF6" strokeWidth={2} name="Community" />
                    <Line type="monotone" dataKey="support" stroke="#F59E0B" strokeWidth={2} name="Support" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Satisfaction Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Satisfaction Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { feature: 'AI Identification', score: 4.9, trend: 'up' },
                      { feature: 'Care Features', score: 4.6, trend: 'up' },
                      { feature: 'Expert Support', score: 4.8, trend: 'stable' },
                      { feature: 'Community', score: 4.3, trend: 'up' },
                      { feature: 'Mobile App', score: 4.2, trend: 'down' }
                    ].map((item) => (
                      <div key={item.feature} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.feature}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">{item.score}</span>
                          <TrendingUp className={`w-4 h-4 ${
                            item.trend === 'up' ? 'text-green-500' :
                            item.trend === 'down' ? 'text-red-500 rotate-180' :
                            'text-gray-400'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Net Promoter Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">67</div>
                    <div className="text-sm text-gray-600 mb-4">NPS Score</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Promoters (9-10)</span>
                        <span className="font-medium">58%</span>
                      </div>
                      <Progress value={58} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span>Passives (7-8)</span>
                        <span className="font-medium">33%</span>
                      </div>
                      <Progress value={33} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span>Detractors (0-6)</span>
                        <span className="font-medium">9%</span>
                      </div>
                      <Progress value={9} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { driver: 'Accuracy of AI', impact: 92 },
                      { driver: 'Ease of Use', impact: 87 },
                      { driver: 'Expert Quality', impact: 85 },
                      { driver: 'App Performance', impact: 78 },
                      { driver: 'Price Value', impact: 72 }
                    ].map((driver) => (
                      <div key={driver.driver}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{driver.driver}</span>
                          <span className="text-sm font-medium">{driver.impact}%</span>
                        </div>
                        <Progress value={driver.impact} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="market-fit">
          <div className="space-y-6">
            {/* Product-Market Fit Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Product-Market Fit by Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={product_market_fit_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="fit_score" fill="#3B82F6" name="PMF Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* PMF Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Fit Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center border rounded-lg p-4">
                      <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className="text-2xl font-bold text-green-600">82%</div>
                      <div className="text-sm text-gray-600">Overall PMF Score</div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { metric: 'Must-have responses', value: 68 },
                        { metric: 'Recommendation rate', value: 74 },
                        { metric: 'Organic growth rate', value: 45 },
                        { metric: 'Feature request alignment', value: 89 }
                      ].map((metric) => (
                        <div key={metric.metric}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{metric.metric}</span>
                            <span className="text-sm font-medium">{metric.value}%</span>
                          </div>
                          <Progress value={metric.value} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth & Satisfaction Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product_market_fit_data.map((segment) => (
                      <div key={segment.segment} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{segment.segment}</span>
                          <Badge className={
                            segment.fit_score > 85 ? 'bg-green-500 text-white' :
                            segment.fit_score > 70 ? 'bg-blue-500 text-white' :
                            'bg-yellow-500 text-white'
                          }>
                            {segment.fit_score}% fit
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Growth: </span>
                            <span className="font-medium">{segment.growth_rate}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Satisfaction: </span>
                            <span className="font-medium">{segment.satisfaction}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strategic Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Strategic Product Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="font-medium text-green-900 mb-2">High Priority</div>
                    <div className="space-y-2 text-sm text-green-700">
                      <div>• Expand hobbyist features (92% PMF)</div>
                      <div>• Improve beginner onboarding flow</div>
                      <div>• Add advanced analytics for pros</div>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="font-medium text-yellow-900 mb-2">Medium Priority</div>
                    <div className="space-y-2 text-sm text-yellow-700">
                      <div>• Enhance community features</div>
                      <div>• Develop business tier features</div>
                      <div>• Improve mobile app performance</div>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="font-medium text-blue-900 mb-2">Future Opportunities</div>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div>• B2B enterprise features</div>
                      <div>• International market expansion</div>
                      <div>• AR/VR identification features</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductOptimizationDashboard;
