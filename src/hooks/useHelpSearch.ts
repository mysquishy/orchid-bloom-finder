
import { useState, useEffect, useMemo } from 'react';
import { trackSearchQuery } from '@/utils/analytics';

export interface SearchableArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readTime: string;
  popularity: number;
  lastViewed?: Date;
  isNew?: boolean;
  requiresAuth?: boolean;
}

export interface SearchResult extends SearchableArticle {
  relevanceScore: number;
  highlightedTitle: string;
  highlightedContent: string;
}

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  tags?: string[];
  showNewOnly?: boolean;
}

const useHelpSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<SearchableArticle[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Enhanced articles data covering all Phase 4 features
  const articles: SearchableArticle[] = useMemo(() => [
    // Getting Started (Updated)
    {
      id: 'welcome-2-0',
      title: 'Welcome to Orkhidly 2.0',
      description: 'Complete overview of enhanced AI identification, community features, and business tools',
      content: 'Welcome to Orkhidly 2.0! We have exciting new features including community validation, expert verification, advanced analytics, and business tools for professional users.',
      category: 'Getting Started',
      tags: ['onboarding', 'welcome', 'community', 'ai-testing', 'business'],
      difficulty: 'beginner',
      readTime: '8 min',
      popularity: 98,
      isNew: true
    },
    {
      id: 'first-identification-community',
      title: 'Your First Identification with Community',
      description: 'Enhanced identification process with community validation and expert verification',
      content: 'Take photos, get AI results, validate with community feedback, and learn from expert botanists in our updated identification workflow.',
      category: 'Getting Started',
      tags: ['photography', 'identification', 'community', 'validation'],
      difficulty: 'beginner',
      readTime: '10 min',
      popularity: 95,
      isNew: true
    },
    {
      id: 'understanding-confidence',
      title: 'Understanding AI Confidence & Validation',
      description: 'Learn how confidence scores work and when to seek community validation',
      content: 'Our AI provides confidence scores, but community validation adds another layer of accuracy. Learn when and how to use both systems effectively.',
      category: 'Getting Started',
      tags: ['ai', 'confidence', 'validation', 'accuracy'],
      difficulty: 'intermediate',
      readTime: '7 min',
      popularity: 88
    },

    // Advanced Features
    {
      id: 'ai-testing-validation',
      title: 'AI Testing & Model Accuracy',
      description: 'How users contribute to model improvements through testing and validation',
      content: 'Participate in our continuous improvement process by validating AI results, reporting inaccuracies, and contributing to model training.',
      category: 'Advanced Features',
      tags: ['ai-testing', 'validation', 'accuracy', 'model-improvement'],
      difficulty: 'advanced',
      readTime: '15 min',
      popularity: 82,
      isNew: true
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard Guide',
      description: 'Understanding your plant care metrics, trends, and optimization insights',
      content: 'Explore advanced analytics including care success rates, seasonal patterns, cost tracking, and personalized recommendations.',
      category: 'Advanced Features',
      tags: ['analytics', 'metrics', 'trends', 'optimization'],
      difficulty: 'intermediate',
      readTime: '12 min',
      popularity: 79,
      requiresAuth: true
    },
    {
      id: 'business-enterprise',
      title: 'Business & Enterprise Tools',
      description: 'Professional features for nurseries, consultants, and commercial operations',
      content: 'Comprehensive guide to business intelligence, team management, white-label options, and enterprise-grade features.',
      category: 'Advanced Features',
      tags: ['business', 'enterprise', 'professional', 'white-label'],
      difficulty: 'expert',
      readTime: '20 min',
      popularity: 65,
      requiresAuth: true
    },

    // Community & Q&A
    {
      id: 'community-qa',
      title: 'Community Q&A Hub Guide',
      description: 'How to ask questions, share experiences, and get expert answers',
      content: 'Navigate our community features, ask effective questions, share your experiences, and connect with fellow orchid enthusiasts.',
      category: 'Community & Q&A',
      tags: ['community', 'questions', 'answers', 'sharing'],
      difficulty: 'beginner',
      readTime: '8 min',
      popularity: 91,
      isNew: true
    },
    {
      id: 'expert-verification',
      title: 'Expert Verification Program',
      description: 'Join our network of verified botanists and professional growers',
      content: 'Learn about our expert verification process, benefits of verified status, and how to contribute professional expertise to the community.',
      category: 'Community & Q&A',
      tags: ['expert', 'verification', 'professional', 'botanist'],
      difficulty: 'advanced',
      readTime: '10 min',
      popularity: 73,
      isNew: true
    },

    // Plant Care (Enhanced)
    {
      id: 'care-analytics',
      title: 'Data-Driven Plant Care',
      description: 'Using analytics to optimize your orchid care routines',
      content: 'Leverage care success analytics, seasonal trends, and community data to improve your plant care outcomes.',
      category: 'Plant Care',
      tags: ['care', 'analytics', 'optimization', 'data'],
      difficulty: 'intermediate',
      readTime: '14 min',
      popularity: 86,
      isNew: true
    },

    // Troubleshooting (Updated)
    {
      id: 'ai-testing-issues',
      title: 'AI Testing & Accuracy Troubleshooting',
      description: 'Resolve identification conflicts and validation discrepancies',
      content: 'Common issues with AI testing, how to report accuracy problems, and understanding validation conflicts between AI and community.',
      category: 'Troubleshooting',
      tags: ['ai-testing', 'accuracy', 'conflicts', 'validation'],
      difficulty: 'intermediate',
      readTime: '12 min',
      popularity: 77,
      isNew: true
    },
    {
      id: 'community-guidelines',
      title: 'Community Guidelines & Reporting',
      description: 'Content standards, moderation, and how to report issues',
      content: 'Understanding community standards, content moderation processes, and how to report inappropriate content or users.',
      category: 'Troubleshooting',
      tags: ['community', 'guidelines', 'moderation', 'reporting'],
      difficulty: 'beginner',
      readTime: '6 min',
      popularity: 84,
      isNew: true
    }
  ], []);

  // Enhanced search with Phase 4 features
  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    setIsSearching(true);

    let filteredArticles = articles;

    // Apply filters
    if (filters.category) {
      filteredArticles = filteredArticles.filter(article => 
        article.category === filters.category
      );
    }

    if (filters.difficulty) {
      filteredArticles = filteredArticles.filter(article => 
        article.difficulty === filters.difficulty
      );
    }

    if (filters.showNewOnly) {
      filteredArticles = filteredArticles.filter(article => article.isNew);
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        filters.tags?.some(tag => article.tags.includes(tag))
      );
    }

    // Enhanced relevance calculation
    const calculateRelevance = (article: SearchableArticle, query: string): number => {
      const lowerQuery = query.toLowerCase();
      let score = 0;

      // Title match (highest weight)
      if (article.title.toLowerCase().includes(lowerQuery)) {
        score += 15;
      }

      // Description match
      if (article.description.toLowerCase().includes(lowerQuery)) {
        score += 8;
      }

      // Content match
      if (article.content.toLowerCase().includes(lowerQuery)) {
        score += 5;
      }

      // Tag match
      article.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          score += 3;
        }
      });

      // Boost for new Phase 4 features
      if (article.isNew) {
        score += 2;
      }

      // Popularity boost
      score += article.popularity / 100;

      return score;
    };

    const highlightText = (text: string, query: string): string => {
      if (!query.trim()) return text;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    };

    const results = filteredArticles
      .map(article => ({
        ...article,
        relevanceScore: calculateRelevance(article, searchQuery),
        highlightedTitle: highlightText(article.title, searchQuery),
        highlightedContent: highlightText(article.description, searchQuery)
      }))
      .filter(result => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    setIsSearching(false);
    return results;
  }, [searchQuery, filters, articles]);

  // Enhanced auto-complete with Phase 4 terms
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const phase4Terms = [
      'ai testing', 'community validation', 'expert verification', 'business tools',
      'analytics dashboard', 'model accuracy', 'content moderation', 'enterprise features'
    ];

    const allTerms = [
      ...articles.flatMap(article => [
        ...article.title.split(' '),
        ...article.description.split(' '),
        ...article.tags
      ]),
      ...phase4Terms
    ];

    return [...new Set(allTerms)]
      .filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase()) &&
        term.length > 2
      )
      .slice(0, 8);
  }, [searchQuery, articles]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Track search analytics
    trackSearchQuery(query, searchResults.length);
    
    // Update search history
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
    }
  };

  const trackArticleView = (article: SearchableArticle) => {
    const updatedArticle = { ...article, lastViewed: new Date() };
    
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== article.id);
      return [updatedArticle, ...filtered.slice(0, 4)];
    });
  };

  // Enhanced popular articles with Phase 4 features
  const popularArticles = useMemo(() => {
    return [...articles]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 8);
  }, [articles]);

  const getRelatedArticles = (currentArticle: SearchableArticle): SearchableArticle[] => {
    return articles
      .filter(article => 
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category ||
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    searchResults,
    suggestions,
    isSearching,
    recentlyViewed,
    searchHistory,
    popularArticles,
    handleSearch,
    trackArticleView,
    getRelatedArticles,
    articles
  };
};

export default useHelpSearch;
