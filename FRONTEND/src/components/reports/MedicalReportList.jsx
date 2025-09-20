import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/apiClient';
import { DocumentTextIcon, ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function MedicalReportList({ patientId, doctorView = false }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would be an API call to fetch reports
        // For now, we'll use mock data
        const endpoint = doctorView 
          ? `/medical-reports/doctor/${patientId}` 
          : `/medical-reports/patient/${patientId}`;
          
        const response = await apiClient.get(endpoint).catch(() => mockReports);
        setReports(response || mockReports);
      } catch (err) {
        console.error('Error fetching medical reports:', err);
        setError('Failed to load medical reports. Please try again.');
        setReports(mockReports); // Use mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [patientId, doctorView]);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    // In a real app, this might open a modal or navigate to a detail page
    window.open(report.fileUrl, '_blank');
  };

  const handleDownloadReport = (report) => {
    // In a real app, this would trigger a file download
    const link = document.createElement('a');
    link.href = report.fileUrl;
    link.download = `${report.title}.${report.fileType.split('/')[1] || 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'REVIEWED':
        return 'bg-blue-100 text-blue-800';
      case 'SUBMITTED':
        return 'bg-yellow-100 text-yellow-800';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center py-4">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <DocumentTextIcon className="h-6 w-6 text-primary-600" />
        Medical Reports
      </h2>
      
      {reports.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No reports found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {doctorView 
              ? 'No medical reports have been uploaded for this patient yet.'
              : 'You don\'t have any medical reports yet.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Report</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        {report.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{report.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="text-primary-600 hover:text-primary-900 flex items-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownloadReport(report)}
                        className="text-primary-600 hover:text-primary-900 flex items-center"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Mock data for development
const mockReports = [
  {
    id: 1,
    title: 'Blood Test Results',
    description: 'Complete blood count and metabolic panel',
    fileUrl: 'https://example.com/reports/blood-test.pdf',
    fileType: 'application/pdf',
    fileSize: 1024000,
    createdAt: '2023-06-10T10:30:00Z',
    status: 'APPROVED',
    doctorName: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    title: 'X-Ray Report',
    description: 'Chest X-ray examination',
    fileUrl: 'https://example.com/reports/xray.pdf',
    fileType: 'application/pdf',
    fileSize: 2048000,
    createdAt: '2023-06-05T14:15:00Z',
    status: 'SUBMITTED',
    doctorName: 'Dr. James Wilson'
  },
  {
    id: 3,
    title: 'MRI Scan',
    description: 'Brain MRI scan results',
    fileUrl: 'https://example.com/reports/mri.pdf',
    fileType: 'application/pdf',
    fileSize: 3072000,
    createdAt: '2023-05-20T09:45:00Z',
    status: 'REVIEWED',
    doctorName: 'Dr. Michael Chen'
  }
];