
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, CheckCircle, Clock, TrendingDown, Bell, Settings, X } from 'lucide-react';

interface TestAlert {
  id: string;
  type: 'critical_failure' | 'performance_degradation' | 'error_spike' | 'satisfaction_drop' | 'system_downtime';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  triggeredAt: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
  source: string;
  metadata: Record<string, any>;
}

interface AlertRule {
  id: string;
  name: string;
  type: 'test_failure' | 'performance' | 'error_rate' | 'user_satisfaction' | 'uptime';
  enabled: boolean;
  condition: string;
  threshold: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  channels: string[];
}

const TestingAlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<TestAlert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    // Mock alerts data
    const mockAlerts: TestAlert[] = [
      {
        id: '1',
        type: 'critical_failure',
        title: 'E2E Test Suite Failed',
        description: 'Complete identification journey test failed with timeout error',
        severity: 'critical',
        status: 'active',
        triggeredAt: '2025-06-14T22:15:00Z',
        source: 'Automated Testing',
        metadata: {
          testSuite: 'E2E User Journey',
          failureCount: 3,
          environment: 'staging'
        }
      },
      {
        id: '2',
        type: 'performance_degradation',
        title: 'API Response Time Spike',
        description: 'Average API response time exceeded 2 seconds for 5 minutes',
        severity: 'high',
        status: 'acknowledged',
        triggeredAt: '2025-06-14T21:45:00Z',
        acknowledgedBy: 'DevOps Team',
        source: 'Performance Monitor',
        metadata: {
          endpoint: '/api/identify',
          avgResponseTime: 2.3,
          threshold: 2.0
        }
      },
      {
        id: '3',
        type: 'error_spike',
        title: 'Error Rate Increased',
        description: 'Error rate jumped to 3.2% in the last 10 minutes',
        severity: 'medium',
        status: 'resolved',
        triggeredAt: '2025-06-14T20:30:00Z',
        resolvedAt: '2025-06-14T20:45:00Z',
        source: 'Error Monitoring',
        metadata: {
          errorRate: 3.2,
          threshold: 2.0,
          primaryErrors: ['Upload timeout', 'Database connection']
        }
      },
      {
        id: '4',
        type: 'satisfaction_drop',
        title: 'User Satisfaction Below Threshold',
        description: 'User satisfaction score dropped to 4.2/5.0',
        severity: 'medium',
        status: 'active',
        triggeredAt: '2025-06-14T19:00:00Z',
        source: 'User Feedback',
        metadata: {
          currentScore: 4.2,
          threshold: 4.5,
          feedbackCount: 47
        }
      }
    ];

    // Mock alert rules
    const mockAlertRules: AlertRule[] = [
      {
        id: '1',
        name: 'Critical Test Failure',
        type: 'test_failure',
        enabled: true,
        condition: 'Any test marked as critical fails',
        threshold: 1,
        severity: 'critical',
        channels: ['email', 'slack', 'sms']
      },
      {
        id: '2',
        name: 'Performance Degradation',
        type: 'performance',
        enabled: true,
        condition: 'Average response time > threshold for 5 minutes',
        threshold: 2000,
        severity: 'high',
        channels: ['email', 'slack']
      },
      {
        id: '3',
        name: 'High Error Rate',
        type: 'error_rate',
        enabled: true,
        condition: 'Error rate exceeds threshold',
        threshold: 2,
        severity: 'high',
        channels: ['email', 'slack']
      },
      {
        id: '4',
        name: 'User Satisfaction Drop',
        type: 'user_satisfaction',
        enabled: true,
        condition: 'Average satisfaction score < threshold',
        threshold: 4.5,
        severity: 'medium',
        channels: ['email']
      },
      {
        id: '5',
        name: 'System Downtime',
        type: 'uptime',
        enabled: true,
        condition: 'System uptime < threshold',
        threshold: 99.5,
        severity: 'critical',
        channels: ['email', 'slack', 'sms', 'phone']
      }
    ];

    setAlerts(mockAlerts);
    setAlertRules(mockAlertRules);
  }, []);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: 'acknowledged' as const, acknowledgedBy: 'Current User' }
          : alert
      )
    );
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: 'resolved' as const, resolvedAt: new Date().toISOString() }
          : alert
      )
    );
  };

  const toggleAlertRule = (ruleId: string) => {
    setAlertRules(prevRules =>
      prevRules.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const getAlertIcon = (type: TestAlert['type']) => {
    switch (type) {
      case 'critical_failure': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'performance_degradation': return <TrendingDown className="w-5 h-5 text-orange-600" />;
      case 'error_spike': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'satisfaction_drop': return <TrendingDown className="w-5 h-5 text-blue-600" />;
      case 'system_downtime': return <X className="w-5 h-5 text-red-600" />;
    }
  };

  const getSeverityColor = (severity: TestAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: TestAlert['status']) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const statusMatch = selectedStatus === 'all' || alert.status === selectedStatus;
    return severityMatch && statusMatch;
  });

  const activeAlerts = alerts.filter(alert => alert.status === 'active').length;
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical' && alert.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{activeAlerts}</p>
              </div>
              <Bell className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-800">{criticalAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-800" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alert Rules</p>
                <p className="text-2xl font-bold text-blue-600">{alertRules.filter(rule => rule.enabled).length}</p>
              </div>
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {alerts.filter(alert => 
                    alert.status === 'resolved' && 
                    new Date(alert.resolvedAt || '').toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Active Alerts</h2>
        <div className="flex items-center space-x-4">
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Source: {alert.source}</span>
                      <span>Triggered: {new Date(alert.triggeredAt).toLocaleString()}</span>
                      {alert.acknowledgedBy && (
                        <span>Acknowledged by: {alert.acknowledgedBy}</span>
                      )}
                    </div>
                    
                    {/* Metadata */}
                    {Object.keys(alert.metadata).length > 0 && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                        <strong>Details:</strong>
                        {Object.entries(alert.metadata).map(([key, value]) => (
                          <div key={key} className="ml-2">
                            {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {alert.status === 'active' && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                        Acknowledge
                      </Button>
                      <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                        Resolve
                      </Button>
                    </>
                  )}
                  {alert.status === 'acknowledged' && (
                    <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Rules Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Rules Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertRules.map((rule) => (
              <div key={rule.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{rule.name}</h3>
                      <Badge className={getSeverityColor(rule.severity)}>
                        {rule.severity}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {rule.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rule.condition}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Threshold: {rule.threshold}</span>
                      <span>Channels: {rule.channels.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleAlertRule(rule.id)}
                    />
                    <Button size="sm" variant="outline">
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { channel: 'Email', enabled: true, config: 'devops@orkhidly.com' },
                { channel: 'Slack', enabled: true, config: '#alerts-testing' },
                { channel: 'SMS', enabled: false, config: '+1-xxx-xxx-xxxx' },
                { channel: 'Phone Call', enabled: false, config: '+1-xxx-xxx-xxxx' },
                { channel: 'Webhook', enabled: true, config: 'https://hooks.orkhidly.com/alerts' }
              ].map((item) => (
                <div key={item.channel} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{item.channel}</p>
                    <p className="text-sm text-gray-500">{item.config}</p>
                  </div>
                  <Switch checked={item.enabled} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Alerts this week:</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span>Average resolution time:</span>
                <span className="font-semibold">1.2 hours</span>
              </div>
              <div className="flex justify-between">
                <span>False positive rate:</span>
                <span className="font-semibold">8%</span>
              </div>
              <div className="flex justify-between">
                <span>Most common alert:</span>
                <span className="font-semibold">Performance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestingAlertSystem;
