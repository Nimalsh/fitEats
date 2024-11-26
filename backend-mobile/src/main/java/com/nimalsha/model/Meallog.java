package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Meallog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // Unique primary key for each meallog entry

    private Long userId; // ID of the user

   
    private Long meallogId; // Unique ID for each meallog entry

    private LocalDate date; // Date for the meal log

    private Long breakfastId; // ID for breakfast meal

    private Long lunchId; // ID for lunch meal

    private Long dinnerId; // ID for dinner meal

    private Long snackId; // ID for snack meal

    private String status;
    private Double calories;
    private Double  carbohydrates;
    private Double  fiber;
    private Double  sugars;
    private Double  fat;
    private Double  protein;
    private Double  sodium;

}
