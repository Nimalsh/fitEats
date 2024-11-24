package com.example.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.driver.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
}
