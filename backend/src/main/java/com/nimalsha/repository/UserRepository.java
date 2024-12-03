package com.nimalsha.repository;

import com.nimalsha.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    public  User findByEmail(String username);
    List<User> findBySignUpDate(LocalDate signupDate);
}
