package com.example.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.driver.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

    
    
}
