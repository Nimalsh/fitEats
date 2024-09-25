package com.example.driver.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import com.example.driver.model.DriverNotification;
import com.example.driver.repository.DriverrRepository;
import com.example.driver.repository.NotificationRepository;


@Service
public class NotificationService {

    @Autowired
    private DriverrRepository driverrRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // Send notification to all available drivers
    public void sendNotificationToAvailableDrivers(String message) {
        List<Long> availableDrivers = driverrRepository.findAvailableDrivers();
        availableDrivers.forEach(driverId -> {
            DriverNotification notification = new DriverNotification(driverId, message);
            notificationRepository.save(notification); // Store notification temporarily
        });
    }

    public List<DriverNotification> getNotificationsForDriver(Long driverId) {
        return notificationRepository.findByDriverId(driverId);
    }
    

    // Get notification for a specific driver
    public List<DriverNotification> getNotificationForDriver(Long driverId) {
        // Retrieve the notification or return null if not present
        return notificationRepository.findByDriverId(driverId);
    }
    
    

    // Process the driver's response (accept or decline)
    public boolean processDriverResponse(Long driverId, String status) {
    try {
        List<DriverNotification> notifications = notificationRepository.findByDriverId(driverId);
        if (!notifications.isEmpty()) {
            DriverNotification notification = notifications.get(0);
            notification.setStatus(status);
            notificationRepository.save(notification);
            return true;
        } else {
            System.out.println("No notifications found for driver ID: " + driverId);
            return false;
        }
    } catch (Exception e) {
        System.out.println("Error in processDriverResponse: " + e.getMessage());
        return false;
    }
}


    @Service
    public class NotificationCleanupService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Scheduled(fixedRate = 5 * 60 * 1000) // Every 5 minutes
    public void removeExpiredNotifications() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(5);
        notificationRepository.deleteByCreatedAtBefore(cutoffTime);
    }
    }
}
