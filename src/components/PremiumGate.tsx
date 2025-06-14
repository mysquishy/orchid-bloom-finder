
import React from 'react';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumGateProps {
  feature: 'identification' | 'disease-detection' | 'analytics' | 'weather' | 'export' | 'collection';
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgrade?: boolean;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ 
  feature, 
  children, 
  fallback, 
  showUpgrade = true 
}) => {
  const { checkFeatureAccess } = usePremiumAccess();
  const navigate = useNavigate();
  const access = checkFeatureAccess(feature);

  if (access.hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const getFeatureTitle = () => {
    switch (feature) {
      case 'identification': return 'Plant Identification';
      case 'disease-detection': return 'Disease Detection';
      case 'analytics': return 'Advanced Analytics';
      case 'weather': return 'Weather Integration';
      case 'export': return 'Export Reports';
      case 'collection': return 'Unlimited Collection';
      default: return 'Premium Feature';
    }
  };

  const getFeatureDescription = () => {
    switch (feature) {
      case 'identification': 
        return access.reason === 'limit-exceeded' 
          ? 'You\'ve used all 3 free identifications this month. Upgrade for unlimited access!'
          : 'Get unlimited plant identifications with premium access.';
      case 'disease-detection': 
        return 'Detect plant diseases and get treatment recommendations with AI-powered analysis.';
      case 'analytics': 
        return 'Get detailed insights into your plant care patterns and health trends.';
      case 'weather': 
        return 'Receive personalized care recommendations based on local weather conditions.';
      case 'export': 
        return 'Export your plant care data and reports in various formats.';
      case 'collection': 
        return 'Build an unlimited collection of your favorite plants and care notes.';
      default: 
        return 'This premium feature requires an active subscription.';
    }
  };

  if (!showUpgrade) {
    return (
      <div className="text-center py-8">
        <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
        <p className="text-gray-600">{getFeatureDescription()}</p>
      </div>
    );
  }

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-green-50">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">
          Unlock {getFeatureTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-6">
          {getFeatureDescription()}
        </p>
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/pricing')}
            className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
            size="lg"
          >
            <Crown className="mr-2 h-5 w-5" />
            Upgrade to Premium
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-green-600">
            <Zap className="w-4 h-4" />
            <span>Zero API costs • 94% profit margin</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumGate;
