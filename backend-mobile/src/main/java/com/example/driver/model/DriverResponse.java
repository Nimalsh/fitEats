package com.example.driver.model;

public class DriverResponse {
    private Long driverId;
    private boolean accepted; // Whether the driver accepted the order or not

    // Constructor
    public DriverResponse(Long driverId, Long orderId, boolean accepted) {
        this.driverId = driverId;
        this.accepted = accepted;
    }

    // Getters and Setters
    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
