
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Gift, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  start_date: string;
  end_date: string;
  requirements: any;
  rewards: any;
  max_participants?: number;
  current_participants: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  experience_reward: number;
  badge_reward?: string;
}

interface ChallengeParticipation {
  challenge_id: string;
  progress: any;
  completed: boolean;
  final_score: number;
  rank?: number;
}

interface SeasonalChallengesProps {
  challenges: Challenge[];
  participations: ChallengeParticipation[];
  onJoinChallenge: (challengeId: string) => void;
}

const SeasonalChallenges: React.FC<SeasonalChallengesProps> = ({
  challenges,
  participations,
  onJoinChallenge
}) => {
  const { toast } = useToast();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    return `${hours} hours left`;
  };

  const getParticipation = (challengeId: string) => {
    return participations.find(p => p.challenge_id === challengeId);
  };

  const calculateProgress = (challenge: Challenge, participation?: ChallengeParticipation) => {
    if (!participation) return 0;
    
    const progress = participation.progress || {};
    const requirements = challenge.requirements || {};
    
    if (requirements.target) {
      const current = progress.current || 0;
      return Math.min((current / requirements.target) * 100, 100);
    }
    
    return 0;
  };

  const handleJoinChallenge = (challengeId: string) => {
    onJoinChallenge(challengeId);
    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the challenge. Good luck!",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-bold">Seasonal Challenges</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => {
          const participation = getParticipation(challenge.id);
          const progress = calculateProgress(challenge, participation);
          const timeRemaining = getTimeRemaining(challenge.end_date);
          const isActive = new Date(challenge.end_date) > new Date();
          
          return (
            <Card key={challenge.id} className={`${participation ? 'ring-2 ring-blue-400' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1">{challenge.title}</CardTitle>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeRemaining}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{challenge.description}</p>

                {participation && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    {participation.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        ✓ Completed!
                      </Badge>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{challenge.current_participants} participants</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span>+{challenge.experience_reward} XP</span>
                  </div>
                </div>

                {challenge.rewards && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-sm">Rewards</span>
                    </div>
                    <div className="space-y-1">
                      {challenge.badge_reward && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          {challenge.badge_reward} Badge
                        </Badge>
                      )}
                      <p className="text-xs text-gray-600">
                        +{challenge.experience_reward} Experience Points
                      </p>
                    </div>
                  </div>
                )}

                {!participation && isActive && (
                  <Button 
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Join Challenge
                  </Button>
                )}

                {participation && !participation.completed && isActive && (
                  <Button variant="outline" className="w-full" disabled>
                    Challenge In Progress
                  </Button>
                )}

                {!isActive && (
                  <Button variant="outline" className="w-full" disabled>
                    Challenge Ended
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {challenges.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Challenges</h3>
            <p className="text-gray-600">
              Check back soon for new seasonal challenges and competitions!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeasonalChallenges;
