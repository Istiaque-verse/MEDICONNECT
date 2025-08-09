package com.mediconnect.mediconnect.controller;
//Register/login endpoints
import com.mediconnect.mediconnect.dto.*;
import com.mediconnect.mediconnect.model.User;
import com.mediconnect.mediconnect.model.Role;
import com.mediconnect.mediconnect.repository.UserRepository;
import com.mediconnect.mediconnect.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController exposes APIs for user registration and login with JWT.
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

    /**
     * Register a new user.
     * @param request RegisterRequest DTO with user details
     * @return 200 OK if successful, 400 Bad Request if email exists
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Encrypt password
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    /**
     * Authenticate user and generate JWT token.
     * @param request LoginRequest DTO with email and password
     * @return JWT token on success, 401 Unauthorized on failure
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            // Authenticate username/password using AuthenticationManager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Generate JWT token after successful authentication
            String token = jwtUtil.generateToken(request.getEmail());

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
