
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Flame, Trophy, Target } from 'lucide-react';

interface CareStreak {
  current_streak: number;
  longest_streak: number;
  last_care_date: string;
  streak_start_date: string;
  bonus_multiplier: number;
}

interface CareStreakCardProps {
  careStreak: CareStreak;
}

const CareStreakCard: React.FC<CareStreakCardProps> = ({ careStreak }) => {
  const streakColor = careStreak.current_streak >= 30 ? 'text-purple-600' :
                     careStreak.current_streak >= 7 ? 'text-orange-600' :
                     'text-blue-600';

  const streakLevel = careStreak.current_streak >= 100 ? 'Legendary' :
                     careStreak.current_streak >= 30 ? 'Expert' :
                     careStreak.current_streak >= 7 ? 'Dedicated' :
                     'Building';

  const nextMilestone = careStreak.current_streak < 7 ? 7 :
                       careStreak.current_streak < 30 ? 30 :
                       careStreak.current_streak < 100 ? 100 :
                       careStreak.current_streak + 50;

  const daysToMilestone = nextMilestone - careStreak.current_streak;

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Flame className={`w-5 h-5 ${streakColor}`} />
          Care Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${streakColor} mb-1`}>
            {careStreak.current_streak}
          </div>
          <p className="text-gray-600 text-sm mb-2">
            {careStreak.current_streak === 1 ? 'Day' : 'Days'} in a row
          </p>
          <Badge variant="secondary" className={`${streakLevel === 'Legendary' ? 'bg-purple-100 text-purple-800' : 
                                                    streakLevel === 'Expert' ? 'bg-orange-100 text-orange-800' :
                                                    streakLevel === 'Dedicated' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
            {streakLevel} Gardener
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Best Streak</span>
            </div>
            <div className="text-lg font-bold text-yellow-600">
              {careStreak.longest_streak}
            </div>
          </div>

          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Next Goal</span>
            </div>
            <div className="text-lg font-bold text-green-600">
              {nextMilestone}
            </div>
          </div>
        </div>

        {daysToMilestone > 0 && (
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-700 mb-1">
              Keep going! Only <span className="font-bold">{daysToMilestone}</span> more days to reach your next milestone
            </p>
            <Badge variant="outline" className="bg-white/50">
              +{Math.round(careStreak.bonus_multiplier * 100)}% XP Bonus
            </Badge>
          </div>
        )}

        {careStreak.last_care_date && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              Last care: {new Date(careStreak.last_care_date).toLocaleDateString()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CareStreakCard;
