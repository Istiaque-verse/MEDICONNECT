import React, { useState } from 'react';
import { AppSidebar } from '../app-sidebar';
import { SidebarInset, SidebarTrigger } from '../ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Separator } from '../ui/separator';
import DoctorSelection from './DoctorSelection';
import AppointmentBooking from './AppointmentBooking';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { CursorArrowRaysIcon, DocumentIcon, FolderIcon } from '@heroicons/react/24/outline';

const stats = [
  { id: 1, name: 'Total Appointments', stat: '24', icon: CursorArrowRaysIcon, change: '12%', changeType: 'increase' },
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

export default function RevampedDashboard() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [recentBookings, setRecentBookings] = useState([]);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab('appointments');
  };

  const handleAppointmentBooked = (appointmentData) => {
    setRecentBookings([appointmentData, ...recentBookings]);
    setActiveTab('dashboard');
    setSelectedDoctor(null);
  };

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">MediConnect</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 bg-gray-50 min-h-screen">
          {/* Stats cards */}
          <div className="flex flex-wrap gap-4 mb-6">
            {stats.map((item) => (
              <div
                key={item.id}
                className="flex-1 min-w-[250px] bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <item.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`ml-1 ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change} from last month
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Appointments */}
            <div className="md:col-span-8 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Book New Appointment
                  </button>
                </div>

                {recentBookings.length > 0 && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                    <p className="text-sm font-medium text-green-800">New Appointment Booked!</p>
                    <p className="text-sm text-green-700 mt-1">
                      You have successfully booked an appointment with {recentBookings[0].doctor.name} on{' '}
                      {new Date(`${recentBookings[0].date}T${recentBookings[0].timeSlot}`).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-bold text-green-800 mt-1">
                      Your Serial Number: {recentBookings[0].serialNumber}
                    </p>
                  </div>
                )}

                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Doctor</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Serial No.</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="text-sm font-medium text-gray-900">{appt.doctor}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-900">{appt.date}</div>
                            <div className="text-sm text-gray-500">{appt.time}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-900">#{appt.serialNumber}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                appt.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Appointment Booking */}
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <DoctorSelection onDoctorSelect={handleDoctorSelect} />
                    <AppointmentBooking selectedDoctor={selectedDoctor} onAppointmentBooked={handleAppointmentBooked} />
                  </div>
                </div>
              )}
            </div>

            {/* Reports Section */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-start justify-between pb-4 border-b border-gray-200 last:border-0"
                    >
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {report.doctor} • {report.date}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          report.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('reports')}
                  className="mt-4 w-full text-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View All Reports
                </button>
              </div>

              {activeTab === 'reports' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Report</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Report Title</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter report title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload File</label>
                      <input
                        type="file"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Upload
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
