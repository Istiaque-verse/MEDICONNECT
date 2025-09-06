package com.mediconnect.mediconnect.config;

import com.mediconnect.mediconnect.security.JwtAuthenticationFilter;
import com.mediconnect.mediconnect.security.UserDetailsImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsImpl userDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          UserDetailsImpl userDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // ✅ disable CSRF since we’re using JWTs, not cookies
            .csrf(csrf -> csrf.disable())

            // ✅ authorize requests
            .authorizeHttpRequests(auth -> auth
                // Public endpoints (register, login, test, debug etc.)
                .requestMatchers(
                        "/api/auth/**",
                        "/test",
                        "/api/auth/register-test",
                        "/api/auth/debug",
                        "/api/auth/simple",
                        "/api/auth/register-no-validation"
                ).permitAll()

                // Role-based access
                .requestMatchers("/api/user/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/user/doctor/**").hasRole("DOCTOR")
                .requestMatchers("/api/user/patient/**").hasRole("PATIENT")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // ✅ use stateless session (no HttpSession, only JWTs)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // ✅ add JWT filter before the UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
