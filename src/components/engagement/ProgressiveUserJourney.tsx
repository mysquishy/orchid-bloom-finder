
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap,
  Trophy,
  Star,
  Crown,
  Users,
  Book,
  Target,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

interface UserLevel {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  benefits: string[];
  currentUsers: number;
  completionRate: number;
  badge: string;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  orchidTypes: string[];
  modules: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  enrollments: number;
  completionRate: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  total: number;
  earnedBy: number;
}

const ProgressiveUserJourney: React.FC = () => {
  const [userLevels] = useState<UserLevel[]>([
    {
      id: '1',
      name: 'Orchid Novice',
      description: 'Just starting your orchid journey',
      requirements: ['Complete profile', 'First identification', 'Add first orchid to collection'],
      benefits: ['Basic care guides', 'Community access', '5 free identifications'],
      currentUsers: 1245,
      completionRate: 89.2,
      badge: '🌱'
    },
    {
      id: '2',
      name: 'Plant Parent',
      description: 'Getting the hang of orchid care',
      requirements: ['10 successful identifications', '7-day care streak', 'Join community discussion'],
      benefits: ['Advanced care tips', 'Weather integration', 'Photo progress tracking'],
      currentUsers: 756,
      completionRate: 67.4,
      badge: '🌸'
    },
    {
      id: '3',
      name: 'Orchid Enthusiast',
      description: 'Passionate about orchid growing',
      requirements: ['25 identifications', '30-day care streak', 'Help other users'],
      benefits: ['Expert content access', 'Priority support', 'Beta feature access'],
      currentUsers: 234,
      completionRate: 45.8,
      badge: '🏆'
    },
    {
      id: '4',
      name: 'Orchid Expert',
      description: 'Mastery of orchid cultivation',
      requirements: ['100 identifications', 'Expert certification', 'Mentor 5 users'],
      benefits: ['Certification badge', 'Expert sessions', 'Community leadership'],
      currentUsers: 67,
      completionRate: 23.1,
      badge: '👑'
    }
  ]);

  const [learningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      name: 'Beginner\'s Orchid Care',
      description: 'Essential knowledge for new orchid parents',
      orchidTypes: ['Phalaenopsis', 'Cattleya', 'Dendrobium'],
      modules: 8,
      duration: '2 weeks',
      difficulty: 'beginner',
      enrollments: 2340,
      completionRate: 78.5
    },
    {
      id: '2',
      name: 'Advanced Propagation',
      description: 'Master the art of orchid propagation',
      orchidTypes: ['Oncidium', 'Vanda', 'Cymbidium'],
      modules: 12,
      duration: '4 weeks',
      difficulty: 'advanced',
      enrollments: 456,
      completionRate: 62.3
    },
    {
      id: '3',
      name: 'Disease Prevention & Treatment',
      description: 'Keep your orchids healthy and thriving',
      orchidTypes: ['All types'],
      modules: 10,
      duration: '3 weeks',
      difficulty: 'intermediate',
      enrollments: 891,
      completionRate: 71.2
    },
    {
      id: '4',
      name: 'Expert Cultivation Techniques',
      description: 'Professional-level growing methods',
      orchidTypes: ['Rare species', 'Breeding varieties'],
      modules: 15,
      duration: '6 weeks',
      difficulty: 'expert',
      enrollments: 123,
      completionRate: 45.7
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first plant identification',
      category: 'Identification',
      rarity: 'common',
      progress: 1,
      total: 1,
      earnedBy: 2847
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 30-day care streak',
      category: 'Care',
      rarity: 'rare',
      progress: 18,
      total: 30,
      earnedBy: 234
    },
    {
      id: '3',
      title: 'Orchid Whisperer',
      description: 'Successfully nurse a sick orchid back to health',
      category: 'Health',
      rarity: 'epic',
      progress: 0,
      total: 1,
      earnedBy: 89
    },
    {
      id: '4',
      title: 'Community Leader',
      description: 'Help 50 community members with their questions',
      category: 'Community',
      rarity: 'legendary',
      progress: 12,
      total: 50,
      earnedBy: 23
    }
  ]);

  const getDifficultyColor = (difficulty: LearningPath['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Progressive User Journey</h3>
          <p className="text-gray-600">Skill-based progression and personalized learning paths</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <GraduationCap className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      <Tabs defaultValue="levels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="levels">User Levels</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="levels">
          <div className="space-y-4">
            <h4 className="text-lg font-medium">User Progression System</h4>
            
            {userLevels.map((level) => (
              <Card key={level.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{level.badge}</div>
                      <div>
                        <CardTitle className="text-lg">{level.name}</CardTitle>
                        <p className="text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{level.currentUsers}</div>
                      <div className="text-sm text-gray-600">Current Users</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Requirements</h5>
                      <ul className="space-y-1">
                        {level.requirements.map((req, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Target className="w-4 h-4 text-gray-400 mr-2" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Benefits</h5>
                      <ul className="space-y-1">
                        {level.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion Rate</span>
                      <span>{level.completionRate}%</span>
                    </div>
                    <Progress value={level.completionRate} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paths">
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Personalized Learning Paths</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningPaths.map((path) => (
                <Card key={path.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{path.name}</CardTitle>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{path.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Book className="w-4 h-4 text-blue-500" />
                          <span>{path.modules} modules</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-purple-500" />
                          <span>{path.duration}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-1">Orchid Types</div>
                        <div className="flex flex-wrap gap-1">
                          {path.orchidTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">{path.enrollments}</div>
                          <div className="text-xs text-green-800">Enrollments</div>
                        </div>
                        <div className="p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">{path.completionRate}%</div>
                          <div className="text-xs text-blue-800">Completion</div>
                        </div>
                      </div>

                      <Button size="sm" className="w-full">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Achievement System</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Category: {achievement.category}</span>
                        <span>{achievement.earnedBy} users earned this</span>
                      </div>

                      {achievement.progress < achievement.total ? (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.total}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.total) * 100} 
                            className="h-2"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center p-3 bg-green-50 rounded">
                          <Award className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-green-800 font-medium">Achievement Completed!</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Journey Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Journey Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium mb-3">Progression Metrics</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average time to level up</span>
                  <span className="font-medium">14 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Path completion rate</span>
                  <span className="font-medium">64.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Achievement unlock rate</span>
                  <span className="font-medium">78.2%</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Popular Achievements</h5>
              <div className="space-y-2">
                {achievements
                  .sort((a, b) => b.earnedBy - a.earnedBy)
                  .slice(0, 3)
                  .map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between text-sm">
                      <span>{achievement.title}</span>
                      <Badge variant="outline">{achievement.earnedBy}</Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Engagement Impact</h5>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 rounded text-center">
                  <div className="font-bold text-blue-600">+34%</div>
                  <div className="text-xs text-blue-800">Retention increase</div>
                </div>
                <div className="p-2 bg-green-50 rounded text-center">
                  <div className="font-bold text-green-600">+67%</div>
                  <div className="text-xs text-green-800">Session duration</div>
                </div>
                <div className="p-2 bg-purple-50 rounded text-center">
                  <div className="font-bold text-purple-600">+45%</div>
                  <div className="text-xs text-purple-800">Feature adoption</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressiveUserJourney;
