package com.example.driver.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.driver.model.DriverNotification;

public interface NotificationRepository extends JpaRepository<DriverNotification, Long> {

    // Find notification by driverId
List<DriverNotification> findByDriverId(Long driverId);
void deleteByCreatedAtBefore(LocalDateTime cutoffTime);
}
