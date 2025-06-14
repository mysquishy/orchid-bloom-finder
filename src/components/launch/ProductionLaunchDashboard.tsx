
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle, Clock, Target, Users, Smartphone, Globe, BarChart3 } from 'lucide-react';

interface LaunchTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'testing' | 'performance' | 'monitoring' | 'marketing' | 'legal' | 'documentation';
  progress: number;
  assignee?: string;
  dueDate?: string;
}

const ProductionLaunchDashboard: React.FC = () => {
  const [launchTasks, setLaunchTasks] = useState<LaunchTask[]>([
    {
      id: '1',
      title: 'Cross-browser Compatibility Testing',
      description: 'Test on Chrome, Firefox, Safari, Edge across desktop and mobile',
      status: 'completed',
      priority: 'high',
      category: 'testing',
      progress: 100
    },
    {
      id: '2',
      title: 'Mobile Device Testing',
      description: 'Test on iOS and Android devices with various screen sizes',
      status: 'in-progress',
      priority: 'high',
      category: 'testing',
      progress: 75
    },
    {
      id: '3',
      title: 'Load Testing & Performance Optimization',
      description: 'Test with 1000+ concurrent users and optimize bottlenecks',
      status: 'in-progress',
      priority: 'critical',
      category: 'performance',
      progress: 60
    },
    {
      id: '4',
      title: 'Error Tracking Setup',
      description: 'Configure Sentry/Bugsnag for production error monitoring',
      status: 'completed',
      priority: 'critical',
      category: 'monitoring',
      progress: 100
    },
    {
      id: '5',
      title: 'User Onboarding Flow',
      description: 'Create guided tutorial for new users',
      status: 'pending',
      priority: 'medium',
      category: 'marketing',
      progress: 0
    },
    {
      id: '6',
      title: 'Help Documentation',
      description: 'Complete FAQ and user guide documentation',
      status: 'in-progress',
      priority: 'medium',
      category: 'documentation',
      progress: 40
    },
    {
      id: '7',
      title: 'Privacy Policy & Terms',
      description: 'Legal compliance documentation',
      status: 'pending',
      priority: 'critical',
      category: 'legal',
      progress: 0
    }
  ]);

  const getStatusIcon = (status: LaunchTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'blocked':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: LaunchTask['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const overallProgress = Math.round(
    launchTasks.reduce((sum, task) => sum + task.progress, 0) / launchTasks.length
  );

  const completedTasks = launchTasks.filter(task => task.status === 'completed').length;
  const criticalTasks = launchTasks.filter(task => task.priority === 'critical').length;
  const criticalCompleted = launchTasks.filter(task => task.priority === 'critical' && task.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Launch Readiness Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-green-600">{overallProgress}%</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-blue-600">{completedTasks}/{launchTasks.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Tasks</p>
                <p className="text-2xl font-bold text-red-600">{criticalCompleted}/{criticalTasks}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Launch Readiness</p>
                <p className="text-2xl font-bold text-purple-600">
                  {overallProgress >= 90 ? 'Ready' : 'In Progress'}
                </p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Launch Tasks by Category */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {launchTasks.map(task => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <Progress value={task.progress} className="w-full" />
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">{task.progress}% complete</span>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {['testing', 'performance', 'monitoring', 'marketing', 'legal'].map(category => (
          <TabsContent key={category} value={category}>
            <div className="space-y-4">
              {launchTasks
                .filter(task => task.category === category)
                .map(task => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getStatusIcon(task.status)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{task.title}</h4>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <Progress value={task.progress} className="w-full" />
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500">{task.progress}% complete</span>
                              <Button variant="outline" size="sm">
                                Update Progress
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductionLaunchDashboard;
