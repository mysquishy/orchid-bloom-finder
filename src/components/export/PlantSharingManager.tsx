
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Share2, Copy, Eye, Lock, Globe, Link } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PlantSharingManagerProps {
  onProgress: (progress: number) => void;
}

const PlantSharingManager: React.FC<PlantSharingManagerProps> = ({ onProgress }) => {
  const { user } = useAuth();
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [shareSettings, setShareSettings] = useState({
    careInstructions: true,
    photos: true,
    healthData: false,
    personalNotes: false
  });
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'link' | 'private'>('link');
  const [shareTitle, setShareTitle] = useState('');
  const [shareDescription, setShareDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Mock plant data
  const mockPlants = [
    {
      id: 'plant-1',
      name: 'Purple Phalaenopsis',
      scientific: 'Phalaenopsis amabilis',
      difficulty: 'beginner'
    },
    {
      id: 'plant-2',
      name: 'White Dendrobium',
      scientific: 'Dendrobium nobile',
      difficulty: 'intermediate'
    }
  ];

  const handleSettingToggle = (setting: keyof typeof shareSettings) => {
    setShareSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const generateShareLink = async () => {
    try {
      setGenerating(true);
      onProgress(0);

      // Simulate share link generation
      const steps = [
        'Processing plant data...',
        'Creating share page...',
        'Generating secure link...',
        'Finalizing settings...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        onProgress(((i + 1) / steps.length) * 100);
      }

      // Generate mock share URL
      const shareId = Math.random().toString(36).substring(7);
      const mockUrl = `${window.location.origin}/share/plant/${shareId}`;
      setShareUrl(mockUrl);

      onProgress(100);
    } catch (error) {
      console.error('Share link generation error:', error);
    } finally {
      setGenerating(false);
      setTimeout(() => onProgress(0), 2000);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const selectedPlantData = mockPlants.find(plant => plant.id === selectedPlant);

  return (
    <div className="space-y-6">
      {/* Plant Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Plant to Share</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPlant} onValueChange={setSelectedPlant}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a plant to share" />
            </SelectTrigger>
            <SelectContent>
              {mockPlants.map((plant) => (
                <SelectItem key={plant.id} value={plant.id}>
                  {plant.name} ({plant.scientific})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedPlantData && (
        <>
          {/* Share Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Share Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(shareSettings).map(([setting, enabled]) => (
                  <div key={setting} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={setting}
                        checked={enabled}
                        onCheckedChange={() => handleSettingToggle(setting as keyof typeof shareSettings)}
                      />
                      <label htmlFor={setting} className="text-sm font-medium capitalize cursor-pointer">
                        {setting.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                    </div>
                    <Badge variant={enabled ? "default" : "outline"}>
                      {enabled ? 'Included' : 'Hidden'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(['public', 'link', 'private'] as const).map((level) => (
                  <div
                    key={level}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      privacyLevel === level 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPrivacyLevel(level)}
                  >
                    <div className="flex items-center gap-3">
                      {level === 'public' && <Globe className="w-5 h-5 text-green-600" />}
                      {level === 'link' && <Link className="w-5 h-5 text-blue-600" />}
                      {level === 'private' && <Lock className="w-5 h-5 text-gray-600" />}
                      <div>
                        <div className="font-medium capitalize">{level}</div>
                        <div className="text-sm text-gray-600">
                          {level === 'public' && 'Anyone can find and view'}
                          {level === 'link' && 'Only people with the link can view'}
                          {level === 'private' && 'Only you can view'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Share Details */}
          <Card>
            <CardHeader>
              <CardTitle>Share Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Share Title</label>
                <Input
                  value={shareTitle}
                  onChange={(e) => setShareTitle(e.target.value)}
                  placeholder={`My ${selectedPlantData.name} Care Guide`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  value={shareDescription}
                  onChange={(e) => setShareDescription(e.target.value)}
                  placeholder="Share your experience and care tips..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Share */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Share Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {Object.values(shareSettings).filter(Boolean).length}
                  </div>
                  <div className="text-sm text-gray-600">Data Types</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600 capitalize">
                    {privacyLevel}
                  </div>
                  <div className="text-sm text-gray-600">Privacy</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {selectedPlantData.difficulty}
                  </div>
                  <div className="text-sm text-gray-600">Difficulty</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">
                    <Eye className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-sm text-gray-600">Preview Ready</div>
                </div>
              </div>

              <Button 
                onClick={generateShareLink}
                disabled={generating || !selectedPlant}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {generating ? 'Generating...' : 'Generate Share Link'}
              </Button>

              {shareUrl && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">Share URL</div>
                      <div className="text-sm text-gray-600 break-all">{shareUrl}</div>
                    </div>
                    <Button size="sm" variant="outline" onClick={copyShareLink}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default PlantSharingManager;
