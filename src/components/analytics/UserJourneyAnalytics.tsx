
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserPlus, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { userAnalytics } from '@/utils/userAnalytics';
import LoadingSpinner from '@/components/LoadingSpinner';

interface FunnelStep {
  name: string;
  users: number;
  conversionRate: number;
  dropOffRate: number;
}

const UserJourneyAnalytics: React.FC = () => {
  const [funnelData, setFunnelData] = useState<FunnelStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [engagementMetrics, setEngagementMetrics] = useState({
    averageScore: 0,
    highEngagement: 0,
    churnRisk: 0
  });

  useEffect(() => {
    loadJourneyData();
  }, []);

  const loadJourneyData = async () => {
    try {
      setLoading(true);
      
      // Mock funnel data - in real implementation would come from analytics
      const mockFunnelData: FunnelStep[] = [
        { name: 'Visited Landing Page', users: 10000, conversionRate: 100, dropOffRate: 0 },
        { name: 'Started Registration', users: 2500, conversionRate: 25, dropOffRate: 75 },
        { name: 'Completed Registration', users: 1800, conversionRate: 72, dropOffRate: 28 },
        { name: 'First Identification', users: 1260, conversionRate: 70, dropOffRate: 30 },
        { name: 'Saved First Orchid', users: 945, conversionRate: 75, dropOffRate: 25 },
        { name: 'Premium Upgrade', users: 189, conversionRate: 20, dropOffRate: 80 }
      ];

      setFunnelData(mockFunnelData);
      
      // Mock engagement metrics
      setEngagementMetrics({
        averageScore: 67.5,
        highEngagement: 28.3,
        churnRisk: 15.2
      });
    } catch (error) {
      console.error('Failed to load journey data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading user journey analytics..." />;

  const getStepIcon = (stepName: string) => {
    if (stepName.includes('Landing')) return <Users className="w-5 h-5 text-blue-600" />;
    if (stepName.includes('Registration')) return <UserPlus className="w-5 h-5 text-green-600" />;
    if (stepName.includes('Identification')) return <Target className="w-5 h-5 text-purple-600" />;
    if (stepName.includes('Premium')) return <TrendingUp className="w-5 h-5 text-yellow-600" />;
    return <CheckCircle className="w-5 h-5 text-gray-600" />;
  };

  const getConversionColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600';
    if (rate >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Engagement Score</p>
                <p className="text-2xl font-bold">{engagementMetrics.averageScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Engagement</p>
                <p className="text-2xl font-bold">{engagementMetrics.highEngagement}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Churn Risk</p>
                <p className="text-2xl font-bold">{engagementMetrics.churnRisk}%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>User Journey Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((step, index) => {
              const isFirst = index === 0;
              const previousStep = funnelData[index - 1];
              const stepConversion = isFirst ? 100 : (step.users / previousStep.users) * 100;
              
              return (
                <div key={step.name} className="relative">
                  {!isFirst && (
                    <div className="absolute -top-2 left-6 w-0.5 h-4 bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      {getStepIcon(step.name)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{step.name}</h3>
                        <div className="text-right">
                          <div className="font-bold">{step.users.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">users</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Step conversion</span>
                            <span className={getConversionColor(stepConversion)}>
                              {stepConversion.toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={stepConversion} className="h-2" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall conversion</span>
                            <span className={getConversionColor(step.conversionRate)}>
                              {step.conversionRate.toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={step.conversionRate} className="h-2" />
                        </div>
                      </div>
                      
                      {step.dropOffRate > 60 && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                          <AlertTriangle className="w-4 h-4" />
                          High drop-off rate: {step.dropOffRate}% of users leave at this step
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

      {/* Engagement Segmentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { segment: 'Highly Engaged', percentage: 28.3, color: 'bg-green-500', users: 4420 },
                { segment: 'Moderately Engaged', percentage: 45.2, color: 'bg-blue-500', users: 7056 },
                { segment: 'Low Engagement', percentage: 26.5, color: 'bg-yellow-500', users: 4134 }
              ].map((seg) => (
                <div key={seg.segment} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${seg.color}`}></div>
                    <span className="font-medium">{seg.segment}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{seg.percentage}%</div>
                    <div className="text-sm text-gray-500">{seg.users.toLocaleString()} users</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Churn Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { risk: 'High Risk', percentage: 15.2, color: 'bg-red-500', action: 'Immediate intervention needed' },
                { risk: 'Medium Risk', percentage: 22.8, color: 'bg-yellow-500', action: 'Monitor closely' },
                { risk: 'Low Risk', percentage: 62.0, color: 'bg-green-500', action: 'Maintain engagement' }
              ].map((risk) => (
                <div key={risk.risk} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                      <span className="font-medium">{risk.risk}</span>
                    </div>
                    <Badge variant="outline">{risk.percentage}%</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{risk.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserJourneyAnalytics;
