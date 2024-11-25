package com.nimalsha.request;

public class DriverrAssignmentRequest {
    
    private Long orderId;
    private Long driverId;

    // Getter and setter for orderId
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    // Getter and setter for driverId
    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }
}
