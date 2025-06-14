
import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SmartSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  suggestions: string[];
  searchHistory: string[];
  popularQueries?: string[];
  placeholder?: string;
  className?: string;
}

const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  suggestions,
  searchHistory,
  popularQueries = [],
  placeholder = "Search help articles...",
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allSuggestions = [
    ...suggestions.map(s => ({ text: s, type: 'suggestion' })),
    ...searchHistory.slice(0, 3).map(s => ({ text: s, type: 'history' })),
    ...popularQueries.slice(0, 2).map(s => ({ text: s, type: 'popular' }))
  ].slice(0, 8);

  const showDropdown = isFocused && (value.length > 0 || searchHistory.length > 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < allSuggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const selectedSuggestion = allSuggestions[selectedIndex];
          onChange(selectedSuggestion.text);
          onSubmit(selectedSuggestion.text);
        } else {
          onSubmit(value);
        }
        setIsFocused(false);
        break;
      case 'Escape':
        setIsFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSubmit(suggestion);
    setIsFocused(false);
  };

  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'history':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'popular':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-10 h-12 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl shadow-sm"
        />
        {value && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg border-2 border-gray-200">
          <CardContent className="p-2">
            {allSuggestions.length > 0 ? (
              <div className="space-y-1">
                {allSuggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.type}-${suggestion.text}`}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      index === selectedIndex 
                        ? 'bg-green-50 text-green-800' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {getSuggestionIcon(suggestion.type)}
                    <span className="flex-1 text-sm">{suggestion.text}</span>
                    {suggestion.type === 'history' && (
                      <Badge variant="outline" className="text-xs">Recent</Badge>
                    )}
                    {suggestion.type === 'popular' && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Popular
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : value.length > 0 ? (
              <div className="px-3 py-4 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Press Enter to search for "{value}"</p>
              </div>
            ) : searchHistory.length > 0 ? (
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-gray-500 mb-2">Recent Searches</p>
                <div className="space-y-1">
                  {searchHistory.slice(0, 5).map((query, index) => (
                    <div
                      key={query}
                      onClick={() => handleSuggestionClick(query)}
                      className="flex items-center gap-3 px-2 py-1 rounded cursor-pointer hover:bg-gray-50"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{query}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartSearchBar;
