
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Calendar, 
  Wrench, 
  AlertTriangle, 
  Play, 
  Calculator,
  Users,
  Flower,
  ArrowRight
} from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  category: 'care' | 'troubleshooting' | 'interactive' | 'expert' | 'video';
}

const HelpNavigationMenu: React.FC = () => {
  const navigationItems: NavigationItem[] = [
    // Detailed Care Library
    {
      id: 'orchid-types',
      title: 'Orchid Types Guide',
      description: 'Visual identification of 20+ popular varieties with care specifics',
      icon: <Flower className="w-6 h-6 text-purple-500" />,
      badge: 'New',
      category: 'care'
    },
    {
      id: 'seasonal-calendar',
      title: 'Seasonal Care Calendar',
      description: 'Month-by-month care adjustments for optimal growth',
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      category: 'care'
    },
    {
      id: 'repotting-guide',
      title: 'Repotting Masterclass',
      description: 'When, how, and what supplies to use for successful repotting',
      icon: <Wrench className="w-6 h-6 text-green-500" />,
      category: 'care'
    },
    
    // Troubleshooting Section
    {
      id: 'problem-diagnosis',
      title: 'Problem Diagnosis Guide',
      description: 'Photo examples of diseases, pests, and stress indicators',
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      badge: 'Essential',
      category: 'troubleshooting'
    },
    {
      id: 'bloom-troubleshooting',
      title: 'My Orchid Won\'t Bloom',
      description: 'Common causes and proven solutions for blooming issues',
      icon: <Flower className="w-6 h-6 text-pink-500" />,
      category: 'troubleshooting'
    },
    
    // Interactive Tools
    {
      id: 'care-calculator',
      title: 'Care Reminder Calculator',
      description: 'Generate personalized care schedules for your orchids',
      icon: <Calculator className="w-6 h-6 text-indigo-500" />,
      badge: 'Interactive',
      category: 'interactive'
    },
    {
      id: 'symptom-checker',
      title: 'Symptom Checker Tool',
      description: 'Interactive flowchart to diagnose orchid problems',
      icon: <Book className="w-6 h-6 text-teal-500" />,
      category: 'interactive'
    },
    
    // Video Content
    {
      id: 'video-tutorials',
      title: 'Video Tutorial Library',
      description: 'Step-by-step video guides for complex procedures',
      icon: <Play className="w-6 h-6 text-red-600" />,
      badge: 'Premium',
      category: 'video'
    },
    
    // Expert Content
    {
      id: 'expert-articles',
      title: 'Expert Articles',
      description: 'Guest content from professional botanists and growers',
      icon: <Users className="w-6 h-6 text-amber-500" />,
      category: 'expert'
    }
  ];

  const categoryTitles = {
    care: 'Detailed Care Library',
    troubleshooting: 'Troubleshooting Center',
    interactive: 'Interactive Tools',
    video: 'Video Tutorials',
    expert: 'Expert Content'
  };

  const categorizedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'essential':
        return 'bg-red-100 text-red-800';
      case 'interactive':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Advanced Help Center</h1>
        <p className="text-xl text-gray-600">
          Comprehensive guides, tools, and expert content for orchid care mastery
        </p>
      </div>

      {Object.entries(categorizedItems).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {categoryTitles[category as keyof typeof categoryTitles]}
            <Badge variant="outline" className="text-sm">
              {items.length} items
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        {item.icon}
                      </div>
                      {item.badge && (
                        <Badge className={getBadgeColor(item.badge)}>
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Access Banner */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Immediate Help?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our emergency care protocols and expert consultation services are available 
            for urgent orchid health issues. Don't let your valuable plants suffer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
              Emergency Care Protocol
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Book Expert Consultation
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpNavigationMenu;
