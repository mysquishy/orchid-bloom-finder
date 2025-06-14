
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { Activity, Heart, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HealthTrendAnalyticsProps {
  dateRange: { start: Date; end: Date };
}

const HealthTrendAnalytics: React.FC<HealthTrendAnalyticsProps> = ({ dateRange }) => {
  const healthTrendData = [
    { date: '2024-01', overall: 85, growth: 80, leaves: 90, roots: 85, blooms: 75 },
    { date: '2024-02', overall: 87, growth: 82, leaves: 88, roots: 90, blooms: 80 },
    { date: '2024-03', overall: 90, growth: 88, leaves: 92, roots: 88, blooms: 85 },
    { date: '2024-04', overall: 88, growth: 85, leaves: 90, roots: 90, blooms: 88 },
    { date: '2024-05', overall: 92, growth: 90, leaves: 95, roots: 92, blooms: 90 },
    { date: '2024-06', overall: 89, growth: 87, leaves: 88, roots: 90, blooms: 92 }
  ];

  const healthIndicators = [
    { indicator: 'Leaf Color', current: 92, trend: '+5%', status: 'excellent' },
    { indicator: 'Root Health', current: 88, trend: '+2%', status: 'good' },
    { indicator: 'Growth Rate', current: 85, trend: '-1%', status: 'good' },
    { indicator: 'Pest Resistance', current: 94, trend: '+8%', status: 'excellent' },
    { indicator: 'Bloom Quality', current: 90, trend: '+12%', status: 'excellent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend.startsWith('+')) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (trend.startsWith('-')) {
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const chartConfig = {
    overall: { label: "Overall Health", color: "#10b981" },
    growth: { label: "Growth Rate", color: "#3b82f6" },
    leaves: { label: "Leaf Health", color: "#f59e0b" },
    roots: { label: "Root Health", color: "#8b5cf6" },
    blooms: { label: "Bloom Health", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      {/* Overall Health Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Plant Health Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px]">
            <LineChart data={healthTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[70, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="overall" stroke="#10b981" strokeWidth={4} />
              <Line type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="leaves" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="roots" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="blooms" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Health Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Health Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthIndicators.map((indicator, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{indicator.indicator}</h4>
                  <Badge className={getStatusColor(indicator.status)}>
                    {indicator.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    {indicator.current}%
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {getTrendIcon(indicator.trend)}
                    <span className={indicator.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {indicator.trend}
                    </span>
                  </div>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${indicator.current}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Predictions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📈 Positive Trends</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Bloom quality improving significantly (+12%)</li>
                  <li>• Pest resistance at all-time high</li>
                  <li>• Overall health trajectory is positive</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Watch Areas</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Growth rate showing slight decline</li>
                  <li>• Monitor humidity levels in winter</li>
                  <li>• Check for early signs of root rot</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-green-500 bg-green-50">
                <h5 className="font-medium text-green-900">Maintain Excellence</h5>
                <p className="text-sm text-green-800">Continue current care routine for leaf and bloom health</p>
              </div>
              
              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                <h5 className="font-medium text-yellow-900">Adjust Fertilization</h5>
                <p className="text-sm text-yellow-800">Increase nitrogen content to boost growth rate</p>
              </div>
              
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <h5 className="font-medium text-blue-900">Schedule Check-up</h5>
                <p className="text-sm text-blue-800">Inspect roots and repot if necessary within 2 weeks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthTrendAnalytics;
