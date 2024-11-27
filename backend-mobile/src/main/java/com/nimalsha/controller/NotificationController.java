package com.nimalsha.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimalsha.model.DriverNotification;
import com.nimalsha.model.ResponseRequest;
import com.nimalsha.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

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
    @PostMapping("/driver-response")
public ResponseEntity<String> handleDriverResponse(@RequestBody ResponseRequest response) {
    logger.info("Received response request: " + response);
    try {
        notificationService.updateAssignmentStatus(response.getDriverId(), response.getStatus());
        logger.info("Response successfully recorded for driverId: " + response.getDriverId() + " with status: " + response.getStatus());
        return ResponseEntity.ok("Response recorded successfully with status: " + response.getStatus());
    } catch (Exception e) {
        logger.error("Error handling driver response", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error recording response");
    }
}

}