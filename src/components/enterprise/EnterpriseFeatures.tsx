
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Building2, 
  Users, 
  Palette, 
  Shield, 
  Globe,
  Settings,
  Crown,
  Briefcase,
  Database,
  Lock
} from 'lucide-react';

interface EnterpriseClient {
  id: string;
  name: string;
  type: 'nursery' | 'retail' | 'education' | 'corporate';
  users: number;
  plan: string;
  customBranding: boolean;
  ssoEnabled: boolean;
  status: 'active' | 'trial' | 'pending';
}

const EnterpriseFeatures: React.FC = () => {
  const [clients, setClients] = useState<EnterpriseClient[]>([
    {
      id: '1',
      name: 'Green Valley Nursery',
      type: 'nursery',
      users: 45,
      plan: 'Enterprise Plus',
      customBranding: true,
      ssoEnabled: true,
      status: 'active'
    },
    {
      id: '2',
      name: 'Botanical University',
      type: 'education',
      users: 250,
      plan: 'Education',
      customBranding: true,
      ssoEnabled: true,
      status: 'active'
    },
    {
      id: '3',
      name: 'Plant Paradise Retail',
      type: 'retail',
      users: 12,
      plan: 'Business',
      customBranding: false,
      ssoEnabled: false,
      status: 'trial'
    }
  ]);

  const [whiteLabelConfig, setWhiteLabelConfig] = useState({
    logoUrl: '',
    primaryColor: '#10B981',
    secondaryColor: '#3B82F6',
    companyName: '',
    customDomain: '',
    hideOrkhidlyBranding: false
  });

  const enterpriseStats = {
    totalClients: 28,
    totalUsers: 1850,
    monthlyRevenue: 145000,
    averageUsersPerClient: 66,
    activeSSOConnections: 18,
    customDomains: 12
  };

  return (
    <div className="space-y-6">
      {/* Enterprise Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enterprise Clients</p>
                <p className="text-2xl font-bold">{enterpriseStats.totalClients}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-blue-100 text-blue-800">+3 this month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enterprise Users</p>
                <p className="text-2xl font-bold">{enterpriseStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-green-100 text-green-800">95% active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">${(enterpriseStats.monthlyRevenue / 1000).toFixed(0)}K</p>
              </div>
              <Crown className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-yellow-100 text-yellow-800">+18% MoM</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SSO Connections</p>
                <p className="text-2xl font-bold">{enterpriseStats.activeSSOConnections}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="clients">Client Management</TabsTrigger>
          <TabsTrigger value="white-label">White Label</TabsTrigger>
          <TabsTrigger value="sso">SSO & Security</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="features">Enterprise Features</TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Client Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{client.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{client.type} • {client.users} users</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            client.status === 'active' ? 'bg-green-100 text-green-800' :
                            client.status === 'trial' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {client.status}
                          </Badge>
                          <Badge variant="outline">{client.plan}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Custom Branding</div>
                          <div className="flex items-center mt-1">
                            {client.customBranding ? (
                              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">SSO Integration</div>
                          <div className="flex items-center mt-1">
                            {client.ssoEnabled ? (
                              <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800">Not Setup</Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Monthly Usage</div>
                          <div className="font-medium">2,450 identifications</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Actions</div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Manage</Button>
                            <Button size="sm" variant="outline">Reports</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="white-label">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>White Label Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Company Name</label>
                        <Input
                          value={whiteLabelConfig.companyName}
                          onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, companyName: e.target.value })}
                          placeholder="Enter company name"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Custom Domain</label>
                        <Input
                          value={whiteLabelConfig.customDomain}
                          onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, customDomain: e.target.value })}
                          placeholder="app.yourcompany.com"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Logo URL</label>
                        <Input
                          value={whiteLabelConfig.logoUrl}
                          onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, logoUrl: e.target.value })}
                          placeholder="https://your-logo-url.com/logo.png"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Primary Color</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={whiteLabelConfig.primaryColor}
                            onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, primaryColor: e.target.value })}
                            className="w-20"
                          />
                          <Input
                            value={whiteLabelConfig.primaryColor}
                            onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, primaryColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Secondary Color</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={whiteLabelConfig.secondaryColor}
                            onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, secondaryColor: e.target.value })}
                            className="w-20"
                          />
                          <Input
                            value={whiteLabelConfig.secondaryColor}
                            onChange={(e) => setWhiteLabelConfig({ ...whiteLabelConfig, secondaryColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Hide Orkhidly Branding</div>
                          <div className="text-sm text-gray-600">Remove "Powered by Orkhidly" footer</div>
                        </div>
                        <Switch
                          checked={whiteLabelConfig.hideOrkhidlyBranding}
                          onCheckedChange={(checked) => setWhiteLabelConfig({ ...whiteLabelConfig, hideOrkhidlyBranding: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Preview</h3>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center space-x-3 mb-4">
                        {whiteLabelConfig.logoUrl ? (
                          <img src={whiteLabelConfig.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                            <Building2 className="w-4 h-4" />
                          </div>
                        )}
                        <span className="font-medium">{whiteLabelConfig.companyName || 'Your Company'}</span>
                      </div>
                      <div 
                        className="text-white p-3 rounded"
                        style={{ backgroundColor: whiteLabelConfig.primaryColor }}
                      >
                        Sample UI Element with Primary Color
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button>Save Configuration</Button>
                    <Button variant="outline">Deploy Changes</Button>
                    <Button variant="outline">Preview in New Tab</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sso">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SSO & Security Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { provider: 'Active Directory', status: 'configured', connections: 12 },
                      { provider: 'Okta', status: 'configured', connections: 8 },
                      { provider: 'Google Workspace', status: 'pending', connections: 0 },
                      { provider: 'Azure AD', status: 'configured', connections: 15 },
                      { provider: 'SAML 2.0', status: 'configured', connections: 3 },
                      { provider: 'LDAP', status: 'not_configured', connections: 0 }
                    ].map((provider) => (
                      <Card key={provider.provider}>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <Lock className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                            <div className="font-medium">{provider.provider}</div>
                            <div className="text-sm text-gray-600">{provider.connections} connections</div>
                            <Badge className={
                              provider.status === 'configured' ? 'bg-green-100 text-green-800 mt-2' :
                              provider.status === 'pending' ? 'bg-yellow-100 text-yellow-800 mt-2' :
                              'bg-gray-100 text-gray-800 mt-2'
                            }>
                              {provider.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security Policies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { policy: 'Multi-Factor Authentication', required: true, compliance: 'SOC 2' },
                          { policy: 'Password Complexity Requirements', required: true, compliance: 'NIST' },
                          { policy: 'Session Timeout (30 minutes)', required: false, compliance: 'Internal' },
                          { policy: 'IP Whitelisting', required: false, compliance: 'Enterprise' },
                          { policy: 'Device Trust Verification', required: true, compliance: 'GDPR' },
                          { policy: 'Audit Logging', required: true, compliance: 'SOX' }
                        ].map((policy) => (
                          <div key={policy.policy} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{policy.policy}</div>
                              <div className="text-sm text-gray-600">Compliance: {policy.compliance}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={policy.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                {policy.required ? 'Required' : 'Optional'}
                              </Badge>
                              <Switch checked={policy.required} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organizations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organizational Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Department Management</h3>
                      <div className="space-y-2">
                        {[
                          { dept: 'Research & Development', users: 45, admin: 'Dr. Sarah Johnson' },
                          { dept: 'Horticulture Operations', users: 78, admin: 'Mike Chen' },
                          { dept: 'Customer Education', users: 23, admin: 'Lisa Rodriguez' },
                          { dept: 'Quality Assurance', users: 15, admin: 'Tom Wilson' }
                        ].map((dept) => (
                          <div key={dept.dept} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{dept.dept}</div>
                                <div className="text-sm text-gray-600">{dept.users} users • Admin: {dept.admin}</div>
                              </div>
                              <Button size="sm" variant="outline">Manage</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">User Roles & Permissions</h3>
                      <div className="space-y-2">
                        {[
                          { role: 'Organization Admin', permissions: 'Full access', users: 3 },
                          { role: 'Department Manager', permissions: 'Department-level access', users: 12 },
                          { role: 'Senior Botanist', permissions: 'Advanced features', users: 28 },
                          { role: 'Standard User', permissions: 'Basic identification & care', users: 118 },
                          { role: 'Read-Only Observer', permissions: 'View-only access', users: 7 }
                        ].map((role) => (
                          <div key={role.role} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{role.role}</div>
                                <div className="text-sm text-gray-600">{role.permissions} • {role.users} users</div>
                              </div>
                              <Button size="sm" variant="outline">Edit</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise-Only Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { feature: 'Advanced Analytics Dashboard', enabled: true },
                      { feature: 'Custom Plant Database Integration', enabled: true },
                      { feature: 'Bulk User Import/Export', enabled: true },
                      { feature: 'API Access & Custom Integrations', enabled: true },
                      { feature: 'Priority Support (24/7)', enabled: true },
                      { feature: 'Custom Training & Onboarding', enabled: false },
                      { feature: 'Dedicated Account Manager', enabled: true },
                      { feature: 'SLA Guarantees (99.9% uptime)', enabled: true }
                    ].map((feature) => (
                      <div key={feature.feature} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{feature.feature}</span>
                        <Badge className={feature.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {feature.enabled ? 'Enabled' : 'Available'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integration Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { integration: 'Salesforce CRM', category: 'Customer Management', status: 'active' },
                      { integration: 'HubSpot Marketing', category: 'Marketing Automation', status: 'available' },
                      { integration: 'Slack Notifications', category: 'Communication', status: 'active' },
                      { integration: 'Shopify E-commerce', category: 'E-commerce', status: 'active' },
                      { integration: 'QuickBooks Accounting', category: 'Financial', status: 'available' },
                      { integration: 'Zendesk Support', category: 'Customer Support', status: 'active' }
                    ].map((integration) => (
                      <div key={integration.integration} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{integration.integration}</div>
                          <div className="text-sm text-gray-600">{integration.category}</div>
                        </div>
                        <Badge className={integration.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {integration.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseFeatures;
