
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download, Printer, Share2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface PlantPassportGeneratorProps {
  onProgress: (progress: number) => void;
}

const PlantPassportGenerator: React.FC<PlantPassportGeneratorProps> = ({ onProgress }) => {
  const { user } = useAuth();
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [passportStyle, setPassportStyle] = useState<'minimal' | 'detailed' | 'scientific'>('detailed');
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const passportRef = useRef<HTMLDivElement>(null);

  const { data: plants = [] } = useQuery({
    queryKey: ['user-plants-passports', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_orchid_collection')
        .select(`
          *,
          orchid_species:orchid_species_id (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const selectedPlantData = plants.find(plant => plant.id === selectedPlant);

  const generateQRCode = async (plantData: any) => {
    const passportData = {
      plant_id: plantData.id,
      species: {
        common_name: plantData.orchid_species?.common_name,
        scientific_name: plantData.orchid_species?.scientific_name,
        care_difficulty: plantData.orchid_species?.care_difficulty
      },
      care_info: {
        light: plantData.orchid_species?.light_requirements,
        water: plantData.orchid_species?.water_frequency,
        humidity: plantData.orchid_species?.humidity_needs,
        temperature: plantData.orchid_species?.temperature_range
      },
      url: `${window.location.origin}/plant-passport/${plantData.id}`
    };

    try {
      const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(passportData), {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeData(qrCodeUrl);
      return qrCodeUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  };

  const generatePassport = async () => {
    if (!selectedPlantData) return;

    try {
      setGenerating(true);
      onProgress(0);

      // Generate QR code
      onProgress(25);
      await generateQRCode(selectedPlantData);

      // Wait for render
      onProgress(50);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Capture passport as image
      if (passportRef.current) {
        onProgress(75);
        const canvas = await html2canvas(passportRef.current, {
          backgroundColor: '#ffffff',
          scale: 2
        });
        
        canvas.toBlob((blob) => {
          if (blob) {
            const filename = `plant-passport-${selectedPlantData.orchid_species?.common_name?.replace(/\s+/g, '-') || 'unknown'}.png`;
            saveAs(blob, filename);
          }
        });
      }

      onProgress(100);
    } catch (error) {
      console.error('Error generating passport:', error);
    } finally {
      setGenerating(false);
      setTimeout(() => onProgress(0), 2000);
    }
  };

  const PassportPreview = () => {
    if (!selectedPlantData || !qrCodeData) return null;

    const species = selectedPlantData.orchid_species;

    return (
      <div ref={passportRef} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plant Passport</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-purple-600 mx-auto"></div>
        </div>

        {/* Plant Info */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {species?.common_name || 'Unknown Species'}
            </h3>
            <p className="text-sm italic text-gray-600">
              {species?.scientific_name || 'Unknown'}
            </p>
          </div>

          {passportStyle === 'detailed' && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium">Light:</span>
                <p className="text-gray-600">{species?.light_requirements}</p>
              </div>
              <div>
                <span className="font-medium">Water:</span>
                <p className="text-gray-600">{species?.water_frequency}</p>
              </div>
              <div>
                <span className="font-medium">Humidity:</span>
                <p className="text-gray-600">{species?.humidity_needs}</p>
              </div>
              <div>
                <span className="font-medium">Temperature:</span>
                <p className="text-gray-600">{species?.temperature_range}</p>
              </div>
            </div>
          )}

          {passportStyle === 'scientific' && (
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Family:</span> {species?.family || 'Orchidaceae'}</div>
              <div><span className="font-medium">Subfamily:</span> {species?.subfamily || 'Unknown'}</div>
              <div><span className="font-medium">Native Region:</span> {species?.native_region}</div>
              <div><span className="font-medium">Care Difficulty:</span> 
                <Badge variant="outline" className="ml-2">
                  {species?.care_difficulty}
                </Badge>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500">
            <div>Added: {new Date(selectedPlantData.date_added).toLocaleDateString()}</div>
            {selectedPlantData.care_notes && (
              <div className="mt-1">Notes: {selectedPlantData.care_notes}</div>
            )}
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <img src={qrCodeData} alt="Plant QR Code" className="mx-auto mb-2" />
          <p className="text-xs text-gray-500">Scan for digital care guide</p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            Generated by OrchidAI • {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Plant</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPlant} onValueChange={setSelectedPlant}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a plant" />
              </SelectTrigger>
              <SelectContent>
                {plants.map((plant) => (
                  <SelectItem key={plant.id} value={plant.id}>
                    {plant.orchid_species?.common_name || 'Unknown Species'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passport Style</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={passportStyle} onValueChange={(value: any) => setPassportStyle(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="scientific">Scientific</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={generatePassport}
              disabled={!selectedPlant || generating}
              className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
            >
              <QrCode className="w-4 h-4 mr-2" />
              {generating ? 'Generating...' : 'Generate Passport'}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      {selectedPlantData && (
        <Card>
          <CardHeader>
            <CardTitle>Passport Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <PassportPreview />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlantPassportGenerator;
