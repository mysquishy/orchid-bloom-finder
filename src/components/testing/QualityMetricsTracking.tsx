
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Clock, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

interface QualityMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  category: 'coverage' | 'bugs' | 'performance' | 'satisfaction';
  unit: string;
}

interface BugReport {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  reportedBy: string;
  reportedAt: string;
  category: string;
}

interface SystemMetric {
  date: string;
  uptime: number;
  reliability: number;
  codeCoverage: number;
  bugCount: number;
  userSatisfaction: number;
}

const QualityMetricsTracking: React.FC = () => {
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetric[]>([]);
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    // Mock quality metrics
    const mockQualityMetrics: QualityMetric[] = [
      {
        id: '1',
        name: 'Code Coverage',
        current: 85,
        target: 90,
        trend: 'up',
        category: 'coverage',
        unit: '%'
      },
      {
        id: '2',
        name: 'Bug Discovery Rate',
        current: 12,
        target: 8,
        trend: 'down',
        category: 'bugs',
        unit: 'bugs/week'
      },
      {
        id: '3',
        name: 'Resolution Time',
        current: 2.5,
        target: 2.0,
        trend: 'stable',
        category: 'bugs',
        unit: 'days'
      },
      {
        id: '4',
        name: 'System Uptime',
        current: 99.8,
        target: 99.9,
        trend: 'up',
        category: 'performance',
        unit: '%'
      },
      {
        id: '5',
        name: 'User Satisfaction',
        current: 4.6,
        target: 4.5,
        trend: 'up',
        category: 'satisfaction',
        unit: '/5'
      },
      {
        id: '6',
        name: 'Feature Stability',
        current: 94,
        target: 95,
        trend: 'stable',
        category: 'performance',
        unit: '%'
      }
    ];

    // Mock bug reports
    const mockBugReports: BugReport[] = [
      {
        id: '1',
        title: 'Photo upload fails on large images',
        severity: 'high',
        status: 'in_progress',
        reportedBy: 'User Testing',
        reportedAt: '2025-06-14T10:30:00Z',
        category: 'Upload'
      },
      {
        id: '2',
        title: 'Mobile navigation menu not responsive',
        severity: 'medium',
        status: 'open',
        reportedBy: 'QA Team',
        reportedAt: '2025-06-14T09:15:00Z',
        category: 'UI/UX'
      },
      {
        id: '3',
        title: 'Database connection timeout during peak hours',
        severity: 'critical',
        status: 'resolved',
        reportedBy: 'Monitoring',
        reportedAt: '2025-06-13T15:45:00Z',
        category: 'Infrastructure'
      },
      {
        id: '4',
        title: 'Search results pagination broken',
        severity: 'low',
        status: 'closed',
        reportedBy: 'User Report',
        reportedAt: '2025-06-12T11:20:00Z',
        category: 'Search'
      }
    ];

    // Mock system metrics over time
    const mockSystemMetrics: SystemMetric[] = [
      { date: '2025-05-15', uptime: 99.5, reliability: 95, codeCoverage: 82, bugCount: 15, userSatisfaction: 4.3 },
      { date: '2025-05-22', uptime: 99.7, reliability: 96, codeCoverage: 83, bugCount: 12, userSatisfaction: 4.4 },
      { date: '2025-05-29', uptime: 99.6, reliability: 94, codeCoverage: 84, bugCount: 14, userSatisfaction: 4.5 },
      { date: '2025-06-05', uptime: 99.8, reliability: 97, codeCoverage: 85, bugCount: 10, userSatisfaction: 4.6 },
      { date: '2025-06-12', uptime: 99.9, reliability: 98, codeCoverage: 85, bugCount: 8, userSatisfaction: 4.6 }
    ];

    setQualityMetrics(mockQualityMetrics);
    setBugReports(mockBugReports);
    setSystemMetrics(mockSystemMetrics);
  }, []);

  const getTrendIcon = (trend: QualityMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <div className="w-4 h-4 border-b border-gray-400" />;
    }
  };

  const getSeverityColor = (severity: BugReport['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: BugReport['status']) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricColor = (current: number, target: number, category: string) => {
    if (category === 'bugs') {
      return current <= target ? 'text-green-600' : 'text-red-600';
    }
    return current >= target ? 'text-green-600' : 'text-red-600';
  };

  const openBugs = bugReports.filter(bug => bug.status === 'open' || bug.status === 'in_progress').length;
  const resolvedBugs = bugReports.filter(bug => bug.status === 'resolved' || bug.status === 'closed').length;
  const criticalBugs = bugReports.filter(bug => bug.severity === 'critical' && (bug.status === 'open' || bug.status === 'in_progress')).length;

  return (
    <div className="space-y-6">
      {/* Quality Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Issues</p>
                <p className="text-2xl font-bold text-red-600">{openBugs}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Issues</p>
                <p className="text-2xl font-bold text-green-600">{resolvedBugs}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Issues</p>
                <p className="text-2xl font-bold text-orange-600">{criticalBugs}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualityMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{metric.name}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="mb-3">
                <div className="flex items-end space-x-2">
                  <span className={`text-2xl font-bold ${getMetricColor(metric.current, metric.target, metric.category)}`}>
                    {metric.current}
                  </span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <p className="text-xs text-gray-500">Target: {metric.target}{metric.unit}</p>
              </div>

              <Progress 
                value={metric.category === 'bugs' ? 
                  Math.min(100, (metric.target / metric.current) * 100) :
                  (metric.current / metric.target) * 100
                } 
                className="h-2"
              />
              
              <div className="mt-2 text-xs text-gray-500 capitalize">
                {metric.category} metric
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Quality Trends Over Time</CardTitle>
              <div className="flex space-x-2">
                {['7d', '30d', '90d'].map((timeframe) => (
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
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="codeCoverage" stroke="#3B82F6" strokeWidth={2} name="Code Coverage %" />
                <Line type="monotone" dataKey="reliability" stroke="#10B981" strokeWidth={2} name="Reliability %" />
                <Line type="monotone" dataKey="uptime" stroke="#8B5CF6" strokeWidth={2} name="Uptime %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bug Discovery & Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="bugCount" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Bug Count" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bug Reports Management */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bug Reports & Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bugReports.map((bug) => (
              <div key={bug.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">{bug.title}</h3>
                    <Badge className={getSeverityColor(bug.severity)}>
                      {bug.severity}
                    </Badge>
                    <Badge className={getStatusColor(bug.status)}>
                      {bug.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">{bug.category}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Reported by: {bug.reportedBy}</span>
                  <span>{new Date(bug.reportedAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Feedback Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Satisfaction Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="userSatisfaction" stroke="#F59E0B" strokeWidth={3} name="Satisfaction (1-5)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Stability Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { feature: 'Photo Identification', score: 98, issues: 2 },
                { feature: 'User Authentication', score: 99, issues: 1 },
                { feature: 'Garden Management', score: 95, issues: 3 },
                { feature: 'Search & Filters', score: 92, issues: 4 },
                { feature: 'Mobile App', score: 88, issues: 6 }
              ].map((item) => (
                <div key={item.feature} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.feature}</p>
                    <p className="text-sm text-gray-500">{item.issues} open issues</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.score >= 95 ? 'bg-green-500' :
                          item.score >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Reliability */}
      <Card>
        <CardHeader>
          <CardTitle>System Uptime & Reliability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">99.8%</p>
              <p className="text-sm text-gray-600">Current Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">2.1s</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">0.1%</p>
              <p className="text-sm text-gray-600">Error Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">99.7%</p>
              <p className="text-sm text-gray-600">SLA Compliance</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uptime" fill="#10B981" name="Uptime %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityMetricsTracking;
