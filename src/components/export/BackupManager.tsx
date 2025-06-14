
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Download, 
  Upload, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Database
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { saveAs } from 'file-saver';

interface BackupManagerProps {
  onProgress: (progress: number) => void;
}

const BackupManager: React.FC<BackupManagerProps> = ({ onProgress }) => {
  const { user } = useAuth();
  const [autoBackup, setAutoBackup] = useState(false);
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const { data: backupData } = useQuery({
    queryKey: ['backup-data', user?.id],
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
        identifications: identifications.data || [],
        user_profile: user
      };
    },
    enabled: !!user,
  });

  const createBackup = async () => {
    if (!backupData) return;

    try {
      setCreating(true);
      onProgress(0);

      // Simulate backup creation steps
      const steps = [
        'Collecting plant data...',
        'Archiving care history...',
        'Processing identifications...',
        'Compressing backup...',
        'Finalizing backup...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        onProgress(((i + 1) / steps.length) * 100);
      }

      // Create comprehensive backup
      const backup = {
        metadata: {
          version: '1.0',
          created_at: new Date().toISOString(),
          user_id: user?.id,
          app_version: '1.0.0',
          backup_type: 'full'
        },
        data: {
          plants: backupData.plants.map(plant => ({
            ...plant,
            orchid_species: plant.orchid_species
          })),
          identifications: backupData.identifications,
          user_preferences: {
            // Mock user preferences
            notifications_enabled: true,
            theme: 'light',
            measurement_unit: 'metric'
          }
        },
        checksum: 'mock_checksum_' + Date.now()
      };

      // Save backup file
      const backupJson = JSON.stringify(backup, null, 2);
      const blob = new Blob([backupJson], { type: 'application/json' });
      const timestamp = new Date().toISOString().split('T')[0];
      saveAs(blob, `orchid-ai-backup-${timestamp}.json`);

      onProgress(100);
    } catch (error) {
      console.error('Backup creation error:', error);
    } finally {
      setCreating(false);
      setTimeout(() => onProgress(0), 2000);
    }
  };

  const handleFileRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setRestoring(true);
        onProgress(0);

        const backupData = JSON.parse(e.target?.result as string);
        
        // Validate backup format
        if (!backupData.metadata || !backupData.data) {
          throw new Error('Invalid backup format');
        }

        // Simulate restore process
        onProgress(25);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Note: In a real implementation, this would restore data to the database
        // For demo purposes, we'll just simulate the process
        onProgress(50);
        await new Promise(resolve => setTimeout(resolve, 1000));

        onProgress(75);
        await new Promise(resolve => setTimeout(resolve, 1000));

        onProgress(100);
        console.log('Backup restored successfully:', backupData.metadata);
      } catch (error) {
        console.error('Restore error:', error);
      } finally {
        setRestoring(false);
        setTimeout(() => onProgress(0), 2000);
      }
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const mockBackupHistory = [
    {
      id: '1',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'automatic',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: '2',
      date: new Date(Date.now() - 7 * 86400000).toISOString(),
      type: 'manual',
      size: '2.3 MB',
      status: 'completed'
    },
    {
      id: '3',
      date: new Date(Date.now() - 14 * 86400000).toISOString(),
      type: 'automatic',
      size: '2.1 MB',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Backup Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Plants Backed Up</p>
                <p className="text-2xl font-bold text-green-900">
                  {backupData?.plants?.length || 0}
                </p>
              </div>
              <Database className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Identifications</p>
                <p className="text-2xl font-bold text-blue-900">
                  {backupData?.identifications?.length || 0}
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Last Backup</p>
                <p className="text-sm font-bold text-purple-900">
                  {mockBackupHistory[0]?.date ? 
                    new Date(mockBackupHistory[0].date).toLocaleDateString() : 
                    'Never'
                  }
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Backup Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Create Backup</h3>
              <p className="text-sm text-gray-600">
                Create a complete backup of your plant collection, care history, and preferences.
              </p>
              <Button 
                onClick={createBackup}
                disabled={creating}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {creating ? 'Creating Backup...' : 'Create Backup'}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Restore Backup</h3>
              <p className="text-sm text-gray-600">
                Restore your data from a previously created backup file.
              </p>
              <label htmlFor="backup-file">
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={restoring}
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    {restoring ? 'Restoring...' : 'Choose Backup File'}
                  </span>
                </Button>
              </label>
              <input
                id="backup-file"
                type="file"
                accept=".json"
                onChange={handleFileRestore}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automatic Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Automatic Backup Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Enable Automatic Backups</h3>
                <p className="text-sm text-gray-600">
                  Automatically create weekly backups of your data
                </p>
              </div>
              <Switch
                checked={autoBackup}
                onCheckedChange={setAutoBackup}
              />
            </div>

            {autoBackup && (
              <div className="pl-4 border-l-2 border-green-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Frequency</span>
                  <Badge>Weekly</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Retention Period</span>
                  <Badge>30 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Backup</span>
                  <Badge variant="outline">
                    {new Date(Date.now() + 7 * 86400000).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBackupHistory.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {backup.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  )}
                  <div>
                    <div className="font-medium">
                      {backup.type === 'automatic' ? 'Automatic Backup' : 'Manual Backup'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(backup.date).toLocaleDateString()} • {backup.size}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={backup.status === 'completed' ? 'default' : 'destructive'}>
                    {backup.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManager;
