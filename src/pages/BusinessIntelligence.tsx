
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/Navigation';
import SEOHead from '@/components/SEOHead';
import ComprehensiveAdminDashboard from '@/components/admin/ComprehensiveAdminDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const BusinessIntelligence: React.FC = () => {
  const { user } = useAuth();

  // Simple admin check - in production, this would be handled by proper role-based access
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('@orchidai.com');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <SEOHead 
        title="Business Intelligence Dashboard"
        description="Comprehensive business analytics and management dashboard for OrchidAI."
      />
      <Navigation />
      
      <ProtectedRoute 
        fallback={
          <div className="pt-20 px-4">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <CardTitle>Admin Access Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Please log in with an admin account to access the business intelligence dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        }
      >
        {isAdmin ? (
          <div className="pt-20">
            <ComprehensiveAdminDashboard />
          </div>
        ) : (
          <div className="pt-20 px-4">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <CardTitle>Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    You don't have admin privileges to access the business intelligence dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </ProtectedRoute>
    </div>
  );
};

export default BusinessIntelligence;
