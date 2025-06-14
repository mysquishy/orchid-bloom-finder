
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Brain, Target, TrendingUp, AlertTriangle, CheckCircle, Eye, Clock, MapPin } from 'lucide-react';

interface AccuracyMetric {
  id: string;
  metric: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface TestResult {
  id: string;
  testName: string;
  accuracy: number;
  timestamp: string;
  sampleSize: number;
  environment: 'production' | 'staging' | 'development';
  modelVersion: string;
}

const AIAccuracyDashboard: React.FC = () => {
  const [accuracyMetrics, setAccuracyMetrics] = useState<AccuracyMetric[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    // Mock accuracy metrics
    const mockMetrics: AccuracyMetric[] = [
      {
        id: '1',
        metric: 'Overall Accuracy',
        current: 94.2,
        target: 95.0,
        trend: 'up',
        change: 0.8
      },
      {
        id: '2',
        metric: 'Confidence Threshold',
        current: 0.85,
        target: 0.80,
        trend: 'stable',
        change: 0.0
      },
      {
        id: '3',
        metric: 'False Positive Rate',
        current: 3.1,
        target: 2.5,
        trend: 'down',
        change: -0.4
      },
      {
        id: '4',
        metric: 'Expert Agreement',
        current: 91.8,
        target: 92.0,
        trend: 'up',
        change: 1.2
      }
    ];

    // Mock test results
    const mockTestResults: TestResult[] = [
      {
        id: '1',
        testName: 'Phalaenopsis Accuracy Test',
        accuracy: 96.5,
        timestamp: '2025-06-14T10:30:00Z',
        sampleSize: 1000,
        environment: 'production',
        modelVersion: 'v2.1.3'
      },
      {
        id: '2',
        testName: 'Low Light Conditions',
        accuracy: 87.2,
        timestamp: '2025-06-14T09:15:00Z',
        sampleSize: 500,
        environment: 'staging',
        modelVersion: 'v2.1.4'
      },
      {
        id: '3',
        testName: 'Diseased Plant Recognition',
        accuracy: 82.8,
        timestamp: '2025-06-14T08:00:00Z',
        sampleSize: 750,
        environment: 'staging',
        modelVersion: 'v2.1.4'
      }
    ];

    setAccuracyMetrics(mockMetrics);
    setTestResults(mockTestResults);
  }, []);

  const accuracyTrendData = [
    { date: '2025-06-07', accuracy: 92.1, confidence: 0.82, falsePositive: 4.2 },
    { date: '2025-06-08', accuracy: 92.8, confidence: 0.83, falsePositive: 3.9 },
    { date: '2025-06-09', accuracy: 93.2, confidence: 0.84, falsePositive: 3.7 },
    { date: '2025-06-10', accuracy: 93.6, confidence: 0.84, falsePositive: 3.4 },
    { date: '2025-06-11', accuracy: 93.8, confidence: 0.85, falsePositive: 3.2 },
    { date: '2025-06-12', accuracy: 94.0, confidence: 0.85, falsePositive: 3.1 },
    { date: '2025-06-13', accuracy: 94.2, confidence: 0.85, falsePositive: 3.1 }
  ];

  const speciesAccuracyData = [
    { species: 'Phalaenopsis', accuracy: 96.5, samples: 2000 },
    { species: 'Cattleya', accuracy: 94.2, samples: 1500 },
    { species: 'Dendrobium', accuracy: 92.8, samples: 1200 },
    { species: 'Oncidium', accuracy: 89.3, samples: 800 },
    { species: 'Vanda', accuracy: 87.1, samples: 600 },
    { species: 'Paphiopedilum', accuracy: 85.9, samples: 500 }
  ];

  const feedbackDistribution = [
    { name: 'Correct', value: 87, color: '#10B981' },
    { name: 'Incorrect', value: 8, color: '#EF4444' },
    { name: 'Uncertain', value: 5, color: '#F59E0B' }
  ];

