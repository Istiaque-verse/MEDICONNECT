// AppSidebar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../ui/sidebar';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
  { name: 'Medical Reports', href: '/reports', icon: ClipboardDocumentListIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
];

function AppSidebar() {
  const { open, setOpen } = useContext(SidebarContext);

  return (
    <div
      className={`${
        open ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 z-50 flex w-64 flex-col bg-white border-r border-gray-200 pb-4 transition-transform duration-200 ease-in-out lg:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between gap-2 px-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="MediConnect" className="h-8 w-auto" />
          <span className="text-xl font-semibold text-gray-900">MediConnect</span>
        </Link>
        <button onClick={() => setOpen(false)} className="-mr-2.5 lg:hidden">
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="group flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt=""
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AppSidebar };
export default AppSidebar; // ✅ make it default export
