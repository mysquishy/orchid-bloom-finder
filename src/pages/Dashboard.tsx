
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, FileImage, BookOpen, TrendingUp, Database, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import PremiumGate from '@/components/PremiumGate';
import PremiumBadge from '@/components/PremiumBadge';
import UpgradePrompt from '@/components/UpgradePrompt';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';

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
  const { isPremium, checkFeatureAccess } = usePremiumAccess();
  const [identifications, setIdentifications] = useState<Identification[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    saved: 0,
    thisWeek: 0,
    gardenCount: 0
  });

  useEffect(() => {
    let isMounted = true;
    
    if (user) {
      console.log('Dashboard: User authenticated, fetching data for:', user.id);
      fetchData(isMounted);
    } else {
      console.log('Dashboard: No user authenticated');
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const fetchData = async (isMounted: boolean) => {
    if (!user) {
      console.log('Dashboard: No user available for data fetch');
      return;
    }

    try {
      console.log('Dashboard: Starting comprehensive data fetch for user:', user.id);
      
      // First, let's check what's in the identifications table
      console.log('Dashboard: Checking all identifications in database...');
      const { data: allIdentifications, error: allIdentError } = await supabase
        .from('identifications')
        .select('*');
      
      if (allIdentError) {
        console.error('Dashboard: Error fetching all identifications:', allIdentError);
      } else {
        console.log('Dashboard: All identifications in database:', allIdentifications);
        console.log('Dashboard: Total identifications found:', allIdentifications?.length || 0);
      }

      // Now fetch only user's identifications
      console.log('Dashboard: Fetching user identifications...');
      const { data: identificationsData, error: identError } = await supabase
        .from('identifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (identError) {
        console.error('Dashboard: Error fetching user identifications:', identError);
        throw identError;
      }

      console.log('Dashboard: User identifications query result:', {
        data: identificationsData,
        count: identificationsData?.length || 0,
        userId: user.id
      });

      // Check garden collection
      console.log('Dashboard: Fetching garden collection...');
      const { data: collectionData, error: collectionError } = await supabase
        .from('user_orchid_collection')
        .select('*')
        .eq('user_id', user.id);

      if (collectionError) {
        console.error('Dashboard: Error fetching garden collection:', collectionError);
      } else {
        console.log('Dashboard: Garden collection data:', collectionData);
      }

      if (!isMounted) return;

      // Process identifications
      const processedIdentifications = identificationsData || [];
      console.log('Dashboard: Processing identifications:', processedIdentifications);
      
      setIdentifications(processedIdentifications);
      
      // Calculate stats
      const total = processedIdentifications.length;
      const saved = processedIdentifications.filter(id => id.is_saved).length;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const thisWeek = processedIdentifications.filter(id => new Date(id.created_at) > weekAgo).length;
      const gardenCount = collectionData?.length || 0;
      
      const calculatedStats = { total, saved, thisWeek, gardenCount };
      console.log('Dashboard: Calculated stats:', calculatedStats);
      
      setStats(calculatedStats);

      // Also check what's in the usage_tracking table
      console.log('Dashboard: Checking usage tracking...');
      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user.id);
      
      if (usageError) {
        console.error('Dashboard: Error fetching usage data:', usageError);
      } else {
        console.log('Dashboard: Usage tracking data:', usageData);
      }

    } catch (error: any) {
      console.error('Dashboard: Error in fetchData:', error);
      if (isMounted) {
        toast({
          title: "Error",
          description: "Failed to load your dashboard data. Please refresh the page.",
          variant: "destructive",
        });
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  // Add a manual refresh button for debugging
  const handleManualRefresh = async () => {
    console.log('Dashboard: Manual refresh triggered');
    setLoading(true);
    await fetchData(true);
  };

  const userName = user?.user_metadata?.first_name || 'Orchid Enthusiast';

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in</h2>
          <p className="text-gray-600">Sign in to view your dashboard and plant identifications.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SubscriptionBanner />
        
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900">
              Welcome back, <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">{userName}</span>!
            </h1>
            {isPremium && <PremiumBadge size="lg" />}
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Ready to discover more beautiful orchids today?
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => window.location.href = '/#identify'}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white px-8 py-3"
            >
              <Camera className="mr-2 h-5 w-5" />
              Identify New Orchid
            </Button>
            <Button
              onClick={() => window.location.href = '/database'}
              size="lg"
              variant="outline"
              className="px-8 py-3"
            >
              <Database className="mr-2 h-5 w-5" />
              Browse Database
            </Button>
            <Button
              onClick={() => window.location.href = '/garden'}
              size="lg"
              variant="outline"
              className="px-8 py-3"
            >
              <Heart className="mr-2 h-5 w-5" />
              My Garden
            </Button>
            <Button
              onClick={handleManualRefresh}
              size="lg"
              variant="outline"
              className="px-8 py-3"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>
        </div>

        {/* Debug Info */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Debug Info</h3>
            <p className="text-sm text-blue-800">
              User ID: {user.id}<br/>
              Stats: Total: {stats.total}, Saved: {stats.saved}, This Week: {stats.thisWeek}, Garden: {stats.gardenCount}<br/>
              Identifications Count: {identifications.length}<br/>
              Loading: {loading ? 'Yes' : 'No'}
            </p>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Identifications</CardTitle>
              <FileImage className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500">
                {isPremium ? 'Unlimited' : `${checkFeatureAccess('identification').remainingUses || 0} remaining this month`}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">My Garden</CardTitle>
              <Heart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.gardenCount}</div>
              <p className="text-xs text-gray-500">
                {isPremium ? 'Unlimited collection' : 'Basic collection'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saved Plants</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.saved}</div>
              <p className="text-xs text-gray-500">From identifications</p>
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

        {/* Premium Features Grid */}
        {!isPremium && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <PremiumGate feature="disease-detection" showUpgrade={false}>
              <div></div>
            </PremiumGate>
            <PremiumGate feature="analytics" showUpgrade={false}>
              <div></div>
            </PremiumGate>
            <PremiumGate feature="weather" showUpgrade={false}>
              <div></div>
            </PremiumGate>
          </div>
        )}

        {/* Recent Identifications */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-200 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-playfair text-gray-900">Recent Identifications</CardTitle>
              {isPremium && <PremiumBadge size="sm" />}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your identifications...</p>
              </div>
            ) : identifications.length > 0 ? (
              <div className="space-y-4">
                {identifications.slice(0, 10).map((identification) => (
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

        {/* Upgrade Prompt for Free Users */}
        {!isPremium && (
          <UpgradePrompt 
            title="Unlock the Full OrchidAI Experience"
            description="Get unlimited access to all features with zero API costs"
            features={[
              "Unlimited plant identifications",
              "AI-powered disease detection",
              "Advanced health analytics",
              "Weather-based care recommendations",
              "Export your plant care data",
              "Priority customer support"
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
