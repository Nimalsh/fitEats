package com.nimalsha.request;

import lombok.Data;

@Data
public class UserdetailsRequest {
   
    private double currentWeight;
    private int age;
    private double height;
    private String gender;
    private String dietaryPreferences;
    private String dietaryRestrictions;
    private String activityLevel;
    private String specials;
}