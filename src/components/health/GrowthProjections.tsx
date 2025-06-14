
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { TrendingUp, Ruler, BarChart3, Target } from 'lucide-react';

const GrowthProjections: React.FC = () => {
  const growthProjections = [
    { month: 'Current', height: 18.5, projected: 18.5, leaves: 14, projectedLeaves: 14 },
    { month: 'Month 1', height: 18.5, projected: 19.2, leaves: 14, projectedLeaves: 15 },
    { month: 'Month 2', height: 18.5, projected: 20.1, leaves: 14, projectedLeaves: 16 },
    { month: 'Month 3', height: 18.5, projected: 21.3, leaves: 14, projectedLeaves: 17 },
    { month: 'Month 4', height: 18.5, projected: 22.8, leaves: 14, projectedLeaves: 18 },
    { month: 'Month 5', height: 18.5, projected: 24.1, leaves: 14, projectedLeaves: 19 },
    { month: 'Month 6', height: 18.5, projected: 25.2, leaves: 14, projectedLeaves: 20 }
  ];

  const plantGrowthComparison = [
    { 
      plant: 'Phalaenopsis #1', 
      currentHeight: 18.5, 
      projectedGrowth: 6.7, 
      growthRate: 'Normal',
      maturityLevel: 78,
      expectedSize: 'Medium-Large'
    },
    { 
      plant: 'Cattleya', 
      currentHeight: 22.3, 
      projectedGrowth: 8.2, 
      growthRate: 'Fast',
      maturityLevel: 65,
      expectedSize: 'Large'
    },
    { 
      plant: 'Dendrobium', 
      currentHeight: 28.1, 
      projectedGrowth: 4.3, 
      growthRate: 'Slow',
      maturityLevel: 85,
      expectedSize: 'Very Large'
    },
    { 
      plant: 'Oncidium', 
      currentHeight: 16.8, 
      projectedGrowth: 5.9, 
      growthRate: 'Normal',
      maturityLevel: 72,
      expectedSize: 'Medium'
    }
  ];

  const longevityPredictions = [
    {
      plant: 'Phalaenopsis #1',
      currentAge: '2.5 years',
      expectedLifespan: '15-25 years',
      healthTrend: 'Improving',
      lifeStage: 'Young Adult',
      resilienceScore: 87
    },
    {
      plant: 'Cattleya',
      currentAge: '3 years',
      expectedLifespan: '20-30 years',
      healthTrend: 'Stable',
      lifeStage: 'Mature',
      resilienceScore: 92
    },
    {
      plant: 'Dendrobium',
      currentAge: '4 years',
      expectedLifespan: '25-35 years',
      healthTrend: 'Declining',
      lifeStage: 'Mature',
      resilienceScore: 74
    }
  ];

  const getRateColor = (rate: string) => {
    switch (rate) {
      case 'Fast': return 'bg-green-100 text-green-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Slow': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Improving': return 'text-green-600';
      case 'Stable': return 'text-blue-600';
      case 'Declining': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Growth Projections Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            6-Month Growth Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <AreaChart data={growthProjections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="projected" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Line type="monotone" dataKey="projectedLeaves" stroke="#3b82f6" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
          <div className="mt-4 text-sm text-gray-600">
            Green area shows projected height growth (cm), blue line shows projected leaf count
          </div>
        </CardContent>
      </Card>

      {/* Individual Plant Growth Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            Individual Growth Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plantGrowthComparison.map((plant, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{plant.plant}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRateColor(plant.growthRate)}`}>
                      {plant.growthRate} Growth
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Current Height</div>
                    <div className="text-lg font-bold text-gray-900">{plant.currentHeight} cm</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">6-Month Projection</div>
                    <div className="text-lg font-bold text-green-600">+{plant.projectedGrowth} cm</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Maturity Level</div>
                    <div className="text-lg font-bold text-blue-600">{plant.maturityLevel}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Expected Size</div>
                    <div className="text-lg font-bold text-purple-600">{plant.expectedSize}</div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm text-gray-600 mb-1">Maturity Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${plant.maturityLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plant Longevity Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Longevity & Resilience Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {longevityPredictions.map((prediction, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{prediction.plant}</h4>
                  <div className="text-sm text-gray-500">{prediction.currentAge} old</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Expected Lifespan</div>
                    <div className="font-medium text-gray-900">{prediction.expectedLifespan}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Health Trend</div>
                    <div className={`font-medium ${getTrendColor(prediction.healthTrend)}`}>
                      {prediction.healthTrend}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Life Stage</div>
                    <div className="font-medium text-gray-900">{prediction.lifeStage}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Resilience Score</div>
                    <div className="font-medium text-green-600">{prediction.resilienceScore}/100</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Resilience Level</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${prediction.resilienceScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Growth Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌱 Accelerate Growth</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Increase light exposure by 10-15%</li>
                <li>• Optimize fertilization schedule</li>
                <li>• Maintain consistent temperatures</li>
                <li>• Ensure proper humidity levels</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">⚖️ Balanced Development</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Monitor leaf-to-root ratio</li>
                <li>• Rotate plants for even growth</li>
                <li>• Adjust watering based on growth rate</li>
                <li>• Prune dead or damaged parts</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🛡️ Long-term Health</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Build disease resistance</li>
                <li>• Strengthen root systems</li>
                <li>• Plan for seasonal changes</li>
                <li>• Monitor aging indicators</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthProjections;
