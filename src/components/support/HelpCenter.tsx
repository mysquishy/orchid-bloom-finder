
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Book, Video, Download, ArrowRight, HelpCircle, Star } from 'lucide-react';
import HelpBreadcrumb from '@/components/ui/HelpBreadcrumb';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  popularity: number;
}

interface GuideItem {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
}

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How accurate is the orchid identification?',
      answer: 'Our AI model has 95% accuracy across 1,000+ orchid species. For best results, take clear photos in good lighting with the flower visible.',
      category: 'identification',
      tags: ['ai', 'accuracy', 'photos'],
      popularity: 98
    },
    {
      id: '2',
      question: 'Can I use the app offline?',
      answer: 'Yes! The app works offline for viewing your collection and care schedules. Identification requires internet connection.',
      category: 'features',
      tags: ['offline', 'sync', 'features'],
      popularity: 87
    },
    {
      id: '3',
      question: 'How do I care for my orchid?',
      answer: 'Each identified orchid comes with personalized care instructions including watering frequency, light requirements, and feeding schedules.',
      category: 'care',
      tags: ['watering', 'light', 'feeding'],
      popularity: 95
    },
    {
      id: '4',
      question: 'What\'s included in premium subscription?',
      answer: 'Premium includes unlimited identifications, advanced analytics, expert consultations, and priority support.',
      category: 'subscription',
      tags: ['premium', 'features', 'pricing'],
      popularity: 76
    }
  ];

  const guides: GuideItem[] = [
    {
      id: '1',
      title: 'Getting Started with Orkhidly',
      description: 'Complete beginner guide to using the app and identifying your first orchid.',
      category: 'basics',
      readTime: '5 min',
      difficulty: 'beginner',
      popularity: 92
    },
    {
      id: '2',
      title: 'Orchid Care Fundamentals',
      description: 'Learn the essential care requirements for healthy orchid growth.',
      category: 'care',
      readTime: '12 min',
      difficulty: 'beginner',
      popularity: 88
    },
    {
      id: '3',
      title: 'Advanced Photography Tips',
      description: 'Master the art of orchid photography for better identification results.',
      category: 'photography',
      readTime: '8 min',
      difficulty: 'intermediate',
      popularity: 71
    },
    {
      id: '4',
      title: 'Disease Diagnosis & Treatment',
      description: 'Identify and treat common orchid diseases and pests.',
      category: 'health',
      readTime: '15 min',
      difficulty: 'advanced',
      popularity: 84
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

  const popularArticles = [...faqItems, ...guides]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

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
    <div className="max-w-6xl mx-auto px-4 space-y-8">
      {/* Breadcrumb */}
      <HelpBreadcrumb />

      {/* Search Section */}
      <div className="text-center space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl shadow-sm"
          />
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Getting Started */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-green-900">Getting Started</CardTitle>
                <p className="text-green-700 text-sm">New to orchid care?</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
              <span className="text-gray-800 font-medium">First Steps Guide</span>
              <ArrowRight className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
              <span className="text-gray-800 font-medium">Setting Up Your Account</span>
              <ArrowRight className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
              <span className="text-gray-800 font-medium">Taking Your First Photo</span>
              <ArrowRight className="w-4 h-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Plant Care Guides */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-purple-900">Plant Care Guides</CardTitle>
                <p className="text-purple-700 text-sm">Expert care advice</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
              <span className="text-gray-800 font-medium">Watering Schedule</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
              <span className="text-gray-800 font-medium">Light Requirements</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
              <span className="text-gray-800 font-medium">Disease Prevention</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Articles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          Popular Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 leading-tight">
                    {'question' in article ? article.question : article.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs ml-2">
                    {article.popularity}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {'answer' in article ? article.answer : article.description}
                </p>
                {'readTime' in article && (
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{article.readTime} read</span>
                    <Badge className={getDifficultyColor(article.difficulty)}>
                      {article.difficulty}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Contact Support</h3>
            <p className="text-sm text-gray-500">Get help from our team</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Video Tutorials</h3>
            <p className="text-sm text-gray-500">Watch how-to videos</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Book className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">User Manual</h3>
            <p className="text-sm text-gray-500">Comprehensive guide</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Downloads</h3>
            <p className="text-sm text-gray-500">Get helpful resources</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="faq" className="text-sm font-medium">FAQs</TabsTrigger>
          <TabsTrigger value="guides" className="text-sm font-medium">User Guides</TabsTrigger>
          <TabsTrigger value="contact" className="text-sm font-medium">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{faq.answer}</p>
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
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg text-gray-900">{guide.title}</h3>
                  <Badge className={getDifficultyColor(guide.difficulty)}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{guide.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">{guide.category}</Badge>
                  <span className="text-sm text-gray-500">{guide.readTime} read</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Our Support Team</CardTitle>
              <p className="text-gray-600">We're here to help you succeed with your orchids</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-medium text-lg text-green-900">Email Support</h4>
                    </div>
                    <p className="text-sm text-green-700 mb-3">For general questions and issues</p>
                    <p className="text-sm font-medium text-green-900">support@orkhidly.app</p>
                    <p className="text-xs text-green-600 mt-2">Response within 24 hours</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-medium text-lg text-purple-900">Live Chat</h4>
                    </div>
                    <p className="text-sm text-purple-700 mb-3">Real-time support</p>
                    <p className="text-sm font-medium text-purple-900">Available 9 AM - 5 PM EST</p>
                    <p className="text-xs text-purple-600 mt-2">Premium users only</p>
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
