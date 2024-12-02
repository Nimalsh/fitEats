package com.nimalsha.service;
import com.nimalsha.dto.PaymentRequest;
import com.nimalsha.dto.PayHereNotification;
import java.util.List;
import java.util.Map;

public interface PaymentService {
    Map<String, Object> generatePaymentDetails(PaymentRequest request);
    boolean validateNotification(PayHereNotification notification);
    
}
