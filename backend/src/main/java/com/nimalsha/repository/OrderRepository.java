package com.nimalsha.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nimalsha.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    public List<Order> findByCustomerId(Long userId);

    public List<Order> findByRestaurantId(Long restaurantId);

    // Added a custom query to fetch orders with customer details
    @Query("SELECT o FROM Order o JOIN FETCH o.customer WHERE o.restaurant.id = :restaurantId")
    public List<Order> findOrdersByRestaurantIdWithCustomer(Long restaurantId); // Added this query

}
