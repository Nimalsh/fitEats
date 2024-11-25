package com.nimalsha.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mobile")
public class MobileNotificationController {

    @PostMapping("/notifications")
    public ResponseEntity<String> receiveNotification(@RequestBody NotificationPayload notificationPayload) {
        // Handle the notification received for the driver
        System.out.println("Notification received for driver: " + notificationPayload.getDriverId());
        System.out.println("Message: " + notificationPayload.getMessage());

        // Handle logic to display this in the app in real-time
        // For example, using Firebase Cloud Messaging, WebSockets, or any other real-time service

        return ResponseEntity.ok("Notification received by mobile backend.");
    }

    public static class NotificationPayload {
        private Long driverId;
        private String message;

        // Getters and setters
        public Long getDriverId() {
            return driverId;
        }

        public void setDriverId(Long driverId) {
            this.driverId = driverId;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}

