package com.nimalsha.model;

public class ResponseRequest {
    private Long driverId;
    private String status; // Values can be "Pending", "Accepted", "Picked Up", "Delivered", or "Cancelled"

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
