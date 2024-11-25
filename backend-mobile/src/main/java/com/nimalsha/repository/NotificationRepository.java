package com.nimalsha.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nimalsha.model.DriverNotification;

@Repository
public interface NotificationRepository extends JpaRepository<DriverNotification, Long> {

    // Find notifications by driverId
    List<DriverNotification> findByDriverId(Long driverId);

    // Find active notifications by driverId (exclude specific statuses)
    @Query("SELECT dn FROM DriverNotification dn WHERE dn.driverId = :driverId AND dn.status NOT IN ('Accepted', 'Picked Up', 'Delivered')")
    List<DriverNotification> findActiveNotifications(@Param("driverId") Long driverId);

    // Delete notifications created before a certain time
    @Modifying
    @Transactional
    @Query("DELETE FROM DriverNotification dn WHERE dn.createdAt < :cutoffTime")
    void deleteByCreatedAtBefore(@Param("cutoffTime") LocalDateTime cutoffTime);

    // Update the status of notifications by driverId
    @Modifying
    @Transactional
    @Query("UPDATE DriverNotification dn SET dn.status = :status WHERE dn.driverId = :driverId")
    void updateStatusByDriverId(@Param("driverId") Long driverId, @Param("status") String status);
}
