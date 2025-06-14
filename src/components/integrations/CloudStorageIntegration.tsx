
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Cloud, 
  Camera, 
  Upload, 
  Download, 
  Folder, 
  Settings,
  Check,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface CloudStorageIntegrationProps {
  integrations: Integration[];
  onToggle: (id: string) => void;
}

interface BackupJob {
  id: string;
  type: 'photos' | 'data' | 'full';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  endTime?: Date;
  fileCount: number;
  totalSize: string;
}

export const CloudStorageIntegration: React.FC<CloudStorageIntegrationProps> = ({
  integrations,
  onToggle
}) => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupQuality, setBackupQuality] = useState('original');
  const [syncProgress, setSyncProgress] = useState(0);
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([
    {
      id: '1',
      type: 'photos',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() - 3000000),
      fileCount: 24,
      totalSize: '156 MB'
    },
    {
      id: '2',
      type: 'data',
      status: 'running',
      progress: 65,
      startTime: new Date(Date.now() - 1800000),
      fileCount: 8,
      totalSize: '2.3 MB'
    }
  ]);

  const { toast } = useToast();

  const googlePhotos = integrations.find(i => i.id === 'google-photos');
  const icloud = integrations.find(i => i.id === 'icloud');

  const connectGooglePhotos = async () => {
    // Simulate OAuth flow
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onToggle('google-photos');
          toast({
            title: "Google Photos Connected",
            description: "Auto-backup enabled for plant photos",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const connectICloud = async () => {
    // Note: iCloud integration would require iOS app
    toast({
      title: "iCloud Integration",
      description: "iCloud integration requires the iOS app. Download from App Store.",
    });
  };

  const startBackup = async (type: 'photos' | 'data' | 'full') => {
    const newJob: BackupJob = {
      id: Date.now().toString(),
      type,
      status: 'pending',
      progress: 0,
      startTime: new Date(),
      fileCount: type === 'photos' ? 15 : type === 'data' ? 5 : 20,
      totalSize: type === 'photos' ? '89 MB' : type === 'data' ? '1.2 MB' : '90.2 MB'
    };

    setBackupJobs(prev => [newJob, ...prev]);

    // Simulate backup progress
    setTimeout(() => {
      setBackupJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'running' } : job
      ));

      const progressInterval = setInterval(() => {
        setBackupJobs(prev => prev.map(job => {
          if (job.id === newJob.id && job.status === 'running') {
            const newProgress = Math.min(job.progress + Math.random() * 20, 100);
            if (newProgress >= 100) {
              clearInterval(progressInterval);
              return {
                ...job,
                status: 'completed',
                progress: 100,
                endTime: new Date()
              };
            }
            return { ...job, progress: newProgress };
          }
          return job;
        }));
      }, 500);
    }, 1000);

    toast({
      title: "Backup Started",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} backup initiated`,
    });
  };

  const getStorageUsage = () => {
    return {
      used: 245,
      total: 15000, // 15GB
      photos: 156,
      data: 89
    };
  };

  const storage = getStorageUsage();
  const usagePercentage = (storage.used / storage.total) * 100;

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Cloud Storage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="font-medium">{storage.used} MB / {(storage.total / 1000).toFixed(1)} GB</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Camera className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                <div className="text-sm font-medium">{storage.photos} MB</div>
                <div className="text-xs text-gray-600">Photos</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Folder className="w-6 h-6 mx-auto text-green-600 mb-1" />
                <div className="text-sm font-medium">{storage.data} MB</div>
                <div className="text-xs text-gray-600">Data</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Google Photos Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${googlePhotos?.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
              <div>
                <p className="font-medium">Google Photos Backup</p>
                <p className="text-sm text-gray-600">
                  {googlePhotos?.isActive ? 'Auto-backup enabled' : 'Not connected'}
                </p>
              </div>
            </div>
            <Badge variant={googlePhotos?.isActive ? "default" : "outline"}>
              {googlePhotos?.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {googlePhotos?.isActive ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto-backup photos</span>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Backup Quality</label>
                <Select value={backupQuality} onValueChange={setBackupQuality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Original Quality</SelectItem>
                    <SelectItem value="high">High Quality (Compressed)</SelectItem>
                    <SelectItem value="medium">Medium Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startBackup('photos')}
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Photos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startBackup('data')}
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startBackup('full')}
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Full
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {syncProgress > 0 && syncProgress < 100 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Connecting...</span>
                    <span>{syncProgress}%</span>
                  </div>
                  <Progress value={syncProgress} />
                </div>
              )}
              <Button onClick={connectGooglePhotos} className="w-full" disabled={syncProgress > 0 && syncProgress < 100}>
                Connect Google Photos
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* iCloud Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            iCloud Photos Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${icloud?.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
              <div>
                <p className="font-medium">iCloud Photos Sync</p>
                <p className="text-sm text-gray-600">
                  {icloud?.isActive ? 'Syncing with iCloud' : 'iOS app required'}
                </p>
              </div>
            </div>
            <Badge variant={icloud?.isActive ? "default" : "outline"}>
              {icloud?.isActive ? 'Active' : 'iOS Only'}
            </Badge>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">iOS App Required</h4>
                <p className="text-sm text-orange-700">
                  iCloud integration is available through our iOS app. Download from the App Store to enable automatic photo sync.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={connectICloud} variant="outline" className="w-full">
            Learn More About iOS App
          </Button>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Recent Backups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      job.status === 'completed' ? 'bg-green-500' :
                      job.status === 'running' ? 'bg-blue-500' :
                      job.status === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                    <span className="font-medium capitalize">{job.type} Backup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.status === 'completed' && <Check className="w-4 h-4 text-green-600" />}
                    <Badge variant={
                      job.status === 'completed' ? 'default' :
                      job.status === 'running' ? 'secondary' :
                      job.status === 'failed' ? 'destructive' : 'outline'
                    }>
                      {job.status}
                    </Badge>
                  </div>
                </div>

                {job.status === 'running' && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round(job.progress)}%</span>
                    </div>
                    <Progress value={job.progress} />
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{job.fileCount} files • {job.totalSize}</span>
                  <span>
                    {job.endTime ? 
                      `Completed ${job.endTime.toLocaleTimeString()}` :
                      `Started ${job.startTime.toLocaleTimeString()}`
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
