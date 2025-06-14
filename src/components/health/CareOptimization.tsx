
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Target, Clock, TrendingUp, DollarSign, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CareOptimization: React.FC = () => {
  const efficiencyMetrics = [
    { category: 'Watering', current: 78, optimized: 92, savings: '25 min/week' },
    { category: 'Fertilizing', current: 85, optimized: 94, savings: '15 min/week' },
    { category: 'Monitoring', current: 65, optimized: 88, savings: '30 min/week' },
    { category: 'Pest Control', current: 72, optimized: 90, savings: '20 min/week' },
    { category: 'Repotting', current: 80, optimized: 95, savings: '2 hours/month' }
  ];

  const costOptimization = [
    { month: 'Jan', current: 45, optimized: 32 },
    { month: 'Feb', current: 52, optimized: 38 },
    { month: 'Mar', current: 68, optimized: 48 },
    { month: 'Apr', current: 75, optimized: 55 },
    { month: 'May', current: 82, optimized: 62 },
    { month: 'Jun', current: 88, optimized: 68 }
  ];

  const careRoutines = [
    {
      routine: 'Daily Quick Check',
      currentTime: '15 minutes',
      optimizedTime: '8 minutes',
      efficiency: 87,
      steps: [
        'Check moisture levels (use moisture meter)',
        'Inspect for pests or diseases',
        'Adjust light positioning if needed',
        'Record observations in app'
      ]
    },
    {
      routine: 'Weekly Deep Care',
      currentTime: '2 hours',
      optimizedTime: '1.5 hours',
      efficiency: 92,
      steps: [
        'Thorough watering based on individual needs',
        'Fertilize according to AI schedule',
        'Clean leaves and remove dead material',
        'Rotate plants for even light exposure',
        'Update care logs and photos'
      ]
    },
    {
      routine: 'Monthly Assessment',
      currentTime: '3 hours',
      optimizedTime: '2 hours',
      efficiency: 78,
      steps: [
        'Complete health evaluation',
        'Adjust care parameters based on performance',
        'Plan upcoming care activities',
        'Review and update care schedules'
      ]
    }
  ];

  const smartRecommendations = [
    {
      type: 'Automation',
      title: 'Smart Watering Schedule',
      impact: 'High',
      timesSaved: '45 min/week',
      costSaved: '$15/month',
      description: 'Implement moisture-based watering alerts to reduce over/under-watering'
    },
    {
      type: 'Efficiency',
      title: 'Batch Care Activities',
      impact: 'Medium',
      timesSaved: '30 min/week',
      costSaved: '$8/month',
      description: 'Group similar care tasks to reduce setup time and improve efficiency'
    },
    {
      type: 'Prevention',
      title: 'Predictive Health Monitoring',
      impact: 'High',
      timesSaved: '2 hours/month',
      costSaved: '$25/month',
      description: 'Early detection of issues to prevent costly treatments and plant loss'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Efficiency Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Care Efficiency Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <BarChart data={efficiencyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="current" fill="#94a3b8" name="Current Efficiency" />
              <Bar dataKey="optimized" fill="#10b981" name="Optimized Potential" />
            </BarChart>
          </ChartContainer>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            {efficiencyMetrics.map((metric, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{metric.category}</div>
                <div className="text-sm text-green-600 font-medium">Save {metric.savings}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Cost Optimization Potential
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px]">
            <LineChart data={costOptimization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="current" stroke="#ef4444" strokeWidth={3} name="Current Costs" />
              <Line type="monotone" dataKey="optimized" stroke="#10b981" strokeWidth={3} name="Optimized Costs" />
            </LineChart>
          </ChartContainer>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-600">$410</div>
              <div className="text-sm text-red-800">Current Annual Cost</div>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$303</div>
              <div className="text-sm text-green-800">Optimized Annual Cost</div>
            </div>
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$107</div>
              <div className="text-sm text-blue-800">Annual Savings (26%)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimized Care Routines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Optimized Care Routines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careRoutines.map((routine, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{routine.routine}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {routine.efficiency}% efficient
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {routine.currentTime} → {routine.optimizedTime}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-gray-600 mb-1">Efficiency Level</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${routine.efficiency}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Optimized Steps:</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {routine.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>• {step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Smart Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {smartRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                  <Badge className={
                    rec.impact === 'High' ? 'bg-red-100 text-red-800' :
                    rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {rec.impact} Impact
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time Saved:</span>
                    <span className="font-medium text-green-600">{rec.timesSaved}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cost Saved:</span>
                    <span className="font-medium text-blue-600">{rec.costSaved}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700">{rec.description}</p>
                
                <div className="mt-3 px-3 py-1 bg-gray-100 rounded text-xs text-gray-600 text-center">
                  {rec.type}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareOptimization;
