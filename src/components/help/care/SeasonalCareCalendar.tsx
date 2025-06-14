
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Droplets, Scissors, Thermometer, Sun, Flower } from 'lucide-react';

interface MonthlyTask {
  id: string;
  title: string;
  description: string;
  type: 'watering' | 'fertilizing' | 'repotting' | 'pruning' | 'temperature' | 'light' | 'blooming';
  priority: 'high' | 'medium' | 'low';
}

interface MonthData {
  month: string;
  season: string;
  temperature: string;
  humidity: string;
  lightHours: string;
  tasks: MonthlyTask[];
}

const SeasonalCareCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const getTaskIcon = (type: MonthlyTask['type']) => {
    switch (type) {
      case 'watering':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'fertilizing':
        return <Flower className="w-4 h-4 text-green-500" />;
      case 'repotting':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'pruning':
        return <Scissors className="w-4 h-4 text-orange-500" />;
      case 'temperature':
        return <Thermometer className="w-4 h-4 text-red-500" />;
      case 'light':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'blooming':
        return <Flower className="w-4 h-4 text-pink-500" />;
    }
  };

  const getPriorityColor = (priority: MonthlyTask['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const monthlyData: MonthData[] = [
    {
      month: 'January',
      season: 'Winter',
      temperature: '65-75°F',
      humidity: '40-60%',
      lightHours: '10-12 hours',
      tasks: [
        {
          id: 'jan-1',
          title: 'Reduce Watering',
          description: 'Water less frequently as growth slows in winter',
          type: 'watering',
          priority: 'high'
        },
        {
          id: 'jan-2',
          title: 'Monitor for Pests',
          description: 'Check for scale and mealybugs in dry indoor air',
          type: 'pruning',
          priority: 'medium'
        },
        {
          id: 'jan-3',
          title: 'Maintain Humidity',
          description: 'Use humidity trays to combat dry indoor air',
          type: 'temperature',
          priority: 'high'
        }
      ]
    },
    {
      month: 'February',
      season: 'Winter',
      temperature: '65-75°F',
      humidity: '40-60%',
      lightHours: '11-13 hours',
      tasks: [
        {
          id: 'feb-1',
          title: 'Check Root Health',
          description: 'Inspect roots through clear pots for early spring prep',
          type: 'repotting',
          priority: 'medium'
        },
        {
          id: 'feb-2',
          title: 'Prepare for Spring',
          description: 'Begin planning repotting schedule for spring',
          type: 'repotting',
          priority: 'low'
        }
      ]
    },
    {
      month: 'March',
      season: 'Spring',
      temperature: '68-78°F',
      humidity: '50-70%',
      lightHours: '12-14 hours',
      tasks: [
        {
          id: 'mar-1',
          title: 'Resume Regular Fertilizing',
          description: 'Begin weekly diluted fertilizer as growth resumes',
          type: 'fertilizing',
          priority: 'high'
        },
        {
          id: 'mar-2',
          title: 'Increase Watering',
          description: 'Water more frequently as temperatures rise',
          type: 'watering',
          priority: 'high'
        },
        {
          id: 'mar-3',
          title: 'Repotting Season',
          description: 'Best time to repot most orchids before active growth',
          type: 'repotting',
          priority: 'high'
        }
      ]
    },
    {
      month: 'April',
      season: 'Spring',
      temperature: '70-80°F',
      humidity: '50-70%',
      lightHours: '13-15 hours',
      tasks: [
        {
          id: 'apr-1',
          title: 'Monitor New Growth',
          description: 'Watch for new roots, leaves, and flower spikes',
          type: 'blooming',
          priority: 'medium'
        },
        {
          id: 'apr-2',
          title: 'Adjust Light Exposure',
          description: 'Provide more light as days get longer',
          type: 'light',
          priority: 'medium'
        }
      ]
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthData = monthlyData[selectedMonth] || monthlyData[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Seasonal Care Calendar</h1>
        <p className="text-xl text-gray-600">
          Month-by-month orchid care adjustments for optimal growth
        </p>
      </div>

      {/* Month Selection */}
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(index)}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              selectedMonth === index
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {month.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Current Month Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Calendar className="w-6 h-6 text-green-600" />
            {currentMonthData.month} - {currentMonthData.season}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Temperature</h3>
              <p className="text-gray-600">{currentMonthData.temperature}</p>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Humidity</h3>
              <p className="text-gray-600">{currentMonthData.humidity}</p>
            </div>
            <div className="text-center">
              <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Light Hours</h3>
              <p className="text-gray-600">{currentMonthData.lightHours}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Tasks */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {currentMonthData.month} Care Tasks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentMonthData.tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getTaskIcon(task.type)}
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-gray-600">{task.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">
            {currentMonthData.season} Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-purple-900 mb-2">General Care</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Monitor temperature fluctuations</li>
                <li>• Adjust watering based on humidity</li>
                <li>• Watch for seasonal pests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-900 mb-2">What to Expect</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Natural growth patterns</li>
                <li>• Seasonal dormancy periods</li>
                <li>• Blooming cycles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonalCareCalendar;
