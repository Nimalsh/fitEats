package com.example.driver.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.driver.model.DriverNotification;
import com.example.driver.repository.DriverrRepository;
import com.example.driver.repository.NotificationRepository;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    @Autowired
    private DriverrRepository driverrRepository;

    @Autowired
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void updateAssignmentStatus(Long driverId, String status) {
        // Find the notification for the given driver ID
        List<DriverNotification> notifications = notificationRepository.findByDriverId(driverId);

        // Update each notification with the new status
        for (DriverNotification notification : notifications) {
            notification.setStatus(status); // "Accepted" or "Cancelled"
            notificationRepository.save(notification); // Save updated status
        }
    }

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


public void deleteOldNotifications() {
    LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(115);
    notificationRepository.deleteByCreatedAtBefore(cutoffTime);
}
}
