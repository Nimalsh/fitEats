package com.nimalsha.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data // Lombok will generate getters, setters, toString, equals, and hashCode methods
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long planId;

    private int duration;
    private Long userId;
    private String status; 
    private Long nutritionistId;

    
    
}
