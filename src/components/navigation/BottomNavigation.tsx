
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, Database, BarChart3, User, Rocket } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Camera, label: 'Identify', path: '/' },
    { icon: Database, label: 'Database', path: '/database' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Rocket, label: 'Launch', path: '/launch' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
