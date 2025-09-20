import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { MediConnectLogo } from '../ui/logo';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
  { name: 'Medical Reports', href: '/reports', icon: ClipboardDocumentListIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
];

const secondaryNavigation = [
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      
      {/* Sidebar for desktop */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
            <Link to="/dashboard" className="flex items-center">
              <MediConnectLogo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-primary-600">MediConnect</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive(item.href) ? "text-primary-600" : "text-gray-500"
                  )} />
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Settings
              </h3>
              <div className="mt-3 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive(item.href) ? "text-primary-600" : "text-gray-500"
                    )} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          
          {/* User profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=6366F1&color=fff"
                alt="User"
                className="h-10 w-10 rounded-full bg-primary-200"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <button
              className="mt-4 flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => {
                // Handle logout
                console.log('Logout clicked');
              }}
            >
              <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}