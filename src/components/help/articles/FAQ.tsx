
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, AlertTriangle, CreditCard, Heart, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqSections = [
    {
      title: "Technical Issues",
      icon: Camera,
      color: "blue",
      questions: [
        {
          q: "Why isn't my camera working?",
          a: "First, check that you've given Orkhidly permission to access your camera in your device settings. On iPhone: Settings > Privacy > Camera > Orkhidly. On Android: Settings > Apps > Orkhidly > Permissions. If permissions are correct, try restarting the app or your device."
        },
        {
          q: "The app is running slowly or crashing",
          a: "This usually happens when your device is low on storage or memory. Try closing other apps, restart your device, or free up some storage space. Make sure you're running the latest version of Orkhidly from your app store."
        },
        {
          q: "My photos aren't uploading",
          a: "Check your internet connection first. Large photos may take a moment to upload on slower connections. If you're on cellular data, ensure you have sufficient data allowance. Photos over 10MB may need to be resized."
        }
      ]
    },
    {
      title: "Identification Issues",
      icon: AlertTriangle,
      color: "orange",
      questions: [
        {
          q: "The identification seems wrong - what should I do?",
          a: "Don't worry! Try taking another photo with better lighting, showing the flower more clearly, or from a different angle. Include the flower's full profile if possible. Our AI learns from feedback, so report incorrect results to help us improve. Remember, some orchid species look very similar!"
        },
        {
          q: "Can I identify orchids without flowers?",
          a: "While our AI works best with flowers visible, it can sometimes identify orchids from leaves and growth patterns. However, accuracy is significantly lower without flowers. For best results, wait until your orchid blooms or try identifying from old flower photos."
        },
        {
          q: "Why does the confidence score vary?",
          a: "Confidence scores reflect how certain our AI is about the identification. Higher scores (90%+) indicate strong matches, while lower scores suggest the orchid might be a rare species, hybrid, or the photo quality could be improved. Scores above 70% are generally reliable."
        }
      ]
    },
    {
      title: "Account & Subscription",
      icon: CreditCard,
      color: "green",
      questions: [
        {
          q: "How do I cancel my subscription?",
          a: "You can cancel anytime through your account settings. Go to Profile > Subscription > Cancel Subscription. You'll retain premium features until your current billing period ends. If you subscribed through app stores, you may need to cancel through iTunes or Google Play Store."
        },
        {
          q: "What happens to my data if I cancel?",
          a: "Your orchid collection and photos remain safe! Free users can access all their data with some limitations on new identifications. You can always resubscribe to regain full premium features. We never delete your plant collection."
        },
        {
          q: "Can I share my account with family?",
          a: "Each subscription is for individual use, but you can certainly help family members identify their orchids using your account. For multiple active users, we recommend separate accounts to track each person's collection properly."
        }
      ]
    },
    {
      title: "Plant Care Emergencies",
      icon: Heart,
      color: "red",
      questions: [
        {
          q: "Help! My orchid is dying - what do I do?",
          a: "Don't panic! First, stop watering immediately and assess the problem. Yellow/brown mushy roots indicate overwatering - remove damaged roots and repot in fresh bark. Wrinkled leaves usually mean underwatering. Check for pests, ensure proper light, and give your orchid time to recover. Most orchids are more resilient than they appear!"
        },
        {
          q: "All the flowers fell off - is it dead?",
          a: "Absolutely not! This is completely normal. Orchids naturally drop flowers after blooming (usually 2-8 weeks). Continue regular care, and your orchid will likely bloom again in 6-12 months. The plant is just resting and building energy for the next bloom cycle."
        },
        {
          q: "The leaves are turning yellow",
          a: "One or two yellow leaves is normal aging - orchids naturally shed older leaves. However, if multiple leaves turn yellow quickly, check for overwatering (most common cause), insufficient light, or root problems. Adjust care accordingly and be patient."
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "text-blue-600" },
      orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "text-orange-600" },
      green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "text-green-600" },
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600" }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find quick answers to common questions about using Orkhidly and caring for your orchids.
        </p>
        <Badge variant="secondary" className="text-sm">
          <HelpCircle className="w-4 h-4 mr-1" />
          Quick Help
        </Badge>
      </div>

      {/* Quick Links */}
      <Card className="bg-gray-50">
        <CardContent className="py-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Jump to Section:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {faqSections.map((section, index) => {
              const IconComponent = section.icon;
              const colorClasses = getColorClasses(section.color);
              return (
                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                  <IconComponent className={`w-4 h-4 mr-1 ${colorClasses.icon}`} />
                  {section.title}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Sections */}
      {faqSections.map((section, sectionIndex) => {
        const IconComponent = section.icon;
        const colorClasses = getColorClasses(section.color);
        
        return (
          <Card key={sectionIndex} className={`${colorClasses.bg} ${colorClasses.border}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 ${colorClasses.text}`}>
                <IconComponent className={`w-6 h-6 ${colorClasses.icon}`} />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.questions.map((faq, questionIndex) => (
                <div key={questionIndex} className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">{faq.q}</h4>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Still Need Help */}
      <Card className="bg-gradient-to-r from-purple-50 to-green-50 border-purple-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Still Need Help?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you succeed with your orchids.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white p-4 rounded-lg border border-purple-200 cursor-pointer hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-purple-800 mb-1">Email Support</h4>
              <p className="text-sm text-purple-600">support@orkhidly.app</p>
              <p className="text-xs text-purple-500 mt-1">Response within 24 hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 cursor-pointer hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-green-800 mb-1">Live Chat</h4>
              <p className="text-sm text-green-600">9 AM - 5 PM EST</p>
              <p className="text-xs text-green-500 mt-1">Premium users only</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;
