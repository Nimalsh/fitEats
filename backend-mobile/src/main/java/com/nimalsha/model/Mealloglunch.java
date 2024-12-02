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
public class Mealloglunch{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; 
    private Long lunchId;
    private String item;
    private String measurement;
    private int quantity;
   
}