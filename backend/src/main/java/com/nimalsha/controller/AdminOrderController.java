package com.nimalsha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nimalsha.dto.OrderDTO;
import com.nimalsha.model.Order;
import com.nimalsha.model.User;
import com.nimalsha.request.OrderRequest;
import com.nimalsha.service.OrderService;
import com.nimalsha.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(
            @PathVariable Long id,
            @RequestParam(required = false) String order_status,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getRestaurantOrder(id, order_status);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/order/{id}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @PathVariable String orderStatus,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Order orders = orderService.updateOrder(id, orderStatus);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // New function to get restaurant-specific orders along with customer details
    @GetMapping("/orders/{restaurantId}")
    public ResponseEntity<List<OrderDTO>> getRestaurantOrders(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt); // Validating the JWT for user context.
        List<OrderDTO> orders = orderService.getRestaurantOrders(restaurantId); // Fetching restaurant orders.
        
        // Debugging log to confirm orders fetched
        System.out.println("Fetched orders from database: " + orders); 

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // New function to get restaurant orders along with customer details (using the new service method)
    @GetMapping("/orders/details/{restaurantId}")
    public ResponseEntity<List<Order>> getRestaurantOrdersWithCustomer(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt); // Validating the JWT for user context.
        List<Order> orders = orderService.getRestaurantOrdersWithCustomer(restaurantId); // Fetch orders with customer details.

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
