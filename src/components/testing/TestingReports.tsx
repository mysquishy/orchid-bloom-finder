
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, TrendingUp, TrendingDown, Calendar, Users, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface WeeklyReport {
  week: string;
  testsRun: number;
  passRate: number;
  bugsFound: number;
  bugsResolved: number;
  performanceScore: number;
  userSatisfaction: number;
}

interface MonthlyReport {
  month: string;
  totalTests: number;
  averagePassRate: number;
  criticalBugs: number;
  featureReleases: number;
  userFeedbackScore: number;
  systemUptime: number;
}

interface CompetitiveBenchmark {
  metric: string;
  orkhidly: number;
  competitor1: number;
  competitor2: number;
  industry: number;
  unit: string;
}

const TestingReports: React.FC = () => {
  const [weeklyReports, setWeeklyReports] = useState<WeeklyReport[]>([]);
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [competitiveBenchmarks, setCompetitiveBenchmarks] = useState<CompetitiveBenchmark[]>([]);
  const [selectedReportType, setSelectedReportType] = useState<'weekly' | 'monthly' | 'competitive'>('weekly');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'3m' | '6m' | '1y'>('3m');

  useEffect(() => {
    // Mock weekly reports
    const mockWeeklyReports: WeeklyReport[] = [
      {
        week: '2025-W20',
        testsRun: 1247,
        passRate: 94.2,
        bugsFound: 8,
        bugsResolved: 12,
        performanceScore: 87,
        userSatisfaction: 4.6
      },
      {
        week: '2025-W21',
        testsRun: 1189,
        passRate: 96.1,
        bugsFound: 5,
        bugsResolved: 9,
        performanceScore: 89,
        userSatisfaction: 4.7
      },
      {
        week: '2025-W22',
        testsRun: 1356,
        passRate: 92.8,
        bugsFound: 11,
        bugsResolved: 8,
        performanceScore: 85,
        userSatisfaction: 4.5
      },
      {
        week: '2025-W23',
        testsRun: 1298,
        passRate: 95.5,
        bugsFound: 6,
        bugsResolved: 14,
        performanceScore: 91,
        userSatisfaction: 4.8
      }
    ];

    // Mock monthly reports
    const mockMonthlyReports: MonthlyReport[] = [
      {
        month: '2025-03',
        totalTests: 4892,
        averagePassRate: 93.8,
        criticalBugs: 3,
        featureReleases: 2,
        userFeedbackScore: 4.5,
        systemUptime: 99.7
      },
      {
        month: '2025-04',
        totalTests: 5124,
        averagePassRate: 95.2,
        criticalBugs: 1,
        featureReleases: 3,
        userFeedbackScore: 4.6,
        systemUptime: 99.8
      },
      {
        month: '2025-05',
        totalTests: 5367,
        averagePassRate: 94.7,
        criticalBugs: 2,
        featureReleases: 4,
        userFeedbackScore: 4.7,
        systemUptime: 99.9
      }
    ];

    // Mock competitive benchmarks
    const mockCompetitiveBenchmarks: CompetitiveBenchmark[] = [
      {
        metric: 'Test Coverage',
        orkhidly: 85,
        competitor1: 78,
        competitor2: 82,
        industry: 80,
        unit: '%'
      },
      {
        metric: 'Bug Resolution Time',
        orkhidly: 2.1,
        competitor1: 3.4,
        competitor2: 2.8,
        industry: 3.0,
        unit: 'days'
      },
      {
        metric: 'System Uptime',
        orkhidly: 99.8,
        competitor1: 99.5,
        competitor2: 99.6,
        industry: 99.4,
        unit: '%'
      },
      {
        metric: 'User Satisfaction',
        orkhidly: 4.7,
        competitor1: 4.2,
        competitor2: 4.4,
        industry: 4.3,
        unit: '/5'
      },
      {
        metric: 'Load Time',
        orkhidly: 1.8,
        competitor1: 2.3,
        competitor2: 2.1,
        industry: 2.2,
        unit: 'seconds'
      }
    ];

    setWeeklyReports(mockWeeklyReports);
    setMonthlyReports(mockMonthlyReports);
    setCompetitiveBenchmarks(mockCompetitiveBenchmarks);
  }, []);

  const generateReport = (type: string) => {
    // Simulate report generation
    console.log(`Generating ${type} report...`);
    // In a real app, this would trigger a download
  };

  const getTrendIcon = (current: number, previous: number, reverse = false) => {
    const isUp = current > previous;
    const shouldShowUp = reverse ? !isUp : isUp;
    
    if (shouldShowUp) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
  };

  const getBenchmarkColor = (orkhidly: number, industry: number, metric: string) => {
    const isReverse = metric.includes('Time') || metric.includes('Bug');
    
    if (isReverse) {
      return orkhidly <= industry ? 'text-green-600' : 'text-red-600';
    } else {
      return orkhidly >= industry ? 'text-green-600' : 'text-red-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Testing Reports & Analytics</h2>
        <div className="flex items-center space-x-4">
          <Select value={selectedReportType} onValueChange={(value: any) => setSelectedReportType(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly Reports</SelectItem>
              <SelectItem value="monthly">Monthly Reports</SelectItem>
              <SelectItem value="competitive">Competitive Analysis</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedTimeframe} onValueChange={(value: any) => setSelectedTimeframe(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => generateReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Report Type Specific Content */}
      {selectedReportType === 'weekly' && (
        <div className="space-y-6">
          {/* Weekly Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tests This Week</p>
                    <p className="text-2xl font-bold">1,298</p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(1298, 1189)}
                      <span className="text-sm text-green-600 ml-1">+9.2%</span>
                    </div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pass Rate</p>
                    <p className="text-2xl font-bold text-green-600">95.5%</p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(95.5, 92.8)}
                      <span className="text-sm text-green-600 ml-1">+2.7%</span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bugs Found</p>
                    <p className="text-2xl font-bold text-orange-600">6</p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(6, 11, true)}
                      <span className="text-sm text-green-600 ml-1">-45%</span>
                    </div>
                  </div>
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">User Satisfaction</p>
                    <p className="text-2xl font-bold text-purple-600">4.8/5</p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(4.8, 4.5)}
                      <span className="text-sm text-green-600 ml-1">+6.7%</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Testing Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weeklyReports}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="passRate" stroke="#10B981" strokeWidth={2} name="Pass Rate %" />
                  <Line type="monotone" dataKey="performanceScore" stroke="#3B82F6" strokeWidth={2} name="Performance Score" />
                  <Line type="monotone" dataKey="userSatisfaction" stroke="#8B5CF6" strokeWidth={2} name="User Satisfaction" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bug Discovery vs Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>Bug Discovery vs Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyReports}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bugsFound" fill="#EF4444" name="Bugs Found" />
                  <Bar dataKey="bugsResolved" fill="#10B981" name="Bugs Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedReportType === 'monthly' && (
        <div className="space-y-6">
          {/* Monthly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Testing Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyReports}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalTests" fill="#3B82F6" name="Total Tests" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyReports}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="averagePassRate" stroke="#10B981" strokeWidth={2} name="Pass Rate %" />
                    <Line type="monotone" dataKey="systemUptime" stroke="#8B5CF6" strokeWidth={2} name="Uptime %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Release Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyReports.map((report) => (
                    <div key={report.month} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{report.month}</p>
                        <p className="text-sm text-gray-500">{report.featureReleases} releases</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{report.criticalBugs}</p>
                        <p className="text-sm text-gray-500">critical bugs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">5,367</p>
                  <p className="text-sm text-gray-600">Total Tests (May)</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">94.7%</p>
                  <p className="text-sm text-gray-600">Average Pass Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">4.7/5</p>
                  <p className="text-sm text-gray-600">User Satisfaction</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">99.9%</p>
                  <p className="text-sm text-gray-600">System Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedReportType === 'competitive' && (
        <div className="space-y-6">
          {/* Competitive Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle>Competitive Benchmark Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitiveBenchmarks.map((benchmark) => (
                  <div key={benchmark.metric} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{benchmark.metric}</h3>
                      <Badge className={getBenchmarkColor(benchmark.orkhidly, benchmark.industry, benchmark.metric)}>
                        {benchmark.orkhidly >= benchmark.industry ? 'Above Industry' : 'Below Industry'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className={`text-lg font-bold ${getBenchmarkColor(benchmark.orkhidly, benchmark.industry, benchmark.metric)}`}>
                          {benchmark.orkhidly}{benchmark.unit}
                        </p>
                        <p className="text-sm text-gray-600">Orkhidly</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-600">
                          {benchmark.competitor1}{benchmark.unit}
                        </p>
                        <p className="text-sm text-gray-600">Competitor A</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-600">
                          {benchmark.competitor2}{benchmark.unit}
                        </p>
                        <p className="text-sm text-gray-600">Competitor B</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-blue-600">
                          {benchmark.industry}{benchmark.unit}
                        </p>
                        <p className="text-sm text-gray-600">Industry Avg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Market Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Ahead of Industry Average</span>
                    <span className="text-green-600 font-semibold">4/5 metrics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Better than Competitor A</span>
                    <span className="text-green-600 font-semibold">5/5 metrics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Better than Competitor B</span>
                    <span className="text-green-600 font-semibold">4/5 metrics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Top performer in</span>
                    <span className="text-blue-600 font-semibold">User Satisfaction</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded bg-yellow-50">
                    <p className="font-medium text-yellow-800">Test Coverage</p>
                    <p className="text-sm text-yellow-600">5% below industry average</p>
                  </div>
                  <div className="p-3 border rounded bg-blue-50">
                    <p className="font-medium text-blue-800">Load Time Optimization</p>
                    <p className="text-sm text-blue-600">Room for 15% improvement</p>
                  </div>
                  <div className="p-3 border rounded bg-green-50">
                    <p className="font-medium text-green-800">Bug Resolution</p>
                    <p className="text-sm text-green-600">Leading the industry</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col" onClick={() => generateReport('weekly-qa')}>
              <FileText className="w-6 h-6 mb-2" />
              <span>Weekly QA Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => generateReport('monthly-summary')}>
              <Calendar className="w-6 h-6 mb-2" />
              <span>Monthly Summary</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => generateReport('user-feedback')}>
              <Users className="w-6 h-6 mb-2" />
              <span>User Feedback</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => generateReport('competitive')}>
              <TrendingUp className="w-6 h-6 mb-2" />
              <span>Competitive Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingReports;
