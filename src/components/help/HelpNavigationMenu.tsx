
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
  ArrowRight,
  Brain,
  BarChart3,
  TestTube,
  MessageSquare,
  Settings,
  Building,
  Sparkles,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  category: 'getting-started' | 'plant-care' | 'community' | 'advanced' | 'troubleshooting' | 'admin';
}

const HelpNavigationMenu: React.FC = () => {
  const navigationItems: NavigationItem[] = [
    // Getting Started (Updated with Phase 4)
    {
      id: 'welcome-2-0',
      title: 'Welcome to Orkhidly 2.0',
      description: 'Complete overview of all new AI testing, community, and business capabilities',
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      badge: 'New',
      category: 'getting-started'
    },
    {
      id: 'first-identification-community',
      title: 'Your First Identification',
      description: 'Updated guide with community features and accuracy validation',
      icon: <Flower className="w-6 h-6 text-green-500" />,
      badge: 'Updated',
      category: 'getting-started'
    },
    {
      id: 'understanding-confidence',
      title: 'Understanding Results & Confidence',
      description: 'AI accuracy details, validation methods, and when to seek community help',
      icon: <Brain className="w-6 h-6 text-blue-500" />,
      category: 'getting-started'
    },
    {
      id: 'joining-community',
      title: 'Joining the Community',
      description: 'Participate in user-generated content and expert discussions',
      icon: <Users className="w-6 h-6 text-orange-500" />,
      badge: 'New',
      category: 'getting-started'
    },
    {
      id: 'exploring-advanced',
      title: 'Exploring Advanced Features',
      description: 'Progressive discovery guide for testing, analytics, and business tools',
      icon: <TrendingUp className="w-6 h-6 text-indigo-500" />,
      badge: 'New',
      category: 'getting-started'
    },

    // Plant Care Guides (Expanded)
    {
      id: 'orchid-types-expert',
      title: 'Expert Orchid Types Guide',
      description: 'Community-verified identification with expert botanist contributions',
      icon: <Flower className="w-6 h-6 text-purple-500" />,
      badge: 'Expert',
      category: 'plant-care'
    },
    {
      id: 'seasonal-calendar-advanced',
      title: 'Advanced Seasonal Care',
      description: 'AI-optimized care schedules with community success tracking',
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      category: 'plant-care'
    },
    {
      id: 'repotting-masterclass',
      title: 'Repotting Masterclass',
      description: 'Video tutorials and community-shared techniques',
      icon: <Wrench className="w-6 h-6 text-green-500" />,
      category: 'plant-care'
    },

    // Community & Q&A (New Section)
    {
      id: 'community-qa',
      title: 'Community Q&A Hub',
      description: 'Ask questions, share experiences, and get expert answers',
      icon: <MessageSquare className="w-6 h-6 text-teal-500" />,
      badge: 'New',
      category: 'community'
    },
    {
      id: 'user-content-guidelines',
      title: 'Content Contribution Guide',
      description: 'How to submit photos, care tips, and become a verified contributor',
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      badge: 'New',
      category: 'community'
    },
    {
      id: 'expert-verification',
      title: 'Expert Verification Program',
      description: 'Join our network of verified botanists and professional growers',
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      badge: 'New',
      category: 'community'
    },

    // Advanced Features (New Section)
    {
      id: 'ai-testing-validation',
      title: 'AI Testing & Model Accuracy',
      description: 'How users can validate results and contribute to model improvements',
      icon: <TestTube className="w-6 h-6 text-pink-500" />,
      badge: 'Advanced',
      category: 'advanced'
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard Guide',
      description: 'Understanding your plant care metrics, trends, and optimization insights',
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      badge: 'Premium',
      category: 'advanced'
    },
    {
      id: 'ab-testing-features',
      title: 'A/B Testing Features',
      description: 'How our optimization experiments improve your experience',
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      badge: 'Pro',
      category: 'advanced'
    },
    {
      id: 'business-enterprise',
      title: 'Business & Enterprise Tools',
      description: 'Professional features for nurseries, consultants, and commercial growers',
      icon: <Building className="w-6 h-6 text-gray-600" />,
      badge: 'Enterprise',
      category: 'advanced'
    },

    // Troubleshooting (Updated)
    {
      id: 'ai-testing-issues',
      title: 'AI Testing & Accuracy Issues',
      description: 'Troubleshoot identification problems and validation conflicts',
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      badge: 'Updated',
      category: 'troubleshooting'
    },
    {
      id: 'community-moderation',
      title: 'Community Guidelines & Reporting',
      description: 'Content moderation, reporting issues, and community standards',
      icon: <Shield className="w-6 h-6 text-orange-500" />,
      badge: 'New',
      category: 'troubleshooting'
    },

    // Admin & Business (New Section)
    {
      id: 'content-management',
      title: 'Content Management Tools',
      description: 'Moderate community content and manage expert contributions',
      icon: <Settings className="w-6 h-6 text-gray-500" />,
      badge: 'Admin',
      category: 'admin'
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence Dashboard',
      description: 'Analytics for business users and enterprise administrators',
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      badge: 'Enterprise',
      category: 'admin'
    },
    {
      id: 'ai-monitoring-protocols',
      title: 'AI Model Monitoring',
      description: 'Track model performance, accuracy metrics, and testing protocols',
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      badge: 'Admin',
      category: 'admin'
    }
  ];

  const categoryTitles = {
    'getting-started': 'Getting Started with Orkhidly 2.0',
    'plant-care': 'Expert Plant Care Guides',
    'community': 'Community & Q&A',
    'advanced': 'Advanced Features',
    'troubleshooting': 'Troubleshooting Center',
    'admin': 'Admin & Business Tools'
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
      case 'updated':
        return 'bg-blue-100 text-blue-800';
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      case 'premium':
      case 'pro':
        return 'bg-amber-100 text-amber-800';
      case 'enterprise':
        return 'bg-gray-100 text-gray-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'advanced':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Orkhidly 2.0 Help Center</h1>
        <p className="text-xl text-gray-600">
          Comprehensive guides for AI-powered identification, community collaboration, and professional tools
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge className="bg-green-100 text-green-800">New: Community Features</Badge>
          <Badge className="bg-blue-100 text-blue-800">Enhanced: AI Testing</Badge>
          <Badge className="bg-purple-100 text-purple-800">Added: Business Tools</Badge>
        </div>
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

      {/* Enhanced Quick Access Banner */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            New to Orkhidly 2.0? Start Here!
          </h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Discover our enhanced AI identification with community validation, expert-verified content, 
            advanced analytics, and professional business tools. Join thousands of orchid enthusiasts 
            growing together in our supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Take the 2.0 Tour
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Join Our Community
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Explore Business Features
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpNavigationMenu;
