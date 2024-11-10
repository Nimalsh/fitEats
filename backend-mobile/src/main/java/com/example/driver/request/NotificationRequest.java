package com.example.driver.request;

public class NotificationRequest {

    private Long driverId;
    private String message;

    // Constructor
    public NotificationRequest() {
    }
    public NotificationRequest(String message) {
        this.message = message;
    }

    // Getter for driverId
    public Long getDriverId() {
        return driverId;
    }

    // Setter for driverId
    public void setDriverId(Long driverId) {
        this.driverId = driverId;
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
