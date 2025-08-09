package com.mediconnect.mediconnect.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JwtUtil is responsible for generating and validating JWT tokens.
 */

@Component
public class JwtUtil {

    // Secret key used to sign the JWT token (must be 32 characters or more)
    private final String SECRET = "your-very-secure-secret-key-of-32-characters!";

    /**
     * Generates a JWT token for a given username.
     * @param username the username to encode in the token
     * @return a signed JWT token
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // subject is the username
                .setIssuedAt(new Date()) // current timestamp
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // valid for 1 day
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the username from the token.
     * @param token JWT token
     * @return username
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validates token with username and expiry.
     * @param token the token to validate
     * @param username the username to match
     * @return true if valid, false otherwise
     */
    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    /**
     * Checks if token is expired.
     * @param token JWT token
     * @return true if expired
     */
    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}