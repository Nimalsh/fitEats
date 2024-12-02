package com.nimalsha.service;

import java.util.List;
import java.util.Map;

import com.nimalsha.model.Mealplan;
import com.nimalsha.model.Mealplandata;
import com.nimalsha.request.CreatemealplanRequest;

public interface MealplanService {
    
    Mealplan createPlan(CreatemealplanRequest request) throws Exception;
     List<Mealplandata> getMealplandataByPlanId(Long planId) throws Exception;
     Mealplandata getMealplandataByPlanIdAndDaysId(Long planId, int daysId);
    void updateMealStatus(Long planId, int daysId, List<String> mealTypes) throws Exception;
    public int getTotalMealStatusCountForPlan(Long planId) throws Exception;
    Mealplan getMealplandByPlanId(Long planId) throws Exception;
    Mealplan updatemealplanstatus(Long planId) throws Exception;
    void updateMealForPlanDayAndType(Long planId, int daysId, String mealType) throws Exception ;
    public Mealplan updatemealplanweight(Long planId, double weight) throws Exception ;
    public List<Mealplan> getRequestsByToken(String jwtToken) throws Exception;

}

