
import React from 'react';
import { Check, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Pricing = () => {
  const { createCheckout, subscribed, subscriptionTier } = useSubscription();
  const { user } = useAuth();

  const handleSubscribe = async (priceType: 'monthly' | 'annual') => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    try {
      await createCheckout(priceType);
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error('Failed to create checkout session');
    }
  };

  const features = {
    free: [
      '3 plant identifications per month',
      'Basic plant information',
      'Browse orchid database',
      'Basic care reminders',
      'Mobile app access'
    ],
    premium: [
      'Unlimited plant identifications',
      'AI-powered disease detection',
      'Advanced care analytics',
      'Personalized care calendars',
      'Weather integration',
      'Export plant reports',
      'Priority support',
      'No advertisements',
      'Premium community features'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of AI-powered orchid care with zero API costs
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">94% Profit Margin - Zero API Costs!</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-gray-500">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant="outline"
                disabled={!subscribed}
              >
                {subscribed ? 'Current Plan' : 'Get Started'}
              </Button>
            </CardContent>
          </Card>

          {/* Monthly Premium */}
          <Card className="relative border-2 border-purple-200 shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-green-500 to-purple-600 text-white px-4 py-1">
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Crown className="w-6 h-6 text-purple-600" />
                Premium Monthly
              </CardTitle>
              <CardDescription>Full access to all features</CardDescription>
              <div className="text-3xl font-bold">$9.99<span className="text-sm font-normal text-gray-500">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
                onClick={() => handleSubscribe('monthly')}
                disabled={subscribed && subscriptionTier?.includes('Monthly')}
              >
                {subscribed && subscriptionTier?.includes('Monthly') ? 'Current Plan' : 'Start Premium Monthly'}
              </Button>
            </CardContent>
          </Card>

          {/* Annual Premium */}
          <Card className="relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                Best Value
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Crown className="w-6 h-6 text-emerald-600" />
                Premium Annual
              </CardTitle>
              <CardDescription>Save 2 months with annual billing</CardDescription>
              <div className="text-3xl font-bold">$99<span className="text-sm font-normal text-gray-500">/year</span></div>
              <div className="text-sm text-green-600 font-medium">Save $20.88 per year</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                onClick={() => handleSubscribe('annual')}
                disabled={subscribed && subscriptionTier?.includes('Annual')}
              >
                {subscribed && subscriptionTier?.includes('Annual') ? 'Current Plan' : 'Start Premium Annual'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose OrchidAI Premium?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero API Costs</h3>
              <p className="text-gray-600">We use free AI services, passing 94% profit margin value to you</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-600">Ad-free interface with priority support and exclusive features</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlimited Access</h3>
              <p className="text-gray-600">Identify unlimited plants with advanced AI-powered features</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
