package com.mediconnect.mediconnect.security;

import com.mediconnect.mediconnect.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTest {

    private JwtUtil jwtUtil;
    private final String TEST_USERNAME = "test@example.com";

    @BeforeEach
    void setUp() {
        // ✅ Provide a test secret and expiration time (1 hour = 3600000 ms)
        jwtUtil = new JwtUtil("my-secret-key-for-testing-1234567890123456", 3600000L);
    }

    @Test
    void testGenerateToken() {
        String token = jwtUtil.generateToken(TEST_USERNAME);
        assertNotNull(token, "Token should not be null");
        assertTrue(token.length() > 0, "Token should not be empty");
    }

    @Test
    void testExtractUsername() {
        String token = jwtUtil.generateToken(TEST_USERNAME);
        String extractedUsername = jwtUtil.extractUsername(token);
        assertEquals(TEST_USERNAME, extractedUsername, "Extracted username should match the original");
    }

    @Test
    void testTokenValidation() {
        String token = jwtUtil.generateToken(TEST_USERNAME);
        assertTrue(jwtUtil.isTokenValid(token, TEST_USERNAME), "Token should be valid");
    }

    @Test
    void testTokenValidationWithWrongUsername() {
        String token = jwtUtil.generateToken(TEST_USERNAME);
        assertFalse(jwtUtil.isTokenValid(token, "wrong@example.com"), "Token should be invalid for wrong username");
    }
}
