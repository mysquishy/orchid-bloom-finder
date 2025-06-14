
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  TrendingUp,
  Users,
  Target,
  Plus
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ABTest {
  id: string;
  test_name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  variants: Array<{ name: string; weight: number }>;
  target_metric: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
}

const ABTestingManager: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: tests, isLoading, refetch } = useQuery({
    queryKey: ['ab-tests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ab_tests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ABTest[];
    },
    refetchInterval: 60000,
  });

  const { data: testAssignments } = useQuery({
    queryKey: ['ab-test-assignments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ab_test_assignments')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 60000,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateTestStatus = async (testId: string, newStatus: string) => {
    const updateData: any = { status: newStatus };
    
    if (newStatus === 'active' && !tests?.find(t => t.id === testId)?.start_date) {
      updateData.start_date = new Date().toISOString();
    }
    if (newStatus === 'completed') {
      updateData.end_date = new Date().toISOString();
    }

    const { error } = await supabase
      .from('ab_tests')
      .update(updateData)
      .eq('id', testId);

    if (!error) {
      refetch();
    }
  };

  const getTestParticipants = (testId: string) => {
    return testAssignments?.filter(assignment => assignment.test_id === testId).length || 0;
  };

  if (isLoading) return <LoadingSpinner text="Loading A/B tests..." />;

  const activeTests = tests?.filter(t => t.status === 'active').length || 0;
  const completedTests = tests?.filter(t => t.status === 'completed').length || 0;
  const totalParticipants = testAssignments?.length || 0;

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold">{tests?.length || 0}</p>
              </div>
              <FlaskConical className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tests</p>
                <p className="text-2xl font-bold text-green-600">{activeTests}</p>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{completedTests}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-purple-600">{totalParticipants}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tests Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              A/B Tests
            </CardTitle>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Test
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New A/B Test</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Test name" />
                  <Input placeholder="Description" />
                  <Input placeholder="Target metric" />
                  <div className="text-sm text-gray-500">
                    A/B test creation form would go here with variant configuration.
                  </div>
                  <Button className="w-full" onClick={() => setIsCreateModalOpen(false)}>
                    Create Test
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tests?.map((test) => {
              const participants = getTestParticipants(test.id);
              
              return (
                <div key={test.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{test.test_name}</h3>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Target Metric:</span>
                          <div className="font-medium">{test.target_metric}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Participants:</span>
                          <div className="font-medium">{participants}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Variants:</span>
                          <div className="font-medium">{test.variants.length}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <div className="font-medium">
                            {test.start_date && test.end_date
                              ? `${Math.ceil((new Date(test.end_date).getTime() - new Date(test.start_date).getTime()) / (1000 * 60 * 60 * 24))} days`
                              : test.start_date
                              ? `${Math.ceil((Date.now() - new Date(test.start_date).getTime()) / (1000 * 60 * 60 * 24))} days`
                              : 'Not started'
                            }
                          </div>
                        </div>
                      </div>

                      {/* Variant breakdown */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {test.variants.map((variant, index) => (
                          <div key={index} className="bg-gray-50 rounded p-2">
                            <div className="font-medium text-sm">{variant.name}</div>
                            <div className="text-xs text-gray-600">{variant.weight}% traffic</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {test.status === 'draft' && (
                        <Button 
                          size="sm"
                          onClick={() => updateTestStatus(test.id, 'active')}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                      {test.status === 'active' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateTestStatus(test.id, 'paused')}
                          >
                            <Pause className="w-3 h-3 mr-1" />
                            Pause
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => updateTestStatus(test.id, 'completed')}
                          >
                            Complete
                          </Button>
                        </>
                      )}
                      {test.status === 'paused' && (
                        <Button 
                          size="sm"
                          onClick={() => updateTestStatus(test.id, 'active')}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Resume
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Results
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {tests?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No A/B tests created yet</p>
              <p className="text-sm mt-1">Create your first test to start optimizing features</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ABTestingManager;
