package com.mediconnect.mediconnect.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Stores appointment details like patient, doctor, time, and status.
 */
@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appoinment {

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
    
    @NotNull
    @Column(nullable = false)
    private LocalDateTime appointmentDateTime;
    
    @Column(nullable = false)
    private Integer serialNumber;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
    
    @Column(length = 500)
    private String notes;
    
    /**
     * Enum for different appointment statuses
     */
    public enum AppointmentStatus {
        SCHEDULED,
        CONFIRMED,
        COMPLETED,
        CANCELLED,
        NO_SHOW
    }
}
