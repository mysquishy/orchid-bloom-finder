
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Target, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CareSuccessAnalyticsProps {
  dateRange: { start: Date; end: Date };
}

const CareSuccessAnalytics: React.FC<CareSuccessAnalyticsProps> = ({ dateRange }) => {
  const successTrend = [
    { week: 'Week 1', watering: 95, fertilizing: 80, repotting: 90, overall: 88 },
    { week: 'Week 2', watering: 90, fertilizing: 85, repotting: 95, overall: 90 },
    { week: 'Week 3', watering: 88, fertilizing: 90, repotting: 85, overall: 88 },
    { week: 'Week 4', watering: 92, fertilizing: 88, repotting: 92, overall: 91 },
    { week: 'Week 5', watering: 96, fertilizing: 92, repotting: 88, overall: 92 },
    { week: 'Week 6', watering: 94, fertilizing: 95, repotting: 90, overall: 93 },
    { week: 'Week 7', watering: 98, fertilizing: 90, repotting: 95, overall: 94 },
    { week: 'Week 8', watering: 92, fertilizing: 88, repotting: 88, overall: 89 }
  ];

  const careTypeSuccess = [
    { task: 'Watering', success: 94, attempts: 156, color: '#3b82f6' },
    { task: 'Fertilizing', success: 89, attempts: 45, color: '#10b981' },
    { task: 'Repotting', success: 91, attempts: 12, color: '#f59e0b' },
    { task: 'Pruning', success: 87, attempts: 23, color: '#8b5cf6' },
    { task: 'Humidity Control', success: 82, attempts: 89, color: '#06b6d4' }
  ];

  const skillAssessment = [
    { skill: 'Watering Technique', score: 94, maxScore: 100 },
    { skill: 'Fertilizer Application', score: 89, maxScore: 100 },
    { skill: 'Environmental Control', score: 82, maxScore: 100 },
    { skill: 'Disease Recognition', score: 76, maxScore: 100 },
    { skill: 'Repotting', score: 91, maxScore: 100 },
    { skill: 'Light Management', score: 88, maxScore: 100 }
  ];

  const improvementAreas = [
    { area: 'Disease Recognition', current: 76, target: 85, priority: 'High' },
    { area: 'Humidity Control', current: 82, target: 90, priority: 'Medium' },
    { area: 'Pruning Timing', current: 87, target: 92, priority: 'Low' }
  ];

  const chartConfig = {
    overall: { label: "Overall Success", color: "#10b981" },
    watering: { label: "Watering", color: "#3b82f6" },
    fertilizing: { label: "Fertilizing", color: "#f59e0b" },
    repotting: { label: "Repotting", color: "#8b5cf6" }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Rate Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Care Success Rate Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={successTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[70, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="overall" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="watering" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="fertilizing" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="repotting" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Care Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance by Care Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <BarChart data={careTypeSuccess}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="task" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[70, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="success" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Skill Assessment Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Skill Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <RadarChart data={skillAssessment}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Improvement Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {improvementAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{area.area}</h4>
                    <Badge className={getPriorityColor(area.priority)}>
                      {area.priority} Priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      Current: <span className="font-medium">{area.current}%</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Target: <span className="font-medium">{area.target}%</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(area.current / area.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 Focus Areas</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Study common orchid diseases and symptoms</li>
                <li>• Practice humidity measurement techniques</li>
                <li>• Review pruning timing for different species</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🏆 Achievements</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Excellent watering consistency (94% success)</li>
                <li>• Strong repotting skills (91% success)</li>
                <li>• Overall care trending upward (+5% this month)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareSuccessAnalytics;
