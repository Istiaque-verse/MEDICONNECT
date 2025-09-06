package com.mediconnect.mediconnect.controller;

import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediconnect.mediconnect.dto.JwtResponse;
import com.mediconnect.mediconnect.dto.LoginRequest;
import com.mediconnect.mediconnect.dto.RegisterRequest;
import com.mediconnect.mediconnect.model.Role;
import com.mediconnect.mediconnect.model.User;
import com.mediconnect.mediconnect.repository.UserRepository;
import com.mediconnect.mediconnect.util.JwtUtil;

import jakarta.validation.Valid;

/**
 * AuthController handles user registration and login with JWT authentication.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/test")
        public ResponseEntity<String> test() {
            return ResponseEntity.ok("Controller is working!");
}


    @PostMapping("/debug")
public ResponseEntity<String> debug(@RequestBody(required = false) String body) {
    System.out.println("POST endpoint reached!");
    System.out.println("Request body: " + body);
    return ResponseEntity.ok("POST is working! Body: " + body);
}   


    @PostMapping("/simple")
public String simple() {
    System.out.println("Simple POST endpoint reached!");
    return "Simple POST works!";
}

    /**
     * Registers a new user.
     *
     * @param request RegisterRequest DTO with user details
     * @return 200 OK if successful, 400 Bad Request if email exists or role invalid
     */
@PostMapping("/register")
public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, 
                                BindingResult result) {
    // Handle validation errors
    if (result.hasErrors()) {
        List<String> errors = result.getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }

    // Check if email already exists
    User existingUser = userRepository.findByEmail(request.getEmail());
    if (existingUser != null) {
        return ResponseEntity.badRequest().body("Email already registered");
    }

    // Validate and convert role
    Role role;
    try {
        role = Role.valueOf(request.getRole().toUpperCase());
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body("Invalid role. Allowed: PATIENT, DOCTOR, ADMIN");
    }

    // Create and save user
    User user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword())) // Encrypt password
            .role(role)
            .build();

    userRepository.save(user);
    return ResponseEntity.ok("User registered successfully");
}

    /**
     * Authenticates a user and returns a JWT token.
     *
     * @param request LoginRequest DTO with email and password
     * @return JWT token if authentication successful, 401 Unauthorized if failed
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            // Authenticate credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // Generate JWT (email + role)
            User user = userRepository.findByEmail(request.getEmail());
            if (user == null) {
                return ResponseEntity.status(401).body("User not found after authentication");
            }

            String token = jwtUtil.generateToken(user.getEmail());

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/register-no-validation")
    public ResponseEntity<String> registerNoValidation(@RequestBody RegisterRequest request) {
        System.out.println("Register no validation reached!");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());
        System.out.println("Role: " + request.getRole());
        return ResponseEntity.ok("Register without validation works!");
    }
}
