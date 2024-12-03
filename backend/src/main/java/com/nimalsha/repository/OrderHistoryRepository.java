package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.OrderHistory;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, String> {

    
}
