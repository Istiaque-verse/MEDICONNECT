package com.mediconnect.mediconnect.repository;

import com.mediconnect.mediconnect.model.Appoinment;
import com.mediconnect.mediconnect.model.Medicalreport;
import com.mediconnect.mediconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing medical reports
 */
@Repository
public interface MedicalReportRepository extends JpaRepository<Medicalreport, Long> {
    
    /**
     * Find all reports for a specific patient ordered by creation date
     * 
     * @param patient The patient
     * @return List of medical reports
     */
    List<Medicalreport> findByPatientOrderByCreatedAtDesc(User patient);
    
    /**
     * Find all reports created by a specific doctor ordered by creation date
     * 
     * @param doctor The doctor
     * @return List of medical reports
     */
    List<Medicalreport> findByDoctorOrderByCreatedAtDesc(User doctor);
    
    /**
     * Find all reports for a specific appointment ordered by creation date
     * 
     * @param appointment The appointment
     * @return List of medical reports
     */
    List<Medicalreport> findByAppointmentOrderByCreatedAtDesc(Appoinment appointment);
}