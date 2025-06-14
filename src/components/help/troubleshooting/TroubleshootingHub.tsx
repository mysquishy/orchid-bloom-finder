
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Flower, Leaf, Bug, Heart, Search } from 'lucide-react';

interface TroubleshootingGuide {
  id: string;
  title: string;
  description: string;
  category: 'blooming' | 'leaves' | 'roots' | 'pests' | 'emergency';
  symptoms: string[];
  causes: string[];
  solutions: string[];
  severity: 'low' | 'medium' | 'high';
  timeToResolve: string;
}

const TroubleshootingHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('blooming');
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryIcon = (category: TroubleshootingGuide['category']) => {
    switch (category) {
      case 'blooming':
        return <Flower className="w-5 h-5 text-pink-500" />;
      case 'leaves':
        return <Leaf className="w-5 h-5 text-green-500" />;
      case 'roots':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'pests':
        return <Bug className="w-5 h-5 text-orange-500" />;
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getSeverityColor = (severity: TroubleshootingGuide['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const troubleshootingGuides: TroubleshootingGuide[] = [
    {
      id: 'no-blooms',
      title: 'My Orchid Won\'t Bloom',
      description: 'Common causes and solutions for orchids that refuse to flower',
      category: 'blooming',
      symptoms: ['No flower spikes for over a year', 'Healthy leaves but no blooms', 'Previous blooms but none recently'],
      causes: ['Insufficient light', 'Wrong temperature differential', 'Over-fertilizing with nitrogen', 'Stress from repotting', 'Natural dormancy period'],
      solutions: ['Increase light exposure gradually', 'Provide 10-15°F temperature drop at night', 'Switch to bloom-boost fertilizer', 'Be patient after repotting', 'Maintain consistent care routine'],
      severity: 'medium',
      timeToResolve: '2-6 months'
    },
    {
      id: 'yellowing-leaves',
      title: 'Yellowing Leaves Guide',
      description: 'Understanding normal vs problematic leaf color changes',
      category: 'leaves',
      symptoms: ['Leaves turning yellow', 'Yellow spots on leaves', 'Rapid yellowing of multiple leaves'],
      causes: ['Natural aging process', 'Overwatering', 'Root rot', 'Fungal infection', 'Nutrient deficiency'],
      solutions: ['Remove naturally aging leaves', 'Adjust watering schedule', 'Check and treat roots', 'Apply fungicide treatment', 'Provide balanced fertilizer'],
      severity: 'medium',
      timeToResolve: '2-4 weeks'
    },
    {
      id: 'root-problems',
      title: 'Root Health Issues',
      description: 'Identifying healthy vs rotting roots and treatment options',
      category: 'roots',
      symptoms: ['Black or brown roots', 'Mushy root texture', 'Foul smell from potting medium', 'Plant becoming unstable in pot'],
      causes: ['Overwatering', 'Poor drainage', 'Old potting medium', 'Fungal infection', 'Compacted roots'],
      solutions: ['Remove all dead roots', 'Repot in fresh medium', 'Improve drainage', 'Apply fungicide', 'Adjust watering routine'],
      severity: 'high',
      timeToResolve: '1-3 months'
    },
    {
      id: 'pest-identification',
      title: 'Common Orchid Pests',
      description: 'Identifying and treating scale, mealybugs, and other pests',
      category: 'pests',
      symptoms: ['White cottony masses', 'Brown bumps on leaves', 'Sticky honeydew substance', 'Yellowing leaves with pests visible'],
      causes: ['Mealybugs', 'Scale insects', 'Aphids', 'Spider mites', 'Poor air circulation'],
      solutions: ['Isolate affected plant', 'Apply rubbing alcohol to pests', 'Use systemic insecticide', 'Improve air circulation', 'Regular inspection routine'],
      severity: 'high',
      timeToResolve: '2-6 weeks'
    },
    {
      id: 'emergency-care',
      title: 'Emergency Plant Recovery',
      description: 'Saving severely damaged or neglected orchids',
      category: 'emergency',
      symptoms: ['Completely dehydrated plant', 'All roots are dead', 'Severely wilted leaves', 'Plant dropping from pot'],
      causes: ['Severe neglect', 'Complete root loss', 'Extreme dehydration', 'Major pest infestation', 'Disease outbreak'],
      solutions: ['Assess salvageable parts', 'Emergency rehydration protocol', 'Drastic pruning if needed', 'Intensive care routine', 'Consider propagation if possible'],
      severity: 'high',
      timeToResolve: '3-12 months'
    }
  ];

  const categories = {
    blooming: troubleshootingGuides.filter(g => g.category === 'blooming'),
    leaves: troubleshootingGuides.filter(g => g.category === 'leaves'),
    roots: troubleshootingGuides.filter(g => g.category === 'roots'),
    pests: troubleshootingGuides.filter(g => g.category === 'pests'),
    emergency: troubleshootingGuides.filter(g => g.category === 'emergency')
  };

  const filteredGuides = searchTerm
    ? troubleshootingGuides.filter(guide =>
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        guide.causes.some(cause => cause.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : categories[selectedCategory as keyof typeof categories] || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Troubleshooting Center</h1>
        <p className="text-xl text-gray-600">
          Diagnose and solve common orchid problems with expert guidance
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search symptoms or problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {!searchTerm ? (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="blooming" className="flex items-center gap-2">
              <Flower className="w-4 h-4" />
              Blooming
            </TabsTrigger>
            <TabsTrigger value="leaves" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Leaves
            </TabsTrigger>
            <TabsTrigger value="roots" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Roots
            </TabsTrigger>
            <TabsTrigger value="pests" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              Pests
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </TabsTrigger>
          </TabsList>

          {Object.entries(categories).map(([key, guides]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(guide.category)}
                          <CardTitle className="text-lg">{guide.title}</CardTitle>
                        </div>
                        <Badge className={getSeverityColor(guide.severity)}>
                          {guide.severity} priority
                        </Badge>
                      </div>
                      <p className="text-gray-600">{guide.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Common Symptoms:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {guide.symptoms.slice(0, 3).map((symptom, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Quick Solutions:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {guide.solutions.slice(0, 2).map((solution, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Expected resolution: {guide.timeToResolve}</span>
                          <button className="text-green-600 hover:text-green-700 font-medium">
                            View Full Guide →
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Search Results for "{searchTerm}"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(guide.category)}
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(guide.severity)}>
                      {guide.severity}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{guide.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Resolution time: {guide.timeToResolve}</span>
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      View Guide →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TroubleshootingHub;
