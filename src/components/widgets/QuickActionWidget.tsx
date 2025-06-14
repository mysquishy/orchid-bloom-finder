
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Camera, Calendar, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { offlineManager } from '@/utils/offlineManager';

const QuickActionWidget: React.FC = () => {
  const [plantCount, setPlantCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadPlantCount();
  }, []);

  const loadPlantCount = async () => {
    try {
      const plants = await offlineManager.getStoredPlants();
      setPlantCount(plants.length);
    } catch (error) {
      console.error('Failed to load plant count:', error);
    }
  };

  const handleQuickWater = async () => {
    try {
      const reminder = {
        id: `reminder_${Date.now()}`,
        plantId: 'quick-water',
        type: 'watering' as const,
        dueDate: new Date().toISOString(),
        completed: true
      };
      
      await offlineManager.storeCareReminder(reminder);
      
      toast({
        title: "Watering logged!",
        description: "Your plant care has been recorded.",
      });
    } catch (error) {
      toast({
        title: "Failed to log watering",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuickPhoto = () => {
    // Simulate opening camera
    toast({
      title: "Camera activated",
      description: "Ready to take a photo of your orchid!",
    });
  };

  const handleScheduleReminder = async () => {
    try {
      const reminder = {
        id: `reminder_${Date.now()}`,
        plantId: 'scheduled',
        type: 'watering' as const,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        completed: false
      };
      
      await offlineManager.storeCareReminder(reminder);
      
      toast({
        title: "Reminder set!",
        description: "You'll be reminded to water tomorrow.",
      });
    } catch (error) {
      toast({
        title: "Failed to set reminder",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-50">
      <Card className="w-64 shadow-lg">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">
              Quick Actions ({plantCount} plants)
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuickWater}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Droplets className="w-4 h-4" />
                <span className="text-xs">Water</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuickPhoto}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Camera className="w-4 h-4" />
                <span className="text-xs">Photo</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleScheduleReminder}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Remind</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Zap className="w-4 h-4" />
                <span className="text-xs">Identify</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionWidget;
