
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Flower, Calendar, Clock, Award } from 'lucide-react';

interface BloomAnalyticsProps {
  dateRange: { start: Date; end: Date };
}

const BloomAnalytics: React.FC<BloomAnalyticsProps> = ({ dateRange }) => {
  const bloomHistory = [
    { month: 'Jan', blooms: 2, duration: 45, quality: 85 },
    { month: 'Feb', blooms: 1, duration: 52, quality: 90 },
    { month: 'Mar', blooms: 4, duration: 38, quality: 88 },
    { month: 'Apr', blooms: 3, duration: 41, quality: 92 },
    { month: 'May', blooms: 5, duration: 47, quality: 89 },
    { month: 'Jun', blooms: 2, duration: 55, quality: 94 }
  ];

  const bloomPredictions = [
    { plant: 'Phalaenopsis #1', nextBloom: '2 weeks', probability: 85, lastBloom: '3 months ago' },
    { plant: 'Cattleya', nextBloom: '1 month', probability: 92, lastBloom: '6 months ago' },
    { plant: 'Dendrobium', nextBloom: '3 weeks', probability: 78, lastBloom: '2 months ago' },
    { plant: 'Oncidium', nextBloom: '6 weeks', probability: 65, lastBloom: '8 months ago' },
    { plant: 'Vanda', nextBloom: '4 weeks', probability: 70, lastBloom: '4 months ago' }
  ];

  const bloomQuality = [
    { aspect: 'Color Intensity', score: 92 },
    { aspect: 'Flower Size', score: 88 },
    { aspect: 'Petal Count', score: 85 },
    { aspect: 'Duration', score: 89 },
    { aspect: 'Fragrance', score: 82 },
    { aspect: 'Overall Appeal', score: 90 }
  ];

  const chartConfig = {
    blooms: { label: "Bloom Count", color: "#f59e0b" },
    duration: { label: "Duration (days)", color: "#3b82f6" },
    quality: { label: "Quality Score", color: "#10b981" },
    score: { label: "Score", color: "#8b5cf6" }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-100';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Bloom Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flower className="w-5 h-5" />
            Bloom Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px]">
            <LineChart data={bloomHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line yAxisId="left" type="monotone" dataKey="blooms" stroke="#f59e0b" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#3b82f6" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloom Quality Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Bloom Quality Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <RadarChart data={bloomQuality}>
                <PolarGrid />
                <PolarAngleAxis dataKey="aspect" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                <Radar
                  name="Quality"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bloom Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Bloom Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">17</div>
                  <div className="text-sm text-pink-800">Total Blooms</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">47</div>
                  <div className="text-sm text-purple-800">Avg Duration</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Longest Bloom</span>
                  <span className="font-medium">55 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Best Month</span>
                  <span className="font-medium">May (5 blooms)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quality Trend</span>
                  <span className="font-medium text-green-600">+6% improving</span>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Peak Season:</strong> Spring blooms show highest quality scores
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bloom Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Bloom Predictions & Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bloomPredictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{prediction.plant}</h4>
                  <p className="text-sm text-gray-600">Last bloomed: {prediction.lastBloom}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{prediction.nextBloom}</div>
                    <div className="text-xs text-gray-500">Expected</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getProbabilityColor(prediction.probability)}`}>
                    {prediction.probability}% likely
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bloom Care Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Bloom Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <h4 className="font-semibold text-pink-900 mb-2">🌸 Enhance Blooming</h4>
              <ul className="text-sm text-pink-800 space-y-1">
                <li>• Temperature differential of 10°F at night</li>
                <li>• Reduce watering slightly before bloom spike</li>
                <li>• Increase phosphorus in fertilizer</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">⏰ Timing Tips</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Cattleya ready for bloom spike soon</li>
                <li>• Oncidium needs more time to mature</li>
                <li>• Consider staking tall bloom spikes early</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloomAnalytics;
