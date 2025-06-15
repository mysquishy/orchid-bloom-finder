
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  const categories = [
    'Getting Started',
    'Plant Care',
    'Community & Q&A',
    'Advanced Features',
    'Troubleshooting',
    'Admin & Business'
  ];

  const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];

  const popularTags = [
    'ai-testing', 'community', 'validation', 'analytics', 'business',
    'identification', 'care', 'expert', 'troubleshooting', 'onboarding'
  ];

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    onFiltersChange({
      ...filters,
      difficulty: filters.difficulty === difficulty ? undefined : difficulty
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined
    });
  };

  const handleNewToggle = () => {
    onFiltersChange({
      ...filters,
      showNewOnly: !filters.showNewOnly
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search Filters
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear ({activeFiltersCount})
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  filters.category === category
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Difficulty Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Difficulty Level</h4>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Badge
                key={difficulty}
                variant={filters.difficulty === difficulty ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.difficulty === difficulty
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleDifficultyChange(difficulty)}
              >
                {difficulty}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Content Type Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Content Type</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.showNewOnly || false}
                onChange={handleNewToggle}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">New Phase 4 Features</span>
              <Badge className="bg-green-100 text-green-800 text-xs">New</Badge>
            </label>
          </div>
        </div>

        <Separator />

        {/* Popular Tags */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Popular Topics</h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags?.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors text-xs ${
                  filters.tags?.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Active Filters</h4>
              <div className="space-y-1 text-sm text-gray-600">
                {filters.category && (
                  <div>Category: <span className="font-medium">{filters.category}</span></div>
                )}
                {filters.difficulty && (
                  <div>Difficulty: <span className="font-medium">{filters.difficulty}</span></div>
                )}
                {filters.showNewOnly && (
                  <div>Type: <span className="font-medium">New content only</span></div>
                )}
                {filters.tags && filters.tags.length > 0 && (
                  <div>Tags: <span className="font-medium">{filters.tags.length} selected</span></div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
