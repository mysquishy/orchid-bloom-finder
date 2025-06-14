
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';

interface UserLevel {
  current_level: number;
  total_experience: number;
  experience_this_level: number;
  title: string;
}

interface LevelProgressCardProps {
  userLevel: UserLevel;
  experienceForNextLevel: number;
}

const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  userLevel,
  experienceForNextLevel
}) => {
  const progressPercentage = experienceForNextLevel > 0 
    ? (userLevel.experience_this_level / experienceForNextLevel) * 100 
    : 0;

  const remainingXP = experienceForNextLevel - userLevel.experience_this_level;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Level {userLevel.current_level}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-purple-800 mb-1">
            {userLevel.title}
          </h3>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            {userLevel.total_experience.toLocaleString()} Total XP
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Level {userLevel.current_level + 1}</span>
            <span className="font-medium">
              {userLevel.experience_this_level}/{experienceForNextLevel} XP
            </span>
          </div>
          
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {remainingXP} XP to next level
            </span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
        </div>

        <div className="bg-white/60 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-600 mb-1">Next Level Reward</p>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">
            New Title & Bonus Features
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgressCard;
