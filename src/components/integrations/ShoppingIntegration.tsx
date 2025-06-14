
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ShoppingCart, 
  ExternalLink, 
  Star, 
  DollarSign, 
  Package,
  Truck,
  Gift,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface ShoppingIntegrationProps {
  integrations: Integration[];
  onToggle: (id: string) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  affiliate: string;
  category: string;
  commission: number;
}

interface AffiliateProgram {
  id: string;
  name: string;
  logo: string;
  commission: string;
  isActive: boolean;
  earnings: number;
  clicks: number;
}

export const ShoppingIntegration: React.FC<ShoppingIntegrationProps> = ({
  integrations,
  onToggle
}) => {
  const [recommendationEngine, setRecommendationEngine] = useState(true);
  const [showPrices, setShowPrices] = useState(true);
  const [affiliateId, setAffiliateId] = useState('');
  
  const [affiliatePrograms, setAffiliatePrograms] = useState<AffiliateProgram[]>([
    {
      id: 'amazon',
      name: 'Amazon Associates',
      logo: '🛒',
      commission: '3-10%',
      isActive: true,
      earnings: 156.78,
      clicks: 234
    },
    {
      id: 'gardening-direct',
      name: 'Gardening Direct',
      logo: '🌱',
      commission: '8-15%',
      isActive: false,
      earnings: 0,
      clicks: 0
    },
    {
      id: 'orchid-supply',
      name: 'OrchidSupply.com',
      logo: '🌺',
      commission: '12-20%',
      isActive: true,
      earnings: 89.45,
      clicks: 67
    }
  ]);

  const [featuredProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Orchid Bark Premium Mix',
      price: 24.99,
      rating: 4.8,
      image: '/api/placeholder/150/150',
      affiliate: 'amazon',
      category: 'Growing Medium',
      commission: 2.50
    },
    {
      id: '2',
      name: 'Orchid Fertilizer 20-20-20',
      price: 16.99,
      rating: 4.6,
      image: '/api/placeholder/150/150',
      affiliate: 'orchid-supply',
      category: 'Fertilizer',
      commission: 3.40
    },
    {
      id: '3',
      name: 'Clear Orchid Pots Set of 6',
      price: 32.99,
      rating: 4.9,
      image: '/api/placeholder/150/150',
      affiliate: 'gardening-direct',
      category: 'Pots & Containers',
      commission: 4.95
    }
  ]);

  const { toast } = useToast();

  const amazonAffiliate = integrations.find(i => i.id === 'amazon-shopping');

  const toggleAffiliateProgram = (programId: string) => {
    setAffiliatePrograms(prev => prev.map(program => 
      program.id === programId 
        ? { ...program, isActive: !program.isActive }
        : program
    ));

    toast({
      title: "Affiliate Program Updated",
      description: "Your affiliate settings have been saved",
    });
  };

  const generateRecommendations = () => {
    toast({
      title: "Recommendations Updated",
      description: "Product recommendations have been refreshed based on your plant collection",
    });
  };

  const totalEarnings = affiliatePrograms.reduce((sum, program) => sum + program.earnings, 0);
  const totalClicks = affiliatePrograms.reduce((sum, program) => sum + program.clicks, 0);

  return (
    <div className="space-y-6">
      {/* Affiliate Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-blue-600">{totalClicks}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Programs</p>
                <p className="text-2xl font-bold text-purple-600">
                  {affiliatePrograms.filter(p => p.isActive).length}
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion</p>
                <p className="text-2xl font-bold text-orange-600">
                  {totalClicks > 0 ? ((totalEarnings / totalClicks) * 100).toFixed(1) : '0'}%
                </p>
              </div>
              <Gift className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Programs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Affiliate Programs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {affiliatePrograms.map((program) => (
              <div key={program.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{program.logo}</span>
                    <div>
                      <h4 className="font-medium">{program.name}</h4>
                      <p className="text-sm text-gray-600">Commission: {program.commission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={program.isActive ? "default" : "outline"}>
                      {program.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Switch
                      checked={program.isActive}
                      onCheckedChange={() => toggleAffiliateProgram(program.id)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">${program.earnings.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">Earnings</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{program.clicks}</div>
                    <div className="text-xs text-gray-600">Clicks</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {program.clicks > 0 ? ((program.earnings / program.clicks) * 100).toFixed(1) : '0'}%
                    </div>
                    <div className="text-xs text-gray-600">Conversion</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Enable Product Recommendations</span>
              <p className="text-sm text-gray-600">Show relevant products based on plant collection</p>
            </div>
            <Switch checked={recommendationEngine} onCheckedChange={setRecommendationEngine} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Show Prices</span>
              <p className="text-sm text-gray-600">Display product prices in recommendations</p>
            </div>
            <Switch checked={showPrices} onCheckedChange={setShowPrices} />
          </div>

          <Button onClick={generateRecommendations} variant="outline" className="w-full">
            Refresh Recommendations
          </Button>
        </CardContent>
      </Card>

      {/* Featured Products */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
                
                <h4 className="font-medium mb-2 line-clamp-2">{product.name}</h4>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  {showPrices && (
                    <span className="font-bold text-lg">${product.price}</span>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    Commission: ${product.commission.toFixed(2)}
                  </span>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
