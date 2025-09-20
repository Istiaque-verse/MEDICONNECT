package com.mediconnect.mediconnect.repository;

import com.mediconnect.mediconnect.model.Appoinment;
import com.mediconnect.mediconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing appointments
 */
@Repository
public interface AppointmentRepository extends JpaRepository<Appoinment, Long> {
    
    /**
     * Find all appointments for a specific doctor between two dates, ordered by serial number
     * 
     * @param doctor The doctor
     * @param startDateTime Start date and time
     * @param endDateTime End date and time
     * @return List of appointments
     */
    List<Appoinment> findByDoctorAndAppointmentDateTimeBetweenOrderBySerialNumber(
            User doctor, LocalDateTime startDateTime, LocalDateTime endDateTime);
    
    /**
     * Find all appointments for a specific patient ordered by appointment date and time (descending)
     * 
     * @param patient The patient
     * @return List of appointments
     */
    List<Appoinment> findByPatientOrderByAppointmentDateTimeDesc(User patient);
    
    /**
     * Find the maximum serial number for a specific doctor on a specific date
     * 
     * @param doctorId The doctor ID
     * @param startDateTime Start of the day
     * @param endDateTime End of the day
     * @return The maximum serial number, or empty if no appointments exist
     */
    @Query("SELECT MAX(a.serialNumber) FROM Appoinment a WHERE a.doctor.id = :doctorId AND a.appointmentDateTime BETWEEN :startDateTime AND :endDateTime")
    Optional<Integer> findMaxSerialNumberByDoctorAndDate(Long doctorId, LocalDateTime startDateTime, LocalDateTime endDateTime);
}
