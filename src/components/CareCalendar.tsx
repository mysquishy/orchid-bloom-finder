
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Droplets, Flower, Scissors, AlertCircle } from 'lucide-react';

interface CareTask {
  id: string;
  type: 'watering' | 'fertilizing' | 'repotting' | 'inspection';
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  orchidId: string;
  orchidName: string;
  completed: boolean;
}

interface CareCalendarProps {
  orchids: Array<{
    id: string;
    orchid_species: {
      common_name: string;
      water_frequency: string;
      fertilizer_schedule: string;
      repotting_frequency: string;
    };
    last_watered?: string;
    last_fertilized?: string;
    last_repotted?: string;
  }>;
  onTaskComplete: (taskId: string) => void;
}

const CareCalendar: React.FC<CareCalendarProps> = ({ orchids, onTaskComplete }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('week');

  const generateCareTasks = useMemo(() => {
    const tasks: CareTask[] = [];
    const now = new Date();

    orchids.forEach((orchid) => {
      const species = orchid.orchid_species;
      
      // Generate watering tasks
      const lastWatered = orchid.last_watered ? new Date(orchid.last_watered) : null;
      const wateringInterval = getIntervalDays(species.water_frequency);
      if (lastWatered) {
        const nextWatering = new Date(lastWatered);
        nextWatering.setDate(nextWatering.getDate() + wateringInterval);
        
        if (nextWatering <= getEndDate(selectedTimeframe)) {
          tasks.push({
            id: `water-${orchid.id}`,
            type: 'watering',
            title: `Water ${species.common_name}`,
            description: `Time for regular watering (${species.water_frequency})`,
            dueDate: nextWatering,
            priority: nextWatering < now ? 'high' : 'medium',
            orchidId: orchid.id,
            orchidName: species.common_name,
            completed: false
          });
        }
      }

      // Generate fertilizing tasks
      const lastFertilized = orchid.last_fertilized ? new Date(orchid.last_fertilized) : null;
      const fertilizingInterval = getIntervalDays(species.fertilizer_schedule);
      if (lastFertilized) {
        const nextFertilizing = new Date(lastFertilized);
        nextFertilizing.setDate(nextFertilizing.getDate() + fertilizingInterval);
        
        if (nextFertilizing <= getEndDate(selectedTimeframe)) {
          tasks.push({
            id: `fertilize-${orchid.id}`,
            type: 'fertilizing',
            title: `Fertilize ${species.common_name}`,
            description: `Follow ${species.fertilizer_schedule} schedule`,
            dueDate: nextFertilizing,
            priority: 'medium',
            orchidId: orchid.id,
            orchidName: species.common_name,
            completed: false
          });
        }
      }

      // Generate repotting reminders
      const lastRepotted = orchid.last_repotted ? new Date(orchid.last_repotted) : null;
      if (lastRepotted) {
        const repottingInterval = getIntervalDays(species.repotting_frequency);
        const nextRepotting = new Date(lastRepotted);
        nextRepotting.setDate(nextRepotting.getDate() + repottingInterval);
        
        if (nextRepotting <= getEndDate(selectedTimeframe)) {
          tasks.push({
            id: `repot-${orchid.id}`,
            type: 'repotting',
            title: `Consider repotting ${species.common_name}`,
            description: `Due for repotting (${species.repotting_frequency})`,
            dueDate: nextRepotting,
            priority: 'low',
            orchidId: orchid.id,
            orchidName: species.common_name,
            completed: false
          });
        }
      }
    });

    return tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [orchids, selectedTimeframe]);

  const getIntervalDays = (frequency: string): number => {
    if (frequency.includes('daily') || frequency.includes('every day')) return 1;
    if (frequency.includes('weekly') || frequency.includes('week')) return 7;
    if (frequency.includes('bi-weekly') || frequency.includes('every 2 weeks')) return 14;
    if (frequency.includes('monthly') || frequency.includes('month')) return 30;
    if (frequency.includes('quarterly') || frequency.includes('3 months')) return 90;
    if (frequency.includes('yearly') || frequency.includes('year')) return 365;
    if (frequency.includes('2 years')) return 730;
    if (frequency.includes('3 years')) return 1095;
    return 7; // default to weekly
  };

  const getEndDate = (timeframe: string): Date => {
    const now = new Date();
    switch (timeframe) {
      case 'today':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      case 'week':
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + 7);
        return endOfWeek;
      case 'month':
        const endOfMonth = new Date(now);
        endOfMonth.setMonth(now.getMonth() + 1);
        return endOfMonth;
      default:
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'watering': return <Droplets className="w-4 h-4" />;
      case 'fertilizing': return <Flower className="w-4 h-4" />;
      case 'repotting': return <Scissors className="w-4 h-4" />;
      case 'inspection': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string, overdue: boolean) => {
    if (overdue) return 'bg-red-100 text-red-800 border-red-200';
    switch (priority) {
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const now = new Date();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Care Calendar
        </CardTitle>
        
        {/* Timeframe Selector */}
        <div className="flex gap-2">
          {(['today', 'week', 'month'] as const).map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
              className="capitalize"
            >
              {timeframe === 'today' ? 'Today' : `This ${timeframe}`}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {generateCareTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No care tasks scheduled for this period.</p>
            <p className="text-sm">Your orchids are well cared for!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {generateCareTasks.map((task) => {
              const isOverdue = task.dueDate < now;
              const isToday = task.dueDate.toDateString() === now.toDateString();
              
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    isOverdue ? 'border-red-200 bg-red-50' : 
                    isToday ? 'border-orange-200 bg-orange-50' : 
                    'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded ${
                        isOverdue ? 'bg-red-100' : 
                        isToday ? 'bg-orange-100' : 
                        'bg-blue-100'
                      }`}>
                        {getTaskIcon(task.type)}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {task.dueDate.toLocaleDateString()}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(task.priority, isOverdue)}`}
                          >
                            {isOverdue ? 'Overdue' : isToday ? 'Due Today' : task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onTaskComplete(task.id)}
                      className="ml-4"
                    >
                      Complete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CareCalendar;
