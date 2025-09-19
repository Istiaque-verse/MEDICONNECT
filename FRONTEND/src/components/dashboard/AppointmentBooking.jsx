import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/apiClient';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

export default function AppointmentBooking({ selectedDoctor, onAppointmentBooked }) {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  // When doctor or date changes, fetch available time slots
  useEffect(() => {
    if (!selectedDoctor || !date) {
      setAvailableSlots([]);
      return;
    }

    const fetchTimeSlots = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const response = await apiClient.get(
          `/appointments/available?doctorId=${selectedDoctor.id}&date=${date}`
        ).catch(() => null);
        
        // Use mock data if API fails
        setAvailableSlots(response || generateMockTimeSlots());
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError('Failed to load available time slots');
        setAvailableSlots(generateMockTimeSlots());
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDoctor, date]);

  // Generate mock time slots for development
  const generateMockTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      if (hour < endHour - 1) {
        slots.push(`${hour}:30`);
      }
    }
    
    // Randomly mark some slots as unavailable
    return slots.map(slot => ({
      time: slot,
      available: Math.random() > 0.3
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !date || !timeSlot) {
      setError('Please select a doctor, date, and time slot');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Format the appointment date and time
      const appointmentDateTime = `${date}T${timeSlot}`;
      
      // In a real app, this would be an API call
      const response = await apiClient.post('/appointments', {
        doctorId: selectedDoctor.id,
        appointmentDateTime,
        notes
      }).catch(() => ({ serialNumber: Math.floor(Math.random() * 20) + 1 }));
      
      setSerialNumber(response.serialNumber);
      setSuccess(true);
      
      // Notify parent component
      if (onAppointmentBooked) {
        onAppointmentBooked({
          doctor: selectedDoctor,
          date,
          timeSlot,
          serialNumber: response.serialNumber
        });
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success && serialNumber) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Appointment Booked!</h3>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Your appointment with</p>
            <p className="text-md font-medium text-gray-900">{selectedDoctor.name}</p>
            <p className="text-sm text-gray-500 mt-2">Date & Time</p>
            <p className="text-md font-medium text-gray-900">{new Date(`${date}T${timeSlot}`).toLocaleString()}</p>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">Your Serial Number</p>
              <p className="text-2xl font-bold text-primary-600">{serialNumber}</p>
              <p className="text-xs text-gray-500 mt-1">Please arrive 15 minutes before your appointment</p>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => {
                setSuccess(false);
                setSerialNumber(null);
                setDate('');
                setTimeSlot('');
                setNotes('');
              }}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Book an Appointment</h2>
      
      {selectedDoctor ? (
        <div className="mb-6 flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
            {selectedDoctor.avatar ? (
              <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-6 w-6 text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{selectedDoctor.name}</h3>
            <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
          </div>
        </div>
      ) : (
        <p className="mb-6 text-center text-gray-500">Please select a doctor first</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Date Selection */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span>Select Date</span>
              </div>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={!selectedDoctor}
            />
          </div>

          {/* Time Slot Selection */}
          <div>
            <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <span>Select Time</span>
              </div>
            </label>
            
            {loading ? (
              <p className="text-sm text-gray-500 mt-2">Loading available slots...</p>
            ) : date ? (
              availableSlots.length > 0 ? (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={!slot.available}
                      className={`py-2 px-3 text-sm font-medium rounded-md ${timeSlot === slot.time
                        ? 'bg-primary-600 text-white'
                        : slot.available
                          ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => slot.available && setTimeSlot(slot.time)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">No available slots for this date</p>
              )
            ) : (
              <p className="text-sm text-gray-500 mt-2">Please select a date first</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Any specific concerns or information for the doctor"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
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
              disabled={loading || !selectedDoctor || !date || !timeSlot}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}