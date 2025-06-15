import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Webhook, Zap, BookOpen, Shield, Clock, Settings, Database } from 'lucide-react';

const ApiIntegrationGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">API & Integration Guide</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive documentation for developers to integrate Orkhidly's plant identification 
          and management capabilities into existing systems and custom applications.
        </p>
        <Badge className="bg-green-100 text-green-800">Developer Resources</Badge>
      </div>

      {/* RESTful API Documentation */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Code className="w-6 h-6" />
            RESTful API Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">Core API Endpoints</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 border border-green-200 rounded">
                <h4 className="font-medium text-green-800 mb-2">Plant Identification API</h4>
                <div className="font-mono text-sm space-y-2">
                  <div><strong>POST</strong> /api/v1/identify</div>
                  <div className="text-gray-600">Upload image for AI-powered plant identification</div>
                  <div className="text-xs text-gray-500">Rate limit: 100 requests/hour (Basic), 1000/hour (Premium)</div>
                </div>
              </div>
              <div className="bg-white p-4 border border-green-200 rounded">
                <h4 className="font-medium text-green-800 mb-2">Species Database API</h4>
                <div className="font-mono text-sm space-y-2">
                  <div><strong>GET</strong> /api/v1/species/&#123;id&#125;</div>
                  <div><strong>GET</strong> /api/v1/species/search?q=&#123;query&#125;</div>
                  <div className="text-gray-600">Access comprehensive plant species information</div>
                </div>
              </div>
              <div className="bg-white p-4 border border-green-200 rounded">
                <h4 className="font-medium text-green-800 mb-2">User Collections API</h4>
                <div className="font-mono text-sm space-y-2">
                  <div><strong>GET/POST/PUT/DELETE</strong> /api/v1/collections</div>
                  <div className="text-gray-600">Manage user plant collections and care records</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3">Authentication Methods</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• API Key authentication</li>
                <li>• OAuth 2.0 with JWT tokens</li>
                <li>• Enterprise SSO integration</li>
                <li>• Rate limiting and quota management</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-3">Response Formats</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• JSON (default) with detailed metadata</li>
                <li>• XML for legacy system compatibility</li>
                <li>• GraphQL for flexible data queries</li>
                <li>• Webhook notifications for real-time updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Webhook className="w-6 h-6" />
            Webhook Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Real-time Event Notifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Available Events</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• plant.identification.completed</li>
                  <li>• user.collection.updated</li>
                  <li>• care.reminder.triggered</li>
                  <li>• expert.verification.completed</li>
                  <li>• system.maintenance.scheduled</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Delivery Guarantees</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• At-least-once delivery semantics</li>
                  <li>• Retry mechanism with exponential backoff</li>
                  <li>• Dead letter queue for failed deliveries</li>
                  <li>• Webhook signature verification</li>
                  <li>• Real-time delivery status monitoring</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Webhook Setup Example</h4>
            <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
              <div>curl -X POST https://api.orkhidly.com/v1/webhooks \</div>
              <div>  -H "Authorization: Bearer YOUR_API_KEY" \</div>
              <div>  -H "Content-Type: application/json" \</div>
              <div>  -d '{</div>
              <div>    "url": "https://your-app.com/webhooks/orkhidly",</div>
              <div>    "events": ["plant.identification.completed"],</div>
              <div>    "secret": "your_webhook_secret"</div>
              <div>  }'</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Third-party Integration */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Zap className="w-6 h-6" />
            Third-Party System Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-3">Popular Integrations</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• <strong>Salesforce:</strong> CRM plant data sync</li>
                <li>• <strong>Zapier:</strong> No-code automation workflows</li>
                <li>• <strong>Microsoft Power Automate:</strong> Enterprise workflows</li>
                <li>• <strong>Slack:</strong> Team identification notifications</li>
                <li>• <strong>Google Sheets:</strong> Data export and analysis</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-3">Enterprise Systems</h4>
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• <strong>SAP:</strong> Inventory and asset management</li>
                <li>• <strong>Oracle:</strong> Database integration</li>
                <li>• <strong>Microsoft Dynamics:</strong> Business process automation</li>
                <li>• <strong>ServiceNow:</strong> IT service management</li>
                <li>• <strong>Tableau:</strong> Advanced analytics and visualization</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Integration Support Levels</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Basic:</strong> API documentation and community support
              </div>
              <div>
                <strong>Premium:</strong> Dedicated integration engineer
              </div>
              <div>
                <strong>Enterprise:</strong> Custom integration development
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Development Guidelines */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <BookOpen className="w-6 h-6" />
            Custom Development Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-4">Development Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Code Standards</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• RESTful API design principles</li>
                  <li>• OpenAPI 3.0 specification compliance</li>
                  <li>• Semantic versioning for API updates</li>
                  <li>• Comprehensive error handling</li>
                  <li>• Proper HTTP status code usage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Performance Guidelines</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Implement proper caching strategies</li>
                  <li>• Use pagination for large datasets</li>
                  <li>• Optimize image upload and processing</li>
                  <li>• Monitor API response times</li>
                  <li>• Implement graceful degradation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Development Resources</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Interactive API documentation (Swagger UI)</li>
                <li>• SDK libraries (Python, JavaScript, PHP)</li>
                <li>• Code examples and tutorials</li>
                <li>• Postman collection for testing</li>
                <li>• Development sandbox environment</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Support Channels</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Developer community forum</li>
                <li>• Technical documentation portal</li>
                <li>• Email support for integration issues</li>
                <li>• Video tutorials and webinars</li>
                <li>• Priority support for enterprise clients</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Shield className="w-6 h-6" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-4">Enterprise Security Standards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-800 mb-3">Data Protection</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• End-to-end encryption (TLS 1.3)</li>
                  <li>• Data encryption at rest (AES-256)</li>
                  <li>• PII anonymization capabilities</li>
                  <li>• GDPR compliance mechanisms</li>
                  <li>• Regular security audits and penetration testing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-800 mb-3">Access Control</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Multi-factor authentication (MFA)</li>
                  <li>• Role-based access control (RBAC)</li>
                  <li>• API key rotation and management</li>
                  <li>• IP whitelisting for enterprise accounts</li>
                  <li>• Comprehensive audit logging</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Compliance Certifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="bg-white p-2 rounded border text-center">SOC 2 Type II</div>
              <div className="bg-white p-2 rounded border text-center">ISO 27001</div>
              <div className="bg-white p-2 rounded border text-center">GDPR Compliant</div>
              <div className="bg-white p-2 rounded border text-center">HIPAA Ready</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-800">API Integration Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Planning Phase</h4>
              <p className="text-xs text-gray-600">1-2 weeks: Requirements analysis and API design</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Development</h4>
              <p className="text-xs text-gray-600">2-4 weeks: Integration development and testing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Testing</h4>
              <p className="text-xs text-gray-600">1-2 weeks: Security testing and performance validation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Deployment</h4>
              <p className="text-xs text-gray-600">1 week: Production deployment and monitoring</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Success Metrics</h4>
            <p className="text-sm text-blue-700">
              Target 99.9% API uptime, less than 200ms average response time, and seamless integration 
              with existing business systems within the planned timeline.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiIntegrationGuide;
