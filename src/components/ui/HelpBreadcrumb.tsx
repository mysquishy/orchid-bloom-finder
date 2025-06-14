
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HelpBreadcrumbProps {
  items?: BreadcrumbItem[];
}

const HelpBreadcrumb: React.FC<HelpBreadcrumbProps> = ({ items = [] }) => {
  const location = useLocation();
  
  // Default breadcrumb for help center
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Help Center', href: '/help' }
  ];

  const breadcrumbItems = items.length > 0 ? [...defaultItems, ...items] : defaultItems;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {item.href && index < breadcrumbItems.length - 1 ? (
            <Link 
              to={item.href}
              className="hover:text-green-600 transition-colors flex items-center gap-1"
            >
              {index === 0 && <Home className="w-4 h-4" />}
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium flex items-center gap-1">
              {index === 0 && <Home className="w-4 h-4" />}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default HelpBreadcrumb;
