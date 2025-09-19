import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Appointments', href: '/appointments', icon: CalendarIcon, current: false },
  { name: 'Patients', href: '/patients', icon: UsersIcon, current: false },
  { name: 'Medical Records', href: '/medical-records', icon: FolderIcon, current: false },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon, current: false },
  { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon, current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-4 w-4 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-3 overflow-y-auto bg-white border-r border-gray-200 shadow-sm px-4 py-3">
                  <div className="flex h-12 shrink-0 items-center">
                    <img className="h-6 w-auto" src="/logo-white.svg" alt="MediConnect" />
                    <span className="ml-2 text-lg font-medium text-gray-900">MediConnect</span>
                  </div>
                  <div className="h-px bg-gray-200 my-1"></div>
                  <nav className="flex flex-1 flex-col pt-1">
                    <ul role="list" className="flex flex-1 flex-col gap-y-2">
                      <li>
                        <ul role="list" className="-mx-1 space-y-0.5">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
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
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-3 overflow-y-auto bg-white border-r border-gray-200 shadow-sm px-4 py-3">
          <div className="flex h-12 shrink-0 items-center">
            <img className="h-6 w-auto" src="/logo-white.svg" alt="MediConnect" />
            <span className="ml-2 text-lg font-medium text-gray-900">MediConnect</span>
          </div>
          <div className="h-px bg-gray-200 my-1"></div>
          <nav className="flex flex-1 flex-col pt-1">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              <li>
                <ul role="list" className="-mx-1 space-y-0.5">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
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
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-x-3 border-b border-gray-200 bg-white px-3 shadow-sm sm:gap-x-4 sm:px-4 lg:px-6">
          <button type="button" className="-m-1.5 p-1.5 text-gray-500 hover:text-blue-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="h-5 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
          <div className="flex flex-1 gap-x-3 self-stretch lg:gap-x-4">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-3 lg:gap-x-4">
              <button type="button" className="-m-1.5 p-1.5 text-gray-400 hover:text-blue-700">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="hidden lg:block lg:h-5 lg:w-px lg:bg-gray-200" aria-hidden="true" />
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1 flex items-center p-1">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-7 w-7 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-3 text-xs font-medium leading-5 text-gray-900" aria-hidden="true">
                      Dr. John Doe
                    </span>
                    <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1.5 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-xs leading-5 text-gray-900'
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-8">
          <div className="px-3 sm:px-4 lg:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
