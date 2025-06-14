
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, BookOpen, Search } from 'lucide-react';
import { SearchResult } from '@/hooks/useHelpSearch';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading?: boolean;
  onArticleClick: (article: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  isLoading = false,
  onArticleClick
}) => {
  const getDifficultyColor = (difficulty: SearchResult['difficulty']) => {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started':
        return <Star className="w-4 h-4 text-green-600" />;
      case 'Plant Care':
        return <BookOpen className="w-4 h-4 text-purple-600" />;
      case 'Troubleshooting':
        return <Search className="w-4 h-4 text-orange-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No results found for "{query}"
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or browse our popular articles below.
          </p>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Popular Articles:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Welcome to Orkhidly', 'Orchid Care Basics', 'Your First Identification', 'Watering Guide'].map((title) => (
                <Badge 
                  key={title}
                  variant="outline" 
                  className="cursor-pointer hover:bg-green-50 hover:border-green-300"
                >
                  {title}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </h2>
        <Badge variant="secondary" className="text-sm">
          {results.length} found
        </Badge>
      </div>

      {results.map((result) => (
        <Card 
          key={result.id} 
          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-green-200"
          onClick={() => onArticleClick(result)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(result.category)}
                <Badge variant="outline" className="text-xs">
                  {result.category}
                </Badge>
                <Badge className={getDifficultyColor(result.difficulty)}>
                  {result.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="w-3 h-3" />
                <span>{result.popularity}%</span>
              </div>
            </div>
            <CardTitle 
              className="text-lg leading-tight"
              dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
            />
          </CardHeader>
          <CardContent>
            <p 
              className="text-gray-600 mb-4 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: result.highlightedContent }}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{result.readTime}</span>
                </div>
                <div className="flex gap-1">
                  {result.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-green-600 font-medium">
                Relevance: {Math.round(result.relevanceScore)}%
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
