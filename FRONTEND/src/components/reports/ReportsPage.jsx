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
import MedicalReportList from './MedicalReportList';
import MedicalReportSubmission from './MedicalReportSubmission';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('view'); // 'view' or 'submit'
  const [recentlySubmitted, setRecentlySubmitted] = useState(null);
  
  // Mock user ID - in a real app, this would come from authentication
  const currentUserId = 1;
  
  const handleReportSubmitted = (report) => {
    setRecentlySubmitted(report);
    setActiveTab('view');
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
                <BreadcrumbLink href="/dashboard">MediConnect</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Medical Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Medical Reports</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('view')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'view' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              >
                View Reports
              </button>
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'submit' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              >
                Submit New Report
              </button>
            </div>
          </div>

          {recentlySubmitted && activeTab === 'view' && (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-green-800">Report successfully submitted!</p>
              <p className="text-sm text-green-700">
                Your report "{recentlySubmitted.title}" has been uploaded and is now available for review.
              </p>
            </div>
          )}

          {activeTab === 'view' ? (
            <MedicalReportList patientId={currentUserId} />
          ) : (
            <MedicalReportSubmission onReportSubmitted={handleReportSubmitted} />
          )}
        </main>
      </SidebarInset>
    </>
  );
}