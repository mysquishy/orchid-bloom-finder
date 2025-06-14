
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Thermometer, Droplets, Sun, Wind } from 'lucide-react';

const StressIndicators: React.FC = () => {
  const stressFactors = [
    {
      factor: 'Temperature Stress',
      status: 'warning',
      level: 'Medium',
      affected: 3,
      description: 'Some plants experiencing temperature fluctuations',
      icon: Thermometer,
      recommendations: [
        'Move sensitive plants away from heat sources',
        'Monitor nighttime temperatures',
        'Consider temperature regulation'
      ]
    },
    {
      factor: 'Water Stress', 
      status: 'critical',
      level: 'High',
      affected: 1,
      description: 'Overwatering detected in Dendrobium',
      icon: Droplets,
      recommendations: [
        'Reduce watering frequency immediately',
        'Check drainage system',
        'Monitor for root rot signs'
      ]
    },
    {
      factor: 'Light Stress',
      status: 'good',
      level: 'Low',
      affected: 0,
      description: 'All plants receiving adequate light',
      icon: Sun,
      recommendations: [
        'Maintain current lighting schedule',
        'Continue monitoring light exposure'
      ]
    },
    {
      factor: 'Air Circulation',
      status: 'warning',
      level: 'Medium',
      affected: 2,
      description: 'Poor air circulation in some areas',
      icon: Wind,
      recommendations: [
        'Improve ventilation around plants',
        'Space plants further apart',
        'Consider adding a small fan'
      ]
    }
  ];

  const earlyWarnings = [
    {
      plant: 'Phalaenopsis #2',
      warning: 'Leaf yellowing detected',
      severity: 'low',
      detected: '2 days ago',
      action: 'Monitor and adjust watering'
    },
    {
      plant: 'Cattleya',
      warning: 'Slower growth rate',
      severity: 'medium',
      detected: '1 week ago',
      action: 'Check fertilization schedule'
    },
    {
      plant: 'Dendrobium',
      warning: 'Root discoloration',
      severity: 'high',
      detected: '3 days ago',
      action: 'Immediate repotting required'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stress Factors Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Environmental Stress Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stressFactors.map((stress, index) => {
              const IconComponent = stress.icon;
              return (
                <div key={index} className={`p-4 border rounded-lg ${getStatusColor(stress.status)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      <h4 className="font-semibold">{stress.factor}</h4>
                    </div>
                    <Badge className={getStatusColor(stress.status)}>
                      {stress.level}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm mb-1">
                      <strong>Affected Plants:</strong> {stress.affected}
                    </div>
                    <div className="text-sm">{stress.description}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium">Recommendations:</div>
                    {stress.recommendations.map((rec, idx) => (
                      <div key={idx} className="text-xs">• {rec}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Early Warning System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Early Warning Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earlyWarnings.map((warning, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{warning.plant}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(warning.severity)}>
                      {warning.severity} severity
                    </Badge>
                    <span className="text-sm text-gray-500">{warning.detected}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Warning:</div>
                    <div className="text-sm font-medium text-gray-900">{warning.warning}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Recommended Action:</div>
                    <div className="text-sm font-medium text-gray-900">{warning.action}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stress Prevention Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Stress Prevention Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💧 Water Management</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check soil moisture before watering</li>
                <li>• Use room temperature water</li>
                <li>• Ensure proper drainage</li>
                <li>• Water in the morning</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">🌡️ Temperature Control</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Maintain consistent temperatures</li>
                <li>• Avoid sudden temperature changes</li>
                <li>• Monitor seasonal variations</li>
                <li>• Protect from drafts</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌿 Environmental Care</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Maintain proper humidity levels</li>
                <li>• Ensure adequate air circulation</li>
                <li>• Provide appropriate lighting</li>
                <li>• Regular plant inspections</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StressIndicators;
