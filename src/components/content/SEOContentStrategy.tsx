
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Search,
  TrendingUp,
  MapPin,
  Calendar,
  Target,
  Eye,
  Star,
  Clock
} from 'lucide-react';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  currentPosition: number;
  targetPosition: number;
  trend: 'up' | 'down' | 'stable';
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
}

interface ContentOpportunity {
  id: string;
  title: string;
  keyword: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  estimatedTraffic: number;
  priority: number;
  contentType: 'blog' | 'guide' | 'video' | 'tool';
}

const SEOContentStrategy: React.FC = () => {
  const [keywordData] = useState<KeywordData[]>([
    {
      keyword: 'orchid care guide',
      searchVolume: 8900,
      difficulty: 65,
      currentPosition: 8,
      targetPosition: 3,
      trend: 'up',
      intent: 'informational'
    },
    {
      keyword: 'how to identify orchid species',
      searchVolume: 3400,
      difficulty: 45,
      currentPosition: 12,
      targetPosition: 5,
      trend: 'up',
      intent: 'informational'
    },
    {
      keyword: 'orchid watering schedule',
      searchVolume: 5600,
      difficulty: 55,
      currentPosition: 6,
      targetPosition: 3,
      trend: 'stable',
      intent: 'informational'
    },
    {
      keyword: 'best orchid fertilizer',
      searchVolume: 2800,
      difficulty: 70,
      currentPosition: 15,
      targetPosition: 8,
      trend: 'down',
      intent: 'commercial'
    }
  ]);

  const [contentOpportunities] = useState<ContentOpportunity[]>([
    {
      id: '1',
      title: 'Complete Orchid Disease Diagnosis Guide',
      keyword: 'orchid diseases pictures',
      searchVolume: 4200,
      competition: 'medium',
      estimatedTraffic: 1890,
      priority: 95,
      contentType: 'guide'
    },
    {
      id: '2',
      title: 'Orchid Repotting: When and How Video Tutorial',
      keyword: 'when to repot orchids',
      searchVolume: 3100,
      competition: 'low',
      estimatedTraffic: 1650,
      priority: 88,
      contentType: 'video'
    },
    {
      id: '3',
      title: 'Orchid Bloom Calculator Tool',
      keyword: 'orchid blooming season',
      searchVolume: 2400,
      competition: 'low',
      estimatedTraffic: 1200,
      priority: 82,
      contentType: 'tool'
    }
  ]);

  const [seasonalTrends] = useState([
    { month: 'March', trend: 'Spring repotting', volume: '+45%' },
    { month: 'May', trend: 'Outdoor transition', volume: '+32%' },
    { month: 'September', trend: 'Indoor preparation', volume: '+28%' },
    { month: 'December', trend: 'Holiday orchids', volume: '+67%' }
  ]);

  const getTrendIcon = (trend: KeywordData['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getIntentColor = (intent: KeywordData['intent']) => {
    switch (intent) {
      case 'informational': return 'bg-blue-100 text-blue-800';
      case 'commercial': return 'bg-green-100 text-green-800';
      case 'transactional': return 'bg-purple-100 text-purple-800';
      case 'navigational': return 'bg-orange-100 text-orange-800';
    }
  };

  const getCompetitionColor = (competition: ContentOpportunity['competition']) => {
    switch (competition) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">SEO Content Strategy</h3>
          <p className="text-gray-600">Keyword targeting and content optimization for organic growth</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Search className="w-4 h-4 mr-2" />
          Keyword Research
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keyword Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Target Keywords Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keywordData.map((keyword) => (
                <div key={keyword.keyword} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{keyword.keyword}</div>
                      <div className="text-sm text-gray-600">
                        {keyword.searchVolume.toLocaleString()} monthly searches
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(keyword.trend)}
                      <Badge className={getIntentColor(keyword.intent)}>
                        {keyword.intent}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-gray-700">#{keyword.currentPosition}</div>
                      <div className="text-xs text-gray-500">Current</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">#{keyword.targetPosition}</div>
                      <div className="text-xs text-blue-800">Target</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="font-bold text-orange-600">{keyword.difficulty}%</div>
                      <div className="text-xs text-orange-800">Difficulty</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to target</span>
                      <span>
                        {Math.round(((keyword.currentPosition - keyword.targetPosition) / keyword.currentPosition) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={((keyword.currentPosition - keyword.targetPosition) / keyword.currentPosition) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              High-Impact Content Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{opportunity.title}</div>
                      <div className="text-sm text-gray-600">{opportunity.keyword}</div>
                    </div>
                    <Badge className={getCompetitionColor(opportunity.competition)}>
                      {opportunity.competition} comp
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{opportunity.searchVolume.toLocaleString()}</div>
                      <div className="text-xs text-blue-800">Searches</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{opportunity.estimatedTraffic}</div>
                      <div className="text-xs text-green-800">Est. Traffic</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600">{opportunity.priority}</div>
                      <div className="text-xs text-purple-800">Priority</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {opportunity.contentType}
                    </Badge>
                    <Button size="sm">
                      Create Content
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Local SEO Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium mb-2">Target Local Keywords</h4>
                <div className="space-y-2">
                  {[
                    'orchid nursery near me',
                    'local plant stores with orchids',
                    'orchid society meetings [city]',
                    'orchid care classes [city]'
                  ].map((keyword) => (
                    <div key={keyword} className="flex justify-between text-sm">
                      <span>{keyword}</span>
                      <Badge variant="outline" className="text-xs">Optimize</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-gray-700">342</div>
                  <div className="text-xs text-gray-600">Local listings</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-gray-700">4.7</div>
                  <div className="text-xs text-gray-600">Avg rating</div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Optimize Local Presence
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Seasonal Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Seasonal Content Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {seasonalTrends.map((trend) => (
                <div key={trend.month} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-medium">{trend.month}</div>
                    <div className="text-sm text-purple-700">{trend.trend}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">{trend.volume}</div>
                    <div className="text-xs text-purple-800">Search increase</div>
                  </div>
                </div>
              ))}
              
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Plan Seasonal Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Snippets Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Featured Snippets Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Question-Based Content</h4>
              <div className="space-y-2">
                {[
                  'How often should I water my orchid?',
                  'What does an overwatered orchid look like?',
                  'When do orchids typically bloom?',
                  'Why are my orchid leaves turning yellow?'
                ].map((question) => (
                  <div key={question} className="p-2 bg-yellow-50 rounded text-sm">
                    {question}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">List-Based Content</h4>
              <div className="space-y-2">
                {[
                  'Top 10 beginner-friendly orchids',
                  '5 signs your orchid needs repotting',
                  '7 common orchid care mistakes',
                  'Best orchid fertilizers for blooming'
                ].map((list) => (
                  <div key={list} className="p-2 bg-blue-50 rounded text-sm">
                    {list}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Definition Content</h4>
              <div className="space-y-2">
                {[
                  'What is orchid dormancy?',
                  'Define orchid pseudobulb',
                  'What are aerial roots?',
                  'Orchid keiki definition'
                ].map((definition) => (
                  <div key={definition} className="p-2 bg-green-50 rounded text-sm">
                    {definition}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOContentStrategy;
