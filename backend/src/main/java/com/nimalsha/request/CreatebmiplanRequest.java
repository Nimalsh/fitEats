package com.nimalsha.request;

import lombok.Data;

@Data
public class CreatebmiplanRequest {
    private int duration; // Number of days for the plan
    private Long userId;  // User ID for whom the plan is created
    private String status; // Status of the plan (e.g., "Active", "Inactive")
    private double weight; // Current weight of the user
    private double height; // Height of the user
    private double bmi; // Body Mass Index value
    private double target; // Target weight or goal for the plan
}
