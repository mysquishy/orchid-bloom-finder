
import { useState, useEffect, useMemo } from 'react';
import { trackSearchQuery } from '@/utils/analytics';

export interface SearchableArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: string;
  popularity: number;
  lastViewed?: Date;
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
}

const useHelpSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<SearchableArticle[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Mock articles data - in real app this would come from a database
  const articles: SearchableArticle[] = useMemo(() => [
    {
      id: 'welcome',
      title: 'Welcome to Orkhidly',
      description: 'Complete first-time user onboarding guide to get you started with confidence',
      content: 'Welcome to Orkhidly! We are thrilled you have joined our community of orchid enthusiasts. This guide will help you get started with identifying orchids, caring for your plants, and using all the features our app provides.',
      category: 'Getting Started',
      tags: ['onboarding', 'welcome', 'basics'],
      difficulty: 'beginner',
      readTime: '5 min',
      popularity: 95
    },
    {
      id: 'first-identification',
      title: 'Your First Orchid Identification',
      description: 'Step-by-step photo tutorial for perfect identification results',
      content: 'Taking your first orchid photo for identification is exciting! Follow these steps to get the best results: ensure good lighting, capture the full flower, avoid shadows, and hold the camera steady.',
      category: 'Getting Started',
      tags: ['photography', 'identification', 'tutorial'],
      difficulty: 'beginner',
      readTime: '8 min',
      popularity: 88
    },
    {
      id: 'understanding-results',
      title: 'Understanding Your Results',
      description: 'Learn how to interpret AI recommendations and confidence scores',
      content: 'When you receive identification results, you will see a confidence score, species name, and care recommendations. Higher confidence scores mean more accurate identifications.',
      category: 'Getting Started',
      tags: ['results', 'ai', 'confidence'],
      difficulty: 'beginner',
      readTime: '6 min',
      popularity: 76
    },
    {
      id: 'care-basics',
      title: 'Orchid Care for Absolute Beginners',
      description: 'Anxiety-reducing basics that make orchid care simple and enjoyable',
      content: 'Orchid care does not have to be intimidating! Start with the basics: water when the bark is dry, provide bright indirect light, and maintain good air circulation.',
      category: 'Plant Care',
      tags: ['care', 'beginner', 'watering', 'light'],
      difficulty: 'beginner',
      readTime: '12 min',
      popularity: 92
    },
    {
      id: 'watering-guide',
      title: 'Watering Your Orchids',
      description: 'Master watering frequency, technique, and troubleshooting',
      content: 'Proper watering is crucial for orchid health. Water thoroughly but infrequently, allowing the growing medium to dry between waterings. Use lukewarm water and avoid getting water on the leaves.',
      category: 'Plant Care',
      tags: ['watering', 'technique', 'frequency'],
      difficulty: 'beginner',
      readTime: '10 min',
      popularity: 89
    },
    {
      id: 'common-problems',
      title: 'Common Orchid Problems',
      description: 'Visual guide to identifying and solving typical orchid issues',
      content: 'Yellow leaves, root rot, and lack of blooms are common orchid problems. Learn to identify symptoms early and take corrective action to keep your orchids healthy.',
      category: 'Troubleshooting',
      tags: ['problems', 'troubleshooting', 'yellow leaves', 'root rot'],
      difficulty: 'intermediate',
      readTime: '15 min',
      popularity: 84
    }
  ], []);

  // Highlight matching text in search results
  const highlightText = (text: string, query: string): string => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  // Calculate relevance score for search results
  const calculateRelevance = (article: SearchableArticle, query: string): number => {
    const lowerQuery = query.toLowerCase();
    let score = 0;

    // Title match (highest weight)
    if (article.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }

    // Description match
    if (article.description.toLowerCase().includes(lowerQuery)) {
      score += 5;
    }

    // Content match
    if (article.content.toLowerCase().includes(lowerQuery)) {
      score += 3;
    }

    // Tag match
    article.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        score += 2;
      }
    });

    // Popularity boost
    score += article.popularity / 100;

    return score;
  };

  // Perform search with filters
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

    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        filters.tags?.some(tag => article.tags.includes(tag))
      );
    }

    // Calculate relevance and create search results
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

  // Auto-complete suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const allTerms = articles.flatMap(article => [
      ...article.title.split(' '),
      ...article.description.split(' '),
      ...article.tags
    ]);

    return [...new Set(allTerms)]
      .filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase()) &&
        term.length > 2
      )
      .slice(0, 5);
  }, [searchQuery, articles]);

  // Handle search submission
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Track search analytics
    trackSearchQuery(query, searchResults.length);
    
    // Update search history
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
    }
  };

  // Track article view
  const trackArticleView = (article: SearchableArticle) => {
    const updatedArticle = { ...article, lastViewed: new Date() };
    
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== article.id);
      return [updatedArticle, ...filtered.slice(0, 4)];
    });
  };

  // Get popular articles
  const popularArticles = useMemo(() => {
    return [...articles]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6);
  }, [articles]);

  // Get related articles
  const getRelatedArticles = (currentArticle: SearchableArticle): SearchableArticle[] => {
    return articles
      .filter(article => 
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category ||
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);
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
