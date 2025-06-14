
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Code, 
  Webhook, 
  Key, 
  Globe, 
  Zap,
  Shield,
  BarChart,
  Users,
  Settings,
  ExternalLink
} from 'lucide-react';

interface APIIntegration {
  id: string;
  name: string;
  category: 'identification' | 'data' | 'commerce' | 'automation' | 'analytics';
  provider: string;
  description: string;
  endpoints: number;
  monthlyRequests: number;
  status: 'active' | 'pending' | 'deprecated';
  pricing: 'free' | 'premium' | 'enterprise';
  rating: number;
}

const ApiMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [apiKey, setApiKey] = useState('');

  const integrations: APIIntegration[] = [
    {
      id: '1',
      name: 'Plant Identification API',
      category: 'identification',
      provider: 'Orkhidly Core',
      description: 'Advanced AI-powered orchid species identification with 99.2% accuracy',
      endpoints: 4,
      monthlyRequests: 125000,
      status: 'active',
      pricing: 'premium',
      rating: 4.9
    },
    {
      id: '2',
      name: 'Plant Care Database API',
      category: 'data',
      provider: 'Orkhidly Research',
      description: 'Comprehensive care instructions for 5000+ orchid species',
      endpoints: 8,
      monthlyRequests: 85000,
      status: 'active',
      pricing: 'free',
      rating: 4.7
    },
    {
      id: '3',
      name: 'E-commerce Integration',
      category: 'commerce',
      provider: 'Shopify Partnership',
      description: 'Seamless plant store integration with inventory management',
      endpoints: 12,
      monthlyRequests: 45000,
      status: 'active',
      pricing: 'enterprise',
      rating: 4.5
    },
    {
      id: '4',
      name: 'Weather Integration API',
      category: 'automation',
      provider: 'WeatherAPI.com',
      description: 'Real-time weather data for optimal plant care recommendations',
      endpoints: 6,
      monthlyRequests: 200000,
      status: 'active',
      pricing: 'premium',
      rating: 4.8
    },
    {
      id: '5',
      name: 'Analytics & Insights API',
      category: 'analytics',
      provider: 'Orkhidly Analytics',
      description: 'Plant health analytics and growth prediction models',
      endpoints: 10,
      monthlyRequests: 32000,
      status: 'active',
      pricing: 'enterprise',
      rating: 4.6
    }
  ];

  const webhookEndpoints = [
    { event: 'plant.identified', url: '/webhooks/plant-identified', description: 'Triggered when AI identifies a plant' },
    { event: 'care.reminder', url: '/webhooks/care-reminder', description: 'Sent when care task is due' },
    { event: 'user.milestone', url: '/webhooks/user-milestone', description: 'User achievement or milestone reached' },
    { event: 'health.alert', url: '/webhooks/health-alert', description: 'Plant health issue detected' }
  ];

  const developerStats = {
    totalDevelopers: 1250,
    activeIntegrations: 45,
    monthlyApiCalls: 2500000,
    averageResponseTime: 95
  };

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Developer Ecosystem Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Developers</p>
                <p className="text-2xl font-bold">{developerStats.totalDevelopers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-blue-100 text-blue-800">+15% this month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">API Calls/Month</p>
                <p className="text-2xl font-bold">{(developerStats.monthlyApiCalls / 1000000).toFixed(1)}M</p>
              </div>
              <BarChart className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-green-100 text-green-800">+32% growth</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold">{developerStats.averageResponseTime}ms</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-yellow-100 text-yellow-800">99.9% uptime</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Integrations</p>
                <p className="text-2xl font-bold">{developerStats.activeIntegrations}</p>
              </div>
              <Code className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-purple-100 text-purple-800">5 Categories</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">API Marketplace</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <div className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    All APIs
                  </Button>
                  {['identification', 'data', 'commerce', 'automation', 'analytics'].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Integration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          integration.pricing === 'free' ? 'bg-green-100 text-green-800' :
                          integration.pricing === 'premium' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          {integration.pricing}
                        </Badge>
                        <Badge className={
                          integration.status === 'active' ? 'bg-green-100 text-green-800' :
                          integration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {integration.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Endpoints</div>
                        <div className="font-bold">{integration.endpoints}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Monthly Requests</div>
                        <div className="font-bold">{(integration.monthlyRequests / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Rating</div>
                        <div className="font-bold">{integration.rating}/5.0</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Category</div>
                        <div className="font-bold capitalize">{integration.category}</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Documentation
                      </Button>
                      <Button size="sm" variant="outline">
                        Try API
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="webhooks">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhookEndpoints.map((webhook, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Webhook className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{webhook.event}</div>
                            <div className="text-sm text-gray-600 font-mono">{webhook.url}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Test</Button>
                          <Button size="sm" variant="outline">Configure</Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{webhook.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Security & Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Security Features</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>HMAC signature validation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>SSL/TLS encryption required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>IP whitelisting support</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>Automatic retry logic</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Webhook Statistics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Success Rate</span>
                          <span className="font-medium">99.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Average Response Time</span>
                          <span className="font-medium">185ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Events Sent (24h)</span>
                          <span className="font-medium">15,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Failed Deliveries</span>
                          <span className="font-medium">12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keys">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Key Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input
                      placeholder="API Key Name"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button>
                      <Key className="w-4 h-4 mr-2" />
                      Generate New Key
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Production API Key', key: 'orchid_live_pk_1234567890abcdef', created: '2024-01-15', lastUsed: '2 hours ago', requests: 125000 },
                      { name: 'Development API Key', key: 'orchid_test_pk_abcdef1234567890', created: '2024-02-01', lastUsed: '5 minutes ago', requests: 8500 },
                      { name: 'Staging Environment', key: 'orchid_staging_pk_fedcba0987654321', created: '2024-02-10', lastUsed: '1 day ago', requests: 2100 }
                    ].map((key, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-semibold">{key.name}</div>
                            <div className="text-sm text-gray-600 font-mono">{key.key.substring(0, 20)}...</div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Copy</Button>
                            <Button size="sm" variant="outline">Regenerate</Button>
                            <Button size="sm" variant="destructive">Revoke</Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Created</div>
                            <div>{key.created}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Last Used</div>
                            <div>{key.lastUsed}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Monthly Requests</div>
                            <div>{key.requests.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Limits & Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Current Plan: Enterprise</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Requests per minute</span>
                        <span className="font-medium">1,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly quota</span>
                        <span className="font-medium">5,000,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Concurrent connections</span>
                        <span className="font-medium">50</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Usage This Month</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Requests used</span>
                        <span className="font-medium">2,135,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining</span>
                        <span className="font-medium">2,865,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Usage percentage</span>
                        <span className="font-medium">42.7%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Rate Limit Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current rate</span>
                        <span className="font-medium">245/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peak today</span>
                        <span className="font-medium">892/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status</span>
                        <Badge className="bg-green-100 text-green-800">Normal</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentation">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation & Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Quick Start Guides</h3>
                    <div className="space-y-2">
                      {[
                        { title: 'Getting Started with Orkhidly API', type: 'guide' },
                        { title: 'Authentication & API Keys', type: 'guide' },
                        { title: 'Plant Identification Tutorial', type: 'tutorial' },
                        { title: 'Webhook Integration Guide', type: 'guide' },
                        { title: 'Error Handling Best Practices', type: 'reference' }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{doc.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{doc.type}</Badge>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Code Examples</h3>
                    <div className="space-y-2">
                      {[
                        { language: 'JavaScript', examples: 12 },
                        { language: 'Python', examples: 10 },
                        { language: 'PHP', examples: 8 },
                        { language: 'Ruby', examples: 6 },
                        { language: 'Java', examples: 7 },
                        { language: 'C#', examples: 5 }
                      ].map((lang, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Code className="w-4 h-4 text-green-600" />
                            <span className="font-medium">{lang.language}</span>
                            <Badge variant="outline">{lang.examples} examples</Badge>
                          </div>
                          <Button size="sm" variant="outline">Browse</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive API Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Try the Plant Identification API</h3>
                    <Button size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Endpoint</label>
                      <div className="font-mono text-sm bg-white p-2 rounded border">
                        POST /api/v1/identify
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Sample Request</label>
                      <div className="font-mono text-sm bg-white p-3 rounded border">
                        {`{
  "image": "base64_encoded_image",
  "confidence_threshold": 0.8,
  "include_care_info": true
}`}
                      </div>
                    </div>
                    
                    <Button className="w-full">Test API Call</Button>
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

export default ApiMarketplace;
