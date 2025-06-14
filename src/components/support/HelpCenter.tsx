
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Book, Video, Download, ArrowRight, HelpCircle, Star, Clock, Eye } from 'lucide-react';
import HelpBreadcrumb from '@/components/ui/HelpBreadcrumb';
import SmartSearchBar from '@/components/help/SmartSearchBar';
import SearchResults from '@/components/help/SearchResults';
import SearchFilters from '@/components/help/SearchFilters';
import HelpNavigationMenu from '@/components/help/HelpNavigationMenu';
import OrchidTypesGuide from '@/components/help/care/OrchidTypesGuide';
import SeasonalCareCalendar from '@/components/help/care/SeasonalCareCalendar';
import TroubleshootingHub from '@/components/help/troubleshooting/TroubleshootingHub';
import InteractiveTools from '@/components/help/interactive/InteractiveTools';
import useHelpSearch from '@/hooks/useHelpSearch';

const HelpCenter: React.FC = () => {
  const [activeSection, setActiveSection] = useState('main');
  
  const {
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
    getRelatedArticles
  } = useHelpSearch();

  const handleArticleClick = (article: any) => {
    trackArticleView(article);
    console.log('Navigate to article:', article.id);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const popularQueries = ['orchid care', 'watering', 'identification', 'camera problems'];

  // Render different sections based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'orchid-types':
        return <OrchidTypesGuide />;
      case 'seasonal-calendar':
        return <SeasonalCareCalendar />;
      case 'troubleshooting':
        return <TroubleshootingHub />;
      case 'interactive-tools':
        return <InteractiveTools />;
      default:
        return renderMainContent();
    }
  };

  const renderMainContent = () => (
    <>
      {/* Smart Search Section */}
      <div className="text-center space-y-6">
        <SmartSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
          suggestions={suggestions}
          searchHistory={searchHistory}
          popularQueries={popularQueries}
          placeholder="Search help articles, guides, and FAQs..."
          className="max-w-2xl mx-auto"
        />
      </div>

      {/* Search Results or Main Content */}
      {searchQuery ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              className="sticky top-4"
            />
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <SearchResults
              results={searchResults}
              query={searchQuery}
              isLoading={isSearching}
              onArticleClick={handleArticleClick}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Advanced Help Navigation */}
          <div className="mb-12">
            <HelpNavigationMenu />
          </div>

          {/* Recently Viewed Articles */}
          {recentlyViewed.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" />
                Recently Viewed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyViewed.map((article) => (
                  <Card 
                    key={article.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleArticleClick(article)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{article.readTime}</span>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Access Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Advanced Care Library */}
            <Card 
              className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setActiveSection('orchid-types')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-green-900">Advanced Care Library</CardTitle>
                    <p className="text-green-700 text-sm">Comprehensive care guides</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors">
                  <span className="text-gray-800 font-medium">Orchid Types Guide</span>
                  <ArrowRight className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors">
                  <span className="text-gray-800 font-medium">Seasonal Care Calendar</span>
                  <ArrowRight className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors">
                  <span className="text-gray-800 font-medium">Repotting Masterclass</span>
                  <ArrowRight className="w-4 h-4 text-green-600" />
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting Center */}
            <Card 
              className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setActiveSection('troubleshooting')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-red-900">Troubleshooting Center</CardTitle>
                    <p className="text-red-700 text-sm">Problem diagnosis & solutions</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors">
                  <span className="text-gray-800 font-medium">My Orchid Won't Bloom</span>
                  <ArrowRight className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors">
                  <span className="text-gray-800 font-medium">Problem Diagnosis Guide</span>
                  <ArrowRight className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors">
                  <span className="text-gray-800 font-medium">Emergency Care Protocol</span>
                  <ArrowRight className="w-4 h-4 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Popular This Week
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-green-200"
                  onClick={() => handleArticleClick(article)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 ml-2">
                        <Eye className="w-3 h-3" />
                        <span>{article.popularity}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Contact Support</h3>
                <p className="text-sm text-gray-500">Get help from our team</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Video Tutorials</h3>
                <p className="text-sm text-gray-500">Watch how-to videos</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Book className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">User Manual</h3>
                <p className="text-sm text-gray-500">Comprehensive guide</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Downloads</h3>
                <p className="text-sm text-gray-500">Get helpful resources</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="faq" className="text-sm font-medium">FAQs</TabsTrigger>
              <TabsTrigger value="guides" className="text-sm font-medium">User Guides</TabsTrigger>
              <TabsTrigger value="contact" className="text-sm font-medium">Contact Support</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-4">
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-3 text-gray-900">How accurate is the orchid identification?</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">Our AI model has 95% accuracy across 1,000+ orchid species. For best results, take clear photos in good lighting with the flower visible.</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">ai</Badge>
                    <Badge variant="secondary" className="text-xs">accuracy</Badge>
                    <Badge variant="secondary" className="text-xs">photos</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="space-y-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg text-gray-900">Getting Started with Orkhidly</h3>
                    <Badge className="bg-green-100 text-green-800">beginner</Badge>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">Complete beginner guide to using the app and identifying your first orchid.</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">basics</Badge>
                    <span className="text-sm text-gray-500">5 min read</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Our Support Team</CardTitle>
                  <p className="text-gray-600">We're here to help you succeed with your orchids</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-green-200 bg-green-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-medium text-lg text-green-900">Email Support</h4>
                        </div>
                        <p className="text-sm text-green-700 mb-3">For general questions and issues</p>
                        <p className="text-sm font-medium text-green-900">support@orkhidly.app</p>
                        <p className="text-xs text-green-600 mt-2">Response within 24 hours</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-purple-200 bg-purple-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                            <Video className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-medium text-lg text-purple-900">Live Chat</h4>
                        </div>
                        <p className="text-sm text-purple-700 mb-3">Real-time support</p>
                        <p className="text-sm font-medium text-purple-900">Available 9 AM - 5 PM EST</p>
                        <p className="text-xs text-purple-600 mt-2">Premium users only</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8">
      {/* Breadcrumb */}
      <HelpBreadcrumb />

      {/* Navigation Header */}
      {activeSection !== 'main' && (
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveSection('main')}
            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
          >
            ← Back to Help Center
          </button>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default HelpCenter;
