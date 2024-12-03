package com.nimalsha.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistory {
    private String orderId;
    private String userId;
    private String restaurantId;
    private String deliveryDriverId;
    private String orderDate;
    private String transactionId;
    private String transactionAmount;
    private String status;
}
