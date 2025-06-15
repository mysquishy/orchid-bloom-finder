
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertTriangle, CreditCard, Shield, Users, Gavel } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const TermsOfService: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Service - Orkhidly"
        description="Read Orkhidly's Terms of Service to understand your rights and responsibilities when using our plant identification platform."
        keywords="terms of service, user agreement, plant identification terms"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Agreement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  By accessing and using Orkhidly ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-gray-700">
                  These Terms of Service ("Terms") govern your use of our plant identification platform operated by Orkhidly ("us", "we", or "our").
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Orkhidly provides AI-powered plant identification services, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Plant species identification through photo analysis</li>
                  <li>Plant care recommendations and guidance</li>
                  <li>Personal plant collection management</li>
                  <li>Community features and expert consultations</li>
                  <li>Premium analytics and advanced features</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Accounts and Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Account Creation</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>One account per person; sharing accounts is prohibited</li>
                    <li>You must be at least 13 years old to create an account</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Acceptable Use</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Use the service for lawful purposes only</li>
                    <li>Do not upload harmful, offensive, or inappropriate content</li>
                    <li>Respect intellectual property rights</li>
                    <li>Do not attempt to reverse engineer our AI models</li>
                    <li>Do not use automated systems to abuse the service</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Subscription and Billing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Subscription and Billing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Free Tier</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Limited to 3 plant identifications per month</li>
                    <li>Basic plant care recommendations</li>
                    <li>Access to community features</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Premium Subscriptions</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Subscriptions are billed monthly or annually</li>
                    <li>Automatic renewal unless cancelled</li>
                    <li>Cancellation takes effect at the end of the current billing period</li>
                    <li>No refunds for partial months unless required by law</li>
                    <li>Price changes will be communicated 30 days in advance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Content and Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle>Content and Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Content</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>You retain ownership of photos and content you upload</li>
                    <li>You grant us license to use your content to provide our services</li>
                    <li>We may use anonymized data to improve our AI models</li>
                    <li>You can delete your content at any time</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Content</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>All service features, design, and functionality are our property</li>
                    <li>AI models and algorithms are proprietary</li>
                    <li>Plant care content is provided for informational purposes</li>
                    <li>You may not copy, reproduce, or redistribute our content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Disclaimers and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">AI Accuracy Disclaimer</h3>
                  <p className="text-yellow-700 text-sm">
                    Our AI plant identification is provided "as is" without warranties. While we strive for accuracy, results may not always be correct. Always consult with plant experts for critical decisions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service Availability</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>We aim for 99.9% uptime but cannot guarantee uninterrupted service</li>
                    <li>Maintenance windows may temporarily affect availability</li>
                    <li>We reserve the right to modify or discontinue features</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-700">
                    Our total liability shall not exceed the amount you paid for the service in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy and Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>We comply with GDPR and other applicable privacy laws</li>
                  <li>You can request data deletion at any time</li>
                  <li>We use industry-standard security measures</li>
                  <li>Data breaches will be reported as required by law</li>
                </ul>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By You</h3>
                  <p className="text-gray-700">
                    You may terminate your account at any time by contacting us or using the account deletion feature in your settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By Us</h3>
                  <p className="text-gray-700">
                    We may suspend or terminate accounts that violate these Terms, engage in abusive behavior, or for any reason with 30 days notice.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated via email or in-app notification at least 30 days before they take effect. Continued use of the service constitutes acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>Governing Law and Disputes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  These Terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved through binding arbitration, except for intellectual property claims or injunctive relief.
                </p>
                <p className="text-gray-700">
                  For questions about these Terms, contact us at legal@orkhidly.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
