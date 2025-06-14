
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  Brain,
  Target,
  Calendar,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface PredictiveMetric {
  metric: string;
  prediction: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
  impact: 'high' | 'medium' | 'low';
}

interface ChurnRiskUser {
  userId: string;
  userName: string;
  riskScore: number;
  lastActivity: string;
  interventionSuggestion: string;
  cohort: string;
}

const PredictiveAnalyticsDashboard: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictiveMetric[]>([]);
  const [churnRisks, setChurnRisks] = useState<ChurnRiskUser[]>([]);
  const [loading, setLoading] = useState(true);

  const ltv_forecast_data = [
    { month: 'Jan', predicted: 185, actual: 178, confidence_upper: 195, confidence_lower: 175 },
    { month: 'Feb', predicted: 195, actual: 189, confidence_upper: 205, confidence_lower: 185 },
    { month: 'Mar', predicted: 210, actual: 205, confidence_upper: 220, confidence_lower: 200 },
    { month: 'Apr', predicted: 225, actual: null, confidence_upper: 240, confidence_lower: 210 },
    { month: 'May', predicted: 240, actual: null, confidence_upper: 255, confidence_lower: 225 },
    { month: 'Jun', predicted: 255, actual: null, confidence_upper: 270, confidence_lower: 240 }
  ];

  const revenue_forecast_data = [
    { month: 'Jan', predicted: 45000, actual: 42000, confidence_upper: 48000, confidence_lower: 42000 },
    { month: 'Feb', predicted: 52000, actual: 49000, confidence_upper: 55000, confidence_lower: 49000 },
    { month: 'Mar', predicted: 58000, actual: 56000, confidence_upper: 62000, confidence_lower: 54000 },
    { month: 'Apr', predicted: 65000, actual: null, confidence_upper: 70000, confidence_lower: 60000 },
    { month: 'May', predicted: 72000, actual: null, confidence_upper: 78000, confidence_lower: 66000 },
    { month: 'Jun', predicted: 80000, actual: null, confidence_upper: 86000, confidence_lower: 74000 }
  ];

  const seasonal_demand_data = [
    { month: 'Jan', demand: 120, seasonal_factor: 0.8 },
    { month: 'Feb', demand: 135, seasonal_factor: 0.9 },
    { month: 'Mar', demand: 180, seasonal_factor: 1.2 },
    { month: 'Apr', demand: 220, seasonal_factor: 1.5 },
    { month: 'May', demand: 190, seasonal_factor: 1.3 },
    { month: 'Jun', demand: 165, seasonal_factor: 1.1 },
    { month: 'Jul', demand: 145, seasonal_factor: 1.0 },
    { month: 'Aug', demand: 155, seasonal_factor: 1.0 },
    { month: 'Sep', demand: 175, seasonal_factor: 1.2 },
    { month: 'Oct', demand: 195, seasonal_factor: 1.3 },
    { month: 'Nov', demand: 160, seasonal_factor: 1.1 },
    { month: 'Dec', demand: 140, seasonal_factor: 0.9 }
  ];

  useEffect(() => {
    loadPredictiveData();
  }, []);

  const loadPredictiveData = async () => {
    try {
      setLoading(true);
      
      // Mock predictive metrics
      const mockPredictions: PredictiveMetric[] = [
        {
          metric: 'Customer Lifetime Value',
          prediction: 245.50,
          confidence: 92,
          trend: 'up',
          timeframe: '6 months',
          impact: 'high'
        },
        {
          metric: 'Monthly Churn Rate',
          prediction: 3.2,
          confidence: 88,
          trend: 'down',
          timeframe: '3 months',
          impact: 'high'
        },
        {
          metric: 'Monthly Recurring Revenue',
          prediction: 82500,
          confidence: 94,
          trend: 'up',
          timeframe: '6 months',
          impact: 'high'
        },
        {
          metric: 'Market Expansion Opportunity',
          prediction: 35,
          confidence: 76,
          trend: 'up',
          timeframe: '12 months',
          impact: 'medium'
        },
        {
          metric: 'Peak Season Revenue Multiplier',
          prediction: 2.4,
          confidence: 85,
          trend: 'stable',
          timeframe: 'Spring 2025',
          impact: 'high'
        }
      ];

      // Mock high-risk churn users
      const mockChurnRisks: ChurnRiskUser[] = [
        {
          userId: 'user_001',
          userName: 'Sarah Chen',
          riskScore: 89,
          lastActivity: '8 days ago',
          interventionSuggestion: 'Send personalized care tips for struggling orchids',
          cohort: 'Premium Q1 2024'
        },
        {
          userId: 'user_002',
          userName: 'Mark Rodriguez',
          riskScore: 76,
          lastActivity: '5 days ago',
          interventionSuggestion: 'Offer expert consultation discount',
          cohort: 'Free Trial Q4 2024'
        },
        {
          userId: 'user_003',
          userName: 'Emma Thompson',
          riskScore: 71,
          lastActivity: '12 days ago',
          interventionSuggestion: 'Re-engagement email with success stories',
          cohort: 'Premium Q2 2024'
        }
      ];

      setPredictions(mockPredictions);
      setChurnRisks(mockChurnRisks);
    } catch (error) {
      console.error('Failed to load predictive data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-blue-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Predictive Analytics Engine</h2>
          <p className="text-gray-600">AI-powered business forecasting and decision support</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-100 text-purple-800">
            <Brain className="w-3 h-3 mr-1" />
            ML Powered
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="forecasting">Revenue Forecasting</TabsTrigger>
          <TabsTrigger value="churn">Churn Prevention</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <div className="space-y-6">
            {/* Key Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.map((prediction, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">{prediction.metric}</span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(prediction.trend)}
                        <Badge className={
                          prediction.impact === 'high' ? 'bg-red-100 text-red-800' :
                          prediction.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {prediction.impact}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      {prediction.metric.includes('Revenue') ? '$' : ''}
                      {prediction.prediction.toLocaleString()}
                      {prediction.metric.includes('Rate') || prediction.metric.includes('Opportunity') ? '%' : ''}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{prediction.timeframe}</span>
                      <span className={`text-xs font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                    <div className="mt-2">
                      <Progress value={prediction.confidence} className="h-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* LTV Prediction Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={ltv_forecast_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="confidence_upper" 
                      stroke="none" 
                      fill="#E5E7EB" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="confidence_lower" 
                      stroke="none" 
                      fill="white" 
                      fillOpacity={1}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10B981" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting">
          <div className="space-y-6">
            {/* Revenue Forecasting */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecasting with Confidence Intervals</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={revenue_forecast_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
                    <Area 
                      type="monotone" 
                      dataKey="confidence_upper" 
                      stroke="none" 
                      fill="#3B82F6" 
                      fillOpacity={0.2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="confidence_lower" 
                      stroke="none" 
                      fill="white" 
                      fillOpacity={1}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      strokeDasharray="8 4"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10B981" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Forecast Accuracy Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                      <p className="text-2xl font-bold text-green-600">94.2%</p>
                    </div>
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Mean Absolute Error</p>
                      <p className="text-2xl font-bold text-blue-600">$2,340</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confidence Level</p>
                      <p className="text-2xl font-bold text-purple-600">95%</p>
                    </div>
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="churn">
          <div className="space-y-6">
            {/* Churn Risk Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <div className="text-2xl font-bold text-red-900">23</div>
                    <div className="text-sm text-red-700">High Risk Users</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold text-yellow-900">67</div>
                    <div className="text-sm text-yellow-700">Medium Risk Users</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-900">89%</div>
                    <div className="text-sm text-blue-700">Prediction Accuracy</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-900">$12.5K</div>
                    <div className="text-sm text-green-700">Revenue at Risk</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Risk Users */}
            <Card>
              <CardHeader>
                <CardTitle>High Risk Users - Immediate Intervention Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {churnRisks.map((user) => (
                    <div key={user.userId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-medium">{user.userName}</div>
                            <div className="text-sm text-gray-600">{user.cohort}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            user.riskScore >= 80 ? 'bg-red-500 text-white' :
                            user.riskScore >= 60 ? 'bg-yellow-500 text-white' :
                            'bg-green-500 text-white'
                          }>
                            {user.riskScore}% risk
                          </Badge>
                          <span className="text-xs text-gray-500">{user.lastActivity}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                        <strong>Suggested Intervention:</strong> {user.interventionSuggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seasonal">
          <div className="space-y-6">
            {/* Seasonal Demand Patterns */}
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Demand Prediction & Resource Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={seasonal_demand_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="demand" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Market Expansion Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Expansion Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: 'Asia-Pacific', opportunity: 92, confidence: 78 },
                      { region: 'Europe', opportunity: 76, confidence: 85 },
                      { region: 'Latin America', opportunity: 64, confidence: 71 },
                      { region: 'Middle East', opportunity: 45, confidence: 65 }
                    ].map((market) => (
                      <div key={market.region} className="flex items-center justify-between">
                        <span className="font-medium">{market.region}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={market.opportunity} className="w-20" />
                          <span className="text-sm text-gray-600">{market.opportunity}%</span>
                          <Badge className={getConfidenceColor(market.confidence).includes('green') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {market.confidence}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Planning Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-3">
                      <div className="font-medium text-green-900">Peak Season (Mar-May)</div>
                      <div className="text-sm text-green-700">Scale customer support by 40%</div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3">
                      <div className="font-medium text-blue-900">Growth Season (Sep-Oct)</div>
                      <div className="text-sm text-blue-700">Increase marketing budget by 25%</div>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <div className="font-medium text-yellow-900">Low Season (Dec-Feb)</div>
                      <div className="text-sm text-yellow-700">Focus on retention initiatives</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;
