
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, TrendingUp, Award, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CommunityComparisonProps {
  dateRange: { start: Date; end: Date };
}

const CommunityComparison: React.FC<CommunityComparisonProps> = ({ dateRange }) => {
  const communityMetrics = [
    { metric: 'Collection Size', you: 20, average: 15, percentile: 75 },
    { metric: 'Success Rate', you: 89, average: 82, percentile: 68 },
    { metric: 'Bloom Frequency', you: 2.8, average: 2.2, percentile: 71 },
    { metric: 'Care Consistency', you: 94, average: 78, percentile: 85 },
    { metric: 'Species Diversity', you: 5, average: 4, percentile: 62 },
    { metric: 'Monthly Spending', you: 83, average: 95, percentile: 35 }
  ];

  const skillComparison = [
    { skill: 'Watering', you: 94, community: 78, expert: 95 },
    { skill: 'Fertilizing', you: 89, community: 75, expert: 92 },
    { skill: 'Repotting', you: 91, community: 70, expert: 88 },
    { skill: 'Disease Prevention', you: 76, community: 65, expert: 90 },
    { skill: 'Environmental Control', you: 82, community: 72, expert: 87 },
    { skill: 'Bloom Induction', you: 85, community: 68, expert: 93 }
  ];

  const achievements = [
    { title: 'Top 25% Grower', description: 'Collection size and health', earned: true },
    { title: 'Efficiency Expert', description: 'Low cost, high success', earned: true },
    { title: 'Bloom Master', description: 'Consistent flowering', earned: false },
    { title: 'Species Specialist', description: '10+ different species', earned: false },
    { title: 'Care Streak', description: '30 days perfect care', earned: true },
    { title: 'Community Helper', description: 'Shared 5+ tips', earned: false }
  ];

  const rankings = [
    { category: 'Overall Care Score', rank: 847, total: 12500, percentage: 93 },
    { category: 'Cost Efficiency', rank: 234, total: 8900, percentage: 97 },
    { category: 'Bloom Success', rank: 1200, total: 11000, percentage: 89 },
    { category: 'Regional (West Coast)', rank: 45, total: 890, percentage: 95 }
  ];

  const chartConfig = {
    you: { label: "Your Score", color: "#10b981" },
    average: { label: "Community Average", color: "#3b82f6" },
    expert: { label: "Expert Level", color: "#f59e0b" },
    community: { label: "Community", color: "#8b5cf6" }
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return 'bg-green-100 text-green-800';
    if (percentile >= 60) return 'bg-blue-100 text-blue-800';
    if (percentile >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRankColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Community Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Community Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px]">
            <BarChart data={communityMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="you" fill="#10b981" name="Your Score" />
              <Bar dataKey="average" fill="#3b82f6" name="Community Average" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Skill Level Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <RadarChart data={skillComparison}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                <Radar name="You" dataKey="you" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Community" dataKey="community" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Expert" dataKey="expert" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Rankings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Community Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rankings.map((ranking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{ranking.category}</h4>
                    <p className="text-sm text-gray-600">
                      #{ranking.rank} of {ranking.total.toLocaleString()}
                    </p>
                  </div>
                  <div className={`text-right ${getRankColor(ranking.percentage)}`}>
                    <div className="text-lg font-bold">Top {100 - ranking.percentage}%</div>
                    <div className="text-sm">Percentile</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Community Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-medium ${
                    achievement.earned ? 'text-green-900' : 'text-gray-700'
                  }`}>
                    {achievement.title}
                  </h4>
                  {achievement.earned && (
                    <Badge className="bg-green-100 text-green-800">
                      ✓ Earned
                    </Badge>
                  )}
                </div>
                <p className={`text-sm ${
                  achievement.earned ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Community Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🏆 Your Strengths</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Excellent care consistency (94%)</li>
                <li>• Above average success rate</li>
                <li>• Cost-efficient approach</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Community Trends</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Average grower has 15 plants</li>
                <li>• 82% success rate is typical</li>
                <li>• Spring shows highest activity</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 Growth Areas</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Improve disease prevention skills</li>
                <li>• Expand species diversity</li>
                <li>• Share knowledge with community</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityComparison;
