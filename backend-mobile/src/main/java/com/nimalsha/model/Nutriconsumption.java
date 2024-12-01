package com.nimalsha.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Nutriconsumption {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; 
    private Long planId;
    private int daysId;
    private Double calories;
    private Double  carbohydrates;
    private Double  fiber;
    private Double  sugars;
    private Double  fat;
    private Double  protein;
    private Double  sodium;

   
}