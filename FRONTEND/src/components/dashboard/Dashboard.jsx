import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { CursorArrowRaysIcon, DocumentIcon, FolderIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { formatDate } from '../../lib/utils';

// Mock data for dashboard
const stats = [
  { id: 1, name: 'Total Appointments', stat: '24', icon: CalendarIcon, change: '12%', changeType: 'increase' },
  { id: 2, name: 'Medical Reports', stat: '8', icon: DocumentIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Prescriptions', stat: '12', icon: FolderIcon, change: '3.2%', changeType: 'decrease' },
];

const recentAppointments = [
  { id: 1, doctor: 'Dr. Sarah Johnson', date: '2023-06-15', time: '10:00 AM', status: 'Completed', serialNumber: 5 },
  { id: 2, doctor: 'Dr. Michael Chen', date: '2023-06-20', time: '2:30 PM', status: 'Scheduled', serialNumber: 8 },
];

const recentReports = [
  { id: 1, title: 'Blood Test Results', doctor: 'Dr. Sarah Johnson', date: '2023-06-10', status: 'Available' },
  { id: 2, title: 'X-Ray Report', doctor: 'Dr. James Wilson', date: '2023-06-05', status: 'Pending' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back, John Doe</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">View Calendar</Button>
          <Button size="sm">Book Appointment</Button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{item.stat}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="flex items-center text-sm">
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className={`ml-2 ${item.changeType === 'increase' ? 'text-green-700' : 'text-red-700'}`}>
                  {item.change} from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${activeTab === 'overview'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`${activeTab === 'appointments'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`${activeTab === 'reports'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Medical Reports
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent appointments */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Appointments</h3>
                <div className="mt-6 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentAppointments.map((appointment) => (
                      <li key={appointment.id} className="py-5">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                              <CalendarIcon className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">{appointment.doctor}</p>
                            <p className="truncate text-sm text-gray-500">
                              {formatDate(appointment.date)} at {appointment.time}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                appointment.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Button variant="link" className="w-full text-center">
                    View all appointments
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent medical reports */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Medical Reports</h3>
                <div className="mt-6 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentReports.map((report) => (
                      <li key={report.id} className="py-5">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                              <DocumentIcon className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">{report.title}</p>
                            <p className="truncate text-sm text-gray-500">
                              {report.doctor} • {formatDate(report.date)}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                report.status === 'Available'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {report.status}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Button variant="link" className="w-full text-center">
                    View all reports
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Your Appointments</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your upcoming and past appointments</p>
              
              <div className="mt-6 flex justify-end">
                <Button>Book New Appointment</Button>
              </div>
              
              <div className="mt-6">
                <p className="text-center text-gray-500 py-8">Appointment management interface will be displayed here</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Medical Reports</h3>
              <p className="mt-1 text-sm text-gray-500">Access and manage your medical reports</p>
              
              <div className="mt-6 flex justify-end">
                <Button>Upload New Report</Button>
              </div>
              
              <div className="mt-6">
                <p className="text-center text-gray-500 py-8">Medical reports interface will be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}