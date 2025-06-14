
import React, { useState } from 'react';
import { Camera, Droplets, Flower, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { offlineManager } from '@/utils/offlineManager';
import { useToast } from '@/hooks/use-toast';

interface QuickAction {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  action: () => void;
}

const QuickActionWidget: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);

  const handleQuickWater = async () => {
    if (!user) return;
    
    try {
      const plants = await offlineManager.getPlants();
      const waterReminder = {
        id: `water-${Date.now()}`,
        plantId: 'quick-action',
        type: 'watering' as const,
        dueDate: new Date().toISOString().split('T')[0],
        completed: true,
        timestamp: Date.now(),
        synced: false
      };
      
      await offlineManager.saveReminder(waterReminder);
      
      toast({
        title: "Plants watered!",
        description: `Logged watering for ${plants.length} plants`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log watering",
        variant: "destructive"
      });
    }
  };

  const handleQuickPhoto = () => {
    // This would trigger the camera
    toast({
      title: "Camera ready",
      description: "Take a photo to identify your plant",
    });
  };

  const handleQuickReminder = async () => {
    try {
      const reminder = {
        id: `reminder-${Date.now()}`,
        plantId: 'general',
        type: 'checkup' as const,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        timestamp: Date.now(),
        synced: false
      };
      
      await offlineManager.saveReminder(reminder);
      
      toast({
        title: "Reminder set",
        description: "Plant checkup scheduled for tomorrow",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder",
        variant: "destructive"
      });
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: 'water',
      icon: Droplets,
      label: 'Water Plants',
      color: 'text-blue-500',
      action: handleQuickWater
    },
    {
      id: 'photo',
      icon: Camera,
      label: 'Identify Plant',
      color: 'text-green-500',
      action: handleQuickPhoto
    },
    {
      id: 'reminder',
      icon: Bell,
      label: 'Set Reminder',
      color: 'text-purple-500',
      action: handleQuickReminder
    },
    {
      id: 'bloom',
      icon: Flower,
      label: 'Log Bloom',
      color: 'text-pink-500',
      action: () => toast({ title: "Bloom logged!", description: "Beautiful flower noted" })
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-40 md:bottom-4">
        <Button
          onClick={() => setExpanded(!expanded)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 shadow-lg"
          size="lg"
        >
          <Plus className={`w-6 h-6 transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
        </Button>
      </div>

      {/* Quick Actions Panel */}
      {expanded && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-30"
            onClick={() => setExpanded(false)}
          />
          
          {/* Actions */}
          <div className="fixed bottom-36 right-4 z-40 space-y-3 md:bottom-20">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="flex items-center space-x-3 animate-in slide-in-from-right duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card className="opacity-90 backdrop-blur-sm">
                    <CardContent className="p-2">
                      <span className="text-sm font-medium whitespace-nowrap">
                        {action.label}
                      </span>
                    </CardContent>
                  </Card>
                  
                  <Button
                    onClick={() => {
                      action.action();
                      setExpanded(false);
                    }}
                    className="w-12 h-12 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
                    variant="outline"
                  >
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default QuickActionWidget;
