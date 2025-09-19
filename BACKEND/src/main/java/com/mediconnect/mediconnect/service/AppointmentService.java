package com.mediconnect.mediconnect.service;

import com.mediconnect.mediconnect.model.Appoinment;
import com.mediconnect.mediconnect.model.Appoinment.AppointmentStatus;
import com.mediconnect.mediconnect.model.User;
import com.mediconnect.mediconnect.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * Manages appointment booking, serial tracking,
 * rescheduling, and cancellations.
 */
@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    /**
     * Book a new appointment
     * @param patient The patient booking the appointment
     * @param doctor The doctor for the appointment
     * @param appointmentDateTime The date and time of the appointment
     * @param notes Any additional notes
     * @return The created appointment
     */
    public Appoinment bookAppointment(User patient, User doctor, LocalDateTime appointmentDateTime, String notes) {
        // Calculate serial number for this doctor on this date
        Integer serialNumber = calculateNextSerialNumber(doctor, appointmentDateTime.toLocalDate());
        
        Appoinment appointment = Appoinment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentDateTime(appointmentDateTime)
                .serialNumber(serialNumber)
                .status(AppointmentStatus.SCHEDULED)
                .notes(notes)
                .build();
        
        return appointmentRepository.save(appointment);
    }
    
    /**
     * Calculate the next serial number for a doctor on a specific date
     * @param doctor The doctor
     * @param date The appointment date
     * @return The next serial number
     */
    private Integer calculateNextSerialNumber(User doctor, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        
        // Find the highest serial number for this doctor on this date
        Optional<Integer> maxSerial = appointmentRepository.findMaxSerialNumberByDoctorAndDate(
                doctor.getId(), startOfDay, endOfDay);
        
        // Return the next serial number (or 1 if no appointments exist)
        return maxSerial.map(s -> s + 1).orElse(1);
    }
    
    /**
     * Get all appointments for a doctor on a specific date
     * @param doctor The doctor
     * @param date The date
     * @return List of appointments
     */
    public List<Appoinment> getDoctorAppointmentsByDate(User doctor, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        
        return appointmentRepository.findByDoctorAndAppointmentDateTimeBetweenOrderBySerialNumber(
                doctor, startOfDay, endOfDay);
    }
    
    /**
     * Get all appointments for a patient
     * @param patient The patient
     * @return List of appointments
     */
    public List<Appoinment> getPatientAppointments(User patient) {
        return appointmentRepository.findByPatientOrderByAppointmentDateTimeDesc(patient);
    }
    
    /**
     * Update appointment status
     * @param appointmentId The appointment ID
     * @param status The new status
     * @return The updated appointment
     */
    public Appoinment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Appoinment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
    
    /**
     * Cancel an appointment
     * @param appointmentId The appointment ID
     * @return The cancelled appointment
     */
    public Appoinment cancelAppointment(Long appointmentId) {
        return updateAppointmentStatus(appointmentId, AppointmentStatus.CANCELLED);
    }
    
    /**
     * Get available time slots for a doctor on a specific date
     * @param doctor The doctor
     * @param date The date
     * @return List of available time slots
     */
    public List<LocalDateTime> getAvailableTimeSlots(User doctor, LocalDate date) {
        // Implementation would depend on doctor's schedule and existing appointments
        // This is a placeholder for the actual implementation
        return List.of();
    }
}
