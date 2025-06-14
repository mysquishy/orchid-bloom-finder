
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Camera, Leaf, Users, Target } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  completed: boolean;
}

const UserOnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'welcome',
      title: 'Welcome to OrchidAI!',
      description: 'Let\'s get you started with identifying and caring for your orchids.',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      action: 'Get Started',
      completed: false
    },
    {
      id: 'first-photo',
      title: 'Take Your First Photo',
      description: 'Upload a photo of an orchid to see our AI identification in action.',
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      action: 'Upload Photo',
      completed: false
    },
    {
      id: 'create-collection',
      title: 'Start Your Collection',
      description: 'Add your first orchid to your personal garden collection.',
      icon: <Target className="w-8 h-8 text-purple-600" />,
      action: 'Add to Garden',
      completed: false
    },
    {
      id: 'explore-features',
      title: 'Explore Features',
      description: 'Discover care guides, health monitoring, and community features.',
      icon: <Users className="w-8 h-8 text-orange-600" />,
      action: 'Explore',
      completed: false
    }
  ]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleStepAction = (stepIndex: number) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].completed = true;
    setSteps(updatedSteps);
    
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
          <Badge variant="outline">
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% complete</p>
      </div>

      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {currentStepData.icon}
          </div>
          <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600 text-lg">{currentStepData.description}</p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => handleStepAction(currentStep)}
              className="w-full"
              size="lg"
            >
              {currentStepData.action}
            </Button>
            
            {currentStep < steps.length - 1 && (
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="w-full"
              >
                Skip for now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`p-3 rounded-lg border text-center ${
              index <= currentStep 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex justify-center mb-2">
              {step.completed ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <div className={`w-6 h-6 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'border-green-600 bg-green-600' 
                    : 'border-gray-300'
                }`} />
              )}
            </div>
            <p className="text-xs font-medium text-gray-700">{step.title}</p>
          </div>
        ))}
      </div>

      {/* Tips */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Quick Tip</h4>
          <p className="text-sm text-blue-700">
            {currentStep === 0 && "OrchidAI can identify over 1,000 orchid species with 95% accuracy!"}
            {currentStep === 1 && "For best results, take photos in bright, natural light with the flower clearly visible."}
            {currentStep === 2 && "Your garden collection helps track care schedules and plant health over time."}
            {currentStep === 3 && "Join our community to share photos, ask questions, and learn from other orchid enthusiasts!"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOnboardingFlow;
