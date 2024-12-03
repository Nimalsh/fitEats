package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Bmiplan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long planId;

    private int duration;
    private Long userId;
    private String status; 
    private double weight;
    private double height;
    private double bmi;
    private double target;

   
}
