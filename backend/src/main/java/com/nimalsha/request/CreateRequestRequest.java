package com.nimalsha.request;

import lombok.Data;

@Data
public class CreateRequestRequest {
    private String title;
    
    private Long nutritionistId; 
    private String status;
    private double currentWeight;
    private double weightGoal;
    private int duration;
    private int age;
    private double height;
    private String gender;
    private String dietaryPreferences;
    private String dietaryRestrictions;
    private String activityLevel;
    private int mealsPerDay;
    private String nutritionistName;
}

