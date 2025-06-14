import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Camera, Download, Calendar, Image, Grid } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PhotoAlbumExporterProps {
  onProgress: (progress: number) => void;
}

const PhotoAlbumExporter: React.FC<PhotoAlbumExporterProps> = ({ onProgress }) => {
  const { user } = useAuth();
  const [albumType, setAlbumType] = useState<'timeline' | 'plant' | 'collection'>('timeline');
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<'month' | 'quarter' | 'year' | 'all'>('year');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [albumFormat, setAlbumFormat] = useState<'pdf' | 'zip' | 'web'>('pdf');
  const [generating, setGenerating] = useState(false);

  // Mock photo data
  const mockPhotos = [
    {
      id: '1',
      plant_id: 'plant-1',
      plant_name: 'Purple Phalaenopsis',
      date: '2024-01-15',
      type: 'progress',
      description: 'New growth spotted'
    },
    {
      id: '2',
      plant_id: 'plant-1',
      plant_name: 'Purple Phalaenopsis',
      date: '2024-02-20',
      type: 'bloom',
      description: 'First bloom of the season'
    },
    {
      id: '3',
      plant_id: 'plant-2',
      plant_name: 'White Dendrobium',
      date: '2024-03-10',
      type: 'care',
      description: 'After repotting'
    }
  ];

  const generateAlbum = async () => {
    try {
      setGenerating(true);
      onProgress(0);

      const steps = [
        'Collecting photos...',
        'Processing images...',
        'Creating layout...',
        'Adding metadata...',
        'Generating album...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        onProgress(((i + 1) / steps.length) * 100);
      }

      // Mock album generation
      console.log('Album generated:', {
        type: albumType,
        format: albumFormat,
        photos: mockPhotos.length,
        metadata: includeMetadata
      });

      onProgress(100);
    } catch (error) {
      console.error('Album generation error:', error);
    } finally {
      setGenerating(false);
      setTimeout(() => onProgress(0), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Album Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Album Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={albumType} onValueChange={(value: any) => setAlbumType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select album type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timeline">Timeline Album</SelectItem>
                <SelectItem value="plant">Individual Plant</SelectItem>
                <SelectItem value="collection">Full Collection</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Format</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={albumFormat} onValueChange={(value: any) => setAlbumFormat(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Album</SelectItem>
                <SelectItem value="zip">ZIP Archive</SelectItem>
                <SelectItem value="web">Web Gallery</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Album Options */}
      <Card>
        <CardHeader>
          <CardTitle>Album Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="metadata"
                checked={includeMetadata}
                onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
              />
              <label htmlFor="metadata" className="text-sm font-medium cursor-pointer">
                Include photo metadata (date, plant names, descriptions)
              </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Image className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-sm font-medium">High Quality</div>
                <div className="text-xs text-gray-600">Original resolution</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Grid className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-sm font-medium">Grid Layout</div>
                <div className="text-xs text-gray-600">Organized display</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-sm font-medium">Chronological</div>
                <div className="text-xs text-gray-600">Date sorted</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Camera className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <div className="text-sm font-medium">Care Moments</div>
                <div className="text-xs text-gray-600">Progress photos</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Photo Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{mockPhotos.length}</div>
                <div className="text-sm text-gray-600">Total Photos</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">Plants Featured</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Months Covered</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {albumFormat.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600">Format</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockPhotos.map((photo) => (
                <div key={photo.id} className="border rounded-lg p-3">
                  <div className="aspect-square bg-gray-200 rounded mb-3 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">{photo.plant_name}</div>
                    <div className="text-xs text-gray-600">{photo.description}</div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {photo.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(photo.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={generateAlbum}
              disabled={generating}
              className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {generating ? 'Creating Album...' : 'Create Photo Album'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoAlbumExporter;
