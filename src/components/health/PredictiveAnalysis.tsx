
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { Brain, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PredictiveAnalysis: React.FC = () => {
  const healthPredictions = [
    { date: 'Week 1', predicted: 88, confidence: 95 },
    { date: 'Week 2', predicted: 90, confidence: 92 },
    { date: 'Week 3', predicted: 87, confidence: 88 },
    { date: 'Week 4', predicted: 92, confidence: 85 },
    { date: 'Week 5', predicted: 89, confidence: 82 },
    { date: 'Week 6', predicted: 94, confidence: 78 }
  ];

  const riskAssessment = [
    { 
      plant: 'Phalaenopsis #1', 
      riskLevel: 'low', 
      riskScore: 15, 
      prediction: 'Stable health expected',
      factors: ['Optimal watering', 'Good light exposure']
    },
    { 
      plant: 'Cattleya', 
      riskLevel: 'medium', 
      riskScore: 45, 
      prediction: 'Monitor humidity levels',
      factors: ['Low humidity detected', 'Growth slowdown']
    },
    { 
      plant: 'Dendrobium', 
      riskLevel: 'high', 
      riskScore: 75, 
      prediction: 'Immediate attention needed',
      factors: ['Overwatering signs', 'Root health concerns']
    }
  ];

  const aiInsights = [
    {
      type: 'Disease Risk',
      probability: 12,
      timeframe: '2-3 weeks',
      recommendation: 'Improve air circulation and reduce watering frequency'
    },
    {
      type: 'Growth Acceleration',
      probability: 85,
      timeframe: '1-2 months',
      recommendation: 'Current care routine is optimal for growth'
    },
    {
      type: 'Bloom Cycle',
      probability: 68,
      timeframe: '4-6 weeks',
      recommendation: 'Increase phosphorus in fertilizer for better blooming'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Predictions Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Health Predictions (Next 6 Weeks)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <AreaChart data={healthPredictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[80, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              <Line type="monotone" dataKey="confidence" stroke="#10b981" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
          <div className="mt-4 text-sm text-gray-600">
            Purple area shows predicted health scores, green line shows AI confidence level
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Plant Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAssessment.map((plant, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{plant.plant}</h4>
                  <Badge className={getRiskColor(plant.riskLevel)}>
                    {plant.riskLevel} risk
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Risk Score</div>
                    <div className="text-2xl font-bold text-gray-900">{plant.riskScore}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">AI Prediction</div>
                    <div className="text-sm font-medium text-gray-900">{plant.prediction}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Key Factors</div>
                    <ul className="text-sm text-gray-700">
                      {plant.factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">{insight.type}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Probability:</span>
                    <span className="text-sm font-medium">{insight.probability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Timeframe:</span>
                    <span className="text-sm font-medium">{insight.timeframe}</span>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-900 font-medium mb-1">Recommendation:</div>
                    <div className="text-sm text-blue-800">{insight.recommendation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalysis;
