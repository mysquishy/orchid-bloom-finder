
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Medal, Star, Users, Trophy, Flame } from 'lucide-react';

interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  avatar_url?: string;
  score: number;
  rank: number;
  leaderboard_type: string;
}

interface LeaderboardCardProps {
  leaderboards: Record<string, LeaderboardEntry[]>;
  currentUserId?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  leaderboards,
  currentUserId
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'all_time'>('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getLeaderboardIcon = (type: string) => {
    switch (type) {
      case 'experience': return <Star className="w-4 h-4" />;
      case 'care_streak': return <Flame className="w-4 h-4" />;
      case 'plant_count': return <Users className="w-4 h-4" />;
      case 'achievements': return <Trophy className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getLeaderboardTitle = (type: string) => {
    switch (type) {
      case 'experience': return 'Experience Leaders';
      case 'care_streak': return 'Streak Champions';
      case 'plant_count': return 'Collection Masters';
      case 'achievements': return 'Achievement Hunters';
      default: return 'Leaderboard';
    }
  };

  const formatScore = (type: string, score: number) => {
    switch (type) {
      case 'experience': return `${score.toLocaleString()} XP`;
      case 'care_streak': return `${score} days`;
      case 'plant_count': return `${score} plants`;
      case 'achievements': return `${score} earned`;
      default: return score.toString();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Community Leaderboards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="all_time">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-4">
            {Object.entries(leaderboards).map(([type, entries]) => (
              <div key={type} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  {getLeaderboardIcon(type)}
                  <h3 className="font-semibold text-sm">{getLeaderboardTitle(type)}</h3>
                </div>
                
                <div className="space-y-2">
                  {entries.slice(0, 5).map((entry) => (
                    <div 
                      key={entry.user_id}
                      className={`flex items-center gap-3 p-2 rounded ${
                        entry.user_id === currentUserId ? 'bg-blue-100 border border-blue-300' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(entry.rank)}
                      </div>
                      
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={entry.avatar_url} />
                        <AvatarFallback className="text-xs">
                          {entry.user_name?.slice(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {entry.user_name || 'Anonymous User'}
                          </span>
                          {entry.user_id === currentUserId && (
                            <Badge variant="secondary" className="text-xs">You</Badge>
                          )}
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {formatScore(type, entry.score)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
