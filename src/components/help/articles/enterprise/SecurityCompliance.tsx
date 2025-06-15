
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, FileText, Users, Globe, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

const SecurityCompliance: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Security & Compliance</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enterprise-grade security framework with comprehensive compliance certifications, 
          data privacy protection, and advanced access control systems.
        </p>
        <div className="flex justify-center gap-2">
          <Badge className="bg-red-100 text-red-800">SOC 2 Type II</Badge>
          <Badge className="bg-blue-100 text-blue-800">ISO 27001</Badge>
          <Badge className="bg-green-100 text-green-800">GDPR Compliant</Badge>
        </div>
      </div>

      {/* Enterprise Security Features */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Shield className="w-6 h-6" />
            Enterprise Security Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-4">Multi-Layered Security Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-800 mb-3">Network Security</h4>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• Web Application Firewall (WAF) protection</li>
                  <li>• DDoS mitigation and rate limiting</li>
                  <li>• Network segmentation and micro-services</li>
                  <li>• VPN and private network connectivity</li>
                  <li>• IP allowlisting and geo-blocking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-800 mb-3">Application Security</h4>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• End-to-end encryption (TLS 1.3)</li>
                  <li>• Data encryption at rest (AES-256)</li>
                  <li>• Secure coding practices and SAST/DAST</li>
                  <li>• Regular penetration testing</li>
                  <li>• Vulnerability management program</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <Lock className="w-8 h-8 text-blue-600 mb-2" />
                <h4 className="font-medium text-blue-900 mb-2">Zero Trust Architecture</h4>
                <p className="text-sm text-blue-700">
                  Never trust, always verify approach with continuous authentication
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <Eye className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-medium text-green-900 mb-2">24/7 Monitoring</h4>
                <p className="text-sm text-green-700">
                  Security Operations Center with real-time threat detection
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <AlertTriangle className="w-8 h-8 text-purple-600 mb-2" />
                <h4 className="font-medium text-purple-900 mb-2">Incident Response</h4>
                <p className="text-sm text-purple-700">
                  Automated threat response with escalation procedures
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy & GDPR */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <FileText className="w-6 h-6" />
            Data Privacy and GDPR Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Comprehensive Privacy Protection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">GDPR Compliance Features</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Right to be forgotten implementation</li>
                  <li>• Data portability and export tools</li>
                  <li>• Consent management system</li>
                  <li>• Privacy impact assessments</li>
                  <li>• Data breach notification procedures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Privacy by Design</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Minimal data collection principles</li>
                  <li>• Purpose limitation and transparency</li>
                  <li>• Automated data retention policies</li>
                  <li>• Pseudonymization and anonymization</li>
                  <li>• Regular privacy audits and assessments</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Global Privacy Compliance</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-yellow-700">
              <div>
                <strong>GDPR (EU):</strong> Full compliance with European data protection regulations
              </div>
              <div>
                <strong>CCPA (California):</strong> Consumer privacy rights implementation
              </div>
              <div>
                <strong>PIPEDA (Canada):</strong> Personal information protection compliance
              </div>
              <div>
                <strong>LGPD (Brazil):</strong> Lei Geral de Proteção de Dados adherence
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SOC 2 Audit Documentation */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-6 h-6" />
            SOC 2 Audit Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">SOC 2 Type II Certification</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-800 mb-3">Trust Service Criteria</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• <strong>Security:</strong> Protection against unauthorized access</li>
                    <li>• <strong>Availability:</strong> System operational capability</li>
                    <li>• <strong>Processing Integrity:</strong> Complete and accurate processing</li>
                    <li>• <strong>Confidentiality:</strong> Protection of confidential information</li>
                    <li>• <strong>Privacy:</strong> Personal information protection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-3">Audit Coverage</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 12-month operational effectiveness testing</li>
                    <li>• Independent third-party assessment</li>
                    <li>• Control design and implementation review</li>
                    <li>• Management assertions validation</li>
                    <li>• Continuous monitoring and improvement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Audit Timeline</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Annual SOC 2 Type II audits</li>
                <li>• Quarterly internal control assessments</li>
                <li>• Monthly vulnerability scans</li>
                <li>• Continuous security monitoring</li>
                <li>• Real-time compliance reporting</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Documentation Access</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• SOC 2 report sharing with enterprise clients</li>
                <li>• Security questionnaire responses</li>
                <li>• Penetration testing reports</li>
                <li>• Compliance certificate access</li>
                <li>• Custom security assessments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Control & Permissions */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Users className="w-6 h-6" />
            Access Control and Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Advanced Identity and Access Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Authentication Methods</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Multi-factor authentication (MFA) required</li>
                  <li>• Single Sign-On (SSO) integration</li>
                  <li>• SAML 2.0 and OpenID Connect support</li>
                  <li>• Biometric authentication options</li>
                  <li>• Hardware security key support (FIDO2)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Authorization Framework</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Role-based access control (RBAC)</li>
                  <li>• Attribute-based access control (ABAC)</li>
                  <li>• Principle of least privilege enforcement</li>
                  <li>• Dynamic permission assignment</li>
                  <li>• Just-in-time access provisioning</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">User Roles</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• System Administrator</li>
                <li>• Security Administrator</li>
                <li>• Department Manager</li>
                <li>• Power User</li>
                <li>• Standard User</li>
                <li>• Read-only User</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Permission Granularity</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Feature-level access control</li>
                <li>• Data-level permissions</li>
                <li>• API endpoint restrictions</li>
                <li>• Time-based access limits</li>
                <li>• Location-based restrictions</li>
                <li>• Resource quota management</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Audit & Monitoring</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Comprehensive access logging</li>
                <li>• Real-time anomaly detection</li>
                <li>• Privileged access monitoring</li>
                <li>• Session recording and analysis</li>
                <li>• Compliance reporting</li>
                <li>• Automated alerting</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* International Security Standards */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Globe className="w-6 h-6" />
            International Security Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-4">Global Compliance Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-800 mb-3">International Certifications</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• ISO 27001 Information Security Management</li>
                  <li>• ISO 27017 Cloud Security Controls</li>
                  <li>• ISO 27018 Cloud Privacy Protection</li>
                  <li>• FedRAMP Authorization (in progress)</li>
                  <li>• CSA STAR Cloud Security Assessment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Industry Standards</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• NIST Cybersecurity Framework alignment</li>
                  <li>• CIS Critical Security Controls</li>
                  <li>• OWASP Top 10 protection measures</li>
                  <li>• PCI DSS for payment processing</li>
                  <li>• HIPAA compliance for healthcare clients</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Regional Compliance Matrix</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
              <div className="bg-white p-2 rounded border text-center">🇪🇺 GDPR</div>
              <div className="bg-white p-2 rounded border text-center">🇺🇸 SOC 2</div>
              <div className="bg-white p-2 rounded border text-center">🇨🇦 PIPEDA</div>
              <div className="bg-white p-2 rounded border text-center">🇧🇷 LGPD</div>
              <div className="bg-white p-2 rounded border text-center">🇦🇺 Privacy Act</div>
              <div className="bg-white p-2 rounded border text-center">🇯🇵 APPI</div>
              <div className="bg-white p-2 rounded border text-center">🇸🇬 PDPA</div>
              <div className="bg-white p-2 rounded border text-center">🇬🇧 DPA 2018</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation & Maintenance */}
      <Card className="bg-gradient-to-r from-red-50 to-purple-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-center text-red-800">Security & Compliance Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Implementation Timeline</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Phase 1 (Weeks 1-4):</strong> Security assessment and planning</li>
                <li>• <strong>Phase 2 (Weeks 5-8):</strong> Core security controls implementation</li>
                <li>• <strong>Phase 3 (Weeks 9-12):</strong> Compliance framework deployment</li>
                <li>• <strong>Phase 4 (Weeks 13-16):</strong> Audit preparation and certification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Resource Requirements</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Chief Information Security Officer (CISO)</li>
                <li>• Security engineering team (3-4 specialists)</li>
                <li>• Compliance and audit manager</li>
                <li>• External security consultant</li>
                <li>• Estimated cost: $200K-400K annually</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Success Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
              <div><strong>Security:</strong> Zero successful security breaches</div>
              <div><strong>Compliance:</strong> 100% audit compliance score</div>
              <div><strong>Certification:</strong> SOC 2 Type II within 6 months</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityCompliance;
