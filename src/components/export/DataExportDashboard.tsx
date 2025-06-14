
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  FileText, 
  Database, 
  QrCode, 
  Calendar,
  Share2,
  Camera,
  Settings,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PremiumBadge from '@/components/PremiumBadge';
import PlantReportGenerator from './PlantReportGenerator';
import DataExporter from './DataExporter';
import PlantPassportGenerator from './PlantPassportGenerator';
import BackupManager from './BackupManager';
import PhotoAlbumExporter from './PhotoAlbumExporter';
import PlantSharingManager from './PlantSharingManager';
import CalendarIntegration from './CalendarIntegration';

const DataExportDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeExport, setActiveExport] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const exportOptions = [
    {
      id: 'reports',
      title: 'Plant Care Reports',
      description: 'Generate comprehensive PDF reports with care history and analytics',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'data',
      title: 'Data Export',
      description: 'Export your plant collection in CSV, JSON, or Excel format',
      icon: <Database className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'passports',
      title: 'Plant Passports',
      description: 'Create QR code plant passports with care instructions',
      icon: <QrCode className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'backup',
      title: 'Backup & Restore',
      description: 'Backup your entire plant collection and care data',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'photos',
      title: 'Photo Albums',
      description: 'Create and download photo albums of your plants',
      icon: <Camera className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'sharing',
      title: 'Plant Sharing',
      description: 'Share plants with detailed care instructions',
      icon: <Share2 className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'calendar',
      title: 'Calendar Export',
      description: 'Export care schedules to your calendar apps',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'settings',
      title: 'Export Settings',
      description: 'Configure automated backups and export preferences',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Data Export & Management</h1>
          <PremiumBadge size="lg" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
            <Download className="w-4 h-4 mr-2" />
            Quick Export
          </Button>
        </div>
      </div>

      {/* Export Progress */}
      {activeExport && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Exporting {exportOptions.find(opt => opt.id === activeExport)?.title}...
              </span>
              <span className="text-sm text-blue-700">{exportProgress}%</span>
            </div>
            <Progress value={exportProgress} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {exportOptions.map((option) => (
          <Card 
            key={option.id} 
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-purple-200"
            onClick={() => setActiveExport(option.id)}
          >
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {option.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Export Tabs */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="passports">Passports</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="sharing">Sharing</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <PlantReportGenerator onProgress={setExportProgress} />
        </TabsContent>

        <TabsContent value="data">
          <DataExporter onProgress={setExportProgress} />
        </TabsContent>

        <TabsContent value="passports">
          <PlantPassportGenerator onProgress={setExportProgress} />
        </TabsContent>

        <TabsContent value="backup">
          <BackupManager onProgress={setExportProgress} />
        </TabsContent>

        <TabsContent value="photos">
          <PhotoAlbumExporter onProgress={setExportProgress} />
        </TabsContent>

        <TabsContent value="sharing">
          <PlantSharingManager onProgress={setExportProgress} />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarIntegration onProgress={setExportProgress} />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Automated Weekly Backup</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Photo Quality Settings</span>
                  <Button variant="outline" size="sm">Adjust</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Export Format Preferences</span>
                  <Button variant="outline" size="sm">Set Default</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataExportDashboard;
