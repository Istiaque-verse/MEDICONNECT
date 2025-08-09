package com.mediconnect.mediconnect.dto;
/*Contains login credentials (email, password).
Validates inputs before authentication. */
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Contains login credentials (email, password).
 * Validates inputs before authentication.
 */
public class LoginRequest {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

    

