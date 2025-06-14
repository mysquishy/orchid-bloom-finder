import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, AlertCircle, CheckCircle, MessageSquare, Star } from 'lucide-react';

interface FeedbackItem {
  id: string;
  imageUrl: string;
  originalPrediction: string;
  userCorrection?: string;
  feedbackType: 'correct' | 'incorrect' | 'uncertain';
  confidence: number;
  userType: 'expert' | 'community' | 'beginner';
  timestamp: string;
  comments?: string;
  verified: boolean;
}

interface FeedbackStats {
  totalFeedback: number;
  correctRate: number;
  incorrectRate: number;
  uncertainRate: number;
  expertAgreementRate: number;
}

const FeedbackCollectionSystem: React.FC = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'verified' | 'disputed'>('all');

  useEffect(() => {
    // Mock feedback data
    const mockFeedback: FeedbackItem[] = [
      {
        id: '1',
        imageUrl: '/api/placeholder/200/200',
        originalPrediction: 'Phalaenopsis amabilis',
        userCorrection: undefined,
        feedbackType: 'correct',
        confidence: 0.92,
        userType: 'expert',
        timestamp: '2025-06-14T10:30:00Z',
        comments: 'Excellent identification. Clear flower structure visible.',
        verified: true
      },
      {
        id: '2',
        imageUrl: '/api/placeholder/200/200',
        originalPrediction: 'Cattleya trianae',
        userCorrection: 'Cattleya warscewiczii',
        feedbackType: 'incorrect',
        confidence: 0.78,
        userType: 'expert',
        timestamp: '2025-06-14T09:15:00Z',
        comments: 'Lip pattern suggests warscewiczii variety.',
        verified: false
      },
      {
        id: '3',
        imageUrl: '/api/placeholder/200/200',
        originalPrediction: 'Dendrobium nobile',
        userCorrection: undefined,
        feedbackType: 'uncertain',
        confidence: 0.65,
        userType: 'community',
        timestamp: '2025-06-14T08:45:00Z',
        comments: 'Could be nobile or similar species. Need expert review.',
        verified: false
      },
      {
        id: '4',
        imageUrl: '/api/placeholder/200/200',
        originalPrediction: 'Oncidium flexuosum',
        userCorrection: undefined,
        feedbackType: 'correct',
        confidence: 0.89,
        userType: 'community',
        timestamp: '2025-06-14T07:20:00Z',
        comments: 'Matches perfectly with my plant.',
        verified: true
      },
      {
        id: '5',
        imageUrl: '/api/placeholder/200/200',
        originalPrediction: 'Vanda coerulea',
        userCorrection: 'Vanda tessellata',
        feedbackType: 'incorrect',
        confidence: 0.71,
        userType: 'beginner',
        timestamp: '2025-06-14T06:00:00Z',
        comments: 'Different color pattern than what I see.',
        verified: false
      }
    ];

    const mockStats: FeedbackStats = {
      totalFeedback: 2847,
      correctRate: 87.2,
      incorrectRate: 8.1,
      uncertainRate: 4.7,
      expertAgreementRate: 94.6
    };

    setFeedbackItems(mockFeedback);
    setStats(mockStats);
  }, []);

  const handleVerifyFeedback = (feedbackId: string, verified: boolean) => {
    setFeedbackItems(prev =>
      prev.map(item =>
        item.id === feedbackId ? { ...item, verified } : item
      )
    );
  };

  const getFeedbackIcon = (type: FeedbackItem['feedbackType']) => {
    switch (type) {
      case 'correct': return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case 'incorrect': return <ThumbsDown className="w-4 h-4 text-red-600" />;
      case 'uncertain': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getFeedbackColor = (type: FeedbackItem['feedbackType']) => {
    switch (type) {
      case 'correct': return 'bg-green-100 text-green-800';
      case 'incorrect': return 'bg-red-100 text-red-800';
      case 'uncertain': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getUserTypeColor = (type: FeedbackItem['userType']) => {
    switch (type) {
      case 'expert': return 'bg-purple-100 text-purple-800';
      case 'community': return 'bg-blue-100 text-blue-800';
      case 'beginner': return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFeedback = feedbackItems.filter(item => {
    switch (selectedFilter) {
      case 'pending': return !item.verified;
      case 'verified': return item.verified;
      case 'disputed': return item.feedbackType === 'incorrect' || item.feedbackType === 'uncertain';
      default: return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Feedback Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalFeedback.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Feedback</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.correctRate}%</div>
              <div className="text-sm text-gray-600">Correct Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.incorrectRate}%</div>
              <div className="text-sm text-gray-600">Incorrect Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.uncertainRate}%</div>
              <div className="text-sm text-gray-600">Uncertain Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.expertAgreementRate}%</div>
              <div className="text-sm text-gray-600">Expert Agreement</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feedback Filters */}
      <Card>
        <CardHeader>
          <CardTitle>User Feedback Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-6">
            {[
              { key: 'all', label: 'All Feedback' },
              { key: 'pending', label: 'Pending Review' },
              { key: 'verified', label: 'Verified' },
              { key: 'disputed', label: 'Disputed' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter.key as any)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Feedback Items */}
          <div className="space-y-4">
            {filteredFeedback.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.imageUrl}
                    alt="Orchid identification"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Original: {item.originalPrediction}
                        </h4>
                        {item.userCorrection && (
                          <p className="text-sm text-blue-600">
                            Corrected to: {item.userCorrection}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">
                            Confidence: {(item.confidence * 100).toFixed(0)}%
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getFeedbackIcon(item.feedbackType)}
                        <Badge className={getFeedbackColor(item.feedbackType)}>
                          {item.feedbackType}
                        </Badge>
                        <Badge className={getUserTypeColor(item.userType)}>
                          {item.userType}
                        </Badge>
                        {item.verified && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    
                    {item.comments && (
                      <div className="bg-gray-50 rounded p-3">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                          <p className="text-sm text-gray-700">{item.comments}</p>
                        </div>
                      </div>
                    )}
                    
                    {!item.verified && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerifyFeedback(item.id, true)}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerifyFeedback(item.id, false)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Dispute
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expert Verification System */}
      <Card>
        <CardHeader>
          <CardTitle>Expert Verification System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Verification Queue</h4>
              <div className="space-y-2">
                {feedbackItems.filter(item => !item.verified && item.feedbackType !== 'correct').map((item) => (
                  <div key={item.id} className="p-3 border rounded flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.imageUrl}
                        alt="Orchid"
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.originalPrediction}</p>
                        {item.userCorrection && (
                          <p className="text-xs text-blue-600">→ {item.userCorrection}</p>
                        )}
                        <Badge className={getUserTypeColor(item.userType)}>
                          {item.userType}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Expert Panel Status</h4>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Sarah Chen', specialty: 'Phalaenopsis', status: 'active', reviews: 245 },
                  { name: 'Prof. Michael Torres', specialty: 'Cattleya', status: 'active', reviews: 189 },
                  { name: 'Dr. Emma Johnson', specialty: 'Dendrobium', status: 'busy', reviews: 156 },
                  { name: 'Dr. David Kim', specialty: 'Oncidium', status: 'offline', reviews: 98 }
                ].map((expert) => (
                  <div key={expert.name} className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{expert.name}</h5>
                      <Badge className={
                        expert.status === 'active' ? 'bg-green-100 text-green-800' :
                        expert.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {expert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Specialty: {expert.specialty}</p>
                    <p className="text-xs text-gray-500">{expert.reviews} reviews completed</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Validation */}
      <Card>
        <CardHeader>
          <CardTitle>Community Validation System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Pending Community Votes</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">Community Agreement Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2,341</div>
              <div className="text-sm text-gray-600">Active Community Validators</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-4">Top Community Contributors</h4>
            <div className="space-y-2">
              {[
                { user: 'OrchidMaster2024', validations: 456, accuracy: 94 },
                { user: 'PlantExpert_Sarah', validations: 389, accuracy: 92 },
                { user: 'FlowerLover123', validations: 278, accuracy: 88 },
                { user: 'BotanicalBob', validations: 234, accuracy: 91 }
              ].map((contributor) => (
                <div key={contributor.user} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{contributor.user}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{contributor.validations} validations</span>
                    <Badge variant="outline">{contributor.accuracy}% accuracy</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackCollectionSystem;
