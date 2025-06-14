
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Database, 
  Upload, 
  Download, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Users,
  Flower
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminStats {
  totalSpecies: number;
  totalUsers: number;
  totalCollections: number;
  pendingContributions: number;
}

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<'import' | 'export' | 'validate' | null>(null);

  // Fetch admin statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [speciesResult, collectionsResult] = await Promise.all([
        supabase.from('orchid_species').select('id', { count: 'exact' }),
        supabase.from('user_orchid_collection').select('id', { count: 'exact' })
      ]);

      return {
        totalSpecies: speciesResult.count || 0,
        totalUsers: 0, // Would need to count from auth.users but that's not accessible
        totalCollections: collectionsResult.count || 0,
        pendingContributions: 0 // Would be user_contributed = true entries
      } as AdminStats;
    }
  });

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
      return data;
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
      const { data, error } = await supabase
        .from('orchid_species')
        .select('*');

      if (error) throw error;

      const issues = [];
      data.forEach((orchid, index) => {
        if (!orchid.common_name || orchid.common_name.length < 2) {
          issues.push(`Row ${index + 1}: Missing or invalid common name`);
        }
        if (!orchid.scientific_name || !orchid.scientific_name.includes(' ')) {
          issues.push(`Row ${index + 1}: Invalid scientific name format`);
        }
        if (!orchid.flower_colors || orchid.flower_colors.length === 0) {
          issues.push(`Row ${index + 1}: Missing flower colors`);
        }
        if (!['beginner', 'intermediate', 'expert'].includes(orchid.care_difficulty)) {
          issues.push(`Row ${index + 1}: Invalid care difficulty`);
        }
      });

      toast({
        title: "Validation Complete",
        description: `Found ${issues.length} issues in ${data.length} records.`,
        variant: issues.length > 0 ? "destructive" : "default",
      });

      if (issues.length > 0) {
        console.log('Validation Issues:', issues);
      }
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "Failed to validate database.",
        variant: "destructive",
      });
    }
  };

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Species</p>
                  <p className="text-2xl font-bold text-blue-900">{stats?.totalSpecies || 0}</p>
                </div>
                <Flower className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">User Collections</p>
                  <p className="text-2xl font-bold text-green-900">{stats?.totalCollections || 0}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Database Health</p>
                  <p className="text-2xl font-bold text-purple-900">Good</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-orange-900">{stats?.pendingContributions || 0}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Operations */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-green-200">
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
                onClick={() => setSelectedOperation('import')}
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
                <CheckCircle className="w-5 h-5" />
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
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
              </div>
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
      </div>
    </div>
  );
};

export default AdminPanel;
