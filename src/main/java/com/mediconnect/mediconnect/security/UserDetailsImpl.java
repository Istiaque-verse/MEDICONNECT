package com.mediconnect.mediconnect.security;
/*Implements Spring Security’s UserDetails interface to provide user info for authentication. */
import com.mediconnect.mediconnect.model.User;
import com.mediconnect.mediconnect.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Loads user details from the database for authentication.
 */
@Service
public class UserDetailsImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Load user by username (email here).
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + email);
        }

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()  // Add roles or authorities here if needed
        );
    }
}