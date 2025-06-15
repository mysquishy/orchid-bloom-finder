
import React from 'react';
import SEOHead from '@/components/SEOHead';

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy"
        description="Learn how Orkhidly protects and handles your personal information and data privacy."
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Name and email address when you create an account</li>
                  <li>Profile information you choose to provide</li>
                  <li>Payment information processed securely through Stripe</li>
                  <li>Communication preferences and settings</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">Plant Data</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Photos you upload for plant identification</li>
                  <li>Plant collection and care records</li>
                  <li>Identification history and confidence scores</li>
                  <li>Notes and care logs you create</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">Usage Data</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>App usage patterns and feature interactions</li>
                  <li>Device information and IP address</li>
                  <li>Error logs and performance metrics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide AI-powered plant identification services</li>
                  <li>Maintain your plant collection and care records</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important updates and notifications</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure security and prevent fraudulent activity</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Sharing and Disclosure</h2>
                <p className="mb-4">We do not sell your personal data. We may share information in limited circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> Third-party services like Stripe for payments and Supabase for data storage</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and users</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                <p className="mb-4">We implement industry-standard security measures:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption in transit and at rest</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Secure payment processing through Stripe</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                <p className="mb-4">We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep you logged in securely</li>
                  <li>Remember your preferences</li>
                  <li>Analyze app usage and performance</li>
                  <li>Provide personalized experiences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="mb-4">We retain your data as long as:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your account remains active</li>
                  <li>Required for providing our services</li>
                  <li>Necessary for legal compliance</li>
                  <li>Needed for dispute resolution</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p>Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
                <p>Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or app notification.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="mb-4">If you have questions about this Privacy Policy or want to exercise your rights, contact us:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@orkhidly.com</p>
                  <p><strong>Address:</strong> Orkhidly Privacy Team, [Your Address]</p>
                  <p><strong>Phone:</strong> [Your Phone Number]</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
