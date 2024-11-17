package com.example.driver.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

import com.example.driver.model.Driver;

public interface DriverrRepository extends CrudRepository<Driver, Long> {
    
    @Query("SELECT d.id FROM Driver d WHERE d.isAvailable = true")
    List<Long> findAvailableDrivers();
}
