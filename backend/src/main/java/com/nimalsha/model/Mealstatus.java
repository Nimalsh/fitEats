package com.nimalsha.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data // Lombok will generate getters, setters, toString, equals, and hashCode methods
public class Mealstatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long planId;
    private Long userId;
    private int daysId;
    private boolean breakfast; // Changed from String to boolean
    private boolean lunch;     // Changed from String to boolean
    private boolean dinner;
    private boolean marked;    // Changed from String to boolean
}

