package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
}