  const getTrendIcon = (trend: AccuracyMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable': return <div className="w-4 h-4 border-b-2 border-gray-400" />;
    }
  };

  const getMetricColor = (current: number, target: number, isInverse: boolean = false) => {
    const meetsTarget = isInverse ? current <= target : current >= target;
    return meetsTarget ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accuracyMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="flex items-end space-x-2">
                <span className={`text-2xl font-bold ${getMetricColor(
                  metric.current, 
                  metric.target, 
                  metric.metric.includes('False Positive')
                )}`}>
                  {metric.current}{metric.metric.includes('Rate') ? '%' : metric.metric.includes('Threshold') ? '' : '%'}
                </span>
                <span className="text-sm text-gray-500">
                  Target: {metric.target}{metric.metric.includes('Rate') ? '%' : metric.metric.includes('Threshold') ? '' : '%'}
                </span>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                {metric.change > 0 ? '+' : ''}{metric.change}% from last week
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="improvement">Improvement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Accuracy Trends */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Accuracy Trends
                </CardTitle>
                <div className="flex space-x-2">
                  {['24h', '7d', '30d', '90d'].map((timeframe) => (
                    <Button
                      key={timeframe}
                      variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTimeframe(timeframe as any)}
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={accuracyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={2} name="Accuracy %" />
                  <Line type="monotone" dataKey="falsePositive" stroke="#EF4444" strokeWidth={2} name="False Positive %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Species-Specific Accuracy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Species Accuracy Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={speciesAccuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="species" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Feedback Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={feedbackDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {feedbackDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {feedbackDistribution.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          {/* Recent Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Recent Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{result.testName}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{result.environment}</Badge>
                        <Badge className={
                          result.accuracy >= 90 ? 'bg-green-100 text-green-800' :
                          result.accuracy >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {result.accuracy}% accuracy
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Sample Size:</span> {result.sampleSize}
                      </div>
                      <div>
                        <span className="font-medium">Model:</span> {result.modelVersion}
                      </div>
                      <div>
                        <span className="font-medium">Environment:</span> {result.environment}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {new Date(result.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Automated Testing Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Dataset Testing</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>Known Species Dataset</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>Edge Case Collection</span>
                      <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>Expert Validated Set</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Test Environments</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>Production Testing</span>
                      <Badge className="bg-green-100 text-green-800">Live</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>Staging Validation</span>
                      <Badge className="bg-blue-100 text-blue-800">Running</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>A/B Model Testing</span>
                      <Badge className="bg-purple-100 text-purple-800">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {/* User Feedback Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                User Feedback Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-gray-600">Correct Identifications</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">8%</div>
                  <div className="text-sm text-gray-600">Incorrect Identifications</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">5%</div>
                  <div className="text-sm text-gray-600">Uncertain/Disputed</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Feedback</h4>
                {[
                  { id: 1, species: 'Phalaenopsis amabilis', feedback: 'correct', confidence: 0.92, user: 'Expert botanist' },
                  { id: 2, species: 'Cattleya trianae', feedback: 'incorrect', confidence: 0.78, user: 'Community member' },
                  { id: 3, species: 'Dendrobium nobile', feedback: 'uncertain', confidence: 0.65, user: 'Beginner user' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">{item.species}</span>
                      <span className="text-sm text-gray-500 ml-2">by {item.user}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Confidence: {(item.confidence * 100).toFixed(0)}%</span>
                      <Badge className={
                        item.feedback === 'correct' ? 'bg-green-100 text-green-800' :
                        item.feedback === 'incorrect' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {item.feedback}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance by Condition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { condition: 'Optimal Lighting', accuracy: 96.2, samples: 5000 },
                    { condition: 'Low Light', accuracy: 87.4, samples: 2000 },
                    { condition: 'Damaged Plants', accuracy: 82.1, samples: 1500 },
                    { condition: 'Multiple Plants', accuracy: 79.8, samples: 800 },
                    { condition: 'Seedlings', accuracy: 74.3, samples: 600 }
                  ].map((item) => (
                    <div key={item.condition} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.condition}</span>
                        <span className="text-sm text-gray-600">{item.accuracy}% ({item.samples} samples)</span>
                      </div>
                      <Progress value={item.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { region: 'North America', accuracy: 94.8, icon: '🇺🇸' },
                    { region: 'Europe', accuracy: 93.2, icon: '🇪🇺' },
                    { region: 'Asia-Pacific', accuracy: 91.6, icon: '🌏' },
                    { region: 'South America', accuracy: 89.4, icon: '🌎' },
                    { region: 'Africa', accuracy: 86.1, icon: '🌍' }
                  ].map((item) => (
                    <div key={item.region} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.region}</span>
                      </div>
                      <Badge className={
                        item.accuracy >= 90 ? 'bg-green-100 text-green-800' :
                        item.accuracy >= 85 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {item.accuracy}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="improvement" className="space-y-6">
          {/* Continuous Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Continuous Improvement System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Model Updates</h4>
                  <div className="space-y-2">
                    {[
                      { version: 'v2.1.4', status: 'testing', date: '2025-06-14', improvement: '+1.2% accuracy' },
                      { version: 'v2.1.3', status: 'production', date: '2025-06-10', improvement: '+0.8% accuracy' },
                      { version: 'v2.1.2', status: 'deprecated', date: '2025-06-05', improvement: '+0.5% accuracy' }
                    ].map((update) => (
                      <div key={update.version} className="p-3 border rounded flex items-center justify-between">
                        <div>
                          <span className="font-medium">{update.version}</span>
                          <span className="text-sm text-gray-500 ml-2">{update.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600">{update.improvement}</span>
                          <Badge variant={
                            update.status === 'production' ? 'default' :
                            update.status === 'testing' ? 'secondary' : 'outline'
                          }>
                            {update.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Improvement Priorities</h4>
                  <div className="space-y-2">
                    {[
                      { priority: 'Seedling Recognition', impact: 'High', effort: 'Medium' },
                      { priority: 'Low Light Performance', impact: 'High', effort: 'High' },
                      { priority: 'Hybrid Identification', impact: 'Medium', effort: 'High' },
                      { priority: 'Disease Detection', impact: 'Medium', effort: 'Medium' }
                    ].map((item) => (
                      <div key={item.priority} className="p-3 border rounded">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{item.priority}</span>
                        </div>
                        <div className="flex space-x-4 text-sm">
                          <span>Impact: <Badge variant="outline">{item.impact}</Badge></span>
                          <span>Effort: <Badge variant="outline">{item.effort}</Badge></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAccuracyDashboard;
