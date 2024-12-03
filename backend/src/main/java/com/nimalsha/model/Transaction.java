package com.nimalsha.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    private Long transactionId;
    private LocalDate date;
    private String time;
    private String paymentDoneBy;
    private String paymentDoneTo;
    private String orderAppointmentId;
    private String totalPayment;
    private String userType;
}
