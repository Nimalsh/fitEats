package com.example.driver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.driver.model.DriverNotification;
import com.example.driver.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Endpoint to send a notification to available drivers
    @PostMapping("/assign-driver")
    public ResponseEntity<String> assignDriver(@RequestBody String message) {
        notificationService.sendNotificationToAvailableDrivers(message);
        return ResponseEntity.ok("Notification sent to available drivers.");
    }

    // Endpoint to get notifications for a specific driver
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DriverNotification>> getNotificationsForDriver(@PathVariable Long driverId) {
        List<DriverNotification> notifications = notificationService.getNotificationsForDriver(driverId);
        if (notifications.isEmpty()) {
            return ResponseEntity.noContent().build(); // Handle empty list
        }
        return ResponseEntity.ok(notifications); // Return list of notifications
    }
    


    // Endpoint to respond to a notification (accept or decline)
    @PostMapping("/respond")
    public ResponseEntity<String> respondToNotification(@RequestBody ResponseRequest responseRequest) {
    System.out.println("Driver ID: " + responseRequest.getDriverId());
    System.out.println("Status: " + responseRequest.getStatus());

    try {
        boolean success = notificationService.processDriverResponse(responseRequest.getDriverId(), responseRequest.getStatus());
        if (success) {
            return ResponseEntity.ok("Response recorded successfully.");
        } else {
            System.out.println("No matching notification found for driver ID: " + responseRequest.getDriverId());
            return ResponseEntity.badRequest().body("Failed to record response.");
        }
    } catch (Exception e) {
        System.err.println("Error processing response: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
    }
}


    public class ResponseRequest {
        private Long driverId;
        private String status; // ACCEPTED or DECLINED
    
        // Getters and setters
    
        public Long getDriverId() {
            return driverId;
        }
    
        public void setDriverId(Long driverId) {
            this.driverId = driverId;
        }
    
        public String getStatus() {
            return status;
        }
    
        public void setStatus(String status) {
            this.status = status;
        }

    }
}