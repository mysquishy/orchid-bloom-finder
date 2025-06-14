
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Download, Database, FileSpreadsheet, Code, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { saveAs } from 'file-saver';

interface DataExporterProps {
  onProgress: (progress: number) => void;
}

const DataExporter: React.FC<DataExporterProps> = ({ onProgress }) => {
  const { user } = useAuth();
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'excel'>('csv');
  const [dataTypes, setDataTypes] = useState({
    plants: true,
    careHistory: true,
    photos: false,
    identifications: true,
    analytics: false
  });
  const [exporting, setExporting] = useState(false);

  const { data: exportData } = useQuery({
    queryKey: ['export-data', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const [plants, identifications] = await Promise.all([
        supabase
          .from('user_orchid_collection')
          .select(`
            *,
            orchid_species:orchid_species_id (*)
          `)
          .eq('user_id', user.id),
        supabase
          .from('identifications')
          .select('*')
          .eq('user_id', user.id)
      ]);

      return {
        plants: plants.data || [],
        identifications: identifications.data || []
      };
    },
    enabled: !!user,
  });

  const handleDataTypeToggle = (type: keyof typeof dataTypes) => {
    setDataTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value || '').replace(/"/g, '""')}"`;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
  };

  const exportToJSON = (data: any, filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    saveAs(blob, `${filename}.json`);
  };

  const processPlantData = (plants: any[]) => {
    return plants.map(plant => ({
      id: plant.id,
      common_name: plant.orchid_species?.common_name,
      scientific_name: plant.orchid_species?.scientific_name,
      date_added: plant.date_added,
      care_notes: plant.care_notes,
      current_bloom_status: plant.current_bloom_status,
      last_watered: plant.last_watered,
      last_fertilized: plant.last_fertilized,
      last_repotted: plant.last_repotted,
      care_difficulty: plant.orchid_species?.care_difficulty,
      light_requirements: plant.orchid_species?.light_requirements,
      water_frequency: plant.orchid_species?.water_frequency,
      native_region: plant.orchid_species?.native_region
    }));
  };

  const handleExport = async () => {
    if (!exportData) return;

    try {
      setExporting(true);
      onProgress(0);

      const exportPayload: any = {
        metadata: {
          exported_at: new Date().toISOString(),
          user_id: user?.id,
          export_format: exportFormat,
          included_data: Object.entries(dataTypes)
            .filter(([_, included]) => included)
            .map(([type, _]) => type)
        }
      };

      // Process selected data types
      let progress = 0;
      const totalSteps = Object.values(dataTypes).filter(Boolean).length;

      if (dataTypes.plants) {
        const processedPlants = processPlantData(exportData.plants);
        exportPayload.plants = processedPlants;
        progress++;
        onProgress((progress / totalSteps) * 90);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      if (dataTypes.identifications) {
        exportPayload.identifications = exportData.identifications.map(id => ({
          id: id.id,
          orchid_species: id.orchid_species,
          confidence_score: id.confidence_score,
          created_at: id.created_at,
          is_saved: id.is_saved,
          notes: id.notes
        }));
        progress++;
        onProgress((progress / totalSteps) * 90);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      if (dataTypes.careHistory) {
        // Mock care history data
        exportPayload.care_history = exportData.plants.map(plant => ({
          plant_id: plant.id,
          watering_events: plant.last_watered ? [{
            date: plant.last_watered,
            type: 'watering',
            notes: 'Regular watering'
          }] : [],
          fertilizing_events: plant.last_fertilized ? [{
            date: plant.last_fertilized,
            type: 'fertilizing',
            notes: 'Regular fertilizing'
          }] : [],
          repotting_events: plant.last_repotted ? [{
            date: plant.last_repotted,
            type: 'repotting',
            notes: 'Scheduled repotting'
          }] : []
        }));
        progress++;
        onProgress((progress / totalSteps) * 90);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Export based on format
      const timestamp = new Date().toISOString().split('T')[0];
      const baseFilename = `orchid-data-export-${timestamp}`;

      if (exportFormat === 'json') {
        exportToJSON(exportPayload, baseFilename);
      } else if (exportFormat === 'csv') {
        // Export each data type as separate CSV files
        if (dataTypes.plants && exportPayload.plants) {
          exportToCSV(exportPayload.plants, `${baseFilename}-plants`);
        }
        if (dataTypes.identifications && exportPayload.identifications) {
          exportToCSV(exportPayload.identifications, `${baseFilename}-identifications`);
        }
        if (dataTypes.careHistory && exportPayload.care_history) {
          exportToCSV(exportPayload.care_history, `${baseFilename}-care-history`);
        }
      }

      onProgress(100);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
      setTimeout(() => onProgress(0), 2000);
    }
  };

  const formatIcons = {
    csv: <FileSpreadsheet className="w-5 h-5" />,
    json: <Code className="w-5 h-5" />,
    excel: <Database className="w-5 h-5" />
  };

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Export Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(['csv', 'json', 'excel'] as const).map((format) => (
                <div
                  key={format}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    exportFormat === format 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setExportFormat(format)}
                >
                  <div className="flex items-center gap-3">
                    {formatIcons[format]}
                    <div>
                      <div className="font-medium capitalize">{format.toUpperCase()}</div>
                      <div className="text-sm text-gray-600">
                        {format === 'csv' && 'Spreadsheet compatible format'}
                        {format === 'json' && 'Structured data for developers'}
                        {format === 'excel' && 'Microsoft Excel format'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(dataTypes).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={enabled}
                      onCheckedChange={() => handleDataTypeToggle(type as keyof typeof dataTypes)}
                    />
                    <label htmlFor={type} className="text-sm font-medium capitalize cursor-pointer">
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                  <Badge variant={enabled ? "default" : "outline"} className="text-xs">
                    {type === 'plants' && `${exportData?.plants?.length || 0} plants`}
                    {type === 'identifications' && `${exportData?.identifications?.length || 0} IDs`}
                    {type === 'careHistory' && 'All records'}
                    {type === 'photos' && 'Coming soon'}
                    {type === 'analytics' && 'Coming soon'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Export Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {exportData?.plants?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Plants</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {exportData?.identifications?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Identifications</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Object.values(dataTypes).filter(Boolean).length}
                </div>
                <div className="text-sm text-gray-600">Data Types</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {exportFormat.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600">Format</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleExport}
                disabled={exporting || !Object.values(dataTypes).some(Boolean)}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {exporting ? 'Exporting...' : 'Export Data'}
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExporter;
