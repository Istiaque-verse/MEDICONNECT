import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar';
import Header from '../navigation/Header';

/**
 * Main application layout component that provides consistent structure across all pages
 * Includes the sidebar navigation and header components
 */
export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar navigation */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}