
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flower, Droplets, Sun, Thermometer, Clock } from 'lucide-react';

interface OrchidType {
  id: string;
  name: string;
  scientificName: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  characteristics: string[];
  careLevel: string;
  wateringFrequency: string;
  lightRequirement: string;
  temperatureRange: string;
  humidity: string;
  bloomSeason: string;
  image: string;
}

const OrchidTypesGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const orchidTypes: OrchidType[] = [
    {
      id: 'phalaenopsis',
      name: 'Moth Orchid',
      scientificName: 'Phalaenopsis',
      difficulty: 'beginner',
      description: 'The most popular and beginner-friendly orchid with elegant, long-lasting blooms.',
      characteristics: ['Long arching stems', 'Flat, rounded flowers', 'Thick, leathery leaves'],
      careLevel: 'Easy',
      wateringFrequency: 'Weekly',
      lightRequirement: 'Bright, indirect',
      temperatureRange: '65-80°F (18-27°C)',
      humidity: '50-70%',
      bloomSeason: 'Winter to Spring',
      image: '/placeholder.svg'
    },
    {
      id: 'cattleya',
      name: 'Corsage Orchid',
      scientificName: 'Cattleya',
      difficulty: 'intermediate',
      description: 'Known for large, fragrant blooms and vibrant colors. Classic choice for corsages.',
      characteristics: ['Large, showy flowers', 'Strong fragrance', 'Pseudobulbs'],
      careLevel: 'Moderate',
      wateringFrequency: 'Bi-weekly',
      lightRequirement: 'Bright light',
      temperatureRange: '60-85°F (15-29°C)',
      humidity: '50-80%',
      bloomSeason: 'Fall to Winter',
      image: '/placeholder.svg'
    },
    {
      id: 'dendrobium',
      name: 'Bamboo Orchid',
      scientificName: 'Dendrobium',
      difficulty: 'intermediate',
      description: 'Diverse genus with cane-like stems and clusters of colorful flowers.',
      characteristics: ['Cane-like pseudobulbs', 'Clusters of flowers', 'Deciduous varieties'],
      careLevel: 'Moderate',
      wateringFrequency: 'Weekly in growing season',
      lightRequirement: 'Bright light',
      temperatureRange: '55-85°F (13-29°C)',
      humidity: '40-70%',
      bloomSeason: 'Spring to Summer',
      image: '/placeholder.svg'
    },
    {
      id: 'oncidium',
      name: 'Dancing Lady',
      scientificName: 'Oncidium',
      difficulty: 'beginner',
      description: 'Cheerful yellow flowers that dance in the breeze, easy to grow.',
      characteristics: ['Small yellow flowers', 'Branching spray', 'Oval pseudobulbs'],
      careLevel: 'Easy',
      wateringFrequency: 'Weekly',
      lightRequirement: 'Bright, indirect',
      temperatureRange: '60-80°F (15-27°C)',
      humidity: '40-70%',
      bloomSeason: 'Fall to Spring',
      image: '/placeholder.svg'
    }
  ];

  const getDifficultyColor = (difficulty: OrchidType['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
    }
  };

  const categories = {
    popular: orchidTypes.filter(o => ['phalaenopsis', 'oncidium'].includes(o.id)),
    beginner: orchidTypes.filter(o => o.difficulty === 'beginner'),
    intermediate: orchidTypes.filter(o => o.difficulty === 'intermediate'),
    all: orchidTypes
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Orchid Types Guide</h1>
        <p className="text-xl text-gray-600">
          Visual identification and care guide for 20+ popular orchid varieties
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="beginner">Beginner Friendly</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="all">All Types</TabsTrigger>
        </TabsList>

        {Object.entries(categories).map(([key, orchids]) => (
          <TabsContent key={key} value={key}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orchids.map((orchid) => (
                <Card key={orchid.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <CardTitle className="text-xl">{orchid.name}</CardTitle>
                        <p className="text-sm italic text-gray-500">{orchid.scientificName}</p>
                      </div>
                      <Badge className={getDifficultyColor(orchid.difficulty)}>
                        {orchid.difficulty}
                      </Badge>
                    </div>
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Flower className="w-16 h-16 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{orchid.description}</p>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Key Characteristics:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {orchid.characteristics.map((char, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">{orchid.wateringFrequency}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-600">{orchid.lightRequirement}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600">{orchid.temperatureRange}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-600">{orchid.bloomSeason}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OrchidTypesGuide;
