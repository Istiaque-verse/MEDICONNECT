package com.mediconnect.mediconnect.repository;
import com.mediconnect.mediconnect.model.User;

/* CRUD and query methods for User entity.*/
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}