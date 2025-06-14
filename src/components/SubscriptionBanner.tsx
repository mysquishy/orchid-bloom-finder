
import React from 'react';
import { Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

const SubscriptionBanner = () => {
  const { subscribed, remainingIdentifications, canIdentify } = useSubscription();
  const navigate = useNavigate();

  if (subscribed) return null;

  return (
    <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-green-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {canIdentify ? `${remainingIdentifications} free identifications remaining` : 'Free limit reached'}
              </h3>
              <p className="text-sm text-gray-600">
                {canIdentify 
                  ? 'Upgrade to Premium for unlimited identifications and advanced features'
                  : 'Upgrade to Premium to continue identifying plants'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              <Zap className="w-3 h-3" />
              <span>Zero API costs</span>
            </div>
            <Button 
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionBanner;
