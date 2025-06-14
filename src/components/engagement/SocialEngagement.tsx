
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users,
  MapPin,
  Calendar,
  Trophy,
  MessageCircle,
  Heart,
  Share2,
  Award,
  Clock,
  Video,
  Camera
} from 'lucide-react';

interface PlantParentMatch {
  id: string;
  name: string;
  location: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  orchidCount: number;
  matchScore: number;
  commonInterests: string[];
  avatar: string;
}

interface OrchidSociety {
  id: string;
  name: string;
  location: string;
  memberCount: number;
  nextEvent: string;
  eventType: string;
  description: string;
  isJoined: boolean;
}

interface ExpertSession {
  id: string;
  expertName: string;
  title: string;
  date: string;
  duration: string;
  attendees: number;
  maxAttendees: number;
  topic: string;
  level: string;
  isRegistered: boolean;
}

interface ContentContest {
  id: string;
  title: string;
  description: string;
  theme: string;
  endDate: string;
  participants: number;
  prizes: string[];
  isParticipating: boolean;
}

interface MentorshipPair {
  id: string;
  mentorName: string;
  menteeName: string;
  startDate: string;
  sessionsCompleted: number;
  totalSessions: number;
  status: 'active' | 'completed' | 'paused';
  focus: string;
}

const SocialEngagement: React.FC = () => {
  const [plantParentMatches] = useState<PlantParentMatch[]>([
    {
      id: '1',
      name: 'Sarah Green',
      location: 'San Francisco, CA',
      experience: 'intermediate',
      orchidCount: 12,
      matchScore: 95,
      commonInterests: ['Phalaenopsis', 'Indoor growing', 'Propagation'],
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Mike Chen',
      location: 'Seattle, WA',
      experience: 'advanced',
      orchidCount: 28,
      matchScore: 87,
      commonInterests: ['Cattleya', 'Greenhouse setup', 'Breeding'],
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      location: 'Portland, OR',
      experience: 'expert',
      orchidCount: 45,
      matchScore: 82,
      commonInterests: ['Rare species', 'Conservation', 'Research'],
      avatar: '/api/placeholder/40/40'
    }
  ]);

  const [orchidSocieties] = useState<OrchidSociety[]>([
    {
      id: '1',
      name: 'Bay Area Orchid Society',
      location: 'San Francisco Bay Area',
      memberCount: 342,
      nextEvent: '2024-03-15',
      eventType: 'Monthly Show & Tell',
      description: 'Passionate growers sharing knowledge and beautiful orchids',
      isJoined: true
    },
    {
      id: '2',
      name: 'Pacific Northwest Orchid Alliance',
      location: 'Seattle, WA',
      memberCount: 156,
      nextEvent: '2024-03-22',
      eventType: 'Repotting Workshop',
      description: 'Learning together in the beautiful Pacific Northwest',
      isJoined: false
    },
    {
      id: '3',
      name: 'Desert Orchid Enthusiasts',
      location: 'Phoenix, AZ',
      memberCount: 89,
      nextEvent: '2024-03-28',
      eventType: 'Climate Adaptation Talk',
      description: 'Growing orchids in challenging desert conditions',
      isJoined: false
    }
  ]);

  const [expertSessions] = useState<ExpertSession[]>([
    {
      id: '1',
      expertName: 'Dr. Elena Vasquez',
      title: 'Advanced Orchid Nutrition',
      date: '2024-03-20',
      duration: '60 minutes',
      attendees: 23,
      maxAttendees: 30,
      topic: 'Fertilization strategies for optimal blooming',
      level: 'Advanced',
      isRegistered: true
    },
    {
      id: '2',
      expertName: 'Master Grower Tom Wilson',
      title: 'Troubleshooting Common Problems',
      date: '2024-03-25',
      duration: '45 minutes',
      attendees: 45,
      maxAttendees: 50,
      topic: 'Diagnosing and treating orchid ailments',
      level: 'Beginner',
      isRegistered: false
    }
  ]);

  const [contentContests] = useState<ContentContest[]>([
    {
      id: '1',
      title: 'Spring Blooming Spectacular',
      description: 'Share your most beautiful spring orchid blooms',
      theme: 'Spring Blooms',
      endDate: '2024-04-30',
      participants: 234,
      prizes: ['Premium subscription', 'Expert consultation', 'Orchid care kit'],
      isParticipating: true
    },
    {
      id: '2',
      title: 'Orchid Recovery Stories',
      description: 'Document your orchid rescue and recovery journey',
      theme: 'Recovery & Care',
      endDate: '2024-05-15',
      participants: 89,
      prizes: ['Featured story', 'Care guide bundle', 'Community recognition'],
      isParticipating: false
    }
  ]);

  const [mentorshipPairs] = useState<MentorshipPair[]>([
    {
      id: '1',
      mentorName: 'Expert Grace Kim',
      menteeName: 'Beginner Alex Johnson',
      startDate: '2024-02-01',
      sessionsCompleted: 3,
      totalSessions: 6,
      status: 'active',
      focus: 'Basic orchid care and identification'
    },
    {
      id: '2',
      mentorName: 'Master David Park',
      menteeName: 'Intermediate Sam Williams',
      startDate: '2024-01-15',
      sessionsCompleted: 6,
      totalSessions: 6,
      status: 'completed',
      focus: 'Advanced propagation techniques'
    }
  ]);

  const getExperienceColor = (experience: PlantParentMatch['experience']) => {
    switch (experience) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusColor = (status: MentorshipPair['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Social Engagement</h3>
          <p className="text-gray-600">Connect, learn, and grow with the orchid community</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Users className="w-4 h-4 mr-2" />
          Community Overview
        </Button>
      </div>

      {/* Social Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">Active Connections</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-600">Local Societies</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-gray-600">Expert Sessions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">67</div>
            <div className="text-sm text-gray-600">Active Mentorships</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant Parent Matching */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Plant Parent Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plantParentMatches.map((match) => (
                <div key={match.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={match.avatar} />
                        <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{match.name}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {match.location}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {match.matchScore}% match
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getExperienceColor(match.experience)}>
                      {match.experience}
                    </Badge>
                    <Badge variant="outline">
                      {match.orchidCount} orchids
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Common Interests:</div>
                    <div className="flex flex-wrap gap-1">
                      {match.commonInterests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="w-3 h-3 mr-1" />
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Local Orchid Societies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-500" />
              Local Orchid Societies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orchidSocieties.map((society) => (
                <div key={society.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{society.name}</div>
                      <div className="text-sm text-gray-600">{society.location}</div>
                    </div>
                    <Badge variant={society.isJoined ? 'default' : 'outline'}>
                      {society.isJoined ? 'Joined' : 'Join'}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{society.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{society.memberCount}</div>
                      <div className="text-xs text-blue-800">Members</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{society.eventType}</div>
                      <div className="text-xs text-green-800">Next Event</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(society.nextEvent).toLocaleDateString()}
                    </span>
                  </div>

                  <Button size="sm" className="w-full" variant={society.isJoined ? 'outline' : 'default'}>
                    {society.isJoined ? 'View Events' : 'Join Society'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expert Office Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-500" />
              Expert Office Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expertSessions.map((session) => (
                <div key={session.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-gray-600">with {session.expertName}</div>
                    </div>
                    <Badge className={session.level === 'Advanced' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {session.level}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{session.topic}</p>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-sm">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {new Date(session.date).toLocaleDateString()} • {session.duration}
                    </div>
                    <div className="text-sm">
                      <Users className="w-3 h-3 inline mr-1" />
                      {session.attendees}/{session.maxAttendees} registered
                    </div>
                  </div>

                  <Progress value={(session.attendees / session.maxAttendees) * 100} className="mb-3 h-2" />

                  <Button 
                    size="sm" 
                    className="w-full" 
                    variant={session.isRegistered ? 'outline' : 'default'}
                    disabled={session.attendees >= session.maxAttendees}
                  >
                    {session.isRegistered ? 'Registered' : 
                     session.attendees >= session.maxAttendees ? 'Full' : 'Register'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Contests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-orange-500" />
              Content Contests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentContests.map((contest) => (
                <div key={contest.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{contest.title}</div>
                      <div className="text-sm text-gray-600">Theme: {contest.theme}</div>
                    </div>
                    <Badge variant={contest.isParticipating ? 'default' : 'outline'}>
                      {contest.isParticipating ? 'Participating' : 'Join'}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{contest.description}</p>

                  <div className="flex items-center justify-between text-sm mb-3">
                    <span>{contest.participants} participants</span>
                    <span>Ends {new Date(contest.endDate).toLocaleDateString()}</span>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Prizes:</div>
                    <div className="flex flex-wrap gap-1">
                      {contest.prizes.map((prize, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {prize}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button size="sm" className="w-full" variant={contest.isParticipating ? 'outline' : 'default'}>
                    {contest.isParticipating ? 'View Submission' : 'Enter Contest'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentorship Program */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Mentorship Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentorshipPairs.map((pair) => (
              <div key={pair.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium">{pair.mentorName}</div>
                    <div className="text-sm text-gray-600">mentoring {pair.menteeName}</div>
                  </div>
                  <Badge className={getStatusColor(pair.status)}>
                    {pair.status}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-3">{pair.focus}</p>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sessions Progress</span>
                    <span>{pair.sessionsCompleted}/{pair.totalSessions}</span>
                  </div>
                  <Progress value={(pair.sessionsCompleted / pair.totalSessions) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Started {new Date(pair.startDate).toLocaleDateString()}</span>
                  {pair.status === 'active' && (
                    <Button size="sm" variant="outline">
                      Schedule Session
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Award className="w-4 h-4 mr-2" />
              Join Mentorship Program
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialEngagement;
