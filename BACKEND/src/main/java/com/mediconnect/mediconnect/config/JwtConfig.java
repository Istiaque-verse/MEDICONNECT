package com.mediconnect.mediconnect.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mediconnect.mediconnect.util.JwtUtil;

/**
 * Configuration class for JWT-related beans.
 * Reads JWT properties from application.properties and provides them to JwtUtil.
 */
@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private Long jwtExpiration;
    
    /**
     * Creates and configures the JwtUtil bean with properties from application.properties
     * 
     * @return configured JwtUtil instance
     */
    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil(jwtSecret, jwtExpiration);
    }
}