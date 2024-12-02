package com.nimalsha.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class IngredientsItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    private IngredientCategory category;

    @JsonIgnore
    @ManyToOne
    private Restaurant restaurant;

    private boolean inStoke = true;

    // Nutritional information
    private Double calories;
    private Double protein; 
    private Double carbohydrates;
    private Double fat;
    
    // Added fields for additional nutritional information
    private Double totalVitamins;  // Total amount of vitamins
    private Double totalSugar;     // Total amount of sugar
    private Double totalIron;      // Total amount of iron
}
