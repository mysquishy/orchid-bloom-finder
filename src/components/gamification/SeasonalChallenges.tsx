
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Trophy, Star } from 'lucide-react';

interface SeasonalChallenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  start_date: string;
  end_date: string;
  requirements: any;
  rewards: any;
  max_participants: number | null;
  current_participants: number;
  is_active: boolean;
  difficulty: string;
  experience_reward: number;
  badge_reward: string | null;
  created_at: string;
}

interface ChallengeParticipation {
  id: string;
  user_id: string;
  challenge_id: string;
  joined_at: string;
  progress: any;
  completed: boolean;
  completed_at: string | null;
  final_score: number;
  rank: number | null;
  rewards_claimed: boolean;
}

interface SeasonalChallengesProps {
  challenges: SeasonalChallenge[];
  participations: ChallengeParticipation[];
  onJoinChallenge: (challengeId: string) => void;
}

const SeasonalChallenges: React.FC<SeasonalChallengesProps> = ({
  challenges,
  participations,
  onJoinChallenge
}) => {
  const getParticipation = (challengeId: string) => {
    return participations.find(p => p.challenge_id === challengeId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'care_streak': return <Calendar className="w-4 h-4" />;
      case 'plant_collection': return <Star className="w-4 h-4" />;
      case 'community_engagement': return <Users className="w-4 h-4" />;
      case 'identification': return <Trophy className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const daysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (challenges.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-green-200">
        <CardContent className="py-12">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Challenges</h3>
            <p className="text-gray-600">
              Check back soon for new seasonal challenges and competitions!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Active Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => {
            const participation = getParticipation(challenge.id);
            const expired = isExpired(challenge.end_date);
            const days = daysRemaining(challenge.end_date);

            return (
              <Card key={challenge.id} className="bg-white border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(challenge.challenge_type)}
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Participants</p>
                      <p className="font-medium">
                        {challenge.current_participants}
                        {challenge.max_participants && ` / ${challenge.max_participants}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reward</p>
                      <p className="font-medium">+{challenge.experience_reward} XP</p>
                    </div>
                  </div>

                  {challenge.max_participants && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Participation</span>
                        <span>{challenge.current_participants}/{challenge.max_participants}</span>
                      </div>
                      <Progress 
                        value={(challenge.current_participants / challenge.max_participants) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-gray-500">
                      {expired ? (
                        <span className="text-red-600">Expired</span>
                      ) : (
                        <span>{days} days remaining</span>
                      )}
                    </div>
                    
                    {participation ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {participation.completed ? 'Completed' : 'Joined'}
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => onJoinChallenge(challenge.id)}
                        disabled={expired || (challenge.max_participants !== null && challenge.current_participants >= challenge.max_participants)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Join Challenge
                      </Button>
                    )}
                  </div>

                  {participation && !participation.completed && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-900 mb-1">Your Progress</p>
                      <p className="text-xs text-blue-700">
                        Score: {participation.final_score}
                        {participation.rank && ` • Rank: #${participation.rank}`}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeasonalChallenges;
