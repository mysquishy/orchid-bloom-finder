
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Database, 
  Upload, 
  Download, 
  Search, 
  Settings,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminMetrics from './AdminMetrics';
import LoadingSpinner from './LoadingSpinner';

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch orchid species for management
  const { data: orchids = [], isLoading: orchidsLoading, refetch } = useQuery({
    queryKey: ['admin-orchids', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('orchid_species')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`common_name.ilike.%${searchTerm}%,scientific_name.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data || [];
    }
  });

  const handleDataExport = async () => {
    try {
      const { data, error } = await supabase
        .from('orchid_species')
        .select('*');

      if (error) throw error;

      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `orchid-database-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Database exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export database.",
        variant: "destructive",
      });
    }
  };

  const handleDataValidation = async () => {
    try {
      const { data, error } = await supabase.rpc('validate_orchid_data');

      if (error) throw error;

      const validationData = Array.isArray(data) ? data : [];
      const totalIssues = validationData.reduce((sum: number, issue: any) => {
        return sum + Number(issue.affected_count || 0);
      }, 0);

      toast({
        title: "Validation Complete",
        description: `Found ${totalIssues} issues in the database.`,
        variant: totalIssues > 0 ? "destructive" : "default",
      });

      if (totalIssues > 0) {
        console.log('Validation Issues:', validationData);
      }
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "Failed to validate database.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">
            Admin <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">Panel</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Manage orchid database and monitor system health
          </p>
        </div>

        <Tabs defaultValue="metrics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Database
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics">
            <AdminMetrics />
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            {/* Database Operations */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Operations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={handleDataExport}
                    className="flex items-center gap-2 h-16"
                    variant="outline"
                  >
                    <Download className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Export Data</div>
                      <div className="text-sm text-gray-500">Download complete database</div>
                    </div>
                  </Button>

                  <Button
                    className="flex items-center gap-2 h-16"
                    variant="outline"
                    disabled
                  >
                    <Upload className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Import Data</div>
                      <div className="text-sm text-gray-500">Bulk import species (Coming Soon)</div>
                    </div>
                  </Button>

                  <Button
                    onClick={handleDataValidation}
                    className="flex items-center gap-2 h-16"
                    variant="outline"
                  >
                    <Search className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Validate Data</div>
                      <div className="text-sm text-gray-500">Check data integrity</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Species Management */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Species Management
                </CardTitle>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search species..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {orchidsLoading ? (
                  <LoadingSpinner text="Loading species..." />
                ) : (
                  <div className="space-y-4">
                    {orchids.map((orchid) => (
                      <div key={orchid.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{orchid.common_name}</h4>
                          <p className="text-sm text-gray-600 italic">{orchid.scientific_name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={orchid.is_popular ? "default" : "outline"}>
                              {orchid.is_popular ? "Popular" : "Standard"}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {orchid.care_difficulty}
                            </Badge>
                            {orchid.user_contributed && (
                              <Badge variant="outline" className="bg-orange-50 text-orange-600">
                                User Contributed
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">System settings and configuration options will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
