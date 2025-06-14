
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Ticket, 
  BookOpen, 
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Star
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

interface SupportTicketData {
  category: string;
  open: number;
  resolved: number;
  avgResolutionTime: number;
  satisfaction: number;
}

interface ContentPerformance {
  title: string;
  views: number;
  rating: number;
  helpfulness: number;
  lastUpdated: string;
  category: string;
}

interface ExpertMetrics {
  name: string;
  consultations: number;
  rating: number;
  utilization: number;
  revenue: number;
}

interface CommunityMetrics {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

const OperationalInsightsDashboard: React.FC = () => {
  const [ticketData, setTicketData] = useState<SupportTicketData[]>([]);
  const [contentData, setContentData] = useState<ContentPerformance[]>([]);
  const [expertData, setExpertData] = useState<ExpertMetrics[]>([]);
  const [communityData, setCommunityData] = useState<CommunityMetrics[]>([]);

  useEffect(() => {
    // Mock support ticket data
    setTicketData([
      { category: 'Identification Issues', open: 23, resolved: 145, avgResolutionTime: 4.2, satisfaction: 4.3 },
      { category: 'Premium Features', open: 8, resolved: 67, avgResolutionTime: 2.8, satisfaction: 4.6 },
      { category: 'Care Guidance', open: 15, resolved: 89, avgResolutionTime: 6.1, satisfaction: 4.1 },
      { category: 'Technical Problems', open: 12, resolved: 34, avgResolutionTime: 8.5, satisfaction: 3.9 },
      { category: 'Billing & Account', open: 5, resolved: 78, avgResolutionTime: 3.2, satisfaction: 4.4 }
    ]);

    // Mock content performance data
    setContentData([
      { title: 'Orchid Care Basics for Beginners', views: 12500, rating: 4.8, helpfulness: 92, lastUpdated: '2024-05-15', category: 'Care Guide' },
      { title: 'Common Orchid Diseases and Treatments', views: 8200, rating: 4.6, helpfulness: 89, lastUpdated: '2024-06-01', category: 'Troubleshooting' },
      { title: 'Phalaenopsis Identification Guide', views: 9800, rating: 4.7, helpfulness: 94, lastUpdated: '2024-04-22', category: 'Identification' },
      { title: 'Seasonal Orchid Care Calendar', views: 6700, rating: 4.5, helpfulness: 87, lastUpdated: '2024-03-10', category: 'Care Guide' },
      { title: 'Repotting Your Orchid: Step by Step', views: 5400, rating: 4.4, helpfulness: 85, lastUpdated: '2024-05-28', category: 'Care Guide' }
    ]);

    // Mock expert metrics data
    setExpertData([
      { name: 'Dr. Sarah Chen', consultations: 45, rating: 4.9, utilization: 85, revenue: 2250 },
      { name: 'Prof. Michael Torres', consultations: 38, rating: 4.7, utilization: 76, revenue: 1900 },
      { name: 'Dr. Emma Johnson', consultations: 42, rating: 4.8, utilization: 84, revenue: 2100 },
      { name: 'Dr. David Kim', consultations: 29, rating: 4.6, utilization: 58, revenue: 1450 }
    ]);

    // Mock community metrics data
    setCommunityData([
      { metric: 'Daily Active Users', value: 1250, change: 12, trend: 'up' },
      { metric: 'Posts per Day', value: 89, change: -5, trend: 'down' },
      { metric: 'Comments per Post', value: 3.2, change: 8, trend: 'up' },
      { metric: 'Moderation Actions', value: 12, change: -15, trend: 'down' },
      { metric: 'User Reports', value: 3, change: -25, trend: 'down' },
      { metric: 'Expert Responses', value: 45, change: 18, trend: 'up' }
    ]);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Operational Insights</h2>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Key Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Ticket className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Open Tickets</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">63</div>
            <div className="text-sm text-gray-600">-12% from last week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Avg Resolution</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">4.8h</div>
            <div className="text-sm text-gray-600">+0.3h from target</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Satisfaction</span>
            </div>
            <div className="text-2xl font-bold text-green-600">4.4</div>
            <div className="text-sm text-gray-600">+0.2 from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Expert Utilization</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">76%</div>
            <div className="text-sm text-gray-600">+8% from last month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="support" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="support">Support Analysis</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="experts">Expert Network</TabsTrigger>
          <TabsTrigger value="community">Community Health</TabsTrigger>
        </TabsList>

        <TabsContent value="support">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Support Ticket Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ticketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="open" fill="#ff7300" name="Open Tickets" />
                    <Bar dataKey="resolved" fill="#82ca9d" name="Resolved Tickets" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Resolution Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketData.map((item) => (
                    <div key={item.category} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{item.category}</h5>
                        <Badge variant="outline">
                          {item.open} open
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        <div>
                          <div className="text-gray-600">Avg Resolution</div>
                          <div className="font-medium">{item.avgResolutionTime}h</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Satisfaction</div>
                          <div className="font-medium">{item.satisfaction}/5.0</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Progress value={(item.avgResolutionTime / 12) * 100} className="flex-1 h-2" />
                        <Progress value={(item.satisfaction / 5) * 100} className="flex-1 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentData.map((content, index) => (
                    <div key={content.title} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-sm">{content.title}</h5>
                        <Badge variant="outline">{content.category}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                        <div>
                          <div className="text-gray-600">Views</div>
                          <div className="font-medium">{content.views.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Rating</div>
                          <div className="font-medium">{content.rating}/5.0</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Helpful</div>
                          <div className="font-medium">{content.helpfulness}%</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Last updated: {content.lastUpdated}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Content Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Content by Category</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Care Guide', value: 45, fill: '#8884d8' },
                            { name: 'Identification', value: 30, fill: '#82ca9d' },
                            { name: 'Troubleshooting', value: 20, fill: '#ffc658' },
                            { name: 'Advanced', value: 5, fill: '#ff7300' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Content Updates Needed:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span>Seasonal Care Calendar</span>
                        <Badge className="bg-yellow-100 text-yellow-800">90+ days old</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span>Disease Identification</span>
                        <Badge className="bg-red-100 text-red-800">120+ days old</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Content Strategy Insights</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <div>• Care guides have highest engagement</div>
                      <div>• Troubleshooting content needs updating</div>
                      <div>• Video content performs 40% better</div>
                      <div>• Interactive tools boost retention by 65%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="experts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expert Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Expert Network Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expertData.map((expert) => (
                    <div key={expert.name} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">{expert.name}</h5>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{expert.rating}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-600">Consultations</div>
                          <div className="font-medium">{expert.consultations}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Utilization</div>
                          <div className="font-medium">{expert.utilization}%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Revenue</div>
                          <div className="font-medium">${expert.revenue}</div>
                        </div>
                      </div>
                      
                      <Progress value={expert.utilization} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expert Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Expert Network Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">4.8</div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">76%</div>
                      <div className="text-sm text-gray-600">Avg Utilization</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Revenue by Expert</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={expertData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Bar dataKey="revenue" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Expert Network Insights</h4>
                    <div className="text-sm text-purple-800 space-y-1">
                      <div>• High utilization indicates good demand</div>
                      <div>• Need 2-3 more experts for capacity</div>
                      <div>• Weekend availability increases bookings</div>
                      <div>• Video consultations preferred 3:1</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Community Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Community Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityData.map((metric) => (
                    <div key={metric.metric} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">{metric.metric}</h5>
                        <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {getTrendIcon(metric.trend)}
                          <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">vs last month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement & Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Top Contributors</h4>
                    <div className="space-y-2">
                      {[
                        { user: 'OrchidMaster2024', posts: 45, helpfulVotes: 189 },
                        { user: 'PlantExpert_Sarah', posts: 38, helpfulVotes: 156 },
                        { user: 'FlowerLover123', posts: 34, helpfulVotes: 142 },
                        { user: 'BotanicalBob', posts: 29, helpfulVotes: 98 }
                      ].map((contributor) => (
                        <div key={contributor.user} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-medium text-sm">{contributor.user}</span>
                          <div className="text-sm text-gray-600">
                            {contributor.posts} posts • {contributor.helpfulVotes} helpful votes
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Moderation Queue</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">3</div>
                        <div className="text-sm text-gray-600">Posts Pending Review</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-red-600">1</div>
                        <div className="text-sm text-gray-600">User Reports</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Community Health Status</h4>
                    <div className="text-sm text-green-800 space-y-1">
                      <div>✓ Engagement levels are healthy</div>
                      <div>✓ Moderation load is manageable</div>
                      <div>✓ Expert participation is active</div>
                      <div>⚠ Need more beginner-friendly content</div>
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

export default OperationalInsightsDashboard;
