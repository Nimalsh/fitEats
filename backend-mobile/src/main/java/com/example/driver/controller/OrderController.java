package com.example.driver.controller;

import com.example.driver.model.CartItem;
import com.example.driver.model.Order;
import com.example.driver.model.User;
import com.example.driver.request.AddCartItemRequest;
import com.example.driver.request.OrderRequest;
import com.example.driver.request.DriverAssignmentRequest; // Import the request model for driver assignment
import com.example.driver.service.OrderService;
import com.example.driver.service.UserService;
import com.example.driver.service.DriverrService; // Import the service for handling driver-related operations

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private DriverrService driverrService; // Add this for handling driver assignments

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req, user);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/assign-driver")
    public ResponseEntity<String> assignDriver(@PathVariable Long orderId, @RequestBody DriverAssignmentRequest request) {
        Long driverId = request.getDriverId();
        
        // Check if the driver is available
        boolean driverAvailable = driverrService.isDriverAvailable(driverId);
        
        if (!driverAvailable) {
            return new ResponseEntity<>("Driver is not available", HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>("Driver assigned successfully", HttpStatus.OK);
    }
    
    
}
