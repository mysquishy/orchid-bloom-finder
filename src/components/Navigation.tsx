
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import UserMenu from './UserMenu';
import AuthModal from './auth/AuthModal';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Database', href: '/database' },
    ...(user ? [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'My Garden', href: '/garden' },
      ...(subscribed ? [
        { name: 'Analytics', href: '/analytics' },
        { name: 'Health Monitor', href: '/health' },
        { name: 'Weather System', href: '/weather' },
        { name: 'Data Export', href: '/export' }
      ] : [])
    ] : []),
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Flower className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Or<span className="text-green-600 font-extrabold text-2xl">k</span>hidly
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <UserMenu />
              ) : (
                <Button 
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {user && <UserMenu />}
              <button
                onClick={toggleMenu}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {!user && (
                <Button 
                  onClick={() => {
                    setAuthModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
