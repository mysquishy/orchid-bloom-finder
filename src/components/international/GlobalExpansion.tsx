
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  DollarSign, 
  Clock, 
  Languages, 
  MapPin,
  TrendingUp,
  Users,
  Leaf
} from 'lucide-react';

interface MarketData {
  region: string;
  country: string;
  language: string;
  currency: string;
  userBase: number;
  revenue: number;
  growth: number;
  status: 'active' | 'beta' | 'planned';
  orchidSpecies: number;
  localPartners: number;
}

const GlobalExpansion: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const marketData: MarketData[] = [
    {
      region: 'North America',
      country: 'United States',
      language: 'English',
      currency: 'USD',
      userBase: 125000,
      revenue: 285000,
      growth: 18,
      status: 'active',
      orchidSpecies: 1200,
      localPartners: 45
    },
    {
      region: 'North America',
      country: 'Canada',
      language: 'English/French',
      currency: 'CAD',
      userBase: 15000,
      revenue: 32000,
      growth: 22,
      status: 'active',
      orchidSpecies: 380,
      localPartners: 8
    },
    {
      region: 'Europe',
      country: 'United Kingdom',
      language: 'English',
      currency: 'GBP',
      userBase: 28000,
      revenue: 65000,
      growth: 15,
      status: 'active',
      orchidSpecies: 450,
      localPartners: 12
    },
    {
      region: 'Europe',
      country: 'Germany',
      language: 'German',
      currency: 'EUR',
      userBase: 35000,
      revenue: 78000,
      growth: 28,
      status: 'active',
      orchidSpecies: 520,
      localPartners: 18
    },
    {
      region: 'Asia Pacific',
      country: 'Japan',
      language: 'Japanese',
      currency: 'JPY',
      userBase: 45000,
      revenue: 95000,
      growth: 35,
      status: 'beta',
      orchidSpecies: 850,
      localPartners: 25
    },
    {
      region: 'Asia Pacific',
      country: 'Australia',
      language: 'English',
      currency: 'AUD',
      userBase: 18000,
      revenue: 42000,
      growth: 20,
      status: 'active',
      orchidSpecies: 620,
      localPartners: 15
    },
    {
      region: 'South America',
      country: 'Brazil',
      language: 'Portuguese',
      currency: 'BRL',
      userBase: 12000,
      revenue: 18000,
      growth: 45,
      status: 'beta',
      orchidSpecies: 980,
      localPartners: 8
    },
    {
      region: 'Europe',
      country: 'France',
      language: 'French',
      currency: 'EUR',
      userBase: 8000,
      revenue: 15000,
      growth: 32,
      status: 'planned',
      orchidSpecies: 320,
      localPartners: 0
    }
  ];

  const translationProgress = [
    { language: 'Spanish', progress: 95, status: 'completed' },
    { language: 'French', progress: 88, status: 'in_progress' },
    { language: 'German', progress: 92, status: 'completed' },
    { language: 'Japanese', progress: 75, status: 'in_progress' },
    { language: 'Portuguese', progress: 68, status: 'in_progress' },
    { language: 'Italian', progress: 45, status: 'planned' },
    { language: 'Dutch', progress: 30, status: 'planned' },
    { language: 'Korean', progress: 25, status: 'planned' }
  ];

  const filteredMarkets = selectedRegion === 'all' 
    ? marketData 
    : marketData.filter(market => market.region === selectedRegion);

  const totalUsers = marketData.reduce((sum, market) => sum + market.userBase, 0);
  const totalRevenue = marketData.reduce((sum, market) => sum + market.revenue, 0);
  const averageGrowth = marketData.reduce((sum, market) => sum + market.growth, 0) / marketData.length;

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Global Users</p>
                <p className="text-2xl font-bold">{(totalUsers / 1000).toFixed(0)}K</p>
              </div>
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-blue-100 text-blue-800">8 Markets</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Global Revenue</p>
                <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-green-100 text-green-800">+{averageGrowth.toFixed(0)}% avg growth</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Languages</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Languages className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-purple-100 text-purple-800">3 in progress</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Zones</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-orange-100 text-orange-800">24/7 Support</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="markets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="markets">Market Performance</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="payments">Payment Systems</TabsTrigger>
          <TabsTrigger value="species">Regional Species</TabsTrigger>
          <TabsTrigger value="operations">Global Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="markets">
          <div className="space-y-6">
            {/* Region Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedRegion === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRegion('all')}
                  >
                    All Regions
                  </Button>
                  {['North America', 'Europe', 'Asia Pacific', 'South America'].map((region) => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMarkets.map((market) => (
                <Card key={`${market.country}-${market.region}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{market.country}</h3>
                          <p className="text-sm text-gray-600">{market.region}</p>
                        </div>
                      </div>
                      <Badge className={
                        market.status === 'active' ? 'bg-green-100 text-green-800' :
                        market.status === 'beta' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {market.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Users</div>
                        <div className="font-bold">{(market.userBase / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Revenue</div>
                        <div className="font-bold">${(market.revenue / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Growth</div>
                        <div className="font-bold text-green-600">+{market.growth}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Species</div>
                        <div className="font-bold">{market.orchidSpecies}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Language: {market.language}</span>
                        <span>Currency: {market.currency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Local Partners: {market.localPartners}</span>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="localization">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Translation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {translationProgress.map((lang) => (
                    <div key={lang.language} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{lang.language}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{lang.progress}%</span>
                          <Badge className={
                            lang.status === 'completed' ? 'bg-green-100 text-green-800' :
                            lang.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {lang.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={lang.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Adaptations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { region: 'Japan', adaptation: 'Seasonal care emphasis on traditional calendar', status: 'implemented' },
                      { region: 'Germany', adaptation: 'Technical precision in care instructions', status: 'implemented' },
                      { region: 'Brazil', adaptation: 'Tropical species focus and humidity guidance', status: 'in_progress' },
                      { region: 'France', adaptation: 'Aesthetic and design-focused plant selection', status: 'planned' }
                    ].map((item) => (
                      <div key={item.region} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.region}</div>
                            <div className="text-sm text-gray-600">{item.adaptation}</div>
                          </div>
                          <Badge className={
                            item.status === 'implemented' ? 'bg-green-100 text-green-800' :
                            item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Translation Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm space-y-2">
                      <div>• Native speaker botanists for technical accuracy</div>
                      <div>• Cultural consultants for market adaptation</div>
                      <div>• Professional plant care terminology validation</div>
                      <div>• Continuous translation updates and improvements</div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="font-medium mb-2">Translation Quality Metrics</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Accuracy Score</div>
                          <div className="font-medium">96.5%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">User Satisfaction</div>
                          <div className="font-medium">4.7/5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { region: 'North America', methods: ['Stripe', 'PayPal', 'Apple Pay', 'Google Pay'], currencies: ['USD', 'CAD'] },
                { region: 'Europe', methods: ['Stripe', 'PayPal', 'SEPA', 'Klarna'], currencies: ['EUR', 'GBP', 'CHF'] },
                { region: 'Asia Pacific', methods: ['Stripe', 'PayPal', 'Alipay', 'Bank Transfer'], currencies: ['JPY', 'AUD', 'SGD'] },
                { region: 'South America', methods: ['Stripe', 'PayPal', 'Boleto', 'PIX'], currencies: ['BRL', 'ARS', 'CLP'] }
              ].map((region) => (
                <Card key={region.region}>
                  <CardHeader>
                    <CardTitle className="text-lg">{region.region}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium mb-2">Payment Methods</div>
                        <div className="space-y-1">
                          {region.methods.map((method) => (
                            <div key={method} className="text-sm flex items-center justify-between">
                              <span>{method}</span>
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium mb-2">Supported Currencies</div>
                        <div className="flex flex-wrap gap-1">
                          {region.currencies.map((currency) => (
                            <Badge key={currency} variant="outline">{currency}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment Performance &amp; Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Conversion Rates by Region</h3>
                    <div className="space-y-2">
                      {[
                        { region: 'North America', rate: 12.5 },
                        { region: 'Europe', rate: 8.9 },
                        { region: 'Asia Pacific', rate: 6.2 },
                        { region: 'South America', rate: 4.8 }
                      ].map((region) => (
                        <div key={region.region} className="flex items-center justify-between">
                          <span className="text-sm">{region.region}</span>
                          <div className="flex items-center space-x-2 flex-1 ml-4">
                            <Progress value={region.rate * 8} className="flex-1" />
                            <span className="text-sm font-medium w-12">{region.rate}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Payment Optimization</h3>
                    <div className="space-y-2 text-sm">
                      <div>• Local payment method integration increases conversion by 23%</div>
                      <div>• Native currency pricing reduces cart abandonment by 18%</div>
                      <div>• Regional tax calculation automation</div>
                      <div>• Fraud detection tuned for local patterns</div>
                      <div>• Multi-currency subscription management</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="species">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Orchid Databases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { region: 'Tropical Americas', species: 15000, endemic: 8500, popular: 45 },
                    { region: 'Southeast Asia', species: 12000, endemic: 7200, popular: 38 },
                    { region: 'Europe', species: 850, endemic: 120, popular: 25 },
                    { region: 'North America', species: 1200, endemic: 300, popular: 28 },
                    { region: 'Africa', species: 2800, endemic: 1800, popular: 15 },
                    { region: 'Oceania', species: 1850, endemic: 1200, popular: 22 }
                  ].map((region) => (
                    <Card key={region.region}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Leaf className="w-5 h-5 text-green-600" />
                            <span className="font-medium">{region.region}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold">{region.species.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Total Species</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold">{region.endemic.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Endemic</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold">{region.popular}</div>
                            <div className="text-xs text-gray-600">Popular</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Care Guide Adaptations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      region: 'Tropical Regions',
                      adaptations: ['High humidity management', 'Monsoon season care', 'Heat stress prevention'],
                      challenges: 'Extreme weather conditions'
                    },
                    {
                      region: 'Temperate Zones',
                      adaptations: ['Seasonal light adjustment', 'Winter dormancy care', 'Heating considerations'],
                      challenges: 'Seasonal variation management'
                    },
                    {
                      region: 'Arid Climates',
                      adaptations: ['Water conservation techniques', 'Humidity chamber setups', 'Air conditioning effects'],
                      challenges: 'Low natural humidity'
                    },
                    {
                      region: 'Indoor Cultivation',
                      adaptations: ['Artificial lighting guides', 'Space optimization', 'Air circulation'],
                      challenges: 'Limited natural conditions'
                    }
                  ].map((guide) => (
                    <div key={guide.region} className="border rounded-lg p-4">
                      <div className="font-medium mb-2">{guide.region}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">Adaptations</div>
                          <div className="space-y-1">
                            {guide.adaptations.map((adaptation, index) => (
                              <div key={index} className="text-sm">• {adaptation}</div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">Key Challenge</div>
                          <div className="text-sm">{guide.challenges}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>24/7 Global Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <div className="font-medium">Support Coverage</div>
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-sm text-gray-600">Across 12 time zones</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="font-medium">Support Team</div>
                        <div className="text-2xl font-bold">45</div>
                        <div className="text-sm text-gray-600">Multilingual agents</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-medium">Response Time</div>
                        <div className="text-2xl font-bold">&lt; 2h</div>
                        <div className="text-sm text-gray-600">Average first response</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Zone Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Smart Notification Timing</h3>
                      <div className="space-y-2 text-sm">
                        <div>• Care reminders adjusted to local morning hours</div>
                        <div>• Weekly summaries sent on weekend mornings</div>
                        <div>• Emergency alerts sent immediately regardless of time</div>
                        <div>• Educational content delivered during leisure hours</div>
                        <div>• Community events scheduled for regional optimal times</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Regional Support Hours</h3>
                      <div className="space-y-2">
                        {[
                          { region: 'Americas', hours: '24/7', team: 'North America + South America' },
                          { region: 'Europe/Africa', hours: '06:00-22:00 UTC', team: 'London + Berlin' },
                          { region: 'Asia Pacific', hours: '22:00-14:00 UTC', team: 'Tokyo + Sydney' }
                        ].map((support) => (
                          <div key={support.region} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{support.region}</div>
                                <div className="text-sm text-gray-600">{support.team}</div>
                              </div>
                              <Badge variant="outline">{support.hours}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disaster Recovery &amp; Business Continuity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Regional Redundancy</h3>
                    <div className="space-y-2">
                      {[
                        { region: 'Primary: US East', backup: 'US West + Europe', status: 'active' },
                        { region: 'Primary: Europe', backup: 'US East + Asia', status: 'active' },
                        { region: 'Primary: Asia Pacific', backup: 'US West + Europe', status: 'active' }
                      ].map((redundancy) => (
                        <div key={redundancy.region} className="border rounded-lg p-3">
                          <div className="font-medium">{redundancy.region}</div>
                          <div className="text-sm text-gray-600">Backup: {redundancy.backup}</div>
                          <Badge className="bg-green-100 text-green-800 mt-1">{redundancy.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">SLA Guarantees</h3>
                    <div className="space-y-2 text-sm">
                      <div>• 99.99% uptime guarantee</div>
                      <div>• &lt; 30 second failover time</div>
                      <div>• Real-time data synchronization</div>
                      <div>• Automated incident response</div>
                      <div>• Monthly disaster recovery testing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalExpansion;
