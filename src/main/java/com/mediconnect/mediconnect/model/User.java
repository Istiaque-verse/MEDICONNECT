package com.mediconnect.mediconnect.model;
/*Represents a system user with roles (PATIENT, DOCTOR, ADMIN), 
authentication info, and profile data. */

import jakarta.persistence.*;

@Entity
@Table(name = "\"user\"")


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;


}
