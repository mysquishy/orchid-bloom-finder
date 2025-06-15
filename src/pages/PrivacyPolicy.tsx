
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - Orkhidly"
        description="Learn how Orkhidly protects your privacy and handles your personal data in compliance with GDPR and other privacy regulations."
        keywords="privacy policy, data protection, GDPR, plant identification privacy"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Orkhidly ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our plant identification service.
                </p>
                <p className="text-gray-700">
                  By using Orkhidly, you agree to the collection and use of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Email address and name when you create an account</li>
                    <li>Profile information you choose to provide</li>
                    <li>Payment information for premium subscriptions</li>
                    <li>Communications you send to us</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Plant Data</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Photos you upload for plant identification</li>
                    <li>Plant collection and care records</li>
                    <li>Location data (if you choose to provide it)</li>
                    <li>Usage analytics to improve our AI models</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Information</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Device information and browser type</li>
                    <li>IP address and general location</li>
                    <li>Usage patterns and app performance data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide and improve our plant identification services</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important updates about your account or our services</li>
                  <li>Respond to your questions and provide customer support</li>
                  <li>Improve our AI models and accuracy (with anonymized data)</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We do not sell, trade, or rent your personal information to third parties. We may share information in these limited circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>With your explicit consent</li>
                  <li>With service providers who help us operate our platform</li>
                  <li>To comply with legal requirements or protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                  <li>Anonymized data for research and AI improvement</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Secure cloud infrastructure (Supabase)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights (GDPR)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Under GDPR and other privacy laws, you have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate information</li>
                  <li><strong>Erasure:</strong> Request deletion of your data</li>
                  <li><strong>Portability:</strong> Transfer your data to another service</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to processing of your data</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, contact us at privacy@orkhidly.com
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how you use our service</li>
                  <li>Provide personalized content</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can control cookies through your browser settings, but some features may not work properly if disabled.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  If you have questions about this Privacy Policy or our data practices, contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email: privacy@orkhidly.com
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  We will respond to your inquiry within 30 days.
                </p>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Continued use of our service after changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
