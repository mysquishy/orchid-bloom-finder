
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Globe,
  AlertTriangle,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine
} from 'recharts';

interface GrowthProjection {
  month: string;
  actual?: number;
  predicted: number;
  confidenceLow: number;
  confidenceHigh: number;
}

interface RevenueForecasting {
  period: string;
  revenue: number;
  forecast: number;
  confidence: number;
}

interface SeasonalPattern {
  month: string;
  historicalAvg: number;
  currentYear: number;
  predicted: number;
}

interface RiskAssessment {
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  probability: number;
  impact: string;
  mitigation: string;
}

const PredictiveAnalyticsDashboard: React.FC = () => {
  const [growthData, setGrowthData] = useState<GrowthProjection[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueForecasting[]>([]);
  const [seasonalData, setSeasonalData] = useState<SeasonalPattern[]>([]);
  const [riskData, setRiskData] = useState<RiskAssessment[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'3m' | '6m' | '12m'>('6m');

  useEffect(() => {
    // Mock growth projection data
    setGrowthData([
      { month: 'Jan 2024', actual: 1000, predicted: 1000, confidenceLow: 950, confidenceHigh: 1050 },
      { month: 'Feb 2024', actual: 1150, predicted: 1120, confidenceLow: 1050, confidenceHigh: 1200 },
      { month: 'Mar 2024', actual: 1320, predicted: 1280, confidenceLow: 1200, confidenceHigh: 1380 },
      { month: 'Apr 2024', actual: 1450, predicted: 1420, confidenceLow: 1350, confidenceHigh: 1520 },
      { month: 'May 2024', actual: 1680, predicted: 1650, confidenceLow: 1580, confidenceHigh: 1750 },
      { month: 'Jun 2024', actual: 1850, predicted: 1820, confidenceLow: 1750, confidenceHigh: 1920 },
      { month: 'Jul 2024', predicted: 2050, confidenceLow: 1950, confidenceHigh: 2180 },
      { month: 'Aug 2024', predicted: 2280, confidenceLow: 2150, confidenceHigh: 2450 },
      { month: 'Sep 2024', predicted: 2520, confidenceLow: 2350, confidenceHigh: 2720 },
      { month: 'Oct 2024', predicted: 2780, confidenceLow: 2580, confidenceHigh: 3020 },
      { month: 'Nov 2024', predicted: 3050, confidenceLow: 2820, confidenceHigh: 3350 },
      { month: 'Dec 2024', predicted: 3350, confidenceLow: 3080, confidenceHigh: 3680 }
    ]);

    // Mock revenue forecasting data
    setRevenueData([
      { period: 'Q2 2024', revenue: 28500, forecast: 28500, confidence: 100 },
      { period: 'Q3 2024', revenue: 0, forecast: 42800, confidence: 85 },
      { period: 'Q4 2024', revenue: 0, forecast: 58200, confidence: 78 },
      { period: 'Q1 2025', revenue: 0, forecast: 76500, confidence: 65 },
      { period: 'Q2 2025', revenue: 0, forecast: 95200, confidence: 58 },
      { period: 'Q3 2025', revenue: 0, forecast: 118500, confidence: 52 }
    ]);

    // Mock seasonal pattern data
    setSeasonalData([
      { month: 'Jan', historicalAvg: 850, currentYear: 1000, predicted: 1200 },
      { month: 'Feb', historicalAvg: 920, currentYear: 1150, predicted: 1380 },
      { month: 'Mar', historicalAvg: 1200, currentYear: 1320, predicted: 1580 },
      { month: 'Apr', historicalAvg: 1350, currentYear: 1450, predicted: 1750 },
      { month: 'May', historicalAvg: 1480, currentYear: 1680, predicted: 2020 },
      { month: 'Jun', historicalAvg: 1520, currentYear: 1850, predicted: 2220 },
      { month: 'Jul', historicalAvg: 1420, currentYear: 0, predicted: 2050 },
      { month: 'Aug', historicalAvg: 1380, currentYear: 0, predicted: 2280 },
      { month: 'Sep', historicalAvg: 1450, currentYear: 0, predicted: 2520 },
      { month: 'Oct', historicalAvg: 1580, currentYear: 0, predicted: 2780 },
      { month: 'Nov', historicalAvg: 1650, currentYear: 0, predicted: 3050 },
      { month: 'Dec', historicalAvg: 1420, currentYear: 0, predicted: 2850 }
    ]);

    // Mock risk assessment data
    setRiskData([
      {
        category: 'Market Competition',
        riskLevel: 'medium',
        probability: 65,
        impact: 'Potential 15-20% user acquisition slowdown',
        mitigation: 'Enhance unique value proposition, expand feature set'
      },
      {
        category: 'Technical Scalability',
        riskLevel: 'low',
        probability: 25,
        impact: 'Service degradation during peak usage',
        mitigation: 'Infrastructure scaling plan, performance monitoring'
      },
      {
        category: 'Seasonal Demand Fluctuation',
        riskLevel: 'medium',
        probability: 80,
        impact: '30-40% usage variation between seasons',
        mitigation: 'Diversify offerings, indoor plant focus in winter'
      },
      {
        category: 'AI Model Performance',
        riskLevel: 'low',
        probability: 30,
        impact: 'Accuracy degradation affecting user trust',
        mitigation: 'Continuous model improvement, expert validation'
      },
      {
        category: 'Regulatory Changes',
        riskLevel: 'low',
        probability: 20,
        impact: 'Data privacy compliance requirements',
        mitigation: 'Legal monitoring, compliance framework'
      }
    ]);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Predictive Analytics</h2>
        <div className="flex space-x-2">
          {(['3m', '6m', '12m'] as const).map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Predictions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">User Growth</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">+82%</div>
            <div className="text-sm text-gray-600">Predicted 6-month growth</div>
            <div className="text-xs text-green-600 mt-1">85% confidence</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <div className="text-2xl font-bold text-green-600">$118.5K</div>
            <div className="text-sm text-gray-600">Q3 2025 forecast</div>
            <div className="text-xs text-yellow-600 mt-1">52% confidence</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Peak Season</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">May-Jun</div>
            <div className="text-sm text-gray-600">Highest user activity</div>
            <div className="text-xs text-green-600 mt-1">92% confidence</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Risk Level</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <div className="text-sm text-gray-600">Overall business risk</div>
            <div className="text-xs text-blue-600 mt-1">Manageable</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Growth Projection</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Forecast</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="growth">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Growth Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      
                      {/* Confidence interval */}
                      <Area 
                        type="monotone" 
                        dataKey="confidenceHigh" 
                        stackId="1"
                        stroke="none" 
                        fill="#e3f2fd" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="confidenceLow" 
                        stackId="1"
                        stroke="none" 
                        fill="#ffffff" 
                        fillOpacity={1}
                      />
                      
                      {/* Actual data */}
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#2196f3" 
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        name="Actual Users"
                      />
                      
                      {/* Predicted data */}
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#ff9800" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        name="Predicted Users"
                      />
                      
                      <ReferenceLine x="Jun 2024" stroke="red" strokeDasharray="2 2" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Growth Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Growth Rate</h4>
                    <div className="text-2xl font-bold text-blue-600">12.8%</div>
                    <div className="text-sm text-blue-700">Monthly average</div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Acceleration</h4>
                    <div className="text-2xl font-bold text-green-600">+2.3%</div>
                    <div className="text-sm text-green-700">Growth rate increase</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Drivers:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Organic search optimization</div>
                      <div>• Referral program success</div>
                      <div>• Premium feature adoption</div>
                      <div>• Seasonal plant care interest</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Risks to Growth:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Market saturation (Q4 2024)</div>
                      <div>• Increased competition</div>
                      <div>• Seasonal slowdown (winter)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Forecast Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#4caf50" name="Actual Revenue" />
                    <Bar dataKey="forecast" fill="#ff9800" name="Forecasted Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics & Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Scenario Planning:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <div>
                          <div className="font-medium text-green-900">Optimistic</div>
                          <div className="text-sm text-green-700">+20% from base forecast</div>
                        </div>
                        <div className="text-lg font-bold text-green-600">$142K</div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <div>
                          <div className="font-medium text-blue-900">Base Case</div>
                          <div className="text-sm text-blue-700">Current trajectory</div>
                        </div>
                        <div className="text-lg font-bold text-blue-600">$118K</div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                        <div>
                          <div className="font-medium text-yellow-900">Conservative</div>
                          <div className="text-sm text-yellow-700">-15% from base forecast</div>
                        </div>
                        <div className="text-lg font-bold text-yellow-600">$100K</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Revenue Drivers:</h4>
                    <div className="space-y-2">
                      {[
                        { driver: 'Premium Subscriptions', contribution: 65 },
                        { driver: 'Expert Consultations', contribution: 25 },
                        { driver: 'Course Sales', contribution: 8 },
                        { driver: 'Partnership Revenue', contribution: 2 }
                      ].map((item) => (
                        <div key={item.driver} className="flex justify-between items-center">
                          <span className="text-sm">{item.driver}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={item.contribution} className="w-16 h-2" />
                            <span className="text-sm font-medium">{item.contribution}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seasonal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Seasonal Pattern Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Usage Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="historicalAvg" 
                      stroke="#9e9e9e" 
                      strokeDasharray="5 5"
                      name="Historical Average"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="currentYear" 
                      stroke="#2196f3" 
                      strokeWidth={3}
                      name="Current Year"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#ff9800" 
                      strokeWidth={2}
                      name="Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Seasonal Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Business Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Peak Seasons:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm font-medium">Spring (Mar-May)</span>
                        <Badge className="bg-green-100 text-green-800">+45% activity</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm font-medium">Early Summer (Jun-Jul)</span>
                        <Badge className="bg-blue-100 text-blue-800">+35% activity</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Low Seasons:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">Winter (Dec-Feb)</span>
                        <Badge variant="outline">-25% activity</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Strategic Recommendations:</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="p-2 bg-yellow-50 rounded">
                        <strong>Spring:</strong> Launch major marketing campaigns, introduce new features
                      </div>
                      <div className="p-2 bg-blue-50 rounded">
                        <strong>Summer:</strong> Focus on retention and premium conversions
                      </div>
                      <div className="p-2 bg-purple-50 rounded">
                        <strong>Winter:</strong> Develop indoor plant content, holiday promotions
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Business Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskData.map((risk, index) => (
                    <div key={risk.category} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{risk.category}</h5>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRiskColor(risk.riskLevel)}>
                            {risk.riskLevel}
                          </Badge>
                          <span className="text-sm font-medium">{risk.probability}%</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Impact:</strong> {risk.impact}
                      </div>
                      
                      <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </div>
                      
                      <Progress value={risk.probability} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Matrix & Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Management Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-green-100 p-2 rounded">Low Risk<br/>2 items</div>
                    <div className="bg-yellow-100 p-2 rounded">Medium Risk<br/>2 items</div>
                    <div className="bg-red-100 p-2 rounded">High Risk<br/>0 items</div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Immediate Actions Required:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2 p-2 bg-yellow-50 rounded">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium">Monitor Competition</div>
                          <div className="text-gray-600">Weekly competitive analysis recommended</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                        <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium">Seasonal Preparation</div>
                          <div className="text-gray-600">Winter content strategy needed by Oct</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Risk Monitoring KPIs:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• User acquisition cost trends</div>
                      <div>• Competitive feature gap analysis</div>
                      <div>• Server performance metrics</div>
                      <div>• AI model accuracy scores</div>
                      <div>• Regulatory compliance status</div>
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

export default PredictiveAnalyticsDashboard;
