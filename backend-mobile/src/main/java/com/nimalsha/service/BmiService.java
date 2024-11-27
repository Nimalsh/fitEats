package com.nimalsha.service;

import java.util.List;
import java.util.Map;

import com.nimalsha.model.Bmiplan;
import com.nimalsha.model.Nutriconsumption;
import com.nimalsha.request.AddMealRequest;
import com.nimalsha.request.CreatebmiplanRequest;

public interface BmiService {
    
    Bmiplan createPlan(CreatebmiplanRequest request) throws Exception;
    Long getMealId(Long planId, int daysId, String mealName);
    void addMealToDay(Long planId, int daysId, String mealName, AddMealRequest addMealRequest);
    Map<String, List<?>> getMealsForDay(Long planId, int daysId);
    Nutriconsumption updateNutritionConsumption(Long planId, int daysId, Map<String, Double> nutritionValues) ;
    Map<String, Double> getNutritionValues(Long planId, int daysId);
    Bmiplan getBmiplanByPlanId(Long planId);
    List<Bmiplan> getActivePlansByUserId(Long userId);

   
}

