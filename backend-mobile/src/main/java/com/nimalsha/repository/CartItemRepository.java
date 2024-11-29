package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

    
    
}
