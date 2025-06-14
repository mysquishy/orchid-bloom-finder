
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { TrendingUp, Ruler, Leaf, BarChart3 } from 'lucide-react';

interface GrowthAnalyticsProps {
  dateRange: { start: Date; end: Date };
}

const GrowthAnalytics: React.FC<GrowthAnalyticsProps> = ({ dateRange }) => {
  const growthData = [
    { month: 'Jan', height: 12.5, leaves: 8, newGrowth: 0.5 },
    { month: 'Feb', height: 13.0, leaves: 9, newGrowth: 0.8 },
    { month: 'Mar', height: 14.2, leaves: 11, newGrowth: 1.5 },
    { month: 'Apr', height: 15.8, leaves: 13, newGrowth: 2.1 },
    { month: 'May', height: 17.5, leaves: 15, newGrowth: 1.9 },
    { month: 'Jun', height: 18.9, leaves: 16, newGrowth: 1.6 }
  ];

  const plantComparison = [
    { plant: 'Phal #1', height: 18.9, leaves: 16, blooms: 2 },
    { plant: 'Phal #2', height: 15.2, leaves: 12, blooms: 1 },
    { plant: 'Cattleya', height: 22.1, leaves: 8, blooms: 1 },
    { plant: 'Dendrobium', height: 28.5, leaves: 14, blooms: 3 },
    { plant: 'Oncidium', height: 16.8, leaves: 10, blooms: 0 }
  ];

  const chartConfig = {
    height: { label: "Height (cm)", color: "#10b981" },
    leaves: { label: "Leaf Count", color: "#3b82f6" },
    newGrowth: { label: "Monthly Growth", color: "#f59e0b" },
    blooms: { label: "Blooms", color: "#8b5cf6" }
  };

  return (
    <div className="space-y-6">
      {/* Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Growth Progression Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px]">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line yAxisId="left" type="monotone" dataKey="height" stroke="#10b981" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="leaves" stroke="#3b82f6" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="newGrowth" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Plant Size Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <BarChart data={plantComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plant" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="height" fill="#10b981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Growth Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              Growth Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">6.4cm</div>
                  <div className="text-sm text-green-800">Total Growth</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">+8</div>
                  <div className="text-sm text-blue-800">New Leaves</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average Monthly Growth</span>
                  <span className="font-medium">1.3cm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth Rate</span>
                  <span className="font-medium text-green-600">+51%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fastest Growing</span>
                  <span className="font-medium">Dendrobium</span>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-yellow-800">
                  <strong>Peak Season:</strong> March-May showed highest growth rates
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Growth Analysis & Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌱 Growth Champions</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Dendrobium: Exceptional vertical growth</li>
                <li>• Phalaenopsis #1: Steady leaf development</li>
                <li>• Spring season optimal for all species</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📈 Predictions</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Expected 2-3cm growth next month</li>
                <li>• Cattleya due for growth spurt</li>
                <li>• Optimal repotting window approaching</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 Recommendations</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Increase fertilization for slower growers</li>
                <li>• Monitor root development</li>
                <li>• Document weekly measurements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthAnalytics;
