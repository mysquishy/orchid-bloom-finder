
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flower, Camera, Heart, Star, Users, Brain, BarChart3, Building } from 'lucide-react';

const WelcomeToOrkhidly: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Flower className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          Welcome to Orkhidly 2.0!
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our enhanced AI identification with community validation, expert-verified content, 
          advanced analytics, and professional business tools. Join thousands of orchid enthusiasts 
          growing together!
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge className="bg-green-100 text-green-800">
            <Star className="w-4 h-4 mr-1" />
            Community Features
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">Enhanced AI Testing</Badge>
          <Badge className="bg-purple-100 text-purple-800">Business Tools</Badge>
        </div>
      </div>

      {/* What's New in 2.0 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">What's New in Orkhidly 2.0?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Orkhidly 2.0 introduces groundbreaking features that combine advanced AI technology with 
            the power of community knowledge and professional-grade tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-800">Community Validation</h4>
                  <p className="text-sm text-green-700">Get your identifications verified by fellow enthusiasts and experts</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-800">Enhanced AI Testing</h4>
                  <p className="text-sm text-blue-700">Contribute to model improvements and track accuracy metrics</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-purple-800">Advanced Analytics</h4>
                  <p className="text-sm text-purple-700">Track care success, seasonal patterns, and optimization insights</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Building className="w-8 h-8 text-gray-600" />
                <div>
                  <h4 className="font-semibold text-gray-800">Business Tools</h4>
                  <p className="text-sm text-gray-700">Professional features for nurseries and commercial operations</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Features Enhanced */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Enhanced Core Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800 mb-1">Smart AI Identification</h4>
              <p className="text-sm text-green-700">
                95%+ accuracy with community validation and expert verification
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800 mb-1">Data-Driven Care</h4>
              <p className="text-sm text-purple-700">
                Analytics-powered care schedules with community success tracking
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800 mb-1">Expert Network</h4>
              <p className="text-sm text-blue-700">
                Connect with verified botanists and professional growers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Your Orkhidly 2.0 Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Enhanced Identification</h4>
                <p className="text-gray-600">Take photos and get AI results with confidence scores, then validate with our community</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Join the Community</h4>
                <p className="text-gray-600">Connect with fellow enthusiasts, ask questions, and share your growing experiences</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Explore Analytics</h4>
                <p className="text-gray-600">Track your care success, discover trends, and optimize your growing techniques</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Contribute & Grow</h4>
                <p className="text-gray-600">Help improve our AI models and become part of our expert verification program</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Spirit */}
      <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
        <CardContent className="text-center py-8">
          <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Growing Together in Community
          </h3>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Orkhidly 2.0 isn't just about technology – it's about bringing orchid lovers together to share knowledge, 
            validate discoveries, and help each other succeed. Whether you're just starting or you're a seasoned expert, 
            there's a place for you in our growing community.
          </p>
          <p className="text-green-700 font-medium">
            Ready to explore? Let's take your first community-validated photo! 📸✨
          </p>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Explore Your Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-green-600">📷</span>
              <span className="font-medium">Try community-validated identification</span>
              <Badge className="bg-green-100 text-green-800 ml-auto">New</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-purple-600">👥</span>
              <span className="font-medium">Join community discussions and Q&A</span>
              <Badge className="bg-purple-100 text-purple-800 ml-auto">Popular</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-blue-600">📊</span>
              <span className="font-medium">Explore your analytics dashboard</span>
              <Badge className="bg-blue-100 text-blue-800 ml-auto">Premium</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-amber-600">🔬</span>
              <span className="font-medium">Contribute to AI testing and validation</span>
              <Badge className="bg-amber-100 text-amber-800 ml-auto">Advanced</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeToOrkhidly;
