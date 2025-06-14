
import React, { useState } from 'react';
import { Menu, X, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-playfair bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
              OrchidAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              How It Works
            </a>
            <a href="#identify" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Identify
            </a>
            {user && (
              <a href="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Dashboard
              </a>
            )}
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-green-600 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-green-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#identify" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
                Identify
              </a>
              {user && (
                <a href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
                  Dashboard
                </a>
              )}
              <div className="px-3 py-2">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
