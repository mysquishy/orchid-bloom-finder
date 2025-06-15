
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, MessageSquare, Star, CheckCircle, Camera } from 'lucide-react';

const GettingStartedCommunity: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Getting Started in the Orkhidly Community</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to our vibrant community of orchid enthusiasts! Learn how to create your profile, 
          participate in discussions, and build your reputation as a plant parent.
        </p>
        <Badge className="bg-green-100 text-green-800">Community Guide</Badge>
      </div>

      {/* Creating Your Plant Parent Profile */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Users className="w-6 h-6" />
            Creating Your Plant Parent Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-3">Profile Setup Essentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Basic Information</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Choose a memorable username</li>
                  <li>• Add a profile photo or plant avatar</li>
                  <li>• Write a brief bio about your orchid journey</li>
                  <li>• Set your experience level (beginner to expert)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Privacy Settings</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Choose who can see your profile</li>
                  <li>• Control collection visibility</li>
                  <li>• Set messaging preferences</li>
                  <li>• Manage notification settings</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Profile Enhancement Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <Camera className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-900 mb-2">Showcase Your Collection</h4>
                  <p className="text-sm text-blue-700">
                    Upload photos of your favorite orchids to create an inspiring collection gallery.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <Star className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="font-medium text-purple-900 mb-2">Share Your Story</h4>
                  <p className="text-sm text-purple-700">
                    Tell the community about your orchid journey, challenges, and successes.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <CheckCircle className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="font-medium text-orange-900 mb-2">Set Goals</h4>
                  <p className="text-sm text-orange-700">
                    Define your orchid care goals and track your progress publicly or privately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Guidelines */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Heart className="w-6 h-6" />
            Understanding Community Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Our Community Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Respect & Kindness</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Treat all community members with respect, regardless of their experience level. 
                  Remember that everyone started as a beginner.
                </p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Use encouraging language</li>
                  <li>• Avoid judgmental comments</li>
                  <li>• Celebrate others' successes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Knowledge Sharing</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Share accurate information and cite sources when possible. If you're unsure, 
                  say so and invite others to contribute.
                </p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Provide helpful, actionable advice</li>
                  <li>• Share your sources and experiences</li>
                  <li>• Ask questions when learning</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Content Standards</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• Keep posts relevant to orchid care and cultivation</p>
              <p>• Use clear, high-quality photos when sharing plant images</p>
              <p>• Avoid spam, self-promotion, or commercial content</p>
              <p>• Report inappropriate content to help maintain community quality</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participating in Discussions */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <MessageSquare className="w-6 h-6" />
            Participating in Discussions Respectfully
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Discussion Best Practices</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <h4 className="font-medium text-green-800">Asking Questions</h4>
                  <ul className="text-sm text-green-700 mt-1 space-y-1">
                    <li>• Be specific about your situation</li>
                    <li>• Include relevant photos</li>
                    <li>• Mention your location and conditions</li>
                    <li>• Search existing discussions first</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-800">Providing Answers</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Share your experience level</li>
                    <li>• Explain your reasoning</li>
                    <li>• Suggest multiple approaches</li>
                    <li>• Follow up when possible</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Building Connections</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <h4 className="font-medium text-purple-800">Networking Tips</h4>
                  <ul className="text-sm text-purple-700 mt-1 space-y-1">
                    <li>• Follow experienced growers</li>
                    <li>• Join species-specific groups</li>
                    <li>• Participate in local meetups</li>
                    <li>• Share your journey regularly</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                  <h4 className="font-medium text-orange-800">Giving Feedback</h4>
                  <ul className="text-sm text-orange-700 mt-1 space-y-1">
                    <li>• Use the voting system thoughtfully</li>
                    <li>• Leave constructive comments</li>
                    <li>• Thank helpful contributors</li>
                    <li>• Report quality issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building Expertise Reputation */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Star className="w-6 h-6" />
            Building Your Expertise Reputation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-4">Reputation Building Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-amber-800 mb-1">Newcomer</h4>
                <p className="text-xs text-amber-700">Share your first experiences and ask questions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-amber-800 mb-1">Contributor</h4>
                <p className="text-xs text-amber-700">Regularly help others and share knowledge</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-amber-800 mb-1">Expert</h4>
                <p className="text-xs text-amber-700">Become a trusted source of accurate information</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-amber-600 font-bold">4</span>
                </div>
                <h4 className="font-medium text-amber-800 mb-1">Mentor</h4>
                <p className="text-xs text-amber-700">Guide newcomers and shape community standards</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Actions That Build Reputation</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Providing helpful, accurate answers</li>
                <li>• Sharing successful care techniques</li>
                <li>• Contributing high-quality photos</li>
                <li>• Mentoring new community members</li>
                <li>• Participating in community challenges</li>
                <li>• Reporting and improving content quality</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Recognition & Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Expert badges and verification</li>
                <li>• Featured content opportunities</li>
                <li>• Early access to new features</li>
                <li>• Community leadership roles</li>
                <li>• Consultation opportunities</li>
                <li>• Annual community awards</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Checklist */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-800">Your Community Journey Starts Here!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-800 mb-3">Week 1: Getting Oriented</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Complete your profile setup</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Read community guidelines</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Join relevant discussion groups</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Introduce yourself to the community</span>
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-3">Week 2: Active Participation</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Ask your first question</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Help answer someone else's question</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Share a photo of your orchid</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Follow 5 experienced growers</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GettingStartedCommunity;
