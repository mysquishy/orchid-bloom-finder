
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Flame, Users } from 'lucide-react';

interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  score: number;
  rank: number;
}

interface LeaderboardCardProps {
  leaderboards: {
    experience?: LeaderboardEntry[];
    care_streak?: LeaderboardEntry[];
    plant_count?: LeaderboardEntry[];
    achievements?: LeaderboardEntry[];
  };
  currentUserId: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ leaderboards, currentUserId }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const renderLeaderboard = (entries: LeaderboardEntry[] = [], scoreLabel: string) => (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div
          key={entry.user_id}
          className={`flex items-center gap-4 p-3 rounded-lg border ${
            entry.user_id === currentUserId 
              ? 'border-purple-200 bg-purple-50' 
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-center w-8">
            {getRankIcon(entry.rank)}
          </div>
          
          <div className="flex-1">
            <p className={`font-medium ${
              entry.user_id === currentUserId ? 'text-purple-900' : 'text-gray-900'
            }`}>
              {entry.user_name}
              {entry.user_id === currentUserId && (
                <Badge variant="secondary" className="ml-2">You</Badge>
              )}
            </p>
          </div>
          
          <div className="text-right">
            <p className="font-bold text-lg">{entry.score.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{scoreLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Community Leaderboards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="experience" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="experience" className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span className="hidden sm:inline">XP</span>
            </TabsTrigger>
            <TabsTrigger value="care_streak" className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span className="hidden sm:inline">Streak</span>
            </TabsTrigger>
            <TabsTrigger value="plant_count" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span className="hidden sm:inline">Collection</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience">
            <div>
              <h4 className="font-semibold mb-3">Top Experience Points</h4>
              {renderLeaderboard(leaderboards.experience, 'XP')}
            </div>
          </TabsContent>

          <TabsContent value="care_streak">
            <div>
              <h4 className="font-semibold mb-3">Longest Care Streaks</h4>
              {renderLeaderboard(leaderboards.care_streak, 'Days')}
            </div>
          </TabsContent>

          <TabsContent value="plant_count">
            <div>
              <h4 className="font-semibold mb-3">Largest Collections</h4>
              {renderLeaderboard(leaderboards.plant_count, 'Plants')}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div>
              <h4 className="font-semibold mb-3">Most Achievements</h4>
              {renderLeaderboard(leaderboards.achievements, 'Badges')}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
