
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MousePointer, 
  Eye, 
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  startDate: string;
  endDate: string;
  variants: {
    name: string;
    traffic: number;
    conversions: number;
    conversionRate: number;
  }[];
  primaryMetric: string;
  statisticalSignificance: number;
  winner?: string;
}

interface HeatmapData {
  element: string;
  clicks: number;
  views: number;
  clickRate: number;
  position: { x: number; y: number };
}

interface ConversionFunnel {
  step: string;
  users: number;
  conversionRate: number;
  dropOff: number;
}

const ProductOptimizationDashboard: React.FC = () => {
  const [abTests, setAbTests] = useState<ABTest[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [funnelData, setFunnelData] = useState<ConversionFunnel[]>([]);
  const [selectedTest, setSelectedTest] = useState<string>('');

  useEffect(() => {
    // Mock A/B test data
    setAbTests([
      {
        id: '1',
        name: 'Premium CTA Button Color',
        status: 'running',
        startDate: '2024-06-01',
        endDate: '2024-06-15',
        variants: [
          { name: 'Control (Blue)', traffic: 50, conversions: 142, conversionRate: 12.8 },
          { name: 'Variant A (Green)', traffic: 50, conversions: 168, conversionRate: 15.2 }
        ],
        primaryMetric: 'Premium Conversion Rate',
        statisticalSignificance: 85,
        winner: 'Variant A (Green)'
      },
      {
        id: '2',
        name: 'Onboarding Flow Length',
        status: 'completed',
        startDate: '2024-05-15',
        endDate: '2024-05-30',
        variants: [
          { name: 'Control (5 steps)', traffic: 33, conversions: 89, conversionRate: 8.1 },
          { name: 'Variant A (3 steps)', traffic: 33, conversions: 124, conversionRate: 11.3 },
          { name: 'Variant B (2 steps)', traffic: 34, conversions: 98, conversionRate: 8.9 }
        ],
        primaryMetric: 'Onboarding Completion',
        statisticalSignificance: 95,
        winner: 'Variant A (3 steps)'
      },
      {
        id: '3',
        name: 'Feature Discovery Modal',
        status: 'draft',
        startDate: '2024-06-20',
        endDate: '2024-07-05',
        variants: [
          { name: 'Control (No modal)', traffic: 50, conversions: 0, conversionRate: 0 },
          { name: 'Variant A (Feature tour)', traffic: 50, conversions: 0, conversionRate: 0 }
        ],
        primaryMetric: 'Feature Adoption Rate',
        statisticalSignificance: 0
      }
    ]);

    // Mock heatmap data
    setHeatmapData([
      { element: 'Premium Upgrade Button', clicks: 1250, views: 8500, clickRate: 14.7, position: { x: 50, y: 20 } },
      { element: 'Identify Plant Button', clicks: 3200, views: 9800, clickRate: 32.7, position: { x: 50, y: 60 } },
      { element: 'My Garden Link', clicks: 890, views: 9800, clickRate: 9.1, position: { x: 20, y: 10 } },
      { element: 'Help Center Link', clicks: 450, views: 9800, clickRate: 4.6, position: { x: 80, y: 10 } },
      { element: 'Community Forum', clicks: 670, views: 9800, clickRate: 6.8, position: { x: 60, y: 10 } }
    ]);

    // Mock funnel data
    setFunnelData([
      { step: 'Landing Page Visit', users: 10000, conversionRate: 100, dropOff: 0 },
      { step: 'Sign Up Started', users: 3500, conversionRate: 35, dropOff: 6500 },
      { step: 'Sign Up Completed', users: 2800, conversionRate: 80, dropOff: 700 },
      { step: 'First Identification', users: 2100, conversionRate: 75, dropOff: 700 },
      { step: 'Premium Trial Started', users: 840, conversionRate: 40, dropOff: 1260 },
      { step: 'Premium Subscription', users: 504, conversionRate: 60, dropOff: 336 }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSignificanceColor = (significance: number) => {
    if (significance >= 95) return 'text-green-600';
    if (significance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Optimization</h2>
        <Button>
          <Target className="w-4 h-4 mr-2" />
          Create New Test
        </Button>
      </div>

      <Tabs defaultValue="ab-testing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ab-testing">A/B Testing</TabsTrigger>
          <TabsTrigger value="heatmaps">Heat Maps</TabsTrigger>
          <TabsTrigger value="funnels">Conversion Funnels</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
        </TabsList>

        <TabsContent value="ab-testing">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* A/B Test List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active & Recent Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {abTests.map((test) => (
                      <div 
                        key={test.id} 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedTest === test.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedTest(test.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{test.name}</h4>
                          <Badge className={getStatusColor(test.status)}>
                            {test.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3">
                          {test.startDate} - {test.endDate}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium">Primary Metric:</span> {test.primaryMetric}
                          </div>
                          <div className={`text-sm font-medium ${getSignificanceColor(test.statisticalSignificance)}`}>
                            {test.statisticalSignificance}% confidence
                          </div>
                        </div>
                        
                        {test.winner && (
                          <div className="mt-2 text-sm">
                            <span className="text-green-600 font-medium">Winner: {test.winner}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Details */}
            <Card>
              <CardHeader>
                <CardTitle>Test Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTest ? (
                  <div className="space-y-4">
                    {abTests.find(test => test.id === selectedTest)?.variants.map((variant, index) => (
                      <div key={variant.name} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">{variant.name}</h5>
                          <Badge variant="outline">{variant.traffic}% traffic</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Conversions:</span>
                            <span className="font-medium">{variant.conversions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Conv. Rate:</span>
                            <span className="font-medium">{variant.conversionRate}%</span>
                          </div>
                          <Progress value={variant.conversionRate} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Select a test to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heatmaps">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Heatmap Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Click Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg h-96 mb-4">
                  {heatmapData.map((item, index) => (
                    <div
                      key={item.element}
                      className="absolute bg-red-500 rounded-full opacity-70 cursor-pointer"
                      style={{
                        left: `${item.position.x}%`,
                        top: `${item.position.y}%`,
                        width: `${Math.min(item.clickRate * 2, 40)}px`,
                        height: `${Math.min(item.clickRate * 2, 40)}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      title={`${item.element}: ${item.clickRate}% click rate`}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    App Interface Mockup
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                    <span>Low Activity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Medium Activity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-700 rounded-full"></div>
                    <span>High Activity</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Click Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Element Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heatmapData.map((item, index) => (
                    <div key={item.element} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{item.element}</h5>
                        <Badge variant="outline">{item.clickRate}%</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Clicks</div>
                          <div className="font-medium">{item.clicks.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Views</div>
                          <div className="font-medium">{item.views.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">CTR</div>
                          <div className="font-medium">{item.clickRate}%</div>
                        </div>
                      </div>
                      
                      <Progress value={item.clickRate} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnels">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funnel Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={funnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="step" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Funnel Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Drop-off Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnelData.slice(1).map((step, index) => (
                    <div key={step.step} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{step.step}</h5>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{step.conversionRate}%</Badge>
                          {step.dropOff > 0 && (
                            <Badge className="bg-red-100 text-red-800">
                              -{step.dropOff} users
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Users reaching this step:</span>
                        <span className="font-medium">{step.users.toLocaleString()}</span>
                      </div>
                      
                      <Progress value={step.conversionRate} className="h-2" />
                      
                      {step.dropOff > 0 && (
                        <div className="mt-2 text-xs text-red-600">
                          {((step.dropOff / (step.users + step.dropOff)) * 100).toFixed(1)}% drop-off rate
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="onboarding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Onboarding Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">75%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4.2min</div>
                    <div className="text-sm text-gray-600">Avg. Time to Complete</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Step Performance:</h4>
                    <div className="space-y-3">
                      {[
                        { step: 'Welcome Screen', completion: 95 },
                        { step: 'Account Setup', completion: 89 },
                        { step: 'First Photo Upload', completion: 82 },
                        { step: 'Tutorial Completion', completion: 75 }
                      ].map((item) => (
                        <div key={item.step} className="flex justify-between items-center">
                          <span className="text-sm">{item.step}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={item.completion} className="w-20 h-2" />
                            <span className="text-sm font-medium">{item.completion}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Adoption */}
            <Card>
              <CardHeader>
                <CardTitle>Post-Onboarding Feature Adoption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { feature: 'Plant Identification', adoption: 85, timeToFirst: '2.3 hours' },
                    { feature: 'My Garden', adoption: 65, timeToFirst: '1.2 days' },
                    { feature: 'Care Calendar', adoption: 45, timeToFirst: '3.5 days' },
                    { feature: 'Community Forum', adoption: 28, timeToFirst: '7.2 days' },
                    { feature: 'Premium Features', adoption: 12, timeToFirst: '14.8 days' }
                  ].map((item) => (
                    <div key={item.feature} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{item.feature}</h5>
                        <Badge variant="outline">{item.adoption}%</Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Time to first use:</span>
                        <span className="font-medium">{item.timeToFirst}</span>
                      </div>
                      
                      <Progress value={item.adoption} className="h-2" />
                    </div>
                  ))}
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
