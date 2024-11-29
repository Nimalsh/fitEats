package com.nimalsha.dto;

import java.util.List;

public class OrderItemDTO {
    private String foodName;
    private int quantity;
    private Long totalPrice;
    private List<String> ingredients; // Add ingredients list

    public OrderItemDTO(String foodName, int quantity, Long totalPrice, List<String> ingredients) {
        this.foodName = foodName;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.ingredients = ingredients; // Initialize ingredients
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

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}
