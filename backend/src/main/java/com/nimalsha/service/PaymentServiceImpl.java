package com.nimalsha.service;

import com.nimalsha.dto.PaymentRequest;
import com.nimalsha.dto.PayHereNotification;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@Service
public class PaymentServiceImpl implements PaymentService {

    private static final String MERCHANT_ID = "1228895"; // Replace with your Merchant ID
    private static final String MERCHANT_SECRET = "NTA2ODAyODE5MTUyMDc4NzUzNjg0ODAzNzAwNzI1ODE2MDU5MDY=";

    @Override
    public Map<String, Object> generatePaymentDetails(PaymentRequest request) {
        String orderId = UUID.randomUUID().toString(); // Generate unique order ID
        double amount = request.getAmount();

        // Generate hash
        String hash = generateHash(MERCHANT_ID, orderId, amount, "LKR", MERCHANT_SECRET);

        // Prepare payment details
        Map<String, Object> paymentDetails = new HashMap<>();
        paymentDetails.put("sandbox", true);
        paymentDetails.put("merchant_id", MERCHANT_ID);
        paymentDetails.put("return_url", "http://localhost:3000/payment-success");
        paymentDetails.put("cancel_url", "http://localhost:3000/payment-cancel");
        paymentDetails.put("notify_url", "http://localhost:5454/api/notify");
        paymentDetails.put("order_id", orderId);
        paymentDetails.put("items", request.getItems());
        paymentDetails.put("amount", amount);
        paymentDetails.put("currency", "LKR");
        paymentDetails.put("hash", hash);
        paymentDetails.put("first_name", request.getFirstName());
        paymentDetails.put("last_name", request.getLastName());
        paymentDetails.put("email", request.getEmail());
        paymentDetails.put("phone", request.getPhone());
        paymentDetails.put("address", request.getAddress());
        paymentDetails.put("city", request.getCity());
        paymentDetails.put("country", request.getCountry());
        return paymentDetails;
    }

    @Override
    public boolean validateNotification(PayHereNotification notification) {
        String expectedHash = generateNotificationHash(
            notification.getMerchant_id(),
            notification.getOrder_id(),
            notification.getPayhere_amount(),
            notification.getPayhere_currency(),
            notification.getStatus_code(),
            MERCHANT_SECRET
        );
        return expectedHash.equals(notification.getHash());
    }

    private String generateHash(String merchantId, String orderId, double amount, String currency, String merchantSecret) {
        String formattedAmount = String.format("%.2f", amount);
        String secretHash = md5(merchantSecret);
        String data = merchantId + orderId + formattedAmount + currency + secretHash.toUpperCase();
        return md5(data).toUpperCase();
    }

    private String generateNotificationHash(String merchantId, String orderId, String amount, String currency, String statusCode, String merchantSecret) {
        String secretHash = md5(merchantSecret);
        String data = merchantId + orderId + amount + currency + statusCode + secretHash.toUpperCase();
        return md5(data).toUpperCase();
    }

    private String md5(String data) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashInBytes = md.digest(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder result = new StringBuilder();
            for (byte b : hashInBytes) {
                result.append(String.format("%02x", b));
            }
            return result.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 algorithm not found");
        }
    }
    
}
