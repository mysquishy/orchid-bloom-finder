
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingDown, 
  Users, 
  UserPlus,
  Search,
  Crown,
  Repeat
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface FunnelStep {
  step_name: string;
  users: number;
  conversion_rate: number;
  drop_off_rate: number;
}

const ConversionFunnelAnalysis: React.FC = () => {
  const { data: funnelData, isLoading } = useQuery({
    queryKey: ['conversion-funnel'],
    queryFn: async () => {
      // Mock data for conversion funnel - in real app would query conversion_funnel table
      const funnelSteps: FunnelStep[] = [
        { step_name: 'Landing Page Visit', users: 10000, conversion_rate: 100, drop_off_rate: 0 },
        { step_name: 'Sign Up', users: 2500, conversion_rate: 25, drop_off_rate: 75 },
        { step_name: 'First Identification', users: 1750, conversion_rate: 70, drop_off_rate: 30 },
        { step_name: 'Premium Upgrade', users: 175, conversion_rate: 10, drop_off_rate: 90 },
        { step_name: 'Week 1 Retention', users: 140, conversion_rate: 80, drop_off_rate: 20 },
      ];
      return funnelSteps;
    },
    refetchInterval: 300000, // 5 minutes
  });

  if (isLoading) return <LoadingSpinner text="Loading funnel analysis..." />;

  const getStepIcon = (stepName: string) => {
    switch (stepName) {
      case 'Landing Page Visit': return <Users className="w-5 h-5 text-blue-600" />;
      case 'Sign Up': return <UserPlus className="w-5 h-5 text-green-600" />;
      case 'First Identification': return <Search className="w-5 h-5 text-purple-600" />;
      case 'Premium Upgrade': return <Crown className="w-5 h-5 text-yellow-600" />;
      case 'Week 1 Retention': return <Repeat className="w-5 h-5 text-orange-600" />;
      default: return <Users className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConversionColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600';
    if (rate >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 70) return 'bg-green-500';
    if (rate >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Funnel Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Conversion Funnel Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {funnelData?.map((step, index) => {
              const isFirst = index === 0;
              const previousStep = funnelData[index - 1];
              const conversionFromPrevious = isFirst ? 100 : (step.users / previousStep.users) * 100;
              
              return (
                <div key={step.step_name} className="relative">
                  {/* Connection line */}
                  {!isFirst && (
                    <div className="absolute -top-3 left-8 w-0.5 h-6 bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getStepIcon(step.step_name)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{step.step_name}</h3>
                        <div className="text-right">
                          <div className="font-bold text-lg">{step.users.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">users</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Conversion from previous</span>
                            <span className={getConversionColor(conversionFromPrevious)}>
                              {conversionFromPrevious.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(conversionFromPrevious)}`}
                              style={{ width: `${Math.min(conversionFromPrevious, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall conversion rate</span>
                            <span className={getConversionColor(step.conversion_rate)}>
                              {step.conversion_rate.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(step.conversion_rate)}`}
                              style={{ width: `${step.conversion_rate}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {step.drop_off_rate > 50 && (
                        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                          ⚠️ High drop-off rate: {step.drop_off_rate}% of users leave at this step
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Critical: Premium Upgrade</h4>
              <p className="text-red-700 text-sm mb-2">
                Only 10% conversion from first identification to premium upgrade. This is a major revenue bottleneck.
              </p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Implement more compelling premium features showcase</li>
                <li>• Add limited-time upgrade incentives</li>
                <li>• A/B test different pricing strategies</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Improve: Sign Up Conversion</h4>
              <p className="text-yellow-700 text-sm mb-2">
                75% drop-off from landing to signup. Consider reducing friction in the registration process.
              </p>
              <ul className="text-sm text-yellow-600 space-y-1">
                <li>• Simplify signup form (reduce required fields)</li>
                <li>• Add social login options</li>
                <li>• Improve value proposition on landing page</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Good: First Identification</h4>
              <p className="text-green-700 text-sm">
                70% of users who sign up complete their first identification. This shows good product-market fit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionFunnelAnalysis;
