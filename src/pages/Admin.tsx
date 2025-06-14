
import React from 'react';
import Navigation from '@/components/Navigation';
import AdminPanel from '@/components/AdminPanel';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  // Simple admin check - in production, this would be handled by proper role-based access
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('@orchidai.com');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <SEOHead 
        title="Admin Dashboard"
        description="OrchidAI admin dashboard for managing users, database, and system monitoring."
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
                    Please log in with an admin account to access this page.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        }
      >
        {isAdmin ? (
          <div className="pt-20">
            <AdminPanel />
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
                    You don't have admin privileges to access this page.
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

export default AdminPage;
