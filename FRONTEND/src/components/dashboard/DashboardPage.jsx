// Use relative imports to avoid Vite alias issues
import { AppSidebar } from "../app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  PlusIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

// Charts
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Stats data
const stats = [
  { id: 1, name: "Total Patients", stat: "71,897", icon: UsersIcon, change: "122", changeType: "increase" },
  { id: 2, name: "Appointments Today", stat: "24", icon: CursorArrowRaysIcon, change: "5.4%", changeType: "increase" },
  { id: 3, name: "Pending Reports", stat: "8", icon: EnvelopeOpenIcon, change: "3.2%", changeType: "decrease" },
];

// Recent appointments
const recentAppointments = [
  { id: 1, patient: "Sarah Thompson", time: "10:00 AM", status: "Confirmed", avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 2, patient: "John Smith", time: "11:30 AM", status: "Pending", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
];

// Chart data
const patientTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "New Patients",
      data: [50, 120, 90, 200, 170, 210, 240],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      tension: 0.3,
    },
  ],
};

const appointmentsTrendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Appointments",
      data: [4, 7, 5, 8, 6, 9, 12],
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      tension: 0.3,
    },
  ],
};

export default function DashboardPage() {
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
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
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

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Trends</h3>
              <Line data={patientTrendData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointments This Week</h3>
              <Line data={appointmentsTrendData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            </div>
          </div>

          {/* Recent Appointments & Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Appointments */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
              <ul className="space-y-3">
                {recentAppointments.map((appt) => (
                  <li key={appt.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={appt.avatar} className="h-10 w-10 rounded-full" alt={appt.patient} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{appt.patient}</p>
                        <p className="text-sm text-gray-500">{appt.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appt.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {appt.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-500">
                  <PlusIcon className="h-5 w-5" />
                  New Appointment
                </button>
                <button className="flex items-center justify-center gap-2 bg-white text-gray-900 border px-4 py-2 rounded-lg hover:bg-gray-50">
                  <DocumentIcon className="h-5 w-5" />
                  Create Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
