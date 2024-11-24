// OrderDTO.java
package com.nimalsha.dto;

import java.util.Date;
import java.util.List;

public class OrderDTO {
    private Long id;
    private Date createdAt;
    private String orderStatus;
    private Long totalPrice;
    private List<OrderItemDTO> items;

    public OrderDTO(Long id, Date createdAt, String orderStatus, Long totalPrice, List<OrderItemDTO> items) {
        this.id = id;
        this.createdAt = createdAt;
        this.orderStatus = orderStatus;
        this.totalPrice = totalPrice;
        this.items = items;
    }

    // Getters and Setters
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
}