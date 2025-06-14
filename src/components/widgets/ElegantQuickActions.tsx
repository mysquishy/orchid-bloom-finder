
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Droplets, Zap, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { offlineManager } from '@/utils/offlineManager';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  gradient: string;
}

const ElegantQuickActions: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        title: "💧 Watering logged!",
        description: "Your plant care has been recorded.",
      });
      setIsExpanded(false);
    } catch (error) {
      toast({
        title: "Failed to log watering",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuickPhoto = () => {
    const identifySection = document.getElementById('identify');
    if (identifySection) {
      identifySection.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: "📸 Camera ready",
      description: "Scroll down to start identifying your orchid!",
    });
    setIsExpanded(false);
  };

  const handleQuickIdentify = () => {
    const identifySection = document.getElementById('identify');
    if (identifySection) {
      identifySection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'photo',
      label: 'Take Photo',
      icon: <Camera className="w-5 h-5" />,
      action: handleQuickPhoto,
      gradient: 'from-green-400 to-green-600'
    },
    {
      id: 'water',
      label: 'Log Watering',
      icon: <Droplets className="w-5 h-5" />,
      action: handleQuickWater,
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 'identify',
      label: 'Identify Plant',
      icon: <Zap className="w-5 h-5" />,
      action: handleQuickIdentify,
      gradient: 'from-purple-400 to-purple-600'
    }
  ];

  const fabVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    expanded: { rotate: 45 }
  };

  const actionVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0, 
      y: 20,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Quick Actions Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <div className="absolute bottom-20 right-0 space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  variants={actionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  onClick={action.action}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-full
                    bg-gradient-to-r ${action.gradient}
                    text-white font-medium shadow-lg
                    hover:shadow-xl transition-all duration-200
                    backdrop-blur-sm border border-white/20
                    min-w-[140px] justify-start
                  `}
                  whileHover={{ scale: 1.02, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {action.icon}
                  <span className="text-sm">{action.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          variants={fabVariants}
          initial="initial"
          animate={isExpanded ? "expanded" : "initial"}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            w-14 h-14 rounded-full
            bg-gradient-to-r from-green-500 to-purple-600
            text-white shadow-2xl
            flex items-center justify-center
            hover:shadow-green-500/25 hover:shadow-2xl
            transition-all duration-300
            border-2 border-white/20 backdrop-blur-sm
            relative overflow-hidden
          "
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-green-600 opacity-0"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </motion.div>

          {/* Plant count badge */}
          {plantCount > 0 && !isExpanded && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="
                absolute -top-1 -right-1
                w-6 h-6 rounded-full
                bg-white text-green-600
                text-xs font-bold
                flex items-center justify-center
                shadow-lg border-2 border-green-500
              "
            >
              {plantCount}
            </motion.div>
          )}
        </motion.button>

        {/* Elegant helper text */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 2 }}
              className="
                absolute bottom-4 right-16
                bg-white/90 backdrop-blur-sm
                text-gray-700 text-xs
                px-3 py-1 rounded-full
                shadow-lg border border-gray-200
                pointer-events-none
              "
            >
              Quick actions
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ElegantQuickActions;
