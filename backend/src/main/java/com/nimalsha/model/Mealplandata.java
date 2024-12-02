package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Mealplandata {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long planId;
    private int daysId;
  
    private String breakfast;
    private String breakfastIngredients;
    private String breakfastImage;
    private double breakfastCalories;
    private boolean breakfaststatus;
    
    private String lunch;
    private String lunchIngredients;
    private String lunchImage;
    private double lunchCalories;
    private boolean lunchstatus;

    private String dinner;
    private String dinnerIngredients;
    private String dinnerImage;
    private double dinnerCalories;
    private boolean dinnerstatus;

   
}
