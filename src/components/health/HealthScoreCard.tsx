
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Heart, TrendingUp, Award } from 'lucide-react';

const HealthScoreCard: React.FC = () => {
  const healthScoreData = [
    { name: 'Excellent', value: 5, color: '#10b981' },
    { name: 'Good', value: 4, color: '#3b82f6' },
    { name: 'Fair', value: 2, color: '#f59e0b' },
    { name: 'Poor', value: 1, color: '#ef4444' }
  ];

  const healthTrendData = [
    { date: '2024-01', score: 82 },
    { date: '2024-02', score: 85 },
    { date: '2024-03', score: 88 },
    { date: '2024-04', score: 87 },
    { date: '2024-05', score: 90 },
    { date: '2024-06', score: 87.5 }
  ];

  const healthFactors = [
    { factor: 'Leaf Health', score: 92, impact: 'high' },
    { factor: 'Root System', score: 85, impact: 'high' },
    { factor: 'Growth Rate', score: 88, impact: 'medium' },
    { factor: 'Flowering', score: 83, impact: 'medium' },
    { factor: 'Pest Resistance', score: 95, impact: 'high' },
    { factor: 'Environmental Adaptation', score: 80, impact: 'low' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Main Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Overall Health Score Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-600 mb-2">87.5</div>
                <div className="text-lg text-gray-600">Overall Health Score</div>
                <div className="text-sm text-green-600 font-medium">↑ +2.5 from last month</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-green-900">Health Rank</div>
                  <div className="text-lg font-bold text-green-600">Top 15%</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-blue-900">Improvement</div>
                  <div className="text-lg font-bold text-blue-600">+5.2%</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Health Distribution</h4>
              <ChartContainer config={{}} className="h-[200px]">
                <PieChart>
                  <Pie
                    data={healthScoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {healthScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Health Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px]">
            <LineChart data={healthTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[75, 95]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Health Factors Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Health Factors Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    factor.impact === 'high' ? 'bg-red-500' : 
                    factor.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="font-medium text-gray-900">{factor.factor}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full ${getScoreBg(factor.score)}`}>
                    <span className={`font-bold ${getScoreColor(factor.score)}`}>
                      {factor.score}%
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 capitalize">{factor.impact} impact</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthScoreCard;
