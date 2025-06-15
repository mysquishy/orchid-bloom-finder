
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Shield, Users, Globe, Key, Server, Cloud, Zap } from 'lucide-react';

const EnterpriseFeaturesTroubleshooting: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Building className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Enterprise Features Troubleshooting
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Resolve white-label configuration, API integrations, multi-user management, and custom domain issues
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge className="bg-indigo-100 text-indigo-800">Enterprise</Badge>
          <Badge className="bg-purple-100 text-purple-800">White-label</Badge>
          <Badge className="bg-blue-100 text-blue-800">API Integration</Badge>
        </div>
      </div>

      {/* White-label Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800 flex items-center gap-3">
            <Globe className="w-6 h-6" />
            White-label Configuration Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-indigo-600" />
                <h4 className="font-semibold text-indigo-800">Brand Customization Issues</h4>
              </div>
              <p className="text-sm text-indigo-700 mb-3">
                Custom logos, colors, or branding elements not applying correctly.
              </p>
              <div className="space-y-2">
                <div><strong>Configuration Requirements:</strong></div>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Logo: PNG/SVG, max 2MB, transparent background</li>
                  <li>• Primary color: Valid hex code format</li>
                  <li>• Favicon: ICO format, 32x32 pixels</li>
                  <li>• App name: 3-50 characters, alphanumeric</li>
                </ul>
                <div><strong>Troubleshooting:</strong></div>
                <ol className="list-decimal list-inside text-sm text-indigo-700 space-y-1">
                  <li>Verify file formats and sizes meet requirements</li>
                  <li>Clear CDN cache (may take 15 minutes)</li>
                  <li>Check color contrast ratios for accessibility</li>
                  <li>Test across different devices and browsers</li>
                </ol>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">Domain Configuration</h4>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                Custom domain not connecting or showing SSL certificate errors.
              </p>
              <div className="space-y-2">
                <div><strong>DNS Configuration:</strong></div>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• CNAME record pointing to provided endpoint</li>
                  <li>• SSL certificate automatically provisioned</li>
                  <li>• Propagation time: 24-48 hours</li>
                  <li>• Wildcard subdomain support available</li>
                </ul>
                <div><strong>Common Issues:</strong></div>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• DNS propagation delays</li>
                  <li>• Conflicting A records</li>
                  <li>• CDN caching old configurations</li>
                  <li>• SSL certificate renewal failures</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Integration Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
            <Server className="w-6 h-6" />
            API Integration Failures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Authentication Failures</h4>
                <p className="text-gray-700 text-sm mb-3">
                  API calls returning 401/403 errors or token validation issues.
                </p>
                <div className="space-y-2">
                  <div><strong>Authentication Methods:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• API Key authentication (header-based)</li>
                    <li>• OAuth 2.0 flow (for user-specific data)</li>
                    <li>• JWT tokens (for service-to-service)</li>
                    <li>• Webhook signatures (for event callbacks)</li>
                  </ul>
                  <div><strong>Troubleshooting Steps:</strong></div>
                  <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                    <li>Verify API key is active and not expired</li>
                    <li>Check request headers include proper authorization</li>
                    <li>Ensure API key has required scopes/permissions</li>
                    <li>Test with API testing tools (Postman, cURL)</li>
                    <li>Review rate limiting and quota usage</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Rate Limiting Issues</h4>
                <p className="text-gray-700 text-sm mb-3">
                  API requests being throttled or rate limit exceeded errors.
                </p>
                <div className="space-y-2">
                  <div><strong>Rate Limits by Plan:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Enterprise Basic: 1,000 requests/hour</li>
                    <li>• Enterprise Pro: 10,000 requests/hour</li>
                    <li>• Enterprise Custom: Negotiable limits</li>
                    <li>• Burst allowance: 2x normal rate for 5 minutes</li>
                  </ul>
                  <div><strong>Optimization Strategies:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Implement exponential backoff retry logic</li>
                    <li>• Use bulk operations where available</li>
                    <li>• Cache frequently accessed data</li>
                    <li>• Monitor rate limit headers in responses</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Webhook Delivery Problems</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Event webhooks not being delivered or failing validation.
                </p>
                <div className="space-y-2">
                  <div><strong>Webhook Requirements:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• HTTPS endpoint required</li>
                    <li>• Response within 30 seconds</li>
                    <li>• Return 200 status code for success</li>
                    <li>• Handle duplicate delivery gracefully</li>
                  </ul>
                  <div><strong>Debugging Tools:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Webhook logs in enterprise dashboard</li>
                    <li>• Test webhook endpoint functionality</li>
                    <li>• Signature verification validator</li>
                    <li>• Retry policy configuration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-user Account Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
            <Users className="w-6 h-6" />
            Multi-user Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Role & Permission Issues</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Users unable to access features or perform actions according to their assigned roles.
              </p>
              <div className="space-y-2">
                <div><strong>Available Roles:</strong></div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Admin: Full system access and user management</li>
                  <li>• Manager: Analytics, reporting, limited user management</li>
                  <li>• Expert: Enhanced AI testing and validation features</li>
                  <li>• User: Standard identification and community features</li>
                  <li>• Viewer: Read-only access to shared content</li>
                </ul>
                <div><strong>Permission Troubleshooting:</strong></div>
                <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
                  <li>Verify user role assignment in admin panel</li>
                  <li>Check for conflicting permission policies</li>
                  <li>Ensure user has completed account verification</li>
                  <li>Test permissions in incognito mode</li>
                </ol>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">User Provisioning Problems</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Issues with bulk user imports, SCIM provisioning, or SSO user creation.
              </p>
              <div className="space-y-2">
                <div><strong>Provisioning Methods:</strong></div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• CSV bulk import (up to 1,000 users)</li>
                  <li>• SCIM 2.0 automatic provisioning</li>
                  <li>• SSO just-in-time provisioning</li>
                  <li>• API-based user creation</li>
                </ul>
                <div><strong>Common Issues:</strong></div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Invalid email format in bulk imports</li>
                  <li>• SCIM endpoint configuration errors</li>
                  <li>• SSO attribute mapping problems</li>
                  <li>• Duplicate user email conflicts</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance & Scaling */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-orange-800 flex items-center gap-3">
            <Zap className="w-6 h-6" />
            Performance & Scaling Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3">Auto-scaling Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div><strong>Scaling Triggers:</strong></div>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• CPU utilization > 70% for 5 minutes</li>
                    <li>• Memory usage > 80% for 5 minutes</li>
                    <li>• Request queue length > 100</li>
                    <li>• Response time > 2 seconds</li>
                  </ul>
                </div>
                <div>
                  <div><strong>Scaling Limits:</strong></div>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Minimum instances: 2 (high availability)</li>
                    <li>• Maximum instances: Configurable by plan</li>
                    <li>• Scale-up time: 2-3 minutes</li>
                    <li>• Scale-down delay: 10 minutes</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <div><strong>Performance Monitoring:</strong></div>
                <ul className="text-sm text-orange-700 space-y-1 mt-2">
                  <li>• Real-time performance dashboard</li>
                  <li>• Automated alerting for threshold breaches</li>
                  <li>• Historical performance analytics</li>
                  <li>• Cost optimization recommendations</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3">Database Performance Issues</h4>
              <div className="space-y-2">
                <div><strong>Common Performance Problems:</strong></div>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Slow query performance on large datasets</li>
                  <li>• Connection pool exhaustion during peak usage</li>
                  <li>• Index optimization needed for custom queries</li>
                  <li>• Read replica lag affecting real-time features</li>
                </ul>
                <div><strong>Optimization Solutions:</strong></div>
                <ol className="list-decimal list-inside text-sm text-red-700 space-y-1">
                  <li>Review slow query logs and optimize indexes</li>
                  <li>Implement connection pooling best practices</li>
                  <li>Configure read replicas for analytical queries</li>
                  <li>Enable query result caching where appropriate</li>
                  <li>Consider database sharding for very large datasets</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Support */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="py-8">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Enterprise Support & Escalation
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Dedicated support channels and escalation procedures for enterprise customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">Priority Support</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Dedicated support representative</li>
                <li>• 4-hour response time SLA</li>
                <li>• Phone and video call support</li>
                <li>• 24/7 emergency hotline</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Technical Consultation</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Architecture review sessions</li>
                <li>• Integration planning assistance</li>
                <li>• Performance optimization guidance</li>
                <li>• Custom development consultation</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Proactive Monitoring</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• System health monitoring</li>
                <li>• Performance trend analysis</li>
                <li>• Automated issue detection</li>
                <li>• Preventive maintenance alerts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnterpriseFeaturesTroubleshooting;
