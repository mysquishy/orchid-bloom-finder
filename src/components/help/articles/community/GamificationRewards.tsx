
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Gift, Zap, Crown } from 'lucide-react';

const GamificationRewards: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Achievement System & Rewards</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how our gamification system recognizes your orchid care journey, celebrates milestones, 
          and creates engaging challenges that make learning fun and rewarding.
        </p>
        <Badge className="bg-purple-100 text-purple-800">Gamification Guide</Badge>
      </div>

      {/* Achievement System */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Trophy className="w-6 h-6" />
            Achievement System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">How Achievements Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Achievement Categories</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>Care Streaks:</strong> Consistent daily care activities</li>
                  <li>• <strong>Knowledge Sharing:</strong> Contributing helpful content</li>
                  <li>• <strong>Community Support:</strong> Helping other members</li>
                  <li>• <strong>Plant Milestones:</strong> Growing healthy, blooming orchids</li>
                  <li>• <strong>Learning Progress:</strong> Completing guides and courses</li>
                  <li>• <strong>Special Events:</strong> Participating in challenges and contests</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Achievement Levels</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>Bronze:</strong> First steps and early milestones</li>
                  <li>• <strong>Silver:</strong> Consistent progress and dedication</li>
                  <li>• <strong>Gold:</strong> Significant accomplishments</li>
                  <li>• <strong>Platinum:</strong> Expert-level achievements</li>
                  <li>• <strong>Diamond:</strong> Exceptional contributions</li>
                  <li>• <strong>Legendary:</strong> Rare, extraordinary accomplishments</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <Zap className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-medium text-green-900 mb-2">Care Streak Master</h4>
                <p className="text-sm text-green-700 mb-3">
                  Maintain daily care activities for 7, 30, 100, or 365 consecutive days.
                </p>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs bg-amber-100">Bronze</Badge>
                  <Badge variant="outline" className="text-xs bg-gray-200">Silver</Badge>
                  <Badge variant="outline" className="text-xs bg-yellow-200">Gold</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <Star className="w-8 h-8 text-blue-600 mb-2" />
                <h4 className="font-medium text-blue-900 mb-2">Community Helper</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Earn recognition for answering questions and helping fellow plant parents.
                </p>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs bg-amber-100">10 Helps</Badge>
                  <Badge variant="outline" className="text-xs bg-gray-200">50 Helps</Badge>
                  <Badge variant="outline" className="text-xs bg-yellow-200">200 Helps</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <Crown className="w-8 h-8 text-orange-600 mb-2" />
                <h4 className="font-medium text-orange-900 mb-2">Bloom Whisperer</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Successfully help orchids bloom and document the journey with photos.
                </p>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs bg-amber-100">1 Bloom</Badge>
                  <Badge variant="outline" className="text-xs bg-gray-200">5 Blooms</Badge>
                  <Badge variant="outline" className="text-xs bg-yellow-200">20 Blooms</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Care Streak Rewards */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Zap className="w-6 h-6" />
            Care Streak Badges and Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">Building Consistent Care Habits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">Streak Activities That Count</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Daily plant check-ins and observations</li>
                  <li>• Watering when needed (based on your schedule)</li>
                  <li>• Recording plant health status</li>
                  <li>• Taking progress photos</li>
                  <li>• Environmental monitoring (humidity, light)</li>
                  <li>• Community engagement (questions, answers, posts)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-3">Streak Milestone Rewards</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>7 Days:</strong> "Getting Started" badge + care tips</li>
                  <li>• <strong>30 Days:</strong> "Dedicated Grower" badge + plant guide</li>
                  <li>• <strong>100 Days:</strong> "Care Master" badge + expert consultation</li>
                  <li>• <strong>365 Days:</strong> "Year-Round Champion" + special recognition</li>
                  <li>• <strong>500+ Days:</strong> "Legendary Caretaker" + exclusive features</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-amber-600 font-bold">7</span>
              </div>
              <h4 className="font-medium text-amber-800 mb-1">First Week</h4>
              <p className="text-xs text-amber-700">Starter badge + welcome guide</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">30</span>
              </div>
              <h4 className="font-medium text-blue-800 mb-1">One Month</h4>
              <p className="text-xs text-blue-700">Silver badge + advanced tips</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">100</span>
              </div>
              <h4 className="font-medium text-green-800 mb-1">100 Days</h4>
              <p className="text-xs text-green-700">Gold badge + expert access</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">365</span>
              </div>
              <h4 className="font-medium text-purple-800 mb-1">Full Year</h4>
              <p className="text-xs text-purple-700">Platinum badge + special perks</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Streak Tips for Success</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Building the Habit:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Set a consistent daily time for plant care</li>
                  <li>• Use app reminders and notifications</li>
                  <li>• Start with small, manageable activities</li>
                  <li>• Connect care time to existing routines</li>
                </ul>
              </div>
              <div>
                <strong>Maintaining Momentum:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Track progress visually with the app</li>
                  <li>• Share milestones with the community</li>
                  <li>• Plan for travel and busy periods</li>
                  <li>• Celebrate each milestone achievement</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Contributions */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Star className="w-6 h-6" />
            Community Contribution Recognition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Ways to Earn Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Knowledge Sharing</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Answer community questions</li>
                  <li>• Write helpful care guides</li>
                  <li>• Share success stories</li>
                  <li>• Create educational content</li>
                  <li>• Contribute to discussions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Quality Content</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Submit high-quality photos</li>
                  <li>• Document plant transformations</li>
                  <li>• Create care tutorials</li>
                  <li>• Share problem solutions</li>
                  <li>• Provide detailed reviews</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Community Building</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Welcome new members</li>
                  <li>• Moderate discussions</li>
                  <li>• Organize local meetups</li>
                  <li>• Mentor beginners</li>
                  <li>• Foster positive interactions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <h4 className="font-medium text-green-800 mb-2">Recognition Levels</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• <strong>Helpful Contributor:</strong> 10+ helpful answers</li>
                <li>• <strong>Knowledge Expert:</strong> 50+ quality contributions</li>
                <li>• <strong>Community Leader:</strong> 100+ contributions + mentoring</li>
                <li>• <strong>Orchid Master:</strong> Verified expert status</li>
                <li>• <strong>Community Champion:</strong> Outstanding ongoing contributions</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-400">
              <h4 className="font-medium text-purple-800 mb-2">Rewards & Benefits</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Special badges and flair</li>
                <li>• Featured content highlighting</li>
                <li>• Early access to new features</li>
                <li>• Expert consultation opportunities</li>
                <li>• Annual community awards ceremony</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Milestones */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Target className="w-6 h-6" />
            Learning Milestone Celebrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-4">Educational Progress Tracking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Learning Paths</h4>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>• <strong>Beginner Journey:</strong> Basic care fundamentals</li>
                  <li>• <strong>Species Specialist:</strong> Deep knowledge of specific types</li>
                  <li>• <strong>Problem Solver:</strong> Diagnostic and treatment skills</li>
                  <li>• <strong>Advanced Grower:</strong> Propagation and breeding techniques</li>
                  <li>• <strong>Community Expert:</strong> Teaching and mentoring skills</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Milestone Celebrations</h4>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>• <strong>Course Completion:</strong> Certificates and badges</li>
                  <li>• <strong>Skill Mastery:</strong> Advanced technique recognition</li>
                  <li>• <strong>Knowledge Tests:</strong> Validated expertise demonstrations</li>
                  <li>• <strong>Practical Application:</strong> Real-world success documentation</li>
                  <li>• <strong>Teaching Others:</strong> Mentor status achievements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-xs font-bold">BASICS</span>
              </div>
              <h4 className="font-medium text-green-800 mb-1">Fundamentals</h4>
              <p className="text-xs text-green-700">Complete basic care course</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 text-xs font-bold">SKILL</span>
              </div>
              <h4 className="font-medium text-blue-800 mb-1">Skill Building</h4>
              <p className="text-xs text-blue-700">Master specific techniques</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 text-xs font-bold">EXPERT</span>
              </div>
              <h4 className="font-medium text-purple-800 mb-1">Expertise</h4>
              <p className="text-xs text-purple-700">Achieve verified expert status</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-amber-600 text-xs font-bold">TEACH</span>
              </div>
              <h4 className="font-medium text-amber-800 mb-1">Teaching</h4>
              <p className="text-xs text-amber-700">Become a community mentor</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges & Competitions */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Gift className="w-6 h-6" />
            Challenges & Competitions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-4">Engaging Community Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-amber-800 mb-3">Challenge Types</h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• <strong>Seasonal Care:</strong> Spring repotting, winter preparation</li>
                  <li>• <strong>Photo Contests:</strong> Best bloom, most improved plant</li>
                  <li>• <strong>Knowledge Quests:</strong> Learn about new species or techniques</li>
                  <li>• <strong>Community Goals:</strong> Collective achievements and milestones</li>
                  <li>• <strong>Rescue Missions:</strong> Rehabilitate struggling plants</li>
                  <li>• <strong>Propagation Projects:</strong> Growing from keikis or divisions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-amber-800 mb-3">Participation Benefits</h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• <strong>Exclusive Badges:</strong> Limited-time achievement recognition</li>
                  <li>• <strong>Learning Opportunities:</strong> Guided experiences with experts</li>
                  <li>• <strong>Community Connection:</strong> Collaborate with fellow enthusiasts</li>
                  <li>• <strong>Progress Acceleration:</strong> Focused skill development periods</li>
                  <li>• <strong>Special Rewards:</strong> Unique prizes and recognition</li>
                  <li>• <strong>Fun & Motivation:</strong> Gamified learning experiences</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-green-900 mb-2">Monthly Bloom Challenge</h4>
                <p className="text-sm text-green-700 mb-3">
                  Document your orchid's journey from spike to full bloom over 30 days.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">Ongoing</Badge>
                  <span className="text-xs text-green-600">45 participants</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Rescue & Recovery</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Save a struggling orchid and share your rehabilitation techniques.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">Starting Soon</Badge>
                  <span className="text-xs text-blue-600">Register Now</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-purple-900 mb-2">Species Spotlight</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Learn about and care for featured orchid species each quarter.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">Seasonal</Badge>
                  <span className="text-xs text-purple-600">Expert Guided</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">🏆 Annual Awards & Recognition</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <strong>Individual Awards:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Orchid Parent of the Year</li>
                  <li>• Most Helpful Community Member</li>
                  <li>• Best Transformation Story</li>
                  <li>• Outstanding New Member</li>
                </ul>
              </div>
              <div>
                <strong>Community Achievements:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Collective Care Hours</li>
                  <li>• Total Plants Rescued</li>
                  <li>• Knowledge Articles Created</li>
                  <li>• New Members Welcomed</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivation & Progress */}
      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-purple-800">Your Journey, Celebrated Every Step</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Progress Recognition</h4>
              <p className="text-sm text-gray-600">
                Every achievement, big or small, is celebrated and contributes to your growing expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Goal Achievement</h4>
              <p className="text-sm text-gray-600">
                Set personal goals and work towards meaningful milestones in your orchid journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Community Connection</h4>
              <p className="text-sm text-gray-600">
                Achievements connect you with like-minded enthusiasts and build lasting relationships.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationRewards;
