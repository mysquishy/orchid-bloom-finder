
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ShoppingBag, Star, ExternalLink } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface ShoppingIntegrationProps {
  integrations: Integration[];
  onToggle: (integrationId: string) => void;
}

export const ShoppingIntegration: React.FC<ShoppingIntegrationProps> = ({ integrations, onToggle }) => {
  const shoppingPartners = [
    { id: 'amazon', name: 'Amazon', description: 'Orchid supplies and care products' },
    { id: 'etsy', name: 'Etsy', description: 'Handmade planters and accessories' },
    { id: 'local-nurseries', name: 'Local Nurseries', description: 'Find nearby plant stores' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Smart Shopping Recommendations</h4>
            <p className="text-purple-700 text-sm">
              Get personalized product recommendations based on your orchid collection and care needs.
            </p>
          </div>

          {shoppingPartners.map((partner) => {
            const userIntegration = integrations.find(ui => ui.id === partner.id);
            const isActive = userIntegration?.isActive || false;

            return (
              <div key={partner.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">{partner.name}</h5>
                      <p className="text-sm text-gray-500">{partner.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={isActive ? "default" : "secondary"}>
                      {isActive ? "Connected" : "Not Connected"}
                    </Badge>
                    <Switch 
                      checked={isActive}
                      onCheckedChange={() => onToggle(partner.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Recommended Products
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Orchid Fertilizer (Monthly)</span>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Humidity Tray Set</span>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
