
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, MessageSquare, Bug, HelpCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, you would send this to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SEOHead 
        title="Contact Us"
        description="Get in touch with the Orkhidly team. We're here to help with plant identification, technical support, and any questions you have."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about plant identification or need technical support? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">support@orkhidly.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        123 Plant Street<br />
                        Green City, GC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    Quick Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href="/help" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-medium text-gray-900">Help Center</h4>
                      <p className="text-sm text-gray-600">Browse our FAQ and guides</p>
                    </a>
                    <a href="/help#plant-identification" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-medium text-gray-900">Plant ID Issues</h4>
                      <p className="text-sm text-gray-600">Troubleshoot identification problems</p>
                    </a>
                    <a href="/pricing" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-medium text-gray-900">Subscription Help</h4>
                      <p className="text-sm text-gray-600">Billing and account questions</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="general">General Question</option>
                        <option value="technical">Technical Support</option>
                        <option value="plant-id">Plant Identification</option>
                        <option value="billing">Billing & Subscriptions</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="partnership">Partnership Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Please provide as much detail as possible. If you're reporting a bug, include steps to reproduce the issue."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>

                    <p className="text-sm text-gray-600 text-center">
                      By submitting this form, you agree to our{' '}
                      <a href="/privacy-policy" className="text-green-600 hover:underline">Privacy Policy</a>
                      {' '}and{' '}
                      <a href="/terms-of-service" className="text-green-600 hover:underline">Terms of Service</a>.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Bug className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Critical Issues</h3>
                    <p className="text-red-800 mb-4">
                      If you're experiencing a critical bug that prevents app usage or a security issue, 
                      please contact us immediately at{' '}
                      <a href="mailto:urgent@orkhidly.com" className="font-medium underline">
                        urgent@orkhidly.com
                      </a>
                      {' '}or call our emergency line.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href="mailto:urgent@orkhidly.com"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Emergency Email
                      </a>
                      <a 
                        href="tel:+15551234567"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Emergency Phone
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
