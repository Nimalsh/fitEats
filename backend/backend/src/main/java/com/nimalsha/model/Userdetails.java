package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Userdetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;  // Primary key with auto-generated value

    private Long userId;  // Regular field, not a primary key

   
    private String username;
    private double currentWeight;
    private int age;
    private double height;
    private double bmi;
    private String gender;
    private String dietaryPreferences;
    private String dietaryRestrictions;
    private String specials;
    private String activityLevel;
}