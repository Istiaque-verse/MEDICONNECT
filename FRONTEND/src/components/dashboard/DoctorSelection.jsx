import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/apiClient';

const specialties = [
  'General Medicine',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology',
  'Ophthalmology',
  'ENT',
  'Psychiatry'
];

export default function DoctorSelection({ onDoctorSelect }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call to fetch doctors
        // For now, we'll use mock data
        const response = await apiClient.get('/users/doctors');
        setDoctors(response || mockDoctors);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctors. Please try again.');
        // Use mock data as fallback
        setDoctors(mockDoctors);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on specialty and search query
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select a Doctor</h2>
      
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search by name
          </label>
          <input
            type="text"
            id="search"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="md:w-1/3">
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by specialty
          </label>
          <select
            id="specialty"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="All">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading and error states */}
      {loading && <p className="text-center py-4">Loading doctors...</p>}
      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      {/* Doctors list */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="border rounded-lg p-4 hover:border-primary-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onDoctorSelect(doctor)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {doctor.avatar ? (
                      <img src={doctor.avatar} alt={doctor.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xl font-semibold text-gray-500">
                        {doctor.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Experience:</span> {doctor.experience} years
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Patients:</span> {doctor.patientCount}+
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center py-4 text-gray-500">
              No doctors found matching your criteria.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Mock data for development
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: 12,
    patientCount: 1500,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    experience: 8,
    patientCount: 950,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    experience: 15,
    patientCount: 2200,
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    experience: 10,
    patientCount: 1200,
    avatar: null
  },
  {
    id: 5,
    name: 'Dr. Lisa Patel',
    specialty: 'Dermatology',
    experience: 7,
    patientCount: 1800,
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'General Medicine',
    experience: 20,
    patientCount: 3000,
    avatar: null
  },
];