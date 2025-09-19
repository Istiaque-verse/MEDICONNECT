package com.mediconnect.mediconnect.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Links to medical documents stored on AWS S3 (file URLs, metadata)
 */
@Entity
@Table(name = "medical_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicalreport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;
    
    @NotNull
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;
    
    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appoinment appointment;
    
    @NotBlank
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @NotBlank
    @Column(name = "file_url", nullable = false)
    private String fileUrl;
    
    @Column(name = "file_type")
    private String fileType;
    
    @Column(name = "file_size")
    private Long fileSize;
    
    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReportStatus status;
    
    /**
     * Enum for different report statuses
     */
    public enum ReportStatus {
        DRAFT,
        SUBMITTED,
        REVIEWED,
        APPROVED,
        REJECTED
    }
}
