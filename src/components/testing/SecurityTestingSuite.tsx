
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Key,
  Database,
  Globe,
  CreditCard,
  User,
  Play,
  Download
} from 'lucide-react';

interface SecurityScan {
  id: string;
  name: string;
  type: 'vulnerability' | 'penetration' | 'compliance' | 'authentication' | 'data-protection';
  status: 'completed' | 'running' | 'scheduled' | 'failed';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  findings: number;
  progress: number;
  lastRun: string;
  duration: number;
  target: string;
  details: string[];
}

interface ComplianceCheck {
  standard: string;
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'partial';
  evidence: string;
  lastChecked: string;
}

interface VulnerabilityReport {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  affected: string[];
  description: string;
  remediation: string;
  cvss: number;
  status: 'open' | 'resolved' | 'in-progress';
}

const SecurityTestingSuite: React.FC = () => {
  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([]);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityReport[]>([]);
  const [isRunningFullScan, setIsRunningFullScan] = useState(false);

  useEffect(() => {
    // Mock security scans data
    const mockScans: SecurityScan[] = [
      {
        id: '1',
        name: 'OWASP Top 10 Vulnerability Scan',
        type: 'vulnerability',
        status: 'completed',
        severity: 'medium',
        findings: 3,
        progress: 100,
        lastRun: '2025-06-14T09:00:00Z',
        duration: 1800,
        target: 'Web Application',
        details: ['SQL Injection check', 'XSS vulnerability scan', 'CSRF token validation']
      },
      {
        id: '2',
        name: 'Authentication Security Test',
        type: 'authentication',
        status: 'completed',
        severity: 'low',
        findings: 1,
        progress: 100,
        lastRun: '2025-06-14T08:30:00Z',
        duration: 900,
        target: 'Auth Endpoints',
        details: ['Password strength policy', 'Session management', 'Multi-factor authentication']
      },
      {
        id: '3',
        name: 'Data Protection Audit',
        type: 'data-protection',
        status: 'running',
        severity: 'high',
        findings: 0,
        progress: 65,
        lastRun: '2025-06-14T10:00:00Z',
        duration: 0,
        target: 'Database & APIs',
        details: ['PII encryption check', 'Data retention policies', 'Access control validation']
      },
      {
        id: '4',
        name: 'Penetration Testing',
        type: 'penetration',
        status: 'scheduled',
        severity: 'critical',
        findings: 0,
        progress: 0,
        lastRun: '2025-06-13T14:00:00Z',
        duration: 3600,
        target: 'Full Infrastructure',
        details: ['Network security', 'Application security', 'Social engineering']
      }
    ];

    // Mock compliance checks
    const mockCompliance: ComplianceCheck[] = [
      {
        standard: 'GDPR',
        requirement: 'Data Processing Consent',
        status: 'compliant',
        evidence: 'Consent management system implemented',
        lastChecked: '2025-06-14T08:00:00Z'
      },
      {
        standard: 'GDPR',
        requirement: 'Right to be Forgotten',
        status: 'compliant',
        evidence: 'Data deletion procedures in place',
        lastChecked: '2025-06-14T08:00:00Z'
      },
      {
        standard: 'SOC 2',
        requirement: 'Access Control',
        status: 'partial',
        evidence: 'Role-based access implemented, MFA pending',
        lastChecked: '2025-06-14T08:00:00Z'
      },
      {
        standard: 'PCI DSS',
        requirement: 'Payment Data Encryption',
        status: 'compliant',
        evidence: 'End-to-end encryption for payment processing',
        lastChecked: '2025-06-14T08:00:00Z'
      },
      {
        standard: 'ISO 27001',
        requirement: 'Information Security Policy',
        status: 'non-compliant',
        evidence: 'Security policy documentation incomplete',
        lastChecked: '2025-06-14T08:00:00Z'
      }
    ];

    // Mock vulnerability reports
    const mockVulnerabilities: VulnerabilityReport[] = [
      {
        id: '1',
        title: 'Weak Password Policy',
        severity: 'medium',
        category: 'Authentication',
        affected: ['/auth/register', '/auth/change-password'],
        description: 'Password requirements do not meet security standards',
        remediation: 'Implement stronger password policy with minimum 12 characters, special characters required',
        cvss: 5.3,
        status: 'in-progress'
      },
      {
        id: '2',
        title: 'Missing Security Headers',
        severity: 'low',
        category: 'Configuration',
        affected: ['All pages'],
        description: 'Some security headers are missing from HTTP responses',
        remediation: 'Add Content-Security-Policy and X-Frame-Options headers',
        cvss: 3.1,
        status: 'open'
      },
      {
        id: '3',
        title: 'Outdated Dependencies',
        severity: 'high',
        category: 'Dependencies',
        affected: ['Package.json'],
        description: 'Several dependencies have known security vulnerabilities',
        remediation: 'Update all dependencies to latest secure versions',
        cvss: 7.5,
        status: 'resolved'
      }
    ];

    setSecurityScans(mockScans);
    setComplianceChecks(mockCompliance);
    setVulnerabilities(mockVulnerabilities);
  }, []);

  const runFullSecurityScan = async () => {
    setIsRunningFullScan(true);
    // Simulate scan execution
    setTimeout(() => {
      setIsRunningFullScan(false);
    }, 5000);
  };

  const getStatusIcon = (status: SecurityScan['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'running': return <Eye className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'scheduled': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      case 'info': return 'bg-blue-100 text-blue-800';
    }
  };

  const getComplianceStatusColor = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
    }
  };

  const getTypeIcon = (type: SecurityScan['type']) => {
    switch (type) {
      case 'vulnerability': return <Shield className="w-4 h-4" />;
      case 'penetration': return <Lock className="w-4 h-4" />;
      case 'compliance': return <CheckCircle className="w-4 h-4" />;
      case 'authentication': return <Key className="w-4 h-4" />;
      case 'data-protection': return <Database className="w-4 h-4" />;
    }
  };

  const totalFindings = securityScans.reduce((sum, scan) => sum + scan.findings, 0);
  const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical').length;
  const highVulns = vulnerabilities.filter(v => v.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Testing Suite</h2>
          <p className="text-gray-600">Comprehensive security analysis and compliance monitoring</p>
        </div>
        <Button
          onClick={runFullSecurityScan}
          disabled={isRunningFullScan}
          className="bg-gradient-to-r from-red-500 to-orange-600"
        >
          {isRunningFullScan ? (
            <>
              <Shield className="w-4 h-4 mr-2 animate-pulse" />
              Scanning...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Full Security Scan
            </>
          )}
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{criticalVulns}</div>
            <div className="text-sm text-gray-600">Critical Issues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{highVulns}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalFindings}</div>
            <div className="text-sm text-gray-600">Total Findings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">A-</div>
            <div className="text-sm text-gray-600">Security Grade</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scans">Security Scans</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="scans">
          <div className="space-y-4">
            {securityScans.map((scan) => (
              <Card key={scan.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(scan.type)}
                      <div>
                        <h3 className="font-semibold">{scan.name}</h3>
                        <p className="text-sm text-gray-500">{scan.target}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(scan.status)}
                      <Badge className={getSeverityColor(scan.severity)}>
                        {scan.severity}
                      </Badge>
                      {scan.findings > 0 && (
                        <span className="text-sm font-medium">
                          {scan.findings} findings
                        </span>
                      )}
                    </div>
                  </div>

                  {scan.status === 'running' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Scan Progress</span>
                        <span>{scan.progress}%</span>
                      </div>
                      <Progress value={scan.progress} className="w-full" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Scan Coverage:</h4>
                    <div className="flex flex-wrap gap-2">
                      {scan.details.map((detail, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>Last run: {new Date(scan.lastRun).toLocaleString()}</span>
                    {scan.duration > 0 && (
                      <span>Duration: {Math.floor(scan.duration / 60)}m {scan.duration % 60}s</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vulnerabilities">
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <Card key={vuln.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{vuln.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{vuln.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Category: {vuln.category}</span>
                        <span>CVSS: {vuln.cvss}</span>
                        <span>Affected: {vuln.affected.length} endpoints</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                      <Badge variant="outline" className={
                        vuln.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        vuln.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {vuln.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Remediation:</h4>
                    <p className="text-blue-800 text-sm">{vuln.remediation}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Affected Endpoints:</h4>
                    <div className="flex flex-wrap gap-2">
                      {vuln.affected.map((endpoint, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {endpoint}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{check.standard} - {check.requirement}</h3>
                        <p className="text-sm text-gray-600">{check.evidence}</p>
                      </div>
                      <Badge className={getComplianceStatusColor(check.status)}>
                        {check.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last checked: {new Date(check.lastChecked).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Security Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'Failed Login Attempts', value: '12', status: 'normal', icon: User },
                    { metric: 'API Rate Limit Violations', value: '3', status: 'warning', icon: Globe },
                    { metric: 'Payment Security Events', value: '0', status: 'good', icon: CreditCard },
                    { metric: 'Data Access Anomalies', value: '1', status: 'warning', icon: Database }
                  ].map((item) => (
                    <div key={item.metric} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{item.metric}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{item.value}</span>
                        <Badge className={
                          item.status === 'good' ? 'bg-green-100 text-green-800' :
                          item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Alerts & Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { alert: 'Unusual login pattern detected', time: '2 min ago', action: 'User temporarily locked' },
                    { alert: 'Dependency vulnerability found', time: '1 hour ago', action: 'Auto-update scheduled' },
                    { alert: 'SSL certificate expiring soon', time: '2 days ago', action: 'Renewal in progress' }
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2">
                      <p className="font-medium text-sm">{item.alert}</p>
                      <p className="text-xs text-gray-500">Action: {item.action}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityTestingSuite;
