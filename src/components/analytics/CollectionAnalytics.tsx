
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Flower, Calendar, Award } from 'lucide-react';

interface CollectionAnalyticsProps {
  dateRange: { start: Date; end: Date };
}

const CollectionAnalytics: React.FC<CollectionAnalyticsProps> = ({ dateRange }) => {
  // Mock data for demonstration
  const speciesDistribution = [
    { name: 'Phalaenopsis', count: 8, percentage: 40 },
    { name: 'Cattleya', count: 5, percentage: 25 },
    { name: 'Dendrobium', count: 4, percentage: 20 },
    { name: 'Oncidium', count: 2, percentage: 10 },
    { name: 'Vanda', count: 1, percentage: 5 }
  ];

  const acquisitionTrend = [
    { month: 'Jan', plants: 2 },
    { month: 'Feb', plants: 1 },
    { month: 'Mar', plants: 3 },
    { month: 'Apr', plants: 0 },
    { month: 'May', plants: 2 },
    { month: 'Jun', plants: 4 },
    { month: 'Jul', plants: 1 },
    { month: 'Aug', plants: 3 },
    { month: 'Sep', plants: 2 },
    { month: 'Oct', plants: 1 },
    { month: 'Nov', plants: 0 },
    { month: 'Dec', plants: 1 }
  ];

  const careComplexity = [
    { difficulty: 'Beginner', count: 12, color: '#10b981' },
    { difficulty: 'Intermediate', count: 6, color: '#f59e0b' },
    { difficulty: 'Advanced', count: 2, color: '#ef4444' }
  ];

  const healthDistribution = [
    { status: 'Excellent', count: 14, color: '#10b981' },
    { status: 'Good', count: 4, color: '#3b82f6' },
    { status: 'Fair', count: 2, color: '#f59e0b' },
    { status: 'Poor', count: 0, color: '#ef4444' }
  ];

  const chartConfig = {
    plants: {
      label: "Plants",
      color: "#10b981",
    },
    count: {
      label: "Count",
      color: "#8b5cf6",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Species Distribution */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flower className="w-5 h-5" />
            Species Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={speciesDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Acquisition Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Acquisition Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <LineChart data={acquisitionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="plants" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Care Complexity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Care Complexity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <PieChart>
              <Pie
                data={careComplexity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {careComplexity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Health Status Overview */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Health Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {healthDistribution.map((status, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: status.color }}
                >
                  {status.count}
                </div>
                <p className="font-medium text-gray-900">{status.status}</p>
                <p className="text-sm text-gray-600">
                  {((status.count / 20) * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collection Insights */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Collection Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌟 Strengths</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Excellent health rate: 90% of plants in good-excellent condition</li>
                <li>• Diverse collection with 5 different species</li>
                <li>• Strong focus on beginner-friendly varieties</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Recommendations</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Consider adding Cymbidium for seasonal variety</li>
                <li>• Try one advanced-care orchid to expand your skills</li>
                <li>• Your acquisition rate is healthy - maintain current pace</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionAnalytics;
