import React, { useState } from 'react';
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import DoctorSelection from './DoctorSelection';
import AppointmentBooking from './AppointmentBooking';
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon, DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";

// Stats data
const stats = [
  { id: 1, name: "Total Appointments", stat: "24", icon: CursorArrowRaysIcon, change: "12%", changeType: "increase" },
  { id: 2, name: "Medical Reports", stat: "8", icon: DocumentIcon, change: "5.4%", changeType: "increase" },
  { id: 3, name: "Prescriptions", stat: "12", icon: FolderIcon, change: "3.2%", changeType: "decrease" },
];

// Recent appointments
const recentAppointments = [
  { id: 1, doctor: "Dr. Sarah Johnson", date: "2023-06-15", time: "10:00 AM", status: "Completed", serialNumber: 5 },
  { id: 2, doctor: "Dr. Michael Chen", date: "2023-06-20", time: "2:30 PM", status: "Scheduled", serialNumber: 8 },
];

// Recent reports
const recentReports = [
  { id: 1, title: "Blood Test Results", doctor: "Dr. Sarah Johnson", date: "2023-06-10", status: "Available" },
  { id: 2, title: "X-Ray Report", doctor: "Dr. James Wilson", date: "2023-06-05", status: "Pending" },
];

export default function RevampedDashboard() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, appointments, reports
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 border-b px-4">
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

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`${activeTab === 'dashboard' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`${activeTab === 'appointments' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Book Appointment
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`${activeTab === 'reports' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Medical Reports
              </button>
            </nav>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary-500 rounded-full">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">{item.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm font-semibold">
                      {item.changeType === "increase" ? (
                        <ArrowUpIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5 text-red-500" />
                      )}
                      <span className={`ml-1 ${item.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Appointments & Reports */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Appointments */}
                <div className="bg-white p-6 rounded-xl shadow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
                  {recentBookings.length > 0 && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-100 rounded-lg">
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
                  <ul className="space-y-3">
                    {recentAppointments.map((appt) => (
                      <li key={appt.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{appt.doctor}</p>
                          <p className="text-xs text-gray-500">{appt.date} at {appt.time}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${appt.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                            {appt.status}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">Serial: {appt.serialNumber}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Book New Appointment
                  </button>
                </div>

                {/* Recent Reports */}
                <div className="bg-white p-6 rounded-xl shadow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Reports</h3>
                  <ul className="space-y-3">
                    {recentReports.map((report) => (
                      <li key={report.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{report.title}</p>
                          <p className="text-xs text-gray-500">{report.doctor} • {report.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${report.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {report.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setActiveTab('reports')}
                    className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    View All Reports
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Book an Appointment</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <DoctorSelection onDoctorSelect={handleDoctorSelect} />
                </div>
                <div>
                  <AppointmentBooking 
                    selectedDoctor={selectedDoctor} 
                    onAppointmentBooked={handleAppointmentBooked} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Medical Reports</h2>
              
              {/* Reports List */}
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Your Medical Reports</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {recentReports.concat([
                    { id: 3, title: "MRI Scan Results", doctor: "Dr. Michael Chen", date: "2023-05-20", status: "Available" },
                    { id: 4, title: "Annual Checkup Report", doctor: "Dr. Robert Kim", date: "2023-04-15", status: "Available" },
                  ]).map((report) => (
                    <li key={report.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>{report.doctor}</span>
                          <span className="mx-1">•</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-4 px-2 py-1 rounded-full text-xs font-semibold ${report.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {report.status}
                        </span>
                        {report.status === "Available" && (
                          <button className="text-primary-600 hover:text-primary-900 font-medium text-sm">
                            View
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Upload Report Form */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Medical Report</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="report-title" className="block text-sm font-medium text-gray-700">
                      Report Title
                    </label>
                    <input
                      type="text"
                      id="report-title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter report title"
                    />
                  </div>
                  <div>
                    <label htmlFor="report-description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="report-description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter report description"
                    />
                  </div>
                  <div>
                    <label htmlFor="report-file" className="block text-sm font-medium text-gray-700">
                      Upload File
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="report-file"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Upload a file</span>
                            <input id="report-file" name="report-file" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Upload Report
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}