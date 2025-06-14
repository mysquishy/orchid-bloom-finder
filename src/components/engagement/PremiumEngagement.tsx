
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Crown,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Zap,
  Video,
  Award,
  Settings,
  BarChart3
} from 'lucide-react';

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  usageCount: number;
  usageLimit: number;
  popularityScore: number;
  isActive: boolean;
}

interface ExclusiveContent {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'webinar';
  expertName: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  views: number;
  rating: number;
  isNew: boolean;
}

interface BetaFeature {
  id: string;
  name: string;
  description: string;
  status: 'testing' | 'feedback' | 'launching';
  participants: number;
  feedback: number;
  estimatedLaunch: string;
}

interface VipCommunity {
  totalMembers: number;
  activeMembers: number;
  monthlyEvents: number;
  exclusiveContent: number;
  responseTime: string;
  satisfactionScore: number;
}

interface ConsultationBooking {
  id: string;
  expertName: string;
  specialty: string;
  date: string;
  duration: string;
  price: number;
  isBooked: boolean;
  rating: number;
}

const PremiumEngagement: React.FC = () => {
  const [premiumFeatures] = useState<PremiumFeature[]>([
    {
      id: '1',
      name: 'AI Health Analysis',
      description: 'Advanced AI-powered plant health diagnostics',
      usageCount: 156,
      usageLimit: -1, // Unlimited
      popularityScore: 94,
      isActive: true
    },
    {
      id: '2',
      name: 'Expert Consultations',
      description: 'One-on-one sessions with orchid experts',
      usageCount: 12,
      usageLimit: 20,
      popularityScore: 89,
      isActive: true
    },
    {
      id: '3',
      name: 'Advanced Analytics',
      description: 'Detailed insights and growth predictions',
      usageCount: 45,
      usageLimit: -1,
      popularityScore: 76,
      isActive: true
    },
    {
      id: '4',
      name: 'Priority Support',
      description: '24/7 premium customer support',
      usageCount: 8,
      usageLimit: -1,
      popularityScore: 92,
      isActive: true
    }
  ]);

  const [exclusiveContent] = useState<ExclusiveContent[]>([
    {
      id: '1',
      title: 'Master Class: Orchid Breeding Secrets',
      type: 'video',
      expertName: 'Dr. Maria Santos',
      duration: '45 min',
      difficulty: 'expert',
      views: 2340,
      rating: 4.9,
      isNew: true
    },
    {
      id: '2',
      title: 'Advanced Propagation Techniques',
      type: 'course',
      expertName: 'Master John Kim',
      duration: '3 hours',
      difficulty: 'advanced',
      views: 1567,
      rating: 4.8,
      isNew: false
    },
    {
      id: '3',
      title: 'Climate Control Mastery',
      type: 'webinar',
      expertName: 'Expert Sarah Chen',
      duration: '60 min',
      difficulty: 'intermediate',
      views: 890,
      rating: 4.7,
      isNew: true
    }
  ]);

  const [betaFeatures] = useState<BetaFeature[]>([
    {
      id: '1',
      name: 'AI Bloom Predictor',
      description: 'Predict when your orchids will bloom with 95% accuracy',
      status: 'testing',
      participants: 234,
      feedback: 89,
      estimatedLaunch: '2024-04-15'
    },
    {
      id: '2',
      name: 'Virtual Reality Garden',
      description: 'Immersive VR experience for orchid care learning',
      status: 'feedback',
      participants: 67,
      feedback: 45,
      estimatedLaunch: '2024-06-01'
    },
    {
      id: '3',
      name: 'Smart Watering Scheduler',
      description: 'IoT-integrated watering recommendations',
      status: 'launching',
      participants: 156,
      feedback: 132,
      estimatedLaunch: '2024-03-30'
    }
  ]);

  const [vipCommunity] = useState<VipCommunity>({
    totalMembers: 1247,
    activeMembers: 892,
    monthlyEvents: 8,
    exclusiveContent: 156,
    responseTime: '< 2 hours',
    satisfactionScore: 96
  });

  const [consultationBookings] = useState<ConsultationBooking[]>([
    {
      id: '1',
      expertName: 'Dr. Elena Rodriguez',
      specialty: 'Disease Treatment',
      date: '2024-03-25',
      duration: '30 min',
      price: 75,
      isBooked: false,
      rating: 4.9
    },
    {
      id: '2',
      expertName: 'Master Chen Liu',
      specialty: 'Breeding & Genetics',
      date: '2024-03-28',
      duration: '45 min',
      price: 120,
      isBooked: true,
      rating: 4.8
    }
  ]);

  const getContentTypeIcon = (type: ExclusiveContent['type']) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-red-500" />;
      case 'article': return <Award className="w-4 h-4 text-blue-500" />;
      case 'course': return <Star className="w-4 h-4 text-purple-500" />;
      case 'webinar': return <Users className="w-4 h-4 text-green-500" />;
    }
  };

  const getDifficultyColor = (difficulty: ExclusiveContent['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusColor = (status: BetaFeature['status']) => {
    switch (status) {
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'feedback': return 'bg-blue-100 text-blue-800';
      case 'launching': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Premium Engagement</h3>
          <p className="text-gray-600">Exclusive features and content for premium subscribers</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Crown className="w-4 h-4 mr-2" />
          Premium Analytics
        </Button>
      </div>

      {/* Premium Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{vipCommunity.totalMembers}</div>
            <div className="text-sm text-gray-600">Premium Members</div>
            <div className="text-xs text-purple-700 mt-1">
              {((vipCommunity.activeMembers / vipCommunity.totalMembers) * 100).toFixed(1)}% active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{vipCommunity.satisfactionScore}%</div>
            <div className="text-sm text-gray-600">Satisfaction Score</div>
            <div className="text-xs text-green-700 mt-1">+3% vs last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{vipCommunity.responseTime}</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-xs text-blue-700 mt-1">Premium support</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{vipCommunity.exclusiveContent}</div>
            <div className="text-sm text-gray-600">Exclusive Content</div>
            <div className="text-xs text-orange-700 mt-1">+12 this month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Premium Feature Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Premium Feature Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {premiumFeatures.map((feature) => (
                <div key={feature.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                    <Switch checked={feature.isActive} readOnly />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">
                        {feature.usageLimit === -1 ? '∞' : `${feature.usageCount}/${feature.usageLimit}`}
                      </div>
                      <div className="text-xs text-blue-800">Usage</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{feature.popularityScore}%</div>
                      <div className="text-xs text-green-800">Popularity</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600">
                        {feature.usageLimit === -1 ? '100' : Math.round((feature.usageCount / feature.usageLimit) * 100)}%
                      </div>
                      <div className="text-xs text-purple-800">Utilization</div>
                    </div>
                  </div>

                  {feature.usageLimit !== -1 && (
                    <Progress value={(feature.usageCount / feature.usageLimit) * 100} className="h-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exclusive Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              Exclusive Content Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exclusiveContent.map((content) => (
                <div key={content.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(content.type)}
                      <div>
                        <div className="font-medium">{content.title}</div>
                        <div className="text-sm text-gray-600">by {content.expertName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {content.isNew && <Badge className="bg-red-100 text-red-800">New</Badge>}
                      <Badge className={getDifficultyColor(content.difficulty)}>
                        {content.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="font-bold text-gray-700">{content.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-700">{content.views}</div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-700">{content.rating}</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    {content.type === 'video' ? 'Watch Now' : 
                     content.type === 'course' ? 'Start Course' : 
                     content.type === 'webinar' ? 'Join Webinar' : 'Read Article'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Beta Feature Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Beta Feature Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {betaFeatures.map((feature) => (
                <div key={feature.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                    <Badge className={getStatusColor(feature.status)}>
                      {feature.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{feature.participants}</div>
                      <div className="text-xs text-blue-800">Participants</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{feature.feedback}</div>
                      <div className="text-xs text-green-800">Feedback</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>Launch: {new Date(feature.estimatedLaunch).toLocaleDateString()}</span>
                    <Button size="sm" variant="outline">
                      {feature.status === 'testing' ? 'Join Beta' : 
                       feature.status === 'feedback' ? 'Give Feedback' : 'Coming Soon'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consultation Booking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Expert Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultationBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{booking.expertName}</div>
                      <div className="text-sm text-gray-600">{booking.specialty}</div>
                    </div>
                    <Badge variant={booking.isBooked ? 'default' : 'outline'}>
                      {booking.isBooked ? 'Booked' : 'Available'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="font-bold text-gray-700">{booking.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-700">${booking.price}</div>
                      <div className="text-xs text-gray-500">Price</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-700">{booking.rating}</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                    <Button size="sm" disabled={booking.isBooked}>
                      {booking.isBooked ? 'Booked' : 'Book Session'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VIP Community Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-500" />
            VIP Community Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium mb-3">Engagement Metrics</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active participation rate</span>
                  <span className="font-medium">
                    {((vipCommunity.activeMembers / vipCommunity.totalMembers) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly events attendance</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Content consumption rate</span>
                  <span className="font-medium">85%</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Premium Benefits</h5>
              <div className="space-y-2">
                <div className="p-2 bg-purple-50 rounded text-center">
                  <div className="font-bold text-purple-600">{vipCommunity.monthlyEvents}</div>
                  <div className="text-xs text-purple-800">Exclusive events/month</div>
                </div>
                <div className="p-2 bg-blue-50 rounded text-center">
                  <div className="font-bold text-blue-600">{vipCommunity.responseTime}</div>
                  <div className="text-xs text-blue-800">Priority support</div>
                </div>
                <div className="p-2 bg-green-50 rounded text-center">
                  <div className="font-bold text-green-600">{vipCommunity.exclusiveContent}</div>
                  <div className="text-xs text-green-800">Exclusive content pieces</div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Satisfaction & Growth</h5>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall satisfaction</span>
                    <span>{vipCommunity.satisfactionScore}%</span>
                  </div>
                  <Progress value={vipCommunity.satisfactionScore} className="h-2" />
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <div className="font-bold text-yellow-600">+23%</div>
                  <div className="text-xs text-yellow-800">Premium retention vs standard</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumEngagement;
