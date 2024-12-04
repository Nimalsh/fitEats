package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Autoplanextra {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    
  
    private String breakfast;
    private String breakfastIngredients;
    private String breakfastImage;
    private double breakfastCalories;
    
    
    private String lunch;
    private String lunchIngredients;
    private String lunchImage;
    private double lunchCalories;
    

    private String dinner;
    private String dinnerIngredients;
    private String dinnerImage;
    private double dinnerCalories;
    
    

   
}
