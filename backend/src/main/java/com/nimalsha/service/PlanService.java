package com.nimalsha.service;

import com.nimalsha.model.Mealstatus;
import com.nimalsha.model.Plan;
import com.nimalsha.model.PlanData;
import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.request.CreatePlanRequest;
import com.nimalsha.request.SetMealsRequest;
import java.util.List;

public interface PlanService {
  
    void setMeals(Long planId, SetMealsRequest request) throws Exception;
     PlanData getPlanData(Long planId, int daysId) throws Exception;
     void updatePlanStatus(Long planId, String status) throws Exception;
     List<Request> getRequestsByNutritionistIdFromToken(String jwtToken) throws Exception;
     Request getRequestById(Long requestId) throws Exception;
     void setPlanIdForRequest(Long requestId, Long planId) throws Exception;
     void completeRequestByPlanId(Long planId) throws Exception;
     void updateRequestStatus(Long requestId, String status) throws Exception;
     public void updateMealStatus(Long planId, int daysId, String... mealTypes) throws Exception ;
     public Plan createPlan(CreatePlanRequest request) throws Exception;
     public Mealstatus getMealStatus(Long planId, int daysId) throws Exception;
     public int countCompletedMeals(Long planId) throws Exception;
     public Request getRequestByPlanId(Long planId) throws Exception;
     public Request updateAchievedWeightByPlanId(Long planId, double achievedWeight) throws Exception;
   

}
