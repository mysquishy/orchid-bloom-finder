
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, FileImage, BookOpen, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Identification {
  id: string;
  orchid_species: string;
  confidence_score: number;
  created_at: string;
  is_saved: boolean;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [identifications, setIdentifications] = useState<Identification[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    saved: 0,
    thisWeek: 0
  });

  useEffect(() => {
    if (user) {
      fetchIdentifications();
    }
  }, [user]);

  const fetchIdentifications = async () => {
    try {
      const { data, error } = await supabase
        .from('identifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      setIdentifications(data || []);
      
      // Calculate stats
      const total = data?.length || 0;
      const saved = data?.filter(id => id.is_saved).length || 0;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const thisWeek = data?.filter(id => new Date(id.created_at) > weekAgo).length || 0;
      
      setStats({ total, saved, thisWeek });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load your identifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const userName = user?.user_metadata?.first_name || 'Orchid Enthusiast';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">
            Welcome back, <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">{userName}</span>!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ready to discover more beautiful orchids today?
          </p>
          
          <Button
            onClick={() => window.location.href = '/#identify'}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white px-8 py-3"
          >
            <Camera className="mr-2 h-5 w-5" />
            Identify New Orchid
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Identifications</CardTitle>
              <FileImage className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saved Plants</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.saved}</div>
              <p className="text-xs text-gray-500">In your collection</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.thisWeek}</div>
              <p className="text-xs text-gray-500">Recent discoveries</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Identifications */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-xl font-playfair text-gray-900">Recent Identifications</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your identifications...</p>
              </div>
            ) : identifications.length > 0 ? (
              <div className="space-y-4">
                {identifications.map((identification) => (
                  <div key={identification.id} className="flex items-center justify-between p-4 border border-green-100 rounded-lg bg-white">
                    <div>
                      <h3 className="font-semibold text-gray-900">{identification.orchid_species}</h3>
                      <p className="text-sm text-gray-600">
                        Confidence: {(identification.confidence_score * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(identification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {identification.is_saved && (
                      <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Saved
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No identifications yet</h3>
                <p className="text-gray-600 mb-6">
                  Start identifying orchids to see your discoveries here!
                </p>
                <Button
                  onClick={() => window.location.href = '/#identify'}
                  className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Identify Your First Orchid
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
