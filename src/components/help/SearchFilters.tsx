
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '@/hooks/useHelpSearch';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClearFilters: () => void;
  className?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className = ""
}) => {
  const categories = ['Getting Started', 'Plant Care', 'Troubleshooting', 'FAQ'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const popularTags = ['watering', 'light', 'identification', 'care', 'problems', 'photography'];

  const hasActiveFilters = filters.category || filters.difficulty || (filters.tags && filters.tags.length > 0);

  const toggleCategory = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category
    });
  };

  const toggleDifficulty = (difficulty: string) => {
    onFiltersChange({
      ...filters,
      difficulty: filters.difficulty === difficulty ? undefined : difficulty
    });
  };

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5 text-green-600" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.category === category
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'hover:bg-green-50 hover:border-green-300'
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Difficulty Level</h4>
          <div className="flex gap-2">
            {difficulties.map((difficulty) => (
              <Badge
                key={difficulty}
                variant={filters.difficulty === difficulty ? "default" : "outline"}
                className={`cursor-pointer transition-colors capitalize ${
                  filters.difficulty === difficulty
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'hover:bg-green-50 hover:border-green-300'
                }`}
                onClick={() => toggleDifficulty(difficulty)}
              >
                {difficulty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Topics</h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags?.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.tags?.includes(tag)
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'hover:bg-green-50 hover:border-green-300'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Category: {filters.category}
                </Badge>
              )}
              {filters.difficulty && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Level: {filters.difficulty}
                </Badge>
              )}
              {filters.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-green-100 text-green-800">
                  Topic: {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
