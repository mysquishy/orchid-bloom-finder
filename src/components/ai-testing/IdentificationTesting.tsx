
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Play, Pause, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface TestDataset {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  speciesCount: number;
  expertValidated: boolean;
  lastUpdated: string;
}

interface TestRun {
  id: string;
  datasetId: string;
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  accuracy: number | null;
  startTime: string;
  endTime: string | null;
  modelVersion: string;
}

const IdentificationTesting: React.FC = () => {
  const [datasets, setDatasets] = useState<TestDataset[]>([]);
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [isRunningTest, setIsRunningTest] = useState(false);

  useEffect(() => {
    // Mock test datasets
    const mockDatasets: TestDataset[] = [
      {
        id: '1',
        name: 'Phalaenopsis Standard Set',
        description: 'Comprehensive collection of Phalaenopsis varieties in optimal conditions',
        imageCount: 2500,
        speciesCount: 45,
        expertValidated: true,
        lastUpdated: '2025-06-10'
      },
      {
        id: '2',
        name: 'Low Light Challenge Set',
        description: 'Images taken in poor lighting conditions to test edge cases',
        imageCount: 800,
        speciesCount: 30,
        expertValidated: true,
        lastUpdated: '2025-06-08'
      },
      {
        id: '3',
        name: 'Diseased Plant Collection',
        description: 'Plants showing various diseases and stress conditions',
        imageCount: 650,
        speciesCount: 25,
        expertValidated: true,
        lastUpdated: '2025-06-12'
      },
      {
        id: '4',
        name: 'Multiple Plant Scenarios',
        description: 'Images containing multiple orchids for complex recognition testing',
        imageCount: 400,
        speciesCount: 20,
        expertValidated: false,
        lastUpdated: '2025-06-09'
      },
      {
        id: '5',
        name: 'Hybrid Varieties Set',
        description: 'Rare and hybrid orchid varieties for advanced testing',
        imageCount: 300,
        speciesCount: 15,
        expertValidated: true,
        lastUpdated: '2025-06-11'
      }
    ];

    // Mock test runs
    const mockTestRuns: TestRun[] = [
      {
        id: '1',
        datasetId: '1',
        status: 'completed',
        progress: 100,
        accuracy: 96.5,
        startTime: '2025-06-14T09:00:00Z',
        endTime: '2025-06-14T09:45:00Z',
        modelVersion: 'v2.1.3'
      },
      {
        id: '2',
        datasetId: '2',
        status: 'running',
        progress: 65,
        accuracy: null,
        startTime: '2025-06-14T10:30:00Z',
        endTime: null,
        modelVersion: 'v2.1.4'
      },
      {
        id: '3',
        datasetId: '3',
        status: 'completed',
        progress: 100,
        accuracy: 82.8,
        startTime: '2025-06-14T08:00:00Z',
        endTime: '2025-06-14T08:35:00Z',
        modelVersion: 'v2.1.3'
      }
    ];

    setDatasets(mockDatasets);
    setTestRuns(mockTestRuns);
  }, []);

  const startTest = async () => {
    if (!selectedDataset) return;
    
    setIsRunningTest(true);
    
    // Simulate test run
    const newTestRun: TestRun = {
      id: Date.now().toString(),
      datasetId: selectedDataset,
      status: 'running',
      progress: 0,
      accuracy: null,
      startTime: new Date().toISOString(),
      endTime: null,
      modelVersion: 'v2.1.4'
    };
    
    setTestRuns(prev => [newTestRun, ...prev]);
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTestRuns(prev => 
        prev.map(run => 
          run.id === newTestRun.id 
            ? { ...run, progress: i, ...(i === 100 && { 
                status: 'completed' as const, 
                accuracy: Math.random() * 10 + 85,
                endTime: new Date().toISOString()
              })}
            : run
        )
      );
    }
    
    setIsRunningTest(false);
  };

  const getStatusIcon = (status: TestRun['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'running': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'queued': return <Play className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: TestRun['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'queued': return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Test Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Identification Accuracy Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Test Dataset</label>
                <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a dataset to test..." />
                  </SelectTrigger>
                  <SelectContent>
                    {datasets.map((dataset) => (
                      <SelectItem key={dataset.id} value={dataset.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{dataset.name}</span>
                          {dataset.expertValidated && (
                            <CheckCircle className="w-4 h-4 text-green-600 ml-2" />
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedDataset && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  {(() => {
                    const dataset = datasets.find(d => d.id === selectedDataset);
                    return dataset ? (
                      <div className="space-y-2">
                        <h4 className="font-medium">{dataset.name}</h4>
                        <p className="text-sm text-gray-600">{dataset.description}</p>
                        <div className="flex space-x-4 text-sm">
                          <span><strong>{dataset.imageCount}</strong> images</span>
                          <span><strong>{dataset.speciesCount}</strong> species</span>
                          <span>Updated: {dataset.lastUpdated}</span>
                        </div>
                        {dataset.expertValidated && (
                          <Badge className="bg-green-100 text-green-800">Expert Validated</Badge>
                        )}
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <Button 
                onClick={startTest}
                disabled={!selectedDataset || isRunningTest}
                className="w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunningTest ? 'Running Test...' : 'Start Accuracy Test'}
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Test Configuration Options</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <span className="text-sm">Confidence Threshold</span>
                  <span className="text-sm font-medium">0.85</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <span className="text-sm">Batch Size</span>
                  <span className="text-sm font-medium">32</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <span className="text-sm">Model Version</span>
                  <span className="text-sm font-medium">v2.1.4</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <span className="text-sm">Cross-validation</span>
                  <span className="text-sm font-medium">5-fold</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Datasets */}
      <Card>
        <CardHeader>
          <CardTitle>Available Test Datasets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {datasets.map((dataset) => (
              <Card key={dataset.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium">{dataset.name}</h4>
                    {dataset.expertValidated && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Images:</span>
                      <span>{dataset.imageCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Species:</span>
                      <span>{dataset.speciesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Updated:</span>
                      <span>{dataset.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Test Runs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testRuns.map((run) => {
              const dataset = datasets.find(d => d.id === run.datasetId);
              return (
                <div key={run.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(run.status)}
                      <div>
                        <h4 className="font-medium">{dataset?.name}</h4>
                        <p className="text-sm text-gray-500">
                          Started: {new Date(run.startTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {run.accuracy !== null && (
                        <span className={`font-medium ${getAccuracyColor(run.accuracy)}`}>
                          {run.accuracy.toFixed(1)}% accuracy
                        </span>
                      )}
                      <Badge className={getStatusColor(run.status)}>
                        {run.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {run.status === 'running' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{run.progress}%</span>
                      </div>
                      <Progress value={run.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Model:</span> {run.modelVersion}
                    </div>
                    <div>
                      <span className="font-medium">Images:</span> {dataset?.imageCount}
                    </div>
                    <div>
                      <span className="font-medium">Species:</span> {dataset?.speciesCount}
                    </div>
                    {run.endTime && (
                      <div>
                        <span className="font-medium">Duration:</span> {
                          Math.round((new Date(run.endTime).getTime() - new Date(run.startTime).getTime()) / 60000)
                        }m
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdentificationTesting;
