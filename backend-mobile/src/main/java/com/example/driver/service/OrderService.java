package com.example.driver.service;

import java.util.List;

import com.example.driver.model.Order;
import com.example.driver.model.User;
import com.example.driver.request.OrderRequest;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user ) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public void cancleOder(Long orderId) throws Exception;

    public List<Order> getUsersOrder(Long userId) throws Exception;

    public List<Order> getRestaurantOrder(Long restaurantId, String oderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;


    
}
