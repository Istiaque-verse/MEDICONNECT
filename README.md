# MediConnect 💊🩺

MediConnect is a smart healthcare platform designed to digitize and streamline doctor-patient interactions. 
It offers real-time appointment booking, cloud-based medical record storage, live doctor-patient communication, and role-based access for patients, doctors, and administrators.

---

🚀 Features

- ✅ Real-time appointment scheduling & status tracking  
- ✅ Role-based system (Patient, Doctor, Admin)  
- ✅ Live chat between patients and doctors  
- ✅ Medical reports, prescriptions, and file uploads (S3 cloud integration)  
- ✅ Audio & video consultation (WebRTC support-ready)  
- ✅ Authentication and validation using `@Valid`, `@NotBlank`, and `@Email`  
- ✅ Exception handling with custom exception classes  
- ✅ Scalable, modular backend architecture (Spring Boot)

---

## 📁 Project Structure

MEDICONNECT/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── mediconnect/
│       │           ├── controller/
│       │           │   ├── AuthController.java
│       │           │   ├── AppointmentController.java
│       │           │   ├── ChatController.java
│       │           │   └── ReportController.java
│       │           │
│       │           ├── service/
│       │           │   ├── AuthService.java
│       │           │   ├── AppointmentService.java
│       │           │   ├── ChatService.java
│       │           │   └── ReportService.java
│       │           │
│       │           ├── dto/
│       │           │   ├── RegisterRequest.java
│       │           │   ├── LoginRequest.java
│       │           │   ├── AppointmentRequest.java
│       │           │   └── ChatRequest.java
│       │           │
│       │           ├── model/
│       │           │   ├── User.java
│       │           │   ├── Appointment.java
│       │           │   ├── ChatMessage.java
│       │           │   ├── Prescription.java
│       │           │   └── MedicalReport.java
│       │           │
│       │           ├── repository/
│       │           │   ├── UserRepository.java
│       │           │   ├── AppointmentRepository.java
│       │           │   └── ChatRepository.java
│       │           │
│       │           ├── exception/
│       │           │   ├── GlobalExceptionHandler.java
│       │           │   ├── ResourceNotFoundException.java
│       │           │   └── InvalidInputException.java
│       │           │
│       │           ├── config/
│       │           │   └── WebSecurityConfig.java (if Spring Security is used)
│       │           │
│       │           └── MediConnectApplication.java
│       │
│       └── resources/
│           ├── application.properties (or application.yml)
│           └── static/ (if serving static content like files or documentation)
│
├── pom.xml
└── README.md


✅ Description of Key Layers:

controller/: REST API endpoints (mapped to URL paths)

service/: Business logic layer

dto/: Data Transfer Objects for request/response

model/: Entity classes mapped to database tables

repository/: Interfaces extending JpaRepository for DB access

exception/: Custom exceptions & global error handling

config/: Security, CORS, and other configs

resources/: Properties, static files, etc.
