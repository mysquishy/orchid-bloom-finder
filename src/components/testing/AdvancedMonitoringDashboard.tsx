
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Globe,
  Eye,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

interface BusinessMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: 'revenue' | 'user' | 'engagement' | 'performance';
  alert: boolean;
}

interface UserExperience {
  metric: string;
  score: number;
  benchmark: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  impact: 'high' | 'medium' | 'low';
}

interface CompetitorMetric {
  competitor: string;
  metric: string;
  value: number;
  ourValue: number;
  difference: number;
  trend: 'gaining' | 'losing' | 'stable';
}

const AdvancedMonitoringDashboard: React.FC = () => {
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetric[]>([]);
  const [userExperience, setUserExperience] = useState<UserExperience[]>([]);
  const [competitorData, setCompetitorData] = useState<CompetitorMetric[]>([]);

  const performanceData = [
    { time: '00:00', responseTime: 120, throughput: 850, errorRate: 0.02 },
    { time: '04:00', responseTime: 145, throughput: 920, errorRate: 0.01 },
    { time: '08:00', responseTime: 280, throughput: 1240, errorRate: 0.05 },
    { time: '12:00', responseTime: 320, throughput: 1680, errorRate: 0.08 },
    { time: '16:00', responseTime: 250, throughput: 1420, errorRate: 0.03 },
    { time: '20:00', responseTime: 180, throughput: 1100, errorRate: 0.02 }
  ];

  const revenueData = [
    { date: '2025-06-08', revenue: 12500, users: 320, conversions: 45 },
    { date: '2025-06-09', revenue: 13200, users: 340, conversions: 52 },
    { date: '2025-06-10', revenue: 11800, users: 310, conversions: 38 },
    { date: '2025-06-11', revenue: 14600, users: 380, conversions: 58 },
    { date: '2025-06-12', revenue: 15200, users: 395, conversions: 62 },
    { date: '2025-06-13', revenue: 16100, users: 420, conversions: 68 },
    { date: '2025-06-14', revenue: 17300, users: 445, conversions: 74 }
  ];

  useEffect(() => {
    // Mock business metrics
    const mockMetrics: BusinessMetric[] = [
      {
        id: '1',
        name: 'Monthly Recurring Revenue',
        value: 45600,
        target: 50000,
        change: 12.5,
        trend: 'up',
        category: 'revenue',
        alert: false
      },
      {
        id: '2',
        name: 'Daily Active Users',
        value: 8420,
        target: 10000,
        change: -3.2,
        trend: 'down',
        category: 'user',
        alert: true
      },
      {
        id: '3',
        name: 'Customer Acquisition Cost',
        value: 24.50,
        target: 20.00,
        change: 15.8,
        trend: 'up',
        category: 'revenue',
        alert: true
      },
      {
        id: '4',
        name: 'User Retention Rate',
        value: 78.5,
        target: 80.0,
        change: 2.1,
        trend: 'up',
        category: 'engagement',
        alert: false
      },
      {
        id: '5',
        name: 'Average Session Duration',
        value: 8.2,
        target: 10.0,
        change: -5.4,
        trend: 'down',
        category: 'engagement',
        alert: true
      },
      {
        id: '6',
        name: 'API Response Time',
        value: 245,
        target: 200,
        change: 18.2,
        trend: 'up',
        category: 'performance',
        alert: true
      }
    ];

    // Mock user experience data
    const mockUX: UserExperience[] = [
      { metric: 'Page Load Speed', score: 92, benchmark: 85, status: 'excellent', impact: 'high' },
      { metric: 'Mobile Responsiveness', score: 88, benchmark: 90, status: 'good', impact: 'high' },
      { metric: 'User Interface Quality', score: 95, benchmark: 80, status: 'excellent', impact: 'medium' },
      { metric: 'Search Functionality', score: 76, benchmark: 85, status: 'needs-improvement', impact: 'high' },
      { metric: 'Feature Discoverability', score: 82, benchmark: 75, status: 'good', impact: 'medium' },
      { metric: 'Error Recovery', score: 69, benchmark: 80, status: 'needs-improvement', impact: 'medium' }
    ];

    // Mock competitor data
    const mockCompetitors: CompetitorMetric[] = [
      { competitor: 'PlantNet', metric: 'App Store Rating', value: 4.6, ourValue: 4.8, difference: 0.2, trend: 'gaining' },
      { competitor: 'iNaturalist', metric: 'Monthly Downloads', value: 45000, ourValue: 38000, difference: -7000, trend: 'losing' },
      { competitor: 'GrowVeg', metric: 'User Retention', value: 72, ourValue: 78.5, difference: 6.5, trend: 'gaining' },
      { competitor: 'Garden Tags', metric: 'Social Engagement', value: 8.2, ourValue: 6.8, difference: -1.4, trend: 'losing' },
      { competitor: 'PlantIn', metric: 'Premium Conversion', value: 3.2, ourValue: 4.1, difference: 0.9, trend: 'gaining' }
    ];

    setBusinessMetrics(mockMetrics);
    setUserExperience(mockUX);
    setCompetitorData(mockCompetitors);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getStatusColor = (status: UserExperience['status']) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
    }
  };

  const getCategoryIcon = (category: BusinessMetric['category']) => {
    switch (category) {
      case 'revenue': return <DollarSign className="w-5 h-5" />;
      case 'user': return <Users className="w-5 h-5" />;
      case 'engagement': return <Activity className="w-5 h-5" />;
      case 'performance': return <Zap className="w-5 h-5" />;
    }
  };

  const alertCount = businessMetrics.filter(m => m.alert).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Monitoring Dashboard</h2>
          <p className="text-gray-600">Real-time business metrics and user experience monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          {alertCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {alertCount} alerts
            </Badge>
          )}
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="business-metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business-metrics">Business Metrics</TabsTrigger>
          <TabsTrigger value="user-experience">User Experience</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="competitive">Competitive Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="business-metrics">
          <div className="space-y-6">
            {/* Key Business Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {businessMetrics.map((metric) => (
                <Card key={metric.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(metric.category)}
                        <span className="text-sm font-medium text-gray-600">{metric.name}</span>
                      </div>
                      {metric.alert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          {metric.category === 'revenue' && '$'}{metric.value.toLocaleString()}
                          {metric.category === 'engagement' && metric.name.includes('Rate') && '%'}
                          {metric.name.includes('Duration') && 'm'}
                          {metric.name.includes('Time') && 'ms'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Target: {metric.category === 'revenue' && '$'}{metric.target.toLocaleString()}
                          {metric.category === 'engagement' && metric.name.includes('Rate') && '%'}
                          {metric.name.includes('Duration') && 'm'}
                          {metric.name.includes('Time') && 'ms'}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 
                          metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress 
                        value={(metric.value / metric.target) * 100} 
                        className="h-1" 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & User Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="conversions" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Automated Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Automated Business Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessMetrics.filter(m => m.alert).map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="font-medium text-red-900">{metric.name} Alert</div>
                          <div className="text-sm text-red-700">
                            Current: {metric.value.toLocaleString()} | Target: {metric.target.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">
                        Action Required
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="user-experience">
          <div className="space-y-6">
            {/* UX Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Experience Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userExperience.map((ux) => (
                      <div key={ux.metric} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{ux.metric}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold ${getStatusColor(ux.status)}`}>
                              {ux.score}
                            </span>
                            <Badge className={
                              ux.impact === 'high' ? 'bg-red-100 text-red-800' :
                              ux.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {ux.impact} impact
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={ux.score} className="flex-1" />
                          <span className="text-sm text-gray-500">vs {ux.benchmark}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">4.7</div>
                      <div className="text-gray-600">Overall Rating</div>
                      <div className="flex justify-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-5 h-5 ${star <= 4.7 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { category: 'Ease of Use', score: 4.8, responses: 342 },
                        { category: 'Feature Quality', score: 4.6, responses: 289 },
                        { category: 'Customer Support', score: 4.9, responses: 156 },
                        { category: 'Value for Money', score: 4.4, responses: 234 }
                      ].map((item) => (
                        <div key={item.category} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{item.score}</span>
                            <span className="text-xs text-gray-500">({item.responses})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time User Behavior */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time User Behavior Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { metric: 'Active Users', value: '1,247', change: '+12%', icon: Users },
                    { metric: 'Bounce Rate', value: '24.3%', change: '-8%', icon: Activity },
                    { metric: 'Session Duration', value: '8m 24s', change: '+15%', icon: Clock },
                    { metric: 'Feature Adoption', value: '68%', change: '+5%', icon: Target }
                  ].map((item) => (
                    <div key={item.metric} className="text-center p-4 border rounded-lg">
                      <item.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-bold text-xl">{item.value}</div>
                      <div className="text-sm text-gray-600">{item.metric}</div>
                      <div className={`text-xs font-medium ${
                        item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>24-Hour Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="responseTime" stroke="#3B82F6" strokeWidth={2} name="Response Time (ms)" />
                    <Line type="monotone" dataKey="throughput" stroke="#10B981" strokeWidth={2} name="Throughput (req/min)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { metric: 'Average Response Time', value: '245ms', status: 'warning', target: '<200ms' },
                { metric: 'Error Rate', value: '0.03%', status: 'good', target: '<0.1%' },
                { metric: 'Uptime', value: '99.97%', status: 'excellent', target: '>99.9%' },
                { metric: 'Database Performance', value: '156ms', status: 'good', target: '<200ms' },
                { metric: 'CDN Cache Hit Rate', value: '94.2%', status: 'excellent', target: '>90%' },
                { metric: 'API Rate Limit Usage', value: '67%', status: 'good', target: '<80%' }
              ].map((item) => (
                <Card key={item.metric}>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">{item.metric}</div>
                    <div className="text-2xl font-bold mb-1">{item.value}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Target: {item.target}</span>
                      <Badge className={
                        item.status === 'excellent' ? 'bg-green-100 text-green-800' :
                        item.status === 'good' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Geographic Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Global Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { region: 'North America', latency: '145ms', uptime: '99.98%', users: '45%' },
                    { region: 'Europe', latency: '178ms', uptime: '99.96%', users: '32%' },
                    { region: 'Asia-Pacific', latency: '234ms', uptime: '99.92%', users: '23%' }
                  ].map((region) => (
                    <div key={region.region} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        {region.region}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Latency:</span>
                          <span className="font-medium">{region.latency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Uptime:</span>
                          <span className="font-medium">{region.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">User Base:</span>
                          <span className="font-medium">{region.users}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitive">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Benchmark Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorData.map((comp, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{comp.competitor}</h3>
                        <p className="text-sm text-gray-600">{comp.metric}</p>
                      </div>
                      <Badge className={
                        comp.trend === 'gaining' ? 'bg-green-100 text-green-800' :
                        comp.trend === 'losing' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {comp.trend}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Their Value</div>
                        <div className="font-bold">{comp.value.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Our Value</div>
                        <div className="font-bold text-blue-600">{comp.ourValue.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Difference</div>
                        <div className={`font-bold ${
                          comp.difference > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {comp.difference > 0 ? '+' : ''}{comp.difference.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedMonitoringDashboard;
