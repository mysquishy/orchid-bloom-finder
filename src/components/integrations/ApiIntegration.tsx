import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Key, 
  Code, 
  Book, 
  Copy, 
  Check, 
  Eye, 
  EyeOff,
  RefreshCw,
  Globe,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: Date;
  lastUsed?: Date;
  isActive: boolean;
}

export const ApiIntegration: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Plant Care App Integration',
      key: 'orchid_live_pk_1a2b3c4d5e6f7g8h9i0j',
      permissions: ['read:plants', 'read:identifications', 'write:care_logs'],
      createdAt: new Date(Date.now() - 86400000 * 7),
      lastUsed: new Date(Date.now() - 3600000),
      isActive: true
    },
    {
      id: '2',
      name: 'Garden Planner Integration',
      key: 'orchid_live_pk_9z8y7x6w5v4u3t2s1r0q',
      permissions: ['read:plants', 'read:species'],
      createdAt: new Date(Date.now() - 86400000 * 3),
      isActive: true
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const availablePermissions = [
    { id: 'read:plants', name: 'Read Plants', description: 'Access user plant collection' },
    { id: 'write:plants', name: 'Write Plants', description: 'Add/update plants in collection' },
    { id: 'read:identifications', name: 'Read Identifications', description: 'Access identification history' },
    { id: 'write:identifications', name: 'Write Identifications', description: 'Submit plant identifications' },
    { id: 'read:care_logs', name: 'Read Care Logs', description: 'Access care history and notes' },
    { id: 'write:care_logs', name: 'Write Care Logs', description: 'Add care activities and notes' },
    { id: 'read:species', name: 'Read Species', description: 'Access orchid species database' },
    { id: 'read:analytics', name: 'Read Analytics', description: 'Access usage analytics' }
  ];

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the API key",
        variant: "destructive"
      });
      return;
    }

    if (selectedPermissions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one permission",
        variant: "destructive"
      });
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `orchid_live_pk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions: selectedPermissions,
      createdAt: new Date(),
      isActive: true
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setSelectedPermissions([]);

    toast({
      title: "API Key Generated",
      description: "Your new API key has been created successfully",
    });
  };

  const revokeApiKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, isActive: false } : key
    ));

    toast({
      title: "API Key Revoked",
      description: "The API key has been deactivated",
    });
  };

  const copyToClipboard = async (text: string, keyId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);

    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskKey = (key: string) => {
    return `${key.substring(0, 12)}${'*'.repeat(key.length - 16)}${key.substring(key.length - 4)}`;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="keys">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          {/* Generate New API Key */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Generate New API Key
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="keyName">API Key Name</Label>
                <Input
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., My Plant Care App"
                />
              </div>

              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPermissions(prev => [...prev, permission.id]);
                          } else {
                            setSelectedPermissions(prev => prev.filter(p => p !== permission.id));
                          }
                        }}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor={permission.id} className="font-medium text-sm cursor-pointer">
                          {permission.name}
                        </label>
                        <p className="text-xs text-gray-600">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={generateApiKey} className="w-full">
                <Key className="w-4 h-4 mr-2" />
                Generate API Key
              </Button>
            </CardContent>
          </Card>

          {/* Existing API Keys */}
          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{apiKey.name}</h4>
                        <p className="text-sm text-gray-600">
                          Created {apiKey.createdAt.toLocaleDateString()}
                          {apiKey.lastUsed && ` • Last used ${apiKey.lastUsed.toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={apiKey.isActive ? "default" : "destructive"}>
                          {apiKey.isActive ? 'Active' : 'Revoked'}
                        </Badge>
                        {apiKey.isActive && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeApiKey(apiKey.id)}
                          >
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <code className="flex-1 p-2 bg-gray-100 rounded font-mono text-sm">
                        {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {showKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      >
                        {copiedKey === apiKey.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5" />
                API Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <h3>Base URL</h3>
                <code className="block p-2 bg-gray-100 rounded">https://api.orchidai.app/v1</code>

                <h3>Authentication</h3>
                <p>Include your API key in the Authorization header:</p>
                <code className="block p-2 bg-gray-100 rounded">
                  Authorization: Bearer YOUR_API_KEY
                </code>

                <h3>Endpoints</h3>
                <div className="space-y-2">
                  <div className="border rounded p-3">
                    <code className="text-green-600">GET /plants</code>
                    <p className="text-sm text-gray-600 mt-1">Retrieve user's plant collection</p>
                  </div>
                  <div className="border rounded p-3">
                    <code className="text-blue-600">POST /plants</code>
                    <p className="text-sm text-gray-600 mt-1">Add a new plant to collection</p>
                  </div>
                  <div className="border rounded p-3">
                    <code className="text-green-600">GET /identifications</code>
                    <p className="text-sm text-gray-600 mt-1">Get identification history</p>
                  </div>
                  <div className="border rounded p-3">
                    <code className="text-blue-600">POST /identify</code>
                    <p className="text-sm text-gray-600 mt-1">Submit plant photo for identification</p>
                  </div>
                  <div className="border rounded p-3">
                    <code className="text-green-600">GET /species</code>
                    <p className="text-sm text-gray-600 mt-1">Search orchid species database</p>
                  </div>
                </div>

                <h3>Rate Limits</h3>
                <ul>
                  <li>Free tier: 1,000 requests per day</li>
                  <li>Premium tier: 10,000 requests per day</li>
                  <li>Enterprise: Custom limits available</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">JavaScript/Node.js</h4>
                <pre className="p-4 bg-gray-100 rounded text-sm overflow-x-auto">
{`const response = await fetch('https://api.orchidai.app/v1/plants', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const plants = await response.json();
console.log(plants);`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Python</h4>
                <pre className="p-4 bg-gray-100 rounded text-sm overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.orchidai.app/v1/plants', headers=headers)
plants = response.json()
print(plants)`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">cURL</h4>
                <pre className="p-4 bg-gray-100 rounded text-sm overflow-x-auto">
{`curl -X GET "https://api.orchidai.app/v1/plants" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
