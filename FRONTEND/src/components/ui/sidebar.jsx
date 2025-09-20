import React, { createContext, useContext, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

// Sidebar context
export const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger({ className, ...props }) {
  const { setOpen } = useContext(SidebarContext);

  return (
    <button
      type="button"
      className={`p-1.5 text-gray-500 hover:text-blue-700 rounded-md ${className || ''}`}
      onClick={() => setOpen(prev => !prev)}
      {...props}
    >
      <Bars3Icon className="h-4 w-4" />
    </button>
  );
}

export function SidebarInset({ children }) {
  const { open, setOpen } = useContext(SidebarContext);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-200 ${
          open ? 'lg:pl-64' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}
