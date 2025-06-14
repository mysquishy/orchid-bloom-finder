
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  title: string;
  description: string;
  badge_icon: string;
  badge_color: string;
  category: string;
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  experience_reward: number;
  earned_at?: string;
  progress?: number;
  target?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  earned?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  earned = false,
  size = 'md',
  showProgress = false
}) => {
  const IconComponent = LucideIcons[achievement.badge_icon as keyof typeof LucideIcons] as React.ComponentType<any>;
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  const difficultyColors = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-purple-400 to-purple-600',
    legendary: 'from-pink-400 to-pink-600'
  };

  const progressPercentage = achievement.progress && achievement.target 
    ? Math.min((achievement.progress / achievement.target) * 100, 100)
    : 0;

  return (
    <Card className={`${earned ? 'ring-2 ring-green-400' : 'opacity-60'} hover:scale-105 transition-transform cursor-pointer`}>
      <CardContent className="p-4 text-center">
        <div className={`${sizeClasses[size]} mx-auto mb-2 rounded-full bg-gradient-to-br ${difficultyColors[achievement.difficulty]} flex items-center justify-center`}>
          {IconComponent && (
            <IconComponent 
              className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'} text-white`}
            />
          )}
        </div>
        
        <h4 className={`font-semibold ${size === 'sm' ? 'text-sm' : 'text-base'} mb-1`}>
          {achievement.title}
        </h4>
        
        <p className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'} mb-2`}>
          {achievement.description}
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {achievement.category}
          </Badge>
          <Badge 
            variant="outline" 
            className={`text-xs capitalize ${earned ? 'bg-green-100 text-green-800' : ''}`}
          >
            {achievement.difficulty}
          </Badge>
        </div>

        {showProgress && !earned && achievement.progress !== undefined && achievement.target && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {achievement.progress}/{achievement.target}
            </p>
          </div>
        )}

        {earned && achievement.earned_at && (
          <p className="text-xs text-green-600 mt-1">
            Earned {new Date(achievement.earned_at).toLocaleDateString()}
          </p>
        )}

        <p className="text-xs text-purple-600 font-medium mt-1">
          +{achievement.experience_reward} XP
        </p>
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;
