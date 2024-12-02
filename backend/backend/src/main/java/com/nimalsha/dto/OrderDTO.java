package com.nimalsha.dto;

import java.util.Date;
import java.util.List;

public class OrderDTO {
    private Long id;
    private Date createdAt;
    private String orderStatus;
    private Long totalPrice;
    private List<OrderItemDTO> items;
    private String customerName;  // Added customer name
    private String customerEmail; // Added customer email

    // Constructor to include customerName and customerEmail
    public OrderDTO(Long id, Date createdAt, String orderStatus, Long totalPrice, List<OrderItemDTO> items, String customerName, String customerEmail) {
        this.id = id;
        this.createdAt = createdAt;
        this.orderStatus = orderStatus;
        this.totalPrice = totalPrice;
        this.items = items;
        this.customerName = customerName;  // Set customer name
        this.customerEmail = customerEmail; // Set customer email
    }

    // Getters and Setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
}
