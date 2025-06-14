
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Cloud, 
  CloudRain, 
  Sun, 
  Snowflake, 
  Wind,
  Thermometer,
  Droplets,
  Shield,
  Bell
} from 'lucide-react';

const WeatherAlerts: React.FC = () => {
  const activeAlerts = [
    {
      id: 1,
      severity: 'high',
      type: 'Heat Wave',
      title: 'Extreme Heat Warning',
      description: 'Temperatures expected to reach 95°F+ for 3 consecutive days',
      startTime: new Date('2024-06-15T00:00:00'),
      endTime: new Date('2024-06-17T23:59:59'),
      plantImpact: 'High risk of heat stress, leaf burn, and rapid water loss',
      recommendations: [
        'Move plants to shaded areas immediately',
        'Increase watering frequency to twice daily',
        'Mist leaves frequently but avoid direct sun',
        'Ensure excellent air circulation'
      ],
      urgency: 'Immediate action required'
    },
    {
      id: 2,
      severity: 'medium',
      type: 'Heavy Rain',
      title: 'Extended Rainfall Period',
      description: 'Heavy rain expected for 48 hours with 2-3 inches accumulation',
      startTime: new Date('2024-06-16T06:00:00'),
      endTime: new Date('2024-06-18T18:00:00'),
      plantImpact: 'Risk of overwatering and poor drainage conditions',
      recommendations: [
        'Move potted plants under cover',
        'Ensure drainage holes are clear',
        'Skip regular watering schedule',
        'Monitor for signs of root rot'
      ],
      urgency: 'Prepare within 24 hours'
    },
    {
      id: 3,
      severity: 'low',
      type: 'UV Index',
      title: 'High UV Index Alert',
      description: 'UV index will reach 9+ for the next 3 days',
      startTime: new Date('2024-06-15T10:00:00'),
      endTime: new Date('2024-06-17T16:00:00'),
      plantImpact: 'Potential leaf burn on sensitive species',
      recommendations: [
        'Provide filtered light during peak hours',
        'Use shade cloth (30-50% shade)',
        'Monitor leaves for burn signs',
        'Increase humidity to offset stress'
      ],
      urgency: 'Monitor and adjust as needed'
    }
  ];

  const emergencyProtocols = [
    {
      scenario: 'Extreme Heat (95°F+)',
      icon: <Sun className="w-6 h-6 text-red-500" />,
      immediateActions: [
        'Move all plants to shade immediately',
        'Set up emergency misting system',
        'Increase ventilation with fans',
        'Check soil moisture every 4 hours'
      ],
      equipmentNeeded: ['Shade cloth', 'Fans', 'Misting bottles', 'Thermometer'],
      timeline: 'Act within 1 hour of alert'
    },
    {
      scenario: 'Frost Warning (32°F-)',
      icon: <Snowflake className="w-6 h-6 text-blue-500" />,
      immediateActions: [
        'Bring tender plants indoors',
        'Cover outdoor plants with blankets',
        'Move plants away from windows',
        'Avoid watering until temps rise'
      ],
      equipmentNeeded: ['Frost cloth', 'Blankets', 'Indoor space', 'Heater'],
      timeline: 'Complete before sunset'
    },
    {
      scenario: 'Severe Storms',
      icon: <Wind className="w-6 h-6 text-purple-500" />,
      immediateActions: [
        'Secure all outdoor plants',
        'Move hanging plants to safety',
        'Close windows and doors',
        'Prepare for power outages'
      ],
      equipmentNeeded: ['Tie-downs', 'Indoor space', 'Battery lights', 'Covers'],
      timeline: 'Complete 2 hours before storm'
    },
    {
      scenario: 'Extended Drought',
      icon: <Droplets className="w-6 h-6 text-orange-500" />,
      immediateActions: [
        'Implement water conservation',
        'Group plants by water needs',
        'Apply mulch to retain moisture',
        'Set up drip irrigation'
      ],
      equipmentNeeded: ['Mulch', 'Drip system', 'Water timer', 'Shade cloth'],
      timeline: 'Implement within 1 week'
    }
  ];

  const alertHistory = [
    { date: '2024-06-10', type: 'Heat Wave', action: 'Plants moved to shade', result: 'No damage reported' },
    { date: '2024-06-05', type: 'Heavy Rain', action: 'Improved drainage', result: 'All plants healthy' },
    { date: '2024-05-28', type: 'High Winds', action: 'Secured containers', result: 'Minor leaf damage only' },
    { date: '2024-05-15', type: 'Late Frost', action: 'Emergency covering', result: 'Successfully protected' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'heat wave': return <Sun className="w-5 h-5 text-red-500" />;
      case 'heavy rain': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'uv index': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'frost warning': return <Snowflake className="w-5 h-5 text-blue-500" />;
      case 'high winds': return <Wind className="w-5 h-5 text-purple-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Active Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity} severity
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Dismiss
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                    <div className="text-xs text-gray-600">
                      <div>Starts: {alert.startTime.toLocaleString()}</div>
                      <div>Ends: {alert.endTime.toLocaleString()}</div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-900 mb-1">Plant Impact:</h6>
                    <p className="text-sm text-gray-700">{alert.plantImpact}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="font-medium text-gray-900 mb-2">Recommended Actions:</h6>
                  <ul className="space-y-1">
                    {alert.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Shield className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {alert.urgency}
                  </Badge>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Mark as Handled
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Care Protocols */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Emergency Care Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyProtocols.map((protocol, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  {protocol.icon}
                  <h4 className="text-lg font-semibold text-gray-900">{protocol.scenario}</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <h6 className="font-medium text-gray-900 mb-2">Immediate Actions:</h6>
                    <ul className="space-y-1">
                      {protocol.immediateActions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-gray-900 mb-2">Equipment Needed:</h6>
                    <div className="flex flex-wrap gap-1">
                      {protocol.equipmentNeeded.map((item, itemIndex) => (
                        <Badge key={itemIndex} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                    <span className="text-sm font-medium text-yellow-800">Timeline: </span>
                    <span className="text-sm text-yellow-700">{protocol.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Recent Alert History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">{item.date}</div>
                  <Badge variant="outline">{item.type}</Badge>
                  <div className="text-sm text-gray-700">{item.action}</div>
                </div>
                <div className="text-sm font-medium text-green-600">{item.result}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherAlerts;
