package com.example.driver.controller;
/* 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.driver.model.Driver;
import com.example.driver.request.DriverAssignmentRequest;
import com.example.driver.service.DriverrService;
import com.example.driver.service.NotificationService;

@RestController
@RequestMapping("/api/drivers")
*/
public class DriverrController {

/*  private final DriverrService driverrService;
    private final NotificationService notificationService;

    @Autowired
    public DriverController(DriverrService driverService, NotificationService notificationService) {
        this.driverrService = driverrService;
        this.notificationService = notificationService;
    }

    @PostMapping("/notify-driver")
    public ResponseEntity<String> notifyDriver(@RequestBody DriverAssignmentRequest request) {
        try {
            // Fetch available drivers
            List<Driver> availableDrivers = driverrService.getAvailableDrivers();

            for (Driver driver : availableDrivers) {
                // Implement WebSocket client to send notifications
                sendNotification(driver.getId(), "New assignment request");
            }

            return ResponseEntity.ok("Driver assignment notification processed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error processing driver assignment notification");
        }
    }

    private void sendNotification(Long driverId, String message) {
        // Implement WebSocket client to send a message to the WebSocket server
        // For example, using WebSocketTemplate or WebSocketClient
    }
         */ 
}
