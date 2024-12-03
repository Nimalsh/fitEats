package com.nimalsha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nimalsha.repository.OrderHistoryRepository;
import com.nimalsha.model.OrderHistory;

@Controller
@RestController("/api/order-history")
public class OrderHistoryController {

    @Autowired
    private OrderHistoryRepository orderHistoryRepository;
   
    @GetMapping("/all")
    public ResponseEntity<List<OrderHistory>> getOrderHistory() {
        return orderHistoryRepository.findAll().isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(orderHistoryRepository.findAll());
    }

    @PutMapping("/update")
    public ResponseEntity<OrderHistory> updateOrderHistory(@RequestBody OrderHistory orderHistory) {
        return orderHistoryRepository.existsById(orderHistory.getOrderId()) ? ResponseEntity.ok(orderHistoryRepository.save(orderHistory)) : ResponseEntity.notFound().build();
    }
}
