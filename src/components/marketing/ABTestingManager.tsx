
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FlaskConical, 
  TrendingUp, 
  Users, 
  Target, 
  Plus, 
  Play, 
  Pause, 
  BarChart3 
} from 'lucide-react';
import { ABTest } from '@/utils/marketingAnalytics';

const ABTestingManager: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'Homepage CTA Button Color',
      description: 'Testing green vs blue call-to-action button',
      status: 'running',
      type: 'ui',
      variants: [
        { name: 'Control (Blue)', traffic: 50, config: { buttonColor: 'blue' } },
        { name: 'Variant (Green)', traffic: 50, config: { buttonColor: 'green' } }
      ],
      targetMetric: 'conversion_rate',
      startDate: '2024-01-15T00:00:00Z',
      endDate: '2024-02-15T00:00:00Z',
      metrics: { participants: 2450, conversions: 197, conversionRate: 8.04 },
      results: {
        'Control (Blue)': { participants: 1250, conversions: 89, conversionRate: 7.12, significance: 0 },
        'Variant (Green)': { participants: 1200, conversions: 108, conversionRate: 9.0, significance: 0.95 }
      }
    },
    {
      id: '2',
      name: 'Email Subject Line',
      description: 'Testing different email subject line approaches',
      status: 'completed',
      type: 'content',
      variants: [
        { name: 'Question', traffic: 33, config: { subject: 'Need help with your orchids?' } },
        { name: 'Benefit', traffic: 33, config: { subject: 'Grow healthier orchids in 30 days' } },
        { name: 'Urgency', traffic: 34, config: { subject: 'Limited time: Free orchid care guide' } }
      ],
      targetMetric: 'email_open_rate',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-01-14T00:00:00Z',
      metrics: { participants: 6040, conversions: 1693, conversionRate: 28.0 },
      results: {
        'Question': { participants: 2000, conversions: 480, conversionRate: 24.0, significance: 0 },
        'Benefit': { participants: 2000, conversions: 560, conversionRate: 28.0, significance: 0.87 },
        'Urgency': { participants: 2040, conversions: 653, conversionRate: 32.0, significance: 0.99 }
      }
    }
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTest, setNewTest] = useState({
    name: '',
    description: '',
    targetMetric: 'conversion_rate',
    variants: [
      { name: 'Control', traffic: 50, config: {} },
      { name: 'Variant A', traffic: 50, config: {} }
    ]
  });

  const getStatusColor = (status: ABTest['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSignificanceColor = (significance?: number) => {
    if (!significance) return 'text-gray-500';
    if (significance >= 0.95) return 'text-green-600';
    if (significance >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const addVariant = () => {
    const variantLetter = String.fromCharCode(65 + newTest.variants.length - 1); // A, B, C, etc.
    setNewTest(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        { name: `Variant ${variantLetter}`, traffic: 0, config: {} }
      ]
    }));
  };

  const updateVariantWeight = (index: number, weight: number) => {
    setNewTest(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, traffic: weight } : variant
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">A/B Testing</h2>
          <p className="text-gray-600">Optimize features and content with data-driven testing</p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create A/B Test</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="testName">Test Name</Label>
                <Input
                  id="testName"
                  value={newTest.name}
                  onChange={(e) => setNewTest(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter test name"
                />
              </div>

              <div>
                <Label htmlFor="testDescription">Description</Label>
                <Textarea
                  id="testDescription"
                  value={newTest.description}
                  onChange={(e) => setNewTest(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you're testing"
                  rows={3}
                />
              </div>

              <div>
                <Label>Test Variants</Label>
                <div className="space-y-3 mt-2">
                  {newTest.variants.map((variant, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Input
                        value={variant.name}
                        onChange={(e) => setNewTest(prev => ({
                          ...prev,
                          variants: prev.variants.map((v, i) => 
                            i === index ? { ...v, name: e.target.value } : v
                          )
                        }))}
                        placeholder="Variant name"
                        className="flex-1"
                      />
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={variant.traffic}
                          onChange={(e) => updateVariantWeight(index, parseInt(e.target.value) || 0)}
                          placeholder="Weight %"
                          className="w-20"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addVariant}
                  className="mt-2"
                  size="sm"
                >
                  Add Variant
                </Button>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setCreateDialogOpen(false)}>
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
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{tests.length}</p>
              <p className="text-sm text-gray-600">Total Tests</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {tests.filter(t => t.status === 'running').length}
              </p>
              <p className="text-sm text-gray-600">Active Tests</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {tests.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">12.5%</p>
              <p className="text-sm text-gray-600">Avg. Lift</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FlaskConical className="w-5 h-5 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getStatusColor(test.status)}>
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
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    Target: {test.targetMetric?.replace('_', ' ')}
                  </div>
                  {test.startDate && (
                    <div>
                      Started: {new Date(test.startDate).toLocaleDateString()}
                    </div>
                  )}
                  {test.endDate && (
                    <div>
                      Ends: {new Date(test.endDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Variants Results */}
                {test.results && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {test.variants.map((variant) => {
                      const result = test.results![variant.name];
                      if (!result) return null;

                      return (
                        <div key={variant.name} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{variant.name}</h4>
                            <Badge variant="outline">{variant.traffic}%</Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Participants</span>
                              <span className="font-medium">{result.participants.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Conversions</span>
                              <span className="font-medium">{result.conversions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Rate</span>
                              <span className="font-medium">{result.conversionRate.toFixed(2)}%</span>
                            </div>
                            {result.significance !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Confidence</span>
                                <span className={`font-medium ${getSignificanceColor(result.significance)}`}>
                                  {(result.significance * 100).toFixed(1)}%
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="mt-3">
                            <Progress 
                              value={result.conversionRate} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Winner Badge */}
                {test.status === 'completed' && test.results && (
                  <div className="mt-4">
                    {(() => {
                      const winner = Object.entries(test.results).reduce((prev, current) => 
                        current[1].conversionRate > prev[1].conversionRate ? current : prev
                      );
                      return (
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            Winner: {winner[0]} (+{(winner[1].conversionRate - 
                              Math.min(...Object.values(test.results).map(r => r.conversionRate))
                            ).toFixed(2)}% lift)
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {tests.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No A/B tests yet</h3>
              <p className="text-gray-600 mb-4">Start testing to optimize your features and content</p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Test
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ABTestingManager;
