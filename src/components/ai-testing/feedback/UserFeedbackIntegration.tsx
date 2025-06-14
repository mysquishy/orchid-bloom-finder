
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserFeedback } from '@/utils/aiTestingTypes';

const UserFeedbackIntegration: React.FC = () => {
  const [feedbacks] = useState<UserFeedback[]>([
    {
      id: '1',
      testId: 'test-1',
      userId: 'user-1',
      rating: 4,
      comment: 'Very accurate identification',
      timestamp: '2025-06-14T10:00:00Z',
      category: 'accuracy'
    }
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">User Feedback Integration</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge>{feedback.category}</Badge>
                  <span className="text-sm text-gray-500">Rating: {feedback.rating}/5</span>
                </div>
                <p className="text-sm">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserFeedbackIntegration;
