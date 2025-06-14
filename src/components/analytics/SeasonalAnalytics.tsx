
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { Calendar, Sun, Droplets, Thermometer } from 'lucide-react';

interface SeasonalAnalyticsProps {
  dateRange: { start: Date; end: Date };
}

const SeasonalAnalytics: React.FC<SeasonalAnalyticsProps> = ({ dateRange }) => {
  const seasonalCareData = [
    { month: 'Jan', watering: 65, fertilizing: 40, blooming: 20, temperature: 68 },
    { month: 'Feb', watering: 70, fertilizing: 45, blooming: 25, temperature: 70 },
    { month: 'Mar', watering: 80, fertilizing: 60, blooming: 40, temperature: 72 },
    { month: 'Apr', watering: 85, fertilizing: 80, blooming: 60, temperature: 75 },
    { month: 'May', watering: 90, fertilizing: 85, blooming: 80, temperature: 78 },
    { month: 'Jun', watering: 95, fertilizing: 90, blooming: 90, temperature: 82 },
    { month: 'Jul', watering: 100, fertilizing: 85, blooming: 85, temperature: 85 },
    { month: 'Aug', watering: 95, fertilizing: 80, blooming: 70, temperature: 84 },
    { month: 'Sep', watering: 85, fertilizing: 75, blooming: 60, temperature: 80 },
    { month: 'Oct', watering: 75, fertilizing: 60, blooming: 45, temperature: 75 },
    { month: 'Nov', watering: 70, fertilizing: 50, blooming: 30, temperature: 71 },
    { month: 'Dec', watering: 65, fertilizing: 40, blooming: 25, temperature: 69 }
  ];

  const bloomingPatterns = [
    { season: 'Spring', phalaenopsis: 85, cattleya: 90, dendrobium: 75, oncidium: 80 },
    { season: 'Summer', phalaenopsis: 60, cattleya: 70, dendrobium: 95, oncidium: 85 },
    { season: 'Fall', phalaenopsis: 80, cattleya: 50, dendrobium: 40, oncidium: 60 },
    { season: 'Winter', phalaenopsis: 90, cattleya: 30, dendrobium: 20, oncidium: 40 }
  ];

  const chartConfig = {
    watering: { label: "Watering Frequency", color: "#3b82f6" },
    fertilizing: { label: "Fertilizing", color: "#10b981" },
    blooming: { label: "Blooming Activity", color: "#f59e0b" },
    temperature: { label: "Temperature", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      {/* Seasonal Care Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Seasonal Care Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px]">
            <AreaChart data={seasonalCareData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="watering" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="fertilizing" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="blooming" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Correlation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Temperature Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <LineChart data={seasonalCareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={3} />
                <Line type="monotone" dataKey="blooming" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Seasonal Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Seasonal Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">Spring</div>
                  <div className="text-sm text-green-800">Peak Growth</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">Summer</div>
                  <div className="text-sm text-yellow-800">High Maintenance</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">Fall</div>
                  <div className="text-sm text-orange-800">Transition</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">Winter</div>
                  <div className="text-sm text-blue-800">Rest Period</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Next Season Predictions</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Increase watering frequency by 15% in Spring</li>
                  <li>• Expect 3 new blooms in the next 6 weeks</li>
                  <li>• Consider repotting 2 plants before growth season</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeasonalAnalytics;
