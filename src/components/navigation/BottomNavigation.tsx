
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Camera, User, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      color: 'text-green-600'
    },
    {
      icon: Search,
      label: 'Database',
      path: '/database',
      color: 'text-purple-600'
    },
    {
      icon: Camera,
      label: 'Identify',
      path: '/identify',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      label: 'Progress',
      path: '/gamification',
      color: 'text-orange-600'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/dashboard',
      color: 'text-pink-600'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-all duration-200",
                active 
                  ? `${item.color} scale-110` 
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "animate-pulse")} />
              <span className="text-xs font-medium">{item.label}</span>
              {active && (
                <div className="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-green-500 to-purple-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
