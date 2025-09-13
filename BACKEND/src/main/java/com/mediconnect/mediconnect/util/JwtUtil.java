package com.mediconnect.mediconnect.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utility class for generating and validating JWT tokens.
 */
@Component
public class JwtUtil {

    private final Key secretKey;
    private final long jwtExpirationMs;

    // Constructor for Spring or manual instantiation in tests
    public JwtUtil(String secret, long jwtExpirationMs) {
        if (secret.length() < 32) {
            throw new IllegalArgumentException("Secret key must be at least 32 characters long for HS256");
        }
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.jwtExpirationMs = jwtExpirationMs;
    }

    /**
     * Generates a JWT token for a given username.
     *
     * @param username the username to encode in the token
     * @return a signed JWT token
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts username (subject) from the token.
     *
     * @param token JWT token
     * @return username
     */
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Checks if token is valid for a username.
     *
     * @param token    JWT token
     * @param username expected username
     * @return true if valid
     */
    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    /**
     * Validates token against UserDetails.
     *
     * @param token       JWT token
     * @param userDetails Spring Security UserDetails
     * @return true if valid
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        return isTokenValid(token, userDetails.getUsername());
    }

    /**
     * Extracts all claims from the token.
     *
     * @param token JWT token
     * @return Claims object
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Checks if token is expired.
     *
     * @param token JWT token
     * @return true if expired
     */
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
