package com.nimalsha.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.nimalsha.dto.PayHereNotification;
import com.nimalsha.dto.PaymentRequest;
import com.nimalsha.service.PaymentService;
import com.nimalsha.service.UserService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentController {

     

    @Autowired
    private PaymentService paymentService;

    @PostMapping("payments/start")
    public ResponseEntity<Map<String, Object>> startPayment(@RequestBody PaymentRequest request) {
        Map<String, Object> paymentDetails = paymentService.generatePaymentDetails(request);
        return ResponseEntity.ok(paymentDetails);
    }

    @PostMapping("/notify")
public ResponseEntity<String> handleNotification(@RequestBody PayHereNotification notification) {
    // Log notification details for debugging
    System.out.println("Received Notification: " + notification);

    boolean isValid = paymentService.validateNotification(notification);

    if (isValid) {
        // Log the status code for debugging
        System.out.println("Valid Notification. Status Code: " + notification.getStatus_code());

        if ("2".equals(notification.getStatus_code())) {
            // Payment is successful
            System.out.println("Payment Successful for Order ID: " + notification.getOrder_id());
            return ResponseEntity.ok("Payment successful");
        } else {
            // Handle other status codes
            System.out.println("Payment Not Successful. Status Code: " + notification.getStatus_code());
            return ResponseEntity.badRequest().body("Payment not successful");
        }
    } else {
        // Log invalid hash
        System.out.println("Invalid Notification Hash");
        return ResponseEntity.badRequest().body("Invalid hash");
    }
}

    
}
