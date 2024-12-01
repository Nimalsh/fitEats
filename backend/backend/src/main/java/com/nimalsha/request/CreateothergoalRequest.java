package com.nimalsha.request;

import lombok.Data;

@Data

public class CreateothergoalRequest {

    private String title;
    private String description;
    
    private Long nutritionistId; 
    private String status;
    private double currentWeight;
    
    
    private int age;
    private double height;
    private String gender;
    private String dietaryPreferences;
    private String dietaryRestrictions;
    private String activityLevel;
    private int mealsPerDay;
    
}