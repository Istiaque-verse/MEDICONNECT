import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    id: 1,
    name: 'Total Patients',
    stat: '71,897',
    icon: UsersIcon,
    change: '122',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Appointments Today',
    stat: '24',
    icon: CursorArrowRaysIcon,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Pending Reports',
    stat: '8',
    icon: EnvelopeOpenIcon,
    change: '3.2%',
    changeType: 'decrease',
  },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Dashboard Overview
      </h2>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Appointments</h3>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">Sarah Thompson</p>
                      <p className="truncate text-sm text-gray-500">General Checkup • 10:00 AM</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Confirmed
                      </span>
                    </div>
                  </div>
                </li>
                {/* Add more appointments as needed */}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View all
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Quick Actions</h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                New Appointment
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Create Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}