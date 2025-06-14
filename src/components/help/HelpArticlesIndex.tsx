
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Book, Heart, HelpCircle, Clock, Star } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popular: boolean;
  icon: any;
}

const HelpArticlesIndex: React.FC = () => {
  const articles: Article[] = [
    {
      id: 'welcome',
      title: 'Welcome to Orkhidly',
      description: 'Complete first-time user onboarding guide to get you started with confidence',
      category: 'Getting Started',
      readTime: '5 min',
      difficulty: 'beginner',
      popular: true,
      icon: Heart
    },
    {
      id: 'first-identification',
      title: 'Your First Orchid Identification',
      description: 'Step-by-step photo tutorial for perfect identification results',
      category: 'Getting Started',
      readTime: '8 min',
      difficulty: 'beginner',
      popular: true,
      icon: Camera
    },
    {
      id: 'understanding-results',
      title: 'Understanding Your Results',
      description: 'Learn how to interpret AI recommendations and confidence scores',
      category: 'Getting Started',
      readTime: '6 min',
      difficulty: 'beginner',
      popular: false,
      icon: Star
    },
    {
      id: 'account-setup',
      title: 'Account Setup & Preferences',
      description: 'Customize your profile and app settings for the best experience',
      category: 'Getting Started',
      readTime: '4 min',
      difficulty: 'beginner',
      popular: false,
      icon: HelpCircle
    },
    {
      id: 'care-basics',
      title: 'Orchid Care for Absolute Beginners',
      description: 'Anxiety-reducing basics that make orchid care simple and enjoyable',
      category: 'Plant Care',
      readTime: '12 min',
      difficulty: 'beginner',
      popular: true,
      icon: Heart
    },
    {
      id: 'watering-guide',
      title: 'Watering Your Orchids',
      description: 'Master watering frequency, technique, and troubleshooting',
      category: 'Plant Care',
      readTime: '10 min',
      difficulty: 'beginner',
      popular: true,
      icon: Book
    },
    {
      id: 'light-requirements',
      title: 'Light Requirements',
      description: 'Perfect window placement and lighting tips for healthy growth',
      category: 'Plant Care',
      readTime: '7 min',
      difficulty: 'beginner',
      popular: false,
      icon: Book
    },
    {
      id: 'common-problems',
      title: 'Common Orchid Problems',
      description: 'Visual guide to identifying and solving typical orchid issues',
      category: 'Plant Care',
      readTime: '15 min',
      difficulty: 'intermediate',
      popular: true,
      icon: Book
    }
  ];

  const categories = ['All', 'Getting Started', 'Plant Care', 'FAQ'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getDifficultyColor = (difficulty: Article['difficulty']) => {
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Help Articles</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about using Orkhidly and caring for your orchids
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Popular Articles Section */}
      {selectedCategory === 'All' && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.filter(article => article.popular).map((article) => {
              const IconComponent = article.icon;
              return (
                <Card key={article.id} className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-green-600" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <Badge className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* All Articles Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const IconComponent = article.icon;
            return (
              <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        {article.popular && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    <Badge className={getDifficultyColor(article.difficulty)}>
                      {article.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="text-center py-8">
          <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Quick answers to common questions about camera issues, identification problems, 
            subscription management, and plant care emergencies.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            View All FAQs
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpArticlesIndex;
