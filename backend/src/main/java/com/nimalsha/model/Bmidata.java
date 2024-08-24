package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Bmidata {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // Unique ID for Bmidaysdata

    private Long planId;
    private int daysId; // Add this field to store the day number

    private Long breakfastId;
    private Long lunchId;
    private Long dinnerId;
    private Long snackId;

    // Getters and Setters (Lombok @Data will generate these automatically)
}
