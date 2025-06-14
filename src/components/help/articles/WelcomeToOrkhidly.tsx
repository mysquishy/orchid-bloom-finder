
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flower, Camera, Heart, Star } from 'lucide-react';

const WelcomeToOrkhidly: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Flower className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          Welcome to Orkhidly!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're thrilled you've joined our community of orchid enthusiasts. Let's get you started on your beautiful orchid journey!
        </p>
        <Badge variant="secondary" className="text-sm">
          <Star className="w-4 h-4 mr-1" />
          Beginner Friendly
        </Badge>
      </div>

      {/* What is Orkhidly */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">What is Orkhidly?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Orkhidly is your AI-powered orchid companion that helps you identify, care for, and grow beautiful orchids with confidence. 
            Whether you're a complete beginner or an experienced grower, we're here to support your orchid journey every step of the way.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800 mb-1">AI Identification</h4>
              <p className="text-sm text-green-700">Instantly identify any orchid with just a photo</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800 mb-1">Personalized Care</h4>
              <p className="text-sm text-purple-700">Get custom care schedules for each plant</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800 mb-1">Track Progress</h4>
              <p className="text-sm text-blue-700">Monitor growth and celebrate achievements</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Take Your First Photo</h4>
                <p className="text-gray-600">Use the camera feature to snap a clear photo of your orchid's flower or leaves.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Get Instant Results</h4>
                <p className="text-gray-600">Our AI will identify your orchid species and provide detailed information.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Start Your Collection</h4>
                <p className="text-gray-600">Add identified orchids to your personal garden and begin tracking their care.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Follow Care Guidance</h4>
                <p className="text-gray-600">Receive personalized watering, lighting, and feeding schedules for each orchid.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encouraging Message */}
      <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Don't worry if you're new to orchids!
          </h3>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Orchid care might seem intimidating at first, but with Orkhidly's guidance and our supportive community, 
            you'll be growing healthy, blooming orchids in no time. We're here to help you succeed, one step at a time.
          </p>
          <p className="text-green-700 font-medium">
            Ready to begin? Let's take your first orchid photo! 📸
          </p>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-green-600">📷</span>
              <span className="font-medium">Learn how to take perfect orchid photos</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-purple-600">🌱</span>
              <span className="font-medium">Discover basic orchid care principles</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-blue-600">⚙️</span>
              <span className="font-medium">Set up your account preferences</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeToOrkhidly;
