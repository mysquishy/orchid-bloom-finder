
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Palette, Users, Globe, Shield, Clock, CheckCircle } from 'lucide-react';

const WhiteLabelSolutions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">White-Label Solutions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform Orkhidly into your own branded platform with comprehensive white-label solutions 
          designed for educational institutions, botanical gardens, and enterprise clients.
        </p>
        <Badge className="bg-purple-100 text-purple-800">Enterprise Only</Badge>
      </div>

      {/* Custom Branding Configuration */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Palette className="w-6 h-6" />
            Custom Branding Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Complete Brand Customization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Visual Identity</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Custom logo integration (header, footer, loading screens)</li>
                  <li>• Brand color scheme implementation</li>
                  <li>• Typography and font customization</li>
                  <li>• Custom iconography and UI elements</li>
                  <li>• Splash screen and loading animations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Content Customization</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Custom welcome messages and onboarding</li>
                  <li>• Branded help documentation</li>
                  <li>• Custom email templates</li>
                  <li>• Institution-specific plant collections</li>
                  <li>• Localized content and terminology</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <Clock className="w-8 h-8 text-blue-600 mb-2" />
                <h4 className="font-medium text-blue-900 mb-2">Implementation Timeline</h4>
                <p className="text-sm text-blue-700">2-4 weeks for complete brand integration</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-medium text-green-900 mb-2">Success Metrics</h4>
                <p className="text-sm text-green-700">95% brand recognition among users</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <Users className="w-8 h-8 text-orange-600 mb-2" />
                <h4 className="font-medium text-orange-900 mb-2">Resource Requirements</h4>
                <p className="text-sm text-orange-700">1 designer, 2 developers</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Institutional Account Management */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Building className="w-6 h-6" />
            Institutional Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Enterprise Account Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Administrative Controls</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Master admin dashboard</li>
                  <li>• Department-level management</li>
                  <li>• Role-based access control</li>
                  <li>• Usage analytics and reporting</li>
                  <li>• Cost center allocation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">User Management</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Single sign-on (SSO) integration</li>
                  <li>• LDAP/Active Directory sync</li>
                  <li>• Automated user provisioning</li>
                  <li>• Group permissions management</li>
                  <li>• License allocation and tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Implementation Requirements</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• Dedicated technical contact for SSO setup</p>
              <p>• IT security approval and configuration</p>
              <p>• User directory access permissions</p>
              <p>• 6-8 weeks implementation timeline</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk User Onboarding */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Users className="w-6 h-6" />
            Bulk User Onboarding Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-3">Automated Onboarding</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• CSV import for user data</li>
                <li>• Automated welcome email campaigns</li>
                <li>• Pre-configured user preferences</li>
                <li>• Department-specific content assignments</li>
                <li>• Training module auto-enrollment</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3">Onboarding Analytics</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• User activation tracking</li>
                <li>• Feature adoption metrics</li>
                <li>• Time-to-first-value measurement</li>
                <li>• Department adoption rates</li>
                <li>• Training completion analytics</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Success Metrics & Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Week 1-2:</strong> User data import and validation
              </div>
              <div>
                <strong>Week 3-4:</strong> Automated welcome sequence deployment
              </div>
              <div>
                <strong>Target:</strong> 80% user activation within 30 days
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Domain Setup */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Globe className="w-6 h-6" />
            Custom Domain Setup and SSL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-4">Professional Domain Configuration</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">Domain Options</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• plants.yourinstitution.edu</li>
                    <li>• orchid.yourbotanicgarden.org</li>
                    <li>• identification.yourcompany.com</li>
                    <li>• Custom subdomain configurations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">Security Features</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Automatic SSL certificate provisioning</li>
                    <li>• HSTS security headers</li>
                    <li>• CDN integration for global performance</li>
                    <li>• DDoS protection and monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Technical Requirements</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• DNS management access</li>
                <li>• Domain ownership verification</li>
                <li>• IT security team coordination</li>
                <li>• 1-2 week setup timeline</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Ongoing Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Enhanced brand credibility</li>
                <li>• Improved user trust and adoption</li>
                <li>• SEO and marketing advantages</li>
                <li>• Complete white-label experience</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-purple-800">White-Label Implementation Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Discovery & Planning</h4>
              <p className="text-xs text-gray-600">2 weeks: Requirements gathering and technical planning</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Brand Implementation</h4>
              <p className="text-xs text-gray-600">3-4 weeks: Visual customization and content adaptation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Integration & Testing</h4>
              <p className="text-xs text-gray-600">2-3 weeks: SSO setup and domain configuration</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Launch & Support</h4>
              <p className="text-xs text-gray-600">1 week: Deployment and user onboarding</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhiteLabelSolutions;
