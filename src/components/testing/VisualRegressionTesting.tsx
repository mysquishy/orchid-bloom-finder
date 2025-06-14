
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  Camera, 
  GitCompare, 
  Monitor, 
  Smartphone, 
  Tablet,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  RefreshCw
} from 'lucide-react';

interface VisualTest {
  id: string;
  name: string;
  page: string;
  viewport: string;
  status: 'passed' | 'failed' | 'new' | 'reviewing';
  baseline: string;
  current: string;
  diff?: string;
  diffPercentage: number;
  threshold: number;
  lastUpdated: string;
  approvedBy?: string;
}

interface BrandConsistency {
  component: string;
  property: string;
  expected: string;
  actual: string;
  status: 'compliant' | 'warning' | 'violation';
  pages: string[];
}

const VisualRegressionTesting: React.FC = () => {
  const [visualTests, setVisualTests] = useState<VisualTest[]>([]);
  const [brandConsistency, setBrandConsistency] = useState<BrandConsistency[]>([]);
  const [selectedViewport, setSelectedViewport] = useState<string>('all');
  const [isRunningTests, setIsRunningTests] = useState(false);

  useEffect(() => {
    // Mock visual test data
    const mockVisualTests: VisualTest[] = [
      {
        id: '1',
        name: 'Homepage Hero Section',
        page: '/home',
        viewport: 'Desktop (1920x1080)',
        status: 'passed',
        baseline: '/screenshots/baseline/home-hero-desktop.png',
        current: '/screenshots/current/home-hero-desktop.png',
        diffPercentage: 0.2,
        threshold: 2.0,
        lastUpdated: '2025-06-14T10:30:00Z'
      },
      {
        id: '2',
        name: 'Login Form Mobile',
        page: '/login',
        viewport: 'Mobile (375x667)',
        status: 'failed',
        baseline: '/screenshots/baseline/login-form-mobile.png',
        current: '/screenshots/current/login-form-mobile.png',
        diff: '/screenshots/diff/login-form-mobile.png',
        diffPercentage: 5.8,
        threshold: 2.0,
        lastUpdated: '2025-06-14T10:25:00Z'
      },
      {
        id: '3',
        name: 'Dashboard Navigation',
        page: '/dashboard',
        viewport: 'Tablet (768x1024)',
        status: 'reviewing',
        baseline: '/screenshots/baseline/dashboard-nav-tablet.png',
        current: '/screenshots/current/dashboard-nav-tablet.png',
        diff: '/screenshots/diff/dashboard-nav-tablet.png',
        diffPercentage: 3.2,
        threshold: 2.0,
        lastUpdated: '2025-06-14T10:20:00Z'
      },
      {
        id: '4',
        name: 'Orchid Card Component',
        page: '/garden',
        viewport: 'Desktop (1920x1080)',
        status: 'new',
        baseline: '',
        current: '/screenshots/current/orchid-card-desktop.png',
        diffPercentage: 0,
        threshold: 2.0,
        lastUpdated: '2025-06-14T10:15:00Z'
      }
    ];

    // Mock brand consistency data
    const mockBrandConsistency: BrandConsistency[] = [
      {
        component: 'Primary Button',
        property: 'Background Color',
        expected: '#10B981',
        actual: '#10B981',
        status: 'compliant',
        pages: ['/home', '/login', '/dashboard']
      },
      {
        component: 'Heading Font',
        property: 'Font Family',
        expected: 'Inter, sans-serif',
        actual: 'Arial, sans-serif',
        status: 'violation',
        pages: ['/pricing']
      },
      {
        component: 'Card Shadow',
        property: 'Box Shadow',
        expected: '0 4px 6px rgba(0, 0, 0, 0.1)',
        actual: '0 2px 4px rgba(0, 0, 0, 0.1)',
        status: 'warning',
        pages: ['/garden', '/profile']
      },
      {
        component: 'Navigation',
        property: 'Padding',
        expected: '16px 24px',
        actual: '16px 24px',
        status: 'compliant',
        pages: ['/home', '/dashboard', '/garden']
      }
    ];

    setVisualTests(mockVisualTests);
    setBrandConsistency(mockBrandConsistency);
  }, []);

  const runVisualTests = async () => {
    setIsRunningTests(true);
    // Simulate test execution
    setTimeout(() => {
      setIsRunningTests(false);
    }, 3000);
  };

  const approveChange = (testId: string) => {
    setVisualTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, status: 'passed' as const, approvedBy: 'Current User' }
        : test
    ));
  };

  const rejectChange = (testId: string) => {
    setVisualTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, status: 'failed' as const }
        : test
    ));
  };

  const getStatusIcon = (status: VisualTest['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'reviewing': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'new': return <Camera className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: VisualTest['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'new': return 'bg-blue-100 text-blue-800';
    }
  };

  const getViewportIcon = (viewport: string) => {
    if (viewport.includes('Mobile')) return <Smartphone className="w-4 h-4" />;
    if (viewport.includes('Tablet')) return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const getBrandStatusColor = (status: BrandConsistency['status']) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'violation': return 'bg-red-100 text-red-800';
    }
  };

  const filteredTests = selectedViewport === 'all' 
    ? visualTests 
    : visualTests.filter(test => test.viewport.includes(selectedViewport));

  const testStats = {
    total: visualTests.length,
    passed: visualTests.filter(t => t.status === 'passed').length,
    failed: visualTests.filter(t => t.status === 'failed').length,
    reviewing: visualTests.filter(t => t.status === 'reviewing').length,
    new: visualTests.filter(t => t.status === 'new').length
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Visual Regression Testing</h2>
          <p className="text-gray-600">Automated visual consistency monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedViewport} onValueChange={setSelectedViewport}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by viewport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Viewports</SelectItem>
              <SelectItem value="Desktop">Desktop</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="Tablet">Tablet</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={runVisualTests}
            disabled={isRunningTests}
            className="bg-gradient-to-r from-purple-500 to-pink-600"
          >
            {isRunningTests ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-2" />
                Run Visual Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{testStats.total}</div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{testStats.passed}</div>
            <div className="text-sm text-gray-600">Passed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{testStats.failed}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{testStats.reviewing}</div>
            <div className="text-sm text-gray-600">Reviewing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{testStats.new}</div>
            <div className="text-sm text-gray-600">New</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="brand">Brand Consistency</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <div className="space-y-4">
            {filteredTests.map((test) => (
              <Card key={test.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          {getViewportIcon(test.viewport)}
                          <span>{test.viewport}</span>
                          <span>•</span>
                          <span>{test.page}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                      {test.diffPercentage > 0 && (
                        <span className={`text-sm font-medium ${
                          test.diffPercentage > test.threshold ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {test.diffPercentage}% diff
                        </span>
                      )}
                    </div>
                  </div>

                  {test.status === 'failed' || test.status === 'reviewing' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm font-medium mb-2">Baseline</p>
                          <div className="bg-gray-100 border rounded p-4 h-32 flex items-center justify-center">
                            <Eye className="w-8 h-8 text-gray-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium mb-2">Current</p>
                          <div className="bg-gray-100 border rounded p-4 h-32 flex items-center justify-center">
                            <Eye className="w-8 h-8 text-gray-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium mb-2">Difference</p>
                          <div className="bg-red-50 border border-red-200 rounded p-4 h-32 flex items-center justify-center">
                            <GitCompare className="w-8 h-8 text-red-400" />
                          </div>
                        </div>
                      </div>

                      {test.status === 'reviewing' && (
                        <div className="flex justify-center space-x-2">
                          <Button
                            onClick={() => approveChange(test.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve Change
                          </Button>
                          <Button
                            onClick={() => rejectChange(test.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Change
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : test.status === 'new' ? (
                    <div className="text-center py-8">
                      <Camera className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                      <p className="text-gray-600">New test case - baseline will be created on approval</p>
                      <Button className="mt-4" onClick={() => approveChange(test.id)}>
                        Create Baseline
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-600" />
                      <p className="text-green-600 font-medium">Visual test passed</p>
                      {test.approvedBy && (
                        <p className="text-sm text-gray-500">Approved by {test.approvedBy}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>Threshold: {test.threshold}%</span>
                    <span>Last updated: {new Date(test.lastUpdated).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Brand Consistency Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {brandConsistency.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{item.component} - {item.property}</h3>
                        <p className="text-sm text-gray-600">
                          Pages: {item.pages.join(', ')}
                        </p>
                      </div>
                      <Badge className={getBrandStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Expected:</span>
                        <div className="bg-green-50 p-2 rounded mt-1 font-mono">
                          {item.expected}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Actual:</span>
                        <div className={`p-2 rounded mt-1 font-mono ${
                          item.status === 'compliant' ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          {item.actual}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">WCAG 2.1 AA Compliance</h3>
                  <div className="space-y-3">
                    {[
                      { criterion: 'Color Contrast', score: 98, status: 'passed' },
                      { criterion: 'Keyboard Navigation', score: 95, status: 'passed' },
                      { criterion: 'Alt Text Coverage', score: 87, status: 'warning' },
                      { criterion: 'Focus Indicators', score: 92, status: 'passed' },
                      { criterion: 'Screen Reader Support', score: 89, status: 'warning' }
                    ].map((item) => (
                      <div key={item.criterion} className="flex items-center justify-between">
                        <span className="text-sm">{item.criterion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                item.score >= 90 ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{item.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Mobile Accessibility</h3>
                  <div className="space-y-3">
                    {[
                      { feature: 'Touch Target Size', compliant: true },
                      { feature: 'Voice Over Support', compliant: true },
                      { feature: 'Gesture Alternatives', compliant: false },
                      { feature: 'Orientation Support', compliant: true },
                      { feature: 'Text Scaling', compliant: true }
                    ].map((item) => (
                      <div key={item.feature} className="flex items-center justify-between">
                        <span className="text-sm">{item.feature}</span>
                        {item.compliant ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisualRegressionTesting;
