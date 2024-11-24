package com.example.driver.dto;

public class OrderAcceptanceRequest {
    private Long orderId;
    private Long driverId;

    // Constructor
    public OrderAcceptanceRequest(Long orderId, Long driverId) {
        this.orderId = orderId;
        this.driverId = driverId;
    }

    // Getters and setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }
}
