
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradePromptProps {
  title?: string;
  description?: string;
  features?: string[];
  compact?: boolean;
  className?: string;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ 
  title = "Unlock Premium Features",
  description = "Get unlimited access to all OrchidAI features with zero API costs",
  features = [
    "Unlimited plant identifications",
    "Disease detection & treatment",
    "Advanced analytics & insights",
    "Weather integration",
    "Export reports & data"
  ],
  compact = false,
  className = ""
}) => {
  const navigate = useNavigate();

  if (compact) {
    return (
      <Card className={`border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-green-50 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                <p className="text-xs text-gray-600">{description}</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/pricing')}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
            >
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-green-50 ${className}`}>
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-left">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={() => navigate('/pricing')}
          className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
          size="lg"
        >
          <Crown className="mr-2 h-5 w-5" />
          Upgrade to Premium - $9.99/month
        </Button>
        
        <p className="text-xs text-gray-500 mt-3">
          Cancel anytime • 30-day money-back guarantee
        </p>
      </CardContent>
    </Card>
  );
};

export default UpgradePrompt;
