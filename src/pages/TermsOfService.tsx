
import React from 'react';
import SEOHead from '@/components/SEOHead';

const TermsOfService = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Service"
        description="Read our terms and conditions for using Orkhidly's AI plant identification services."
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing or using Orkhidly ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="mb-4">Orkhidly provides:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered plant identification services</li>
                  <li>Plant care guidance and recommendations</li>
                  <li>Digital plant collection management</li>
                  <li>Community features and expert consultations</li>
                  <li>Educational content and resources</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Account Creation</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person or entity</li>
                  <li>You must be 13 years or older to create an account</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">Account Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep your login credentials secure</li>
                  <li>Notify us immediately of unauthorized access</li>
                  <li>You are liable for all activities under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription and Payments</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Free and Premium Plans</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Free plan includes limited plant identifications per month</li>
                  <li>Premium plans offer unlimited identifications and additional features</li>
                  <li>Pricing is clearly displayed before purchase</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Terms</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Payments are processed securely through Stripe</li>
                  <li>Subscriptions renew automatically unless cancelled</li>
                  <li>No refunds for partial month usage</li>
                  <li>Prices may change with 30 days notice</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">Cancellation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancel anytime through your account settings</li>
                  <li>Access continues until the end of your billing period</li>
                  <li>No cancellation fees</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Content and Conduct</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Content You Upload</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>You retain ownership of photos and content you upload</li>
                  <li>You grant us license to use content for providing our services</li>
                  <li>Content must not violate any laws or third-party rights</li>
                  <li>No explicit, harmful, or spam content</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">Prohibited Activities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reverse engineering or attempting to extract our algorithms</li>
                  <li>Automated scraping or data harvesting</li>
                  <li>Impersonating others or providing false information</li>
                  <li>Interfering with the service or other users</li>
                  <li>Commercial use without explicit permission</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. AI Identification Accuracy</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important Disclaimer:</strong> Plant identification results are provided for informational purposes only and should not be relied upon for critical decisions regarding plant care, consumption, or medical use.
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI identification may not always be 100% accurate</li>
                  <li>Always consult experts for critical plant identification</li>
                  <li>We are not liable for misidentification consequences</li>
                  <li>Results improve over time but are not guaranteed</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our service, technology, and branding are our property</li>
                  <li>Plant identification algorithms and models are proprietary</li>
                  <li>You may not copy, modify, or distribute our software</li>
                  <li>Respect third-party intellectual property rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
                <p>Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your information.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Service Availability</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We strive for high uptime but cannot guarantee 100% availability</li>
                  <li>Scheduled maintenance will be announced in advance</li>
                  <li>We may modify or discontinue features with notice</li>
                  <li>No liability for service interruptions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <p className="mb-4">To the maximum extent permitted by law:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our liability is limited to the amount paid in the last 12 months</li>
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>Plant identification is provided "as is" without warranties</li>
                  <li>Users assume responsibility for plant care decisions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">By You</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Delete your account anytime through settings</li>
                  <li>Cancel subscription to stop future charges</li>
                  <li>Data deletion may take up to 30 days</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">By Us</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We may suspend accounts for Terms violations</li>
                  <li>30 days notice for service discontinuation</li>
                  <li>Immediate termination for severe violations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
                <p>These Terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
                <p>We may update these Terms periodically. Significant changes will be communicated via email or app notification. Continued use constitutes acceptance of new terms.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
                <p className="mb-4">For questions about these Terms, contact us:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@orkhidly.com</p>
                  <p><strong>Address:</strong> Orkhidly Legal Team, [Your Address]</p>
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

export default TermsOfService;
