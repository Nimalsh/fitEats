package com.nimalsha.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data // Lombok will generate getters, setters, toString, equals, and hashCode methods
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long requestId;

    private String title;
    private Long userId;
    private Long planId;
    private Long nutritionistId; 
    private String name;
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
}
