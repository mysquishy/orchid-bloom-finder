
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EdgeCaseScenario } from '@/utils/aiTestingTypes';

const EdgeCaseTestSuite: React.FC = () => {
  const [scenarios] = useState<EdgeCaseScenario[]>([
    {
      id: '1',
      name: 'Blurry Image Test',
      description: 'Test identification accuracy with blurry orchid images',
      status: 'passed',
      severity: 'high',
      passRate: 87.5
    },
    {
      id: '2',
      name: 'Low Light Conditions',
      description: 'Test performance in poor lighting conditions',
      status: 'running',
      severity: 'medium',
      passRate: 0
    }
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Edge Case Test Suite</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Edge Case Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{scenario.name}</h3>
                  <Badge className={scenario.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {scenario.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span>Severity: {scenario.severity}</span>
                  <span>Pass Rate: {scenario.passRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EdgeCaseTestSuite;
