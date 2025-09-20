import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left section - Page title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">MediConnect</h1>
        </div>

        {/* Right section - Search, notifications, profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="block w-full rounded-md border border-gray-300 bg-white py-1.5 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Profile dropdown - simplified version */}
          <div className="relative">
            <Link to="/profile" className="flex items-center">
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://ui-avatars.com/api/?name=John+Doe&background=6366F1&color=fff"
                alt="User profile"
              />
              <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">John Doe</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}