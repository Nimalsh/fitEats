
// OrderItemDTO.java
package com.nimalsha.dto;

public class OrderItemDTO {
    private String foodName;
    private int quantity;
    private Long totalPrice;

    public OrderItemDTO(String foodName, int quantity, Long totalPrice) {
        this.foodName = foodName;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }
}