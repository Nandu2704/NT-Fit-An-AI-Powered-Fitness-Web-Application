import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Camera, Dumbbell, Apple, TrendingUp, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Activity, label: 'Home' },
    { path: '/analysis', icon: Camera, label: 'Analysis' },
    { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { path: '/diet', icon: Apple, label: 'Diet' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NTFit</span>
            </div>
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-1" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;