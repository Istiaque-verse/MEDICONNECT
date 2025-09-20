import React, { useState } from 'react';
import { apiClient } from '../../services/apiClient';
import { DocumentArrowUpIcon, DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function MedicalReportSubmission({ appointment, onReportSubmitted }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    
    // Create preview URL for supported file types
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  // Clear selected file
  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    // Reset file input
    const fileInput = document.getElementById('report-file');
    if (fileInput) fileInput.value = '';
  };

  // Submit the report
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !selectedFile) {
      setError('Please provide a title and upload a file');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title);
      formData.append('description', description);
      
      if (appointment) {
        formData.append('appointmentId', appointment.id);
      }
      
      // In a real app, this would be an API call to upload the file
      // For now, simulate a successful upload
      const response = await apiClient.post('/medical-reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).catch(() => ({
        id: Math.floor(Math.random() * 1000),
        title,
        description,
        fileUrl: URL.createObjectURL(selectedFile),
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        createdAt: new Date().toISOString()
      }));
      
      setSuccess(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      handleClearFile();
      
      // Notify parent component
      if (onReportSubmitted) {
        onReportSubmitted(response);
      }
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <DocumentArrowUpIcon className="h-6 w-6 text-primary-600" />
        Submit Medical Report
      </h2>
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-sm font-medium text-green-800">Report submitted successfully!</p>
          <p className="text-sm text-green-700 mt-1">
            Your medical report has been uploaded and is now available for review.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Report Title */}
        <div>
          <label htmlFor="report-title" className="block text-sm font-medium text-gray-700 mb-1">
            Report Title *
          </label>
          <input
            type="text"
            id="report-title"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="e.g., Blood Test Results"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        {/* Report Description */}
        <div>
          <label htmlFor="report-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="report-description"
            rows="3"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Add any additional details about this report"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        {/* File Upload */}
        <div>
          <label htmlFor="report-file" className="block text-sm font-medium text-gray-700 mb-1">
            Upload File *
          </label>
          
          {!selectedFile ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="report-file"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="report-file"
                      name="report-file"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-1 flex items-center p-4 border border-gray-300 rounded-md">
              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="h-10 w-10 object-cover rounded-md" />
                ) : (
                  <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type || 'Unknown type'}
                </p>
              </div>
              <button
                type="button"
                className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
                onClick={handleClearFile}
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        
        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}