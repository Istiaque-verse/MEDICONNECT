package com.mediconnect.mediconnect.service;

import com.mediconnect.mediconnect.model.Appoinment;
import com.mediconnect.mediconnect.model.Medicalreport;
import com.mediconnect.mediconnect.model.Medicalreport.ReportStatus;
import com.mediconnect.mediconnect.model.User;
import com.mediconnect.mediconnect.repository.MedicalReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for managing medical reports
 */
@Service
public class MedicalReportService {

    @Autowired
    private MedicalReportRepository medicalReportRepository;
    
    /**
     * Create a new medical report
     * 
     * @param patient The patient
     * @param doctor The doctor
     * @param appointment The related appointment (optional)
     * @param title Report title
     * @param description Report description
     * @param fileUrl URL to the uploaded file
     * @param fileType Type of the file
     * @param fileSize Size of the file in bytes
     * @return The created medical report
     */
    public Medicalreport createReport(User patient, User doctor, Appoinment appointment, 
                                     String title, String description, String fileUrl,
                                     String fileType, Long fileSize) {
        
        Medicalreport report = Medicalreport.builder()
                .patient(patient)
                .doctor(doctor)
                .appointment(appointment)
                .title(title)
                .description(description)
                .fileUrl(fileUrl)
                .fileType(fileType)
                .fileSize(fileSize)
                .createdAt(LocalDateTime.now())
                .status(ReportStatus.SUBMITTED)
                .build();
        
        return medicalReportRepository.save(report);
    }
    
    /**
     * Get all reports for a patient
     * 
     * @param patient The patient
     * @return List of medical reports
     */
    public List<Medicalreport> getPatientReports(User patient) {
        return medicalReportRepository.findByPatientOrderByCreatedAtDesc(patient);
    }
    
    /**
     * Get all reports created by a doctor
     * 
     * @param doctor The doctor
     * @return List of medical reports
     */
    public List<Medicalreport> getDoctorReports(User doctor) {
        return medicalReportRepository.findByDoctorOrderByCreatedAtDesc(doctor);
    }
    
    /**
     * Get reports for a specific appointment
     * 
     * @param appointment The appointment
     * @return List of medical reports
     */
    public List<Medicalreport> getAppointmentReports(Appoinment appointment) {
        return medicalReportRepository.findByAppointmentOrderByCreatedAtDesc(appointment);
    }
    
    /**
     * Update report status
     * 
     * @param reportId The report ID
     * @param status The new status
     * @return The updated report
     */
    public Medicalreport updateReportStatus(Long reportId, ReportStatus status) {
        Medicalreport report = medicalReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Medical report not found"));
        
        report.setStatus(status);
        report.setUpdatedAt(LocalDateTime.now());
        
        return medicalReportRepository.save(report);
    }
    
    /**
     * Update report details
     * 
     * @param reportId The report ID
     * @param title New title (optional)
     * @param description New description (optional)
     * @return The updated report
     */
    public Medicalreport updateReportDetails(Long reportId, String title, String description) {
        Medicalreport report = medicalReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Medical report not found"));
        
        if (title != null && !title.isEmpty()) {
            report.setTitle(title);
        }
        
        if (description != null) {
            report.setDescription(description);
        }
        
        report.setUpdatedAt(LocalDateTime.now());
        
        return medicalReportRepository.save(report);
    }
}