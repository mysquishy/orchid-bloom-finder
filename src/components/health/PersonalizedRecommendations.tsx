
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

const PersonalizedRecommendations: React.FC = () => {
  const aiRecommendations = [
    {
      id: 1,
      plant: 'Phalaenopsis #1',
      priority: 'high',
      category: 'Watering',
      recommendation: 'Reduce watering frequency to every 10-12 days based on current humidity levels',
      confidence: 94,
      expectedImprovement: '+8% health score',
      timeframe: '2-3 weeks',
      reasoning: 'ML analysis shows optimal moisture levels for this species in your environment'
    },
    {
      id: 2,
      plant: 'Cattleya',
      priority: 'medium',
      category: 'Fertilization',
      recommendation: 'Switch to high-phosphorus fertilizer to encourage blooming',
      confidence: 87,
      expectedImprovement: '+15% bloom probability',
      timeframe: '4-6 weeks',
      reasoning: 'Growth pattern analysis indicates plant is ready for bloom cycle'
    },
    {
      id: 3,
      plant: 'Dendrobium',
      priority: 'urgent',
      category: 'Repotting',
      recommendation: 'Immediate repotting required due to root health concerns',
      confidence: 96,
      expectedImprovement: '+25% health score',
      timeframe: '1 week',
      reasoning: 'Photo analysis and care history indicate root overcrowding and drainage issues'
    }
  ];

  const careSchedule = [
    {
      day: 'Monday',
      tasks: [
        { plant: 'Phalaenopsis #1', task: 'Check moisture levels', time: '9:00 AM' },
        { plant: 'Cattleya', task: 'Mist leaves', time: '6:00 PM' }
      ]
    },
    {
      day: 'Wednesday',
      tasks: [
        { plant: 'Dendrobium', task: 'Water (if needed)', time: '8:00 AM' },
        { plant: 'All plants', task: 'General inspection', time: '7:00 PM' }
      ]
    },
    {
      day: 'Friday',
      tasks: [
        { plant: 'Cattleya', task: 'Fertilize', time: '9:00 AM' },
        { plant: 'Phalaenopsis #2', task: 'Rotate position', time: '6:00 PM' }
      ]
    }
  ];

  const optimizationTips = [
    {
      area: 'Watering Efficiency',
      currentScore: 78,
      potentialScore: 92,
      tips: [
        'Use moisture meters for accurate readings',
        'Group plants with similar water needs',
        'Implement bottom-watering for some species'
      ]
    },
    {
      area: 'Light Management',
      currentScore: 85,
      potentialScore: 94,
      tips: [
        'Rotate plants weekly for even light exposure',
        'Consider grow lights for darker months',
        'Monitor for light burn on sensitive species'
      ]
    },
    {
      area: 'Nutrient Balance',
      currentScore: 72,
      potentialScore: 88,
      tips: [
        'Implement seasonal fertilization schedule',
        'Use specialized orchid fertilizers',
        'Monitor plant response to nutrient changes'
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI-Powered Care Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-900">{rec.plant}</h4>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                    <Badge variant="outline">{rec.category}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {rec.confidence}% confidence
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-gray-900 font-medium mb-2">{rec.recommendation}</p>
                  <p className="text-sm text-gray-600">{rec.reasoning}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{rec.expectedImprovement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{rec.timeframe}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Schedule
                    </Button>
                    <Button size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Care Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Personalized Care Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careSchedule.map((day, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">{day.day}</h4>
                <div className="space-y-2">
                  {day.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900">{task.plant}</span>
                        <span className="text-gray-600">-</span>
                        <span className="text-gray-700">{task.task}</span>
                      </div>
                      <div className="text-sm text-gray-500">{task.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Care Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Care Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {optimizationTips.map((tip, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">{tip.area}</h4>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Score</span>
                    <span>{tip.currentScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${tip.currentScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-green-600">Potential: {tip.potentialScore}%</span>
                    <span className="text-green-600">+{tip.potentialScore - tip.currentScore}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-900">Optimization Tips:</div>
                  {tip.tips.map((tipText, tipIndex) => (
                    <div key={tipIndex} className="text-sm text-gray-700">
                      • {tipText}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;
