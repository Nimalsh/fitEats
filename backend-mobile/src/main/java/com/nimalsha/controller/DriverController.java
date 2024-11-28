package com.nimalsha.controller;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimalsha.model.Driver;
import com.nimalsha.repository.DriverRepository;
import com.nimalsha.request.DriverAssignmentRequest;
import com.nimalsha.service.DriiverService;
import com.nimalsha.service.NotificationService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriiverService driiverService;
    private final NotificationService notificationService; // Add NotificationService

    @Autowired
    public DriverController(DriiverService driiverService, NotificationService notificationService) {
        this.driiverService = driiverService;
        this.notificationService = notificationService; // Inject NotificationService
    }


    // Create a new driver
    @PostMapping("/register")
    public ResponseEntity<String> registerDriver(@RequestBody Driver driver) {
        try {
            driiverService.saveDriver(driver);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user: " + e.getMessage());
        }
    }

    // Login driver
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
    
        Driver driver = driiverService.findByEmail(email);
    
        if (driver == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(null, "Driver not found"));
        }
    
        if (!driver.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(null, "Invalid credentials"));
        }
    
        // Return the user id and a success message
        return ResponseEntity.ok(new LoginResponse(driver.getId(), "Login successful"));
    }
    
    // Get a driver by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getDriverById(@PathVariable Long id) {
        Optional<Driver> driver = driiverService.getDriverById(id);
        if (driver.isPresent()) {
            return ResponseEntity.ok(driver.get());
        } else {
            // Custom error response
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(new ErrorResponse("Driver not found with id " + id));
        }
    }

    // Get all drivers
    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driiverService.getAllDrivers();
        return ResponseEntity.ok(drivers);
    }

    @Autowired
    private DriverRepository driverRepository;
    
    // Update a driver
    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return driverRepository.findById(id).map(driver -> {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "fullName" -> driver.setFullName((String) value);
                    case "address" -> driver.setAddress((String) value);
                    case "telephoneNumber" -> driver.setTelephoneNumber((String) value);
                    case "nationalId" -> driver.setNationalId((String) value);
                    case "email" -> driver.setEmail((String) value);
                    case "gender" -> driver.setGender((String) value);
                    case "vehicleName" -> driver.setVehicleName((String) value);
                    case "vehicleModel" -> driver.setVehicleModel((String) value);
                    case "plateNumber" -> driver.setPlateNumber((String) value);
                    case "availability" -> driver.setAvailable((Boolean) value); // Handling availability update
                }
            });
            return ResponseEntity.ok(driverRepository.save(driver));
        }).orElseThrow(() -> new RuntimeException("Driver not found with id " + id));
    }

    // Update driver availability separately
    @PutMapping("/{id}/availability")
    public ResponseEntity<String> updateDriverAvailability(@PathVariable Long id, @RequestBody Map<String, Boolean> availabilityUpdate) {
        try {
            driiverService.updateDriverAvailability(id, availabilityUpdate.get("availability"));
            return ResponseEntity.ok("Driver availability updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Driver not found with id " + id);
        }
    }

    // Delete a driver by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDriver(@PathVariable Long id) {
        try {
            driiverService.deleteDriver(id);
            return ResponseEntity.ok("Driver deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error deleting driver: " + e.getMessage());
        }
    }

    // Error response class
    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    // Login response class
    public static class LoginResponse {
        private Long id; // Changed to Long from String
        private String message;
    
        // Default constructor
        public LoginResponse() {}
    
        // Parameterized constructor
        public LoginResponse(Long id, String message) {
            this.id = id;
            this.message = message;
        }
    
        // Getter for id
        public Long getId() {
            return id;
        }
    
        // Setter for id
        public void setId(Long id) {
            this.id = id;
        }
    
        // Getter for message
        public String getMessage() {
            return message;
        }
    
        // Setter for message
        public void setMessage(String message) {
            this.message = message;
        }
    }

    // Handle driver assignment notification
    @PostMapping("/notify-driver")
    public ResponseEntity<String> notifyDriver(@RequestBody DriverAssignmentRequest request) {
        try {
            // Update driver availability
            driiverService.updateDriverAvailability(request.getDriverId(), true); // Mark the driver as available
    
            // Send notification to mobile backend
            String notificationMessage = "A new order with ID " + request.getOrderId() + " is available for assignment.";
            notificationService.sendNotificationToAvailableDrivers(notificationMessage); // Pass the message
    
            return ResponseEntity.ok("Driver assignment notification processed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing driver assignment notification");
        }
    }

        // Getters and setters

    
}