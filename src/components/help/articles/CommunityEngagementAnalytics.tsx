
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Star, Trophy, TrendingUp, MessageSquare, ThumbsUp, Award, Target } from 'lucide-react';

const CommunityEngagementAnalytics: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Users className="w-16 h-16 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Community Engagement Analytics
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your impact in the Orkhidly community, build your expertise reputation, 
          and unlock learning milestones as you help others grow beautiful orchids.
        </p>
      </div>

      {/* Contribution Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Your Contribution Scores and Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Every time you help another community member, share your knowledge, or validate an identification, 
            you earn contribution points that reflect your positive impact on the orchid-growing community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-purple-800">Overall Impact Score</h4>
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-900 mb-2">2,847</div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-700">This Month</span>
                  <span className="font-medium text-purple-800">+342 points</span>
                </div>
                <Progress value={68} className="h-2" />
                <div className="text-xs text-purple-600 mt-1">68% toward Expert level</div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-gray-800">How You Earn Points</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm text-green-700">Helpful answer (+25 pts)</span>
                    <Badge className="bg-green-100 text-green-800">12 this week</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-sm text-blue-700">ID validation (+15 pts)</span>
                    <Badge className="bg-blue-100 text-blue-800">8 this week</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                    <span className="text-sm text-yellow-700">Photo sharing (+10 pts)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">5 this week</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                    <span className="text-sm text-purple-700">Question asked (+5 pts)</span>
                    <Badge className="bg-purple-100 text-purple-800">3 this week</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Community Impact Breakdown</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-800">Forum Contributions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Answers Given</div>
                      <div className="font-bold text-blue-600">127</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Helpful Votes</div>
                      <div className="font-bold text-green-600">89</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-800">Validation Activity</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">IDs Validated</div>
                      <div className="font-bold text-purple-600">43</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Accuracy Rate</div>
                      <div className="font-bold text-green-600">94%</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-gray-800">Content Sharing</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Photos Shared</div>
                      <div className="font-bold text-orange-600">156</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Total Likes</div>
                      <div className="font-bold text-pink-600">1,204</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expertise Progression */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Expertise Level Progression</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Current Level: Advanced Grower
              </h4>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Progress to Expert</span>
                  <span className="text-sm text-gray-600">2,847 / 4,200 points</span>
                </div>
                <Progress value={68} className="h-3 mb-2" />
                <div className="text-sm text-gray-600">1,353 points needed for Expert level</div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-800">Level Benefits Unlocked</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Priority in expert consultations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Advanced analytics access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Community moderator tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Expert badge (Expert level)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Revenue sharing program (Master level)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Expertise Pathway</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border-l-4 border-green-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-800">Beginner</span>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="text-sm text-green-600">0 - 100 points</div>
                </div>

                <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-800">Enthusiast</span>
                    <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                  </div>
                  <div className="text-sm text-blue-600">100 - 500 points</div>
                </div>

                <div className="p-3 bg-purple-50 border-l-4 border-purple-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">Advanced Grower</span>
                    <Badge className="bg-purple-100 text-purple-800">Current</Badge>
                  </div>
                  <div className="text-sm text-purple-600">500 - 2,000 points</div>
                </div>

                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-yellow-800">Expert</span>
                    <Badge variant="outline" className="text-yellow-600">Next Goal</Badge>
                  </div>
                  <div className="text-sm text-yellow-600">2,000 - 5,000 points</div>
                </div>

                <div className="p-3 bg-orange-50 border-l-4 border-orange-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-orange-800">Master</span>
                    <Badge variant="outline" className="text-orange-600">Future</Badge>
                  </div>
                  <div className="text-sm text-orange-600">5,000+ points</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reputation Building */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Community Reputation Building</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Trust Score
              </h4>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">4.8</div>
                <div className="text-sm text-blue-700">out of 5.0</div>
                <div className="text-xs text-gray-600 mt-1">Based on 67 community ratings</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Helpful answers</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Response quality</span>
                  <span className="font-medium">4.9/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeliness</span>
                  <span className="font-medium">4.6/5</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Specialization Areas</h4>
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Phalaenopsis Care</span>
                    <Badge className="bg-green-100 text-green-800">Expert</Badge>
                  </div>
                  <div className="text-xs text-green-600">87 helpful answers</div>
                </div>
                
                <div className="p-2 bg-blue-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">Bloom Troubleshooting</span>
                    <Badge className="bg-blue-100 text-blue-800">Advanced</Badge>
                  </div>
                  <div className="text-xs text-blue-600">43 helpful answers</div>
                </div>
                
                <div className="p-2 bg-purple-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-800">Repotting Techniques</span>
                    <Badge className="bg-purple-100 text-purple-800">Intermediate</Badge>
                  </div>
                  <div className="text-xs text-purple-600">28 helpful answers</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Community Recognition</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <div>
                    <div className="text-sm font-medium text-yellow-800">Top Contributor</div>
                    <div className="text-xs text-yellow-600">March 2024</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <ThumbsUp className="w-4 h-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Helpful Helper</div>
                    <div className="text-xs text-green-600">50+ helpful votes</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-blue-800">Active Participant</div>
                    <div className="text-xs text-blue-600">100+ forum posts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Learning Milestone Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Knowledge Milestones
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Orchid Species Knowledge</span>
                    <Badge className="bg-green-100 text-green-800">87%</Badge>
                  </div>
                  <Progress value={87} className="h-2 mb-1" />
                  <div className="text-xs text-gray-600">142 of 163 common species learned</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Care Techniques Mastery</span>
                    <Badge className="bg-blue-100 text-blue-800">73%</Badge>
                  </div>
                  <Progress value={73} className="h-2 mb-1" />
                  <div className="text-xs text-gray-600">22 of 30 techniques practiced</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Problem Solving Skills</span>
                    <Badge className="bg-purple-100 text-purple-800">91%</Badge>
                  </div>
                  <Progress value={91} className="h-2 mb-1" />
                  <div className="text-xs text-gray-600">Successfully solved 34 of 37 challenges</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Recent Learning Achievements</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-800">Species Expert</div>
                    <div className="text-xs text-green-600">Correctly identified 50 different orchid species</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-800">Problem Solver</div>
                    <div className="text-xs text-blue-600">Helped solve 25 community care questions</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-800">Knowledge Sharer</div>
                    <div className="text-xs text-purple-600">Contributed 15 detailed care guides</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-medium text-yellow-800 mb-2">Next Milestone</h5>
                <div className="text-sm text-yellow-700">
                  <strong>Master Grower Status</strong>
                  <div className="text-xs mt-1">Help 25 more community members and share 5 care success stories</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="py-8 text-center">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Grow Together in Community
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Your journey in the Orkhidly community isn't just about your own learning - 
            it's about lifting others up, sharing knowledge, and building a supportive 
            network of orchid enthusiasts who help each other succeed.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-purple-100 text-purple-800">Community Impact</Badge>
            <Badge className="bg-blue-100 text-blue-800">Knowledge Sharing</Badge>
            <Badge className="bg-green-100 text-green-800">Continuous Growth</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityEngagementAnalytics;
