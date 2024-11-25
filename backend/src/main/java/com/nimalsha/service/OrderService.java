package com.nimalsha.service;

import java.util.List;

import com.nimalsha.dto.OrderDTO;
import com.nimalsha.model.Order;
import com.nimalsha.model.User;
import com.nimalsha.request.OrderRequest;

public interface
OrderService {

    public Order createOrder(OrderRequest order, User user ) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public void cancleOder(Long orderId) throws Exception;

    public List<OrderDTO> getUsersOrder (Long userId) throws Exception;

    public List<Order> getRestaurantOrder(Long restaurantId, String oderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;

    public List<OrderDTO> getRestaurantOrders(Long restaurantId) throws Exception;
    
}
