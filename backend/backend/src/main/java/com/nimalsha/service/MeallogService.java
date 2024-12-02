package com.nimalsha.service;

import com.nimalsha.model.Meallog;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Map;

public interface MeallogService {

    // Method to create or update a meal log entry for a user
    Meallog createOrUpdateMeallog(Long userId, LocalDate date) throws Exception;
    public void addMealToLog(Long userId, LocalDate date, String mealType, String item, String measurement, int quantity) throws Exception;
    public Map<String, Object> getMealsByDate(Long userId, LocalDate date) throws Exception ;
    public Meallog updateNutritionConsumption(LocalDate date, Map<String, Double> nutritionValues);
    public Map<String, Double> getNutritionValues(LocalDate date) ;
    public String getStatusByDateAndUserId(LocalDate date, Long userId);
}

