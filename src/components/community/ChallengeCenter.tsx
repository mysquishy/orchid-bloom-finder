
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, Users, Target, Medal, Gift, Camera, Leaf } from 'lucide-react';

interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  start_date: string;
  end_date: string;
  prize_description: string;
  participant_count: number;
  status: string;
  created_at: string;
}

interface ChallengeParticipation {
  id: string;
  submission_data: any;
  image_urls: string[];
  submission_text: string;
  score: number;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

const ChallengeCenter: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('active');

  const { data: challenges, isLoading: challengesLoading } = useQuery({
    queryKey: ['community-challenges', filterStatus],
    queryFn: async () => {
      let query = supabase
        .from('community_challenges')
        .select('*');

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query
        .order('start_date', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as CommunityChallenge[];
    }
  });

  const { data: participations, isLoading: participationsLoading } = useQuery({
    queryKey: ['challenge-participations', selectedChallenge],
    queryFn: async () => {
      if (!selectedChallenge) return [];

      const { data, error } = await supabase
        .from('challenge_participations')
        .select(`
          *,
          profiles (first_name, last_name, avatar_url)
        `)
        .eq('challenge_id', selectedChallenge)
        .order('score', { ascending: false });

      if (error) throw error;
      return data as ChallengeParticipation[];
    },
    enabled: !!selectedChallenge
  });

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'care': return Leaf;
      case 'growth': return Target;
      case 'identification': return Medal;
      default: return Trophy;
    }
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return 'bg-purple-100 text-purple-800';
      case 'care': return 'bg-green-100 text-green-800';
      case 'growth': return 'bg-blue-100 text-blue-800';
      case 'identification': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  if (challengesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenges List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filter Tabs */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'active', label: 'Active', count: challenges?.filter(c => c.status === 'active').length || 0 },
                  { value: 'upcoming', label: 'Upcoming', count: challenges?.filter(c => c.status === 'upcoming').length || 0 },
                  { value: 'completed', label: 'Completed', count: challenges?.filter(c => c.status === 'completed').length || 0 },
                  { value: 'all', label: 'All', count: challenges?.length || 0 }
                ].map((filter) => (
                  <Button
                    key={filter.value}
                    variant={filterStatus === filter.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(filter.value)}
                    className="flex items-center gap-2"
                  >
                    {filter.label}
                    <Badge variant="secondary" className="text-xs">
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenges Grid */}
          <div className="space-y-4">
            {challenges?.map((challenge) => {
              const ChallengeIcon = getChallengeTypeIcon(challenge.challenge_type);
              const daysRemaining = getDaysRemaining(challenge.end_date);
              const progress = getProgress(challenge.start_date, challenge.end_date);
              
              return (
                <Card
                  key={challenge.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedChallenge === challenge.id ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => setSelectedChallenge(challenge.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getChallengeTypeColor(challenge.challenge_type)}`}>
                          <ChallengeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{challenge.title}</h3>
                          <Badge className={getStatusColor(challenge.status)}>
                            {challenge.status}
                          </Badge>
                        </div>
                      </div>
                      
                      {challenge.status === 'active' && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-orange-600">
                            {daysRemaining} days left
                          </p>
                          <div className="w-24 mt-1">
                            <Progress value={progress} className="h-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{challenge.participant_count} participants</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(challenge.start_date).toLocaleDateString()} - {new Date(challenge.end_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {challenge.prize_description && (
                      <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                        <Gift className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Prize: {challenge.prize_description}
                        </span>
                      </div>
                    )}

                    {challenge.status === 'active' && (
                      <Button className="w-full">
                        Join Challenge
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Challenge Details & Leaderboard */}
        <div className="lg:col-span-1">
          {selectedChallenge ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold">Leaderboard</h3>
                </div>
              </CardHeader>
              <CardContent>
                {participationsLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {participations?.slice(0, 10).map((participation, index) => (
                      <div
                        key={participation.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {participation.profiles.first_name} {participation.profiles.last_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Score: {participation.score}
                          </p>
                        </div>
                        
                        {index < 3 && (
                          <Medal className={`w-4 h-4 ${
                            index === 0 ? 'text-yellow-500' :
                            index === 1 ? 'text-gray-400' :
                            'text-orange-600'
                          }`} />
                        )}
                      </div>
                    ))}
                    
                    {participations && participations.length === 0 && (
                      <div className="text-center py-8">
                        <Trophy className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No submissions yet</p>
                        <p className="text-xs text-gray-400">Be the first to participate!</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Challenge</h3>
                <p className="text-gray-500">Choose a challenge to view details and leaderboard</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCenter;
