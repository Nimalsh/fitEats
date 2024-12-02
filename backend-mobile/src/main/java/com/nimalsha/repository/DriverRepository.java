package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nimalsha.model.Driver;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    // Custom queries or methods can be defined here if needed
    Driver findByEmail(String email);
}
