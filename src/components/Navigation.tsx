import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Flower, Menu, X, User, LogOut } from 'lucide-react';
import PremiumBadge from './PremiumBadge';
import { useSubscription } from '@/contexts/SubscriptionContext';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const { isPremium } = useSubscription();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Flower className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">OrchidAI</span>
            </Link>
            
            {user && (
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link 
                  to="/dashboard" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/garden" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  My Garden
                </Link>
                <Link 
                  to="/analytics" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <span>Analytics</span>
                  {isPremium && <PremiumBadge size="sm" className="ml-2" />}
                </Link>
                <Link 
                  to="/database" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Database
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSignOut}
                  className="text-green-600 hover:text-green-800 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                to="/pricing"
                className="text-green-600 hover:text-green-800 hidden md:inline-block"
              >
                Sign Up / Log In
              </Link>
            )}
            
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/garden"
                className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                My Garden
              </Link>
              <Link
                to="/analytics"
                className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                Analytics
              </Link>
              <Link
                to="/database"
                className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                Database
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Sign Out
              </button>
            </>
          )}
          {!user && (
            <Link
              to="/pricing"
              className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Sign Up / Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
