
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  TrendingUp, 
  Plus,
  Eye,
  MousePointer,
  Mail,
  CreditCard,
  Users
} from 'lucide-react';

interface ABTestVariant {
  id: string;
  name: string;
  traffic: number;
  conversions: number;
  visitors: number;
  conversionRate: number;
  confidence: number;
}

interface ABTest {
  id: string;
  name: string;
  type: 'landing-page' | 'onboarding' | 'pricing' | 'email' | 'feature-intro';
  status: 'draft' | 'running' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  variants: ABTestVariant[];
  goal: string;
  significance: number;
  winner?: string;
}

const ABTestingFramework: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'Landing Page Hero CTA',
      type: 'landing-page',
      status: 'running',
      startDate: '2024-06-01',
      goal: 'Increase signup rate',
      significance: 0.95,
      variants: [
        {
          id: 'control',
          name: 'Original (Identify Now)',
          traffic: 50,
          conversions: 234,
          visitors: 1250,
          conversionRate: 18.72,
          confidence: 0
        },
        {
          id: 'variant-a',
          name: 'Start Your Garden',
          traffic: 50,
          conversions: 289,
          visitors: 1200,
          conversionRate: 24.08,
          confidence: 0.97
        }
      ]
    },
    {
      id: '2',
      name: 'Onboarding Flow Length',
      type: 'onboarding',
      status: 'running',
      startDate: '2024-06-05',
      goal: 'Improve completion rate',
      significance: 0.85,
      variants: [
        {
          id: 'control',
          name: '5 Steps',
          traffic: 33,
          conversions: 156,
          visitors: 890,
          conversionRate: 17.53,
          confidence: 0
        },
        {
          id: 'variant-a',
          name: '3 Steps',
          traffic: 33,
          conversions: 198,
          visitors: 845,
          conversionRate: 23.43,
          confidence: 0.92
        },
        {
          id: 'variant-b',
          name: '7 Steps',
          traffic: 34,
          conversions: 134,
          visitors: 901,
          conversionRate: 14.87,
          confidence: 0.88
        }
      ]
    },
    {
      id: '3',
      name: 'Pricing Page Layout',
      type: 'pricing',
      status: 'completed',
      startDate: '2024-05-15',
      endDate: '2024-05-30',
      goal: 'Increase premium subscriptions',
      significance: 0.99,
      winner: 'variant-a',
      variants: [
        {
          id: 'control',
          name: 'Standard Layout',
          traffic: 50,
          conversions: 45,
          visitors: 890,
          conversionRate: 5.06,
          confidence: 0
        },
        {
          id: 'variant-a',
          name: 'Featured Plan Highlight',
          traffic: 50,
          conversions: 67,
          visitors: 845,
          conversionRate: 7.93,
          confidence: 0.99
        }
      ]
    }
  ]);

  const [createTestOpen, setCreateTestOpen] = useState(false);
  const [newTest, setNewTest] = useState({
    name: '',
    type: 'landing-page' as ABTest['type'],
    goal: '',
    variants: [
      { name: 'Control', traffic: 50 },
      { name: 'Variant A', traffic: 50 }
    ]
  });

  const getTestTypeIcon = (type: ABTest['type']) => {
    switch (type) {
      case 'landing-page': return <Eye className="w-4 h-4" />;
      case 'onboarding': return <Users className="w-4 h-4" />;
      case 'pricing': return <CreditCard className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'feature-intro': return <MousePointer className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: ABTest['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.95) return 'text-green-600';
    if (confidence >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWinningVariant = (test: ABTest) => {
    return test.variants.reduce((prev, current) => 
      current.conversionRate > prev.conversionRate ? current : prev
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">A/B Testing Framework</h2>
          <p className="text-gray-600">Optimize conversion through systematic testing</p>
        </div>
        
        <Dialog open={createTestOpen} onOpenChange={setCreateTestOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New A/B Test</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Test Name</label>
                <Input
                  value={newTest.name}
                  onChange={(e) => setNewTest(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter test name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Test Type</label>
                <Select value={newTest.type} onValueChange={(value: ABTest['type']) => 
                  setNewTest(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landing-page">Landing Page</SelectItem>
                    <SelectItem value="onboarding">Onboarding Flow</SelectItem>
                    <SelectItem value="pricing">Pricing Page</SelectItem>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="feature-intro">Feature Introduction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Goal</label>
                <Textarea
                  value={newTest.goal}
                  onChange={(e) => setNewTest(prev => ({ ...prev, goal: e.target.value }))}
                  placeholder="What are you trying to optimize?"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCreateTestOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setCreateTestOpen(false)}>
                  Create Test
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Test Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{tests.length}</div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {tests.filter(t => t.status === 'running').length}
            </div>
            <div className="text-sm text-gray-600">Running</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {tests.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">24.3%</div>
            <div className="text-sm text-gray-600">Avg. Lift</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Tests */}
      <div className="space-y-4">
        {tests.map((test) => {
          const winner = getWinningVariant(test);
          
          return (
            <Card key={test.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getTestTypeIcon(test.type)}
                    <div>
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      <p className="text-sm text-gray-600">{test.goal}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                    {test.status === 'running' && (
                      <Button variant="outline" size="sm">
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Test Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Started:</span>
                      <div className="font-medium">{new Date(test.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Significance:</span>
                      <div className={`font-medium ${getConfidenceColor(test.significance)}`}>
                        {(test.significance * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Participants:</span>
                      <div className="font-medium">
                        {test.variants.reduce((sum, v) => sum + v.visitors, 0).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-medium">
                        {Math.ceil((Date.now() - new Date(test.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                  </div>

                  {/* Variants Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {test.variants.map((variant) => (
                      <div key={variant.id} className={`border rounded-lg p-4 ${
                        test.winner === variant.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{variant.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline">{variant.traffic}%</Badge>
                            {test.winner === variant.id && (
                              <Badge className="bg-green-500 text-white">Winner</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Visitors</span>
                            <span className="font-medium">{variant.visitors.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Conversions</span>
                            <span className="font-medium">{variant.conversions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Rate</span>
                            <span className="font-medium">{variant.conversionRate.toFixed(2)}%</span>
                          </div>
                          {variant.confidence > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Confidence</span>
                              <span className={`font-medium ${getConfidenceColor(variant.confidence)}`}>
                                {(variant.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3">
                          <Progress 
                            value={variant.conversionRate} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Winner Information */}
                  {test.status === 'completed' && test.winner && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Test Completed</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        {winner.name} won with a {winner.conversionRate.toFixed(2)}% conversion rate, 
                        representing a {((winner.conversionRate / test.variants[0].conversionRate - 1) * 100).toFixed(1)}% improvement.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ABTestingFramework;
