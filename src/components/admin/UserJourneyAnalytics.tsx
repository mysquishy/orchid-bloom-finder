
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  UserX, 
  Target,
  Calendar,
  DollarSign,
  Activity,
  ArrowUpDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface UserJourneyStage {
  stage: string;
  users: number;
  conversionRate: number;
  avgTimeToNext: number;
  dropOffReasons: string[];
}

interface CohortData {
  month: string;
  week0: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

interface ChurnPrediction {
  userId: string;
  userName: string;
  churnRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  lastActivity: string;
  predictedChurnDate: string;
  interventionRecommended: string;
}

const UserJourneyAnalytics: React.FC = () => {
  const [journeyData, setJourneyData] = useState<UserJourneyStage[]>([]);
  const [cohortData, setCohortData] = useState<CohortData[]>([]);
  const [churnPredictions, setChurnPredictions] = useState<ChurnPrediction[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    // Mock user journey data
    setJourneyData([
      {
        stage: 'Sign Up',
        users: 1000,
        conversionRate: 100,
        avgTimeToNext: 0,
        dropOffReasons: []
      },
      {
        stage: 'First Identification',
        users: 750,
        conversionRate: 75,
        avgTimeToNext: 2.5,
        dropOffReasons: ['Complex onboarding', 'Poor image quality', 'No clear CTA']
      },
      {
        stage: 'Add to Collection',
        users: 450,
        conversionRate: 60,
        avgTimeToNext: 4.2,
        dropOffReasons: ['Confusion about collections', 'Missing feature discovery']
      },
      {
        stage: 'Premium Trial',
        users: 180,
        conversionRate: 40,
        avgTimeToNext: 7.8,
        dropOffReasons: ['Price sensitivity', 'Insufficient value demonstration']
      },
      {
        stage: 'Premium Subscription',
        users: 108,
        conversionRate: 60,
        avgTimeToNext: 14.5,
        dropOffReasons: ['Payment friction', 'Feature limitations']
      },
      {
        stage: 'Expert User',
        users: 65,
        conversionRate: 60,
        avgTimeToNext: 45.0,
        dropOffReasons: ['Community engagement needed', 'Advanced features missing']
      }
    ]);

    // Mock cohort retention data
    setCohortData([
      { month: 'Jan 2024', week0: 100, week1: 85, week2: 72, week3: 65, week4: 58 },
      { month: 'Feb 2024', week0: 100, week1: 88, week2: 75, week3: 68, week4: 62 },
      { month: 'Mar 2024', week0: 100, week1: 90, week2: 78, week3: 71, week4: 65 },
      { month: 'Apr 2024', week0: 100, week1: 87, week2: 76, week3: 69, week4: 63 },
      { month: 'May 2024', week0: 100, week1: 92, week2: 81, week3: 74, week4: 68 },
      { month: 'Jun 2024', week0: 100, week1: 89, week2: 79, week3: 72, week4: 66 }
    ]);

    // Mock churn prediction data
    setChurnPredictions([
      {
        userId: '1',
        userName: 'Sarah Chen',
        churnRisk: 'high',
        riskScore: 85,
        lastActivity: '2024-06-10',
        predictedChurnDate: '2024-06-18',
        interventionRecommended: 'Personalized care reminder + premium trial'
      },
      {
        userId: '2',
        userName: 'Mike Johnson',
        churnRisk: 'medium',
        riskScore: 65,
        lastActivity: '2024-06-12',
        predictedChurnDate: '2024-06-25',
        interventionRecommended: 'Community challenge invitation'
      },
      {
        userId: '3',
        userName: 'Emma Davis',
        churnRisk: 'high',
        riskScore: 92,
        lastActivity: '2024-06-08',
        predictedChurnDate: '2024-06-16',
        interventionRecommended: 'Direct outreach + feature tutorial'
      }
    ]);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Journey Analytics</h2>
        <div className="flex space-x-2">
          {(['week', 'month', 'quarter'] as const).map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="journey" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journey">User Journey</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="churn">Churn Prediction</TabsTrigger>
          <TabsTrigger value="ltv">Lifetime Value</TabsTrigger>
        </TabsList>

        <TabsContent value="journey">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Journey Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={journeyData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Drop-off Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Drop-off Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {journeyData.slice(1).map((stage, index) => (
                    <div key={stage.stage} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{stage.stage}</h4>
                        <Badge variant="outline">
                          {stage.conversionRate}% conversion
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Avg. time to reach: {stage.avgTimeToNext} days
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Top drop-off reasons:</p>
                        {stage.dropOffReasons.map((reason, idx) => (
                          <div key={idx} className="text-xs text-gray-500 ml-2">
                            • {reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cohorts">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Retention Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="week0" stroke="#8884d8" name="Week 0" />
                  <Line type="monotone" dataKey="week1" stroke="#82ca9d" name="Week 1" />
                  <Line type="monotone" dataKey="week2" stroke="#ffc658" name="Week 2" />
                  <Line type="monotone" dataKey="week3" stroke="#ff7300" name="Week 3" />
                  <Line type="monotone" dataKey="week4" stroke="#00ff00" name="Week 4" />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">68%</div>
                  <div className="text-sm text-gray-600">Average 4-week retention</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">+5%</div>
                  <div className="text-sm text-gray-600">Retention improvement (MoM)</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-gray-600">Best performing cohort</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Churn Risk Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Churn Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">23</div>
                    <div className="text-sm text-gray-600">High Risk</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">45</div>
                    <div className="text-sm text-gray-600">Medium Risk</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">432</div>
                    <div className="text-sm text-gray-600">Low Risk</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Risk Factors:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• No activity for 7+ days (40% weight)</div>
                    <div>• Low feature engagement (25% weight)</div>
                    <div>• No community interaction (20% weight)</div>
                    <div>• Support ticket frequency (15% weight)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* High-Risk Users */}
            <Card>
              <CardHeader>
                <CardTitle>High-Risk Users Requiring Intervention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {churnPredictions.map((prediction) => (
                    <div key={prediction.userId} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium">{prediction.userName}</h5>
                          <p className="text-xs text-gray-500">
                            Last active: {prediction.lastActivity}
                          </p>
                        </div>
                        <Badge className={getRiskColor(prediction.churnRisk)}>
                          {prediction.riskScore}% risk
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Predicted churn: {prediction.predictedChurnDate}
                      </p>
                      <p className="text-xs bg-blue-50 p-2 rounded">
                        <strong>Intervention:</strong> {prediction.interventionRecommended}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ltv">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LTV Prediction */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$185.50</div>
                    <div className="text-sm text-gray-600">Average LTV</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$295.80</div>
                    <div className="text-sm text-gray-600">Premium User LTV</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">LTV by Acquisition Channel:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Organic Search</span>
                        <span className="font-medium">$210.30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Media</span>
                        <span className="font-medium">$165.20</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Referral</span>
                        <span className="font-medium">$245.80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Paid Ads</span>
                        <span className="font-medium">$142.50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Value Drivers */}
            <Card>
              <CardHeader>
                <CardTitle>LTV Driver Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Top Value-Driving Actions:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <div>
                          <div className="font-medium">First Week Identification</div>
                          <div className="text-sm text-gray-600">+65% LTV increase</div>
                        </div>
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                        <div>
                          <div className="font-medium">Community Participation</div>
                          <div className="text-sm text-gray-600">+40% LTV increase</div>
                        </div>
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                        <div>
                          <div className="font-medium">Premium Trial Start</div>
                          <div className="text-sm text-gray-600">+120% LTV increase</div>
                        </div>
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Predicted 6-Month LTV:</h4>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">$425.90</div>
                      <div className="text-sm text-gray-600">Based on current growth trends</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserJourneyAnalytics;
