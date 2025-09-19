import React from 'react';
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  FolderIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Appointments', href: '/appointments', icon: CalendarIcon, current: false },
  { name: 'Patients', href: '/patients', icon: UsersIcon, current: false },
  { name: 'Medical Records', href: '/medical-records', icon: FolderIcon, current: false },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon, current: false },
  { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AppSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-3 overflow-y-auto bg-white border-r border-gray-200 shadow-sm px-4 py-3">
        <div className="flex h-12 shrink-0 items-center">
          <img
            className="h-6 w-auto"
            src="/logo-white.svg"
            alt="MediConnect"
          />
          <span className="ml-2 text-lg font-medium text-gray-900">MediConnect</span>
        </div>
        <div className="h-px bg-gray-200 my-1"></div>
        <nav className="flex flex-1 flex-col pt-1">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            <li>
              <ul role="list" className="-mx-1 space-y-0.5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50',
                        'group flex items-center gap-x-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                          'h-4 w-4 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}