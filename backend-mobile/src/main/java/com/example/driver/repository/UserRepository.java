package com.example.driver.repository;

import com.example.driver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    public  User findByEmail(String username);
}
