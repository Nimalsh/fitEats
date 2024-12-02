package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Mealplan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long planId;
    private String title;
    private int duration;
    private Long userId;
    private String status; 
    private double weight;
    private double height;
    private double bmi;
    private double target;
    private String gender;
    private double calories;
    private double protein ; 
    private double fat ; 
    private double carbohydrates; 
    private double fiber; 
    private double sodium; 
    private double sugar;
    private int age;
    private String activitylevel;
    private String dietaryPreferences;
    private String dietaryRestrictions;
    private double afterweight;

   
}
