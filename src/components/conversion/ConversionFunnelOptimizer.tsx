
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Users,
  UserPlus,
  Search,
  Crown,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface FunnelStep {
  id: string;
  name: string;
  users: number;
  conversionRate: number;
  dropOffRate: number;
  avgTimeSpent: number;
  improvements: string[];
  status: 'optimized' | 'needs-attention' | 'critical';
}

interface FunnelAnalytics {
  totalVisitors: number;
  overallConversion: number;
  revenueImpact: number;
  topDropOffPoint: string;
}

const ConversionFunnelOptimizer: React.FC = () => {
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([
    {
      id: 'landing',
      name: 'Landing Page Visit',
      users: 10000,
      conversionRate: 100,
      dropOffRate: 0,
      avgTimeSpent: 45,
      improvements: [],
      status: 'optimized'
    },
    {
      id: 'signup',
      name: 'Sign Up Process',
      users: 2860,
      conversionRate: 28.6,
      dropOffRate: 71.4,
      avgTimeSpent: 120,
      improvements: [
        'Reduce form fields from 8 to 4',
        'Add social login options',
        'Implement progressive disclosure'
      ],
      status: 'needs-attention'
    },
    {
      id: 'onboarding',
      name: 'Complete Onboarding',
      users: 2288,
      conversionRate: 80.0,
      dropOffRate: 20.0,
      avgTimeSpent: 240,
      improvements: [
        'Simplify step 3 (plant preferences)',
        'Add progress indicators',
        'Reduce onboarding to 3 steps'
      ],
      status: 'optimized'
    },
    {
      id: 'first-identification',
      name: 'First Plant Identification',
      users: 1830,
      conversionRate: 80.0,
      dropOffRate: 20.0,
      avgTimeSpent: 180,
      improvements: [
        'Improve camera interface UX',
        'Add sample images tutorial',
        'Optimize AI processing speed'
      ],
      status: 'needs-attention'
    },
    {
      id: 'premium-trial',
      name: 'Start Premium Trial',
      users: 549,
      conversionRate: 30.0,
      dropOffRate: 70.0,
      avgTimeSpent: 90,
      improvements: [
        'Showcase premium features earlier',
        'Offer extended trial period',
        'Add feature comparison chart'
      ],
      status: 'critical'
    },
    {
      id: 'premium-conversion',
      name: 'Convert to Premium',
      users: 82,
      conversionRate: 15.0,
      dropOffRate: 85.0,
      avgTimeSpent: 300,
      improvements: [
        'Simplify pricing page',
        'Add payment security badges',
        'Offer multiple payment options',
        'Include money-back guarantee'
      ],
      status: 'critical'
    }
  ]);

  const [analytics] = useState<FunnelAnalytics>({
    totalVisitors: 10000,
    overallConversion: 0.82,
    revenueImpact: 28500,
    topDropOffPoint: 'Sign Up Process'
  });

  const funnelTrendData = [
    { month: 'Jan', conversion: 0.65 },
    { month: 'Feb', conversion: 0.72 },
    { month: 'Mar', conversion: 0.78 },
    { month: 'Apr', conversion: 0.75 },
    { month: 'May', conversion: 0.82 },
    { month: 'Jun', conversion: 0.82 }
  ];

  const stepAnalysisData = funnelSteps.map(step => ({
    name: step.name.split(' ').slice(0, 2).join(' '),
    users: step.users,
    conversionRate: step.conversionRate,
    dropOff: step.dropOffRate
  }));

  const getStatusIcon = (status: FunnelStep['status']) => {
    switch (status) {
      case 'optimized': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs-attention': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <Target className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: FunnelStep['status']) => {
    switch (status) {
      case 'optimized': return 'bg-green-100 text-green-800';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
    }
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'landing': return <Users className="w-5 h-5 text-blue-600" />;
      case 'signup': return <UserPlus className="w-5 h-5 text-green-600" />;
      case 'onboarding': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'first-identification': return <Search className="w-5 h-5 text-orange-600" />;
      case 'premium-trial': return <Crown className="w-5 h-5 text-yellow-600" />;
      case 'premium-conversion': return <CreditCard className="w-5 h-5 text-pink-600" />;
      default: return <Target className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Conversion Funnel Optimizer</h2>
          <p className="text-gray-600">Identify and eliminate conversion bottlenecks</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Target className="w-4 h-4 mr-2" />
          Apply Optimizations
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{analytics.totalVisitors.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Visitors</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{analytics.overallConversion}%</div>
            <div className="text-sm text-gray-600">Overall Conversion</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">${analytics.revenueImpact.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Revenue Impact</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{analytics.topDropOffPoint}</div>
            <div className="text-sm text-gray-600">Biggest Drop-off</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="funnel" className="space-y-6">
        <TabsList>
          <TabsTrigger value="funnel">Funnel Analysis</TabsTrigger>
          <TabsTrigger value="trends">Conversion Trends</TabsTrigger>
          <TabsTrigger value="optimizations">Optimization Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Conversion Funnel Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {funnelSteps.map((step, index) => {
                  const previousStep = funnelSteps[index - 1];
                  const conversionFromPrevious = index === 0 ? 100 : (step.users / previousStep.users) * 100;
                  
                  return (
                    <div key={step.id} className="relative">
                      {/* Connection arrow */}
                      {index > 0 && (
                        <div className="absolute -top-3 left-8 flex items-center">
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          {getStepIcon(step.id)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{step.name}</h3>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(step.status)}
                              <Badge className={getStatusColor(step.status)}>
                                {step.status.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <div className="text-lg font-bold">{step.users.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">Users</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-600">
                                {conversionFromPrevious.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-600">Conversion</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-red-600">
                                {step.dropOffRate.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-600">Drop-off</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-blue-600">
                                {step.avgTimeSpent}s
                              </div>
                              <div className="text-sm text-gray-600">Avg. Time</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Conversion Rate</span>
                                <span>{conversionFromPrevious.toFixed(1)}%</span>
                              </div>
                              <Progress value={conversionFromPrevious} className="h-2" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Drop-off Rate</span>
                                <span>{step.dropOffRate.toFixed(1)}%</span>
                              </div>
                              <Progress 
                                value={step.dropOffRate} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={funnelTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Conversion Rate']} />
                    <Line type="monotone" dataKey="conversion" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stepAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversionRate" fill="#10B981" name="Conversion %" />
                    <Bar dataKey="dropOff" fill="#EF4444" name="Drop-off %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimizations">
          <div className="space-y-4">
            {funnelSteps.filter(step => step.improvements.length > 0).map((step) => (
              <Card key={step.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {getStepIcon(step.id)}
                    <div>
                      <CardTitle className="text-lg">{step.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {step.dropOffRate.toFixed(1)}% drop-off rate • {step.users.toLocaleString()} users affected
                      </p>
                    </div>
                    <Badge className={getStatusColor(step.status)}>
                      {step.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium">Recommended Optimizations:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{improvement}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        Apply Optimizations
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversionFunnelOptimizer;
