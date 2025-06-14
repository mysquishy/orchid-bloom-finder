
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Book, Video, Download } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

interface GuideItem {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How accurate is the orchid identification?',
      answer: 'Our AI model has 95% accuracy across 1,000+ orchid species. For best results, take clear photos in good lighting with the flower visible.',
      category: 'identification',
      tags: ['ai', 'accuracy', 'photos']
    },
    {
      id: '2',
      question: 'Can I use the app offline?',
      answer: 'Yes! The app works offline for viewing your collection and care schedules. Identification requires internet connection.',
      category: 'features',
      tags: ['offline', 'sync', 'features']
    },
    {
      id: '3',
      question: 'How do I care for my orchid?',
      answer: 'Each identified orchid comes with personalized care instructions including watering frequency, light requirements, and feeding schedules.',
      category: 'care',
      tags: ['watering', 'light', 'feeding']
    },
    {
      id: '4',
      question: 'What\'s included in premium subscription?',
      answer: 'Premium includes unlimited identifications, advanced analytics, expert consultations, and priority support.',
      category: 'subscription',
      tags: ['premium', 'features', 'pricing']
    }
  ];

  const guides: GuideItem[] = [
    {
      id: '1',
      title: 'Getting Started with OrchidAI',
      description: 'Complete beginner guide to using the app and identifying your first orchid.',
      category: 'basics',
      readTime: '5 min',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Orchid Care Fundamentals',
      description: 'Learn the essential care requirements for healthy orchid growth.',
      category: 'care',
      readTime: '12 min',
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: 'Advanced Photography Tips',
      description: 'Master the art of orchid photography for better identification results.',
      category: 'photography',
      readTime: '8 min',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      title: 'Disease Diagnosis & Treatment',
      description: 'Identify and treat common orchid diseases and pests.',
      category: 'health',
      readTime: '15 min',
      difficulty: 'advanced'
    }
  ];

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: GuideItem['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-600">Find answers, guides, and get support for OrchidAI</p>
        
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Contact Support</h3>
            <p className="text-sm text-gray-500">Get help from our team</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Video className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Video Tutorials</h3>
            <p className="text-sm text-gray-500">Watch how-to videos</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Book className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium">User Manual</h3>
            <p className="text-sm text-gray-500">Comprehensive guide</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Download className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-medium">Downloads</h3>
            <p className="text-sm text-gray-500">Get helpful resources</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600 mb-3">{faq.answer}</p>
                <div className="flex gap-2">
                  {faq.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{guide.title}</h3>
                  <Badge className={getDifficultyColor(guide.difficulty)}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{guide.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{guide.category}</Badge>
                  <span className="text-sm text-gray-500">{guide.readTime} read</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Support Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">📧 Email Support</h4>
                    <p className="text-sm text-gray-600 mb-2">For general questions and issues</p>
                    <p className="text-sm">support@orchidai.app</p>
                    <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">💬 Live Chat</h4>
                    <p className="text-sm text-gray-600 mb-2">Real-time support</p>
                    <p className="text-sm">Available 9 AM - 5 PM EST</p>
                    <p className="text-xs text-gray-500 mt-1">Premium users only</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpCenter;
