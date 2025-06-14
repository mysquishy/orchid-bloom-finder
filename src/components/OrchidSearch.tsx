
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchFilters {
  searchTerm: string;
  difficulty: string;
  lightRequirements: string;
  bloomingSeason: string;
  flowerColors: string[];
  nativeRegion: string;
  subfamily: string;
}

interface OrchidSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  orchidCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

const OrchidSearch: React.FC<OrchidSearchProps> = ({
  filters,
  onFiltersChange,
  orchidCount,
  totalCount,
  onClearFilters
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleColorFilter = (color: string) => {
    const currentColors = filters.flowerColors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    updateFilter('flowerColors', newColors);
  };

  const popularColors = [
    'white', 'pink', 'purple', 'yellow', 'red', 'orange', 'blue', 'green'
  ];

  const hasActiveFilters = useMemo(() => {
    return filters.difficulty !== 'all' ||
           filters.lightRequirements !== 'all' ||
           filters.bloomingSeason !== 'all' ||
           filters.flowerColors.length > 0 ||
           filters.nativeRegion !== 'all' ||
           filters.subfamily !== 'all' ||
           filters.searchTerm.length > 0;
  }, [filters]);

  return (
    <Card className="mb-6 bg-white/80 backdrop-blur-sm border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search & Filter Orchids
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Input */}
        <div className="mb-4">
          <Input
            placeholder="Search by name, species, description, or care requirements..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Select value={filters.difficulty} onValueChange={(value) => updateFilter('difficulty', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Care Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.lightRequirements} onValueChange={(value) => updateFilter('lightRequirements', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Light Requirements" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Light Levels</SelectItem>
              <SelectItem value="low">Low Light</SelectItem>
              <SelectItem value="medium">Medium Light</SelectItem>
              <SelectItem value="bright">Bright Light</SelectItem>
              <SelectItem value="very bright">Very Bright</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.bloomingSeason} onValueChange={(value) => updateFilter('bloomingSeason', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Blooming Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Seasons</SelectItem>
              <SelectItem value="spring">Spring</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
              <SelectItem value="fall">Fall</SelectItem>
              <SelectItem value="winter">Winter</SelectItem>
              <SelectItem value="year-round">Year-round</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            {/* Flower Colors */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Flower Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {popularColors.map((color) => (
                  <Badge
                    key={color}
                    variant={filters.flowerColors.includes(color) ? "default" : "outline"}
                    className={`cursor-pointer capitalize ${
                      filters.flowerColors.includes(color) 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'hover:bg-green-50'
                    }`}
                    onClick={() => toggleColorFilter(color)}
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Native Region and Subfamily */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={filters.nativeRegion} onValueChange={(value) => updateFilter('nativeRegion', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Native Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Southeast Asia">Southeast Asia</SelectItem>
                  <SelectItem value="Central America">Central America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.subfamily} onValueChange={(value) => updateFilter('subfamily', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Subfamily" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subfamilies</SelectItem>
                  <SelectItem value="Epidendroideae">Epidendroideae</SelectItem>
                  <SelectItem value="Cypripedioideae">Cypripedioideae</SelectItem>
                  <SelectItem value="Orchidoideae">Orchidoideae</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <span>
            Showing {orchidCount} of {totalCount} orchids
          </span>
          {hasActiveFilters && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              Filtered results
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrchidSearch;
