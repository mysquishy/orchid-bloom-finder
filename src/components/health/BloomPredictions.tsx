
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { Flower, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BloomPredictions: React.FC = () => {
  const bloomPredictions = [
    { plant: 'Phalaenopsis #1', nextBloom: '3-4 weeks', probability: 85, lastBloom: 'March 2024' },
    { plant: 'Phalaenopsis #2', nextBloom: '6-8 weeks', probability: 72, lastBloom: 'January 2024' },
    { plant: 'Cattleya', nextBloom: '8-10 weeks', probability: 90, lastBloom: 'December 2023' },
    { plant: 'Dendrobium', nextBloom: '12-16 weeks', probability: 45, lastBloom: 'October 2023' },
    { plant: 'Oncidium', nextBloom: '4-6 weeks', probability: 78, lastBloom: 'February 2024' }
  ];

  const historicalBloomData = [
    { month: 'Jan', blooms: 2, predicted: 1.8 },
    { month: 'Feb', blooms: 1, predicted: 1.2 },
    { month: 'Mar', blooms: 3, predicted: 2.8 },
    { month: 'Apr', blooms: 2, predicted: 2.1 },
    { month: 'May', blooms: 1, predicted: 1.5 },
    { month: 'Jun', blooms: 0, predicted: 0.3 },
    { month: 'Jul', blooms: 1, predicted: 0.8 },
    { month: 'Aug', blooms: 2, predicted: 1.9 },
    { month: 'Sep', blooms: 1, predicted: 1.1 },
    { month: 'Oct', blooms: 2, predicted: 2.2 },
    { month: 'Nov', blooms: 3, predicted: 2.7 },
    { month: 'Dec', blooms: 2, predicted: 2.0 }
  ];

  const bloomOptimization = [
    {
      factor: 'Light Exposure',
      impact: 'High',
      currentLevel: 85,
      recommendation: 'Increase winter light by 15% for better spring blooms'
    },
    {
      factor: 'Temperature Differential',
      impact: 'High',
      currentLevel: 72,
      recommendation: 'Maintain 10°F night/day difference during bloom initiation'
    },
    {
      factor: 'Fertilization Schedule',
      impact: 'Medium',
      currentLevel: 78,
      recommendation: 'Switch to high-phosphorus fertilizer 6 weeks before expected bloom'
    },
    {
      factor: 'Humidity Control',
      impact: 'Medium',
      currentLevel: 82,
      recommendation: 'Maintain 60-70% humidity during bloom development'
    }
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'bg-green-100 text-green-800';
    if (probability >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Bloom Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flower className="w-5 h-5" />
            Bloom Cycle Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bloomPredictions.map((prediction, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{prediction.plant}</h4>
                  <Badge className={getProbabilityColor(prediction.probability)}>
                    {prediction.probability}% likely
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Next Bloom</div>
                      <div className="font-medium">{prediction.nextBloom}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Last Bloom</div>
                      <div className="font-medium">{prediction.lastBloom}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600">Probability</div>
                      <div className="font-medium">{prediction.probability}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical vs Predicted Blooms */}
      <Card>
        <CardHeader>
          <CardTitle>Historical vs Predicted Bloom Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <BarChart data={historicalBloomData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="blooms" fill="#10b981" name="Actual Blooms" />
              <Bar dataKey="predicted" fill="#3b82f6" name="AI Predictions" />
            </BarChart>
          </ChartContainer>
          <div className="mt-4 text-sm text-gray-600">
            Green bars show actual blooms, blue bars show AI predictions for comparison
          </div>
        </CardContent>
      </Card>

      {/* Bloom Optimization Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Bloom Optimization Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bloomOptimization.map((factor, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{factor.factor}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{factor.impact} Impact</Badge>
                    <span className="text-sm font-medium">{factor.currentLevel}%</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${factor.currentLevel}%` }}
                    />
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-900 font-medium mb-1">AI Recommendation:</div>
                  <div className="text-sm text-blue-800">{factor.recommendation}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bloom Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Expected Bloom Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌸 Next 4 Weeks</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Phalaenopsis #1 (85% probability)</li>
                <li>• Monitor for spike development</li>
                <li>• Increase phosphorus fertilizer</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🌺 5-8 Weeks</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Phalaenopsis #2 (72% probability)</li>
                <li>• Oncidium (78% probability)</li>
                <li>• Prepare bloom support stakes</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🌼 9+ Weeks</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Cattleya (90% probability)</li>
                <li>• Dendrobium (45% probability)</li>
                <li>• Plan bloom season care routine</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloomPredictions;
