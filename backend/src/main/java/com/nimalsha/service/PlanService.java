package com.nimalsha.service;

import com.nimalsha.model.Plan;
import com.nimalsha.model.PlanData;
import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.request.CreatePlanRequest;
import com.nimalsha.request.SetMealsRequest;
import java.util.List;

public interface PlanService {
    Plan createPlan(User user, CreatePlanRequest request) throws Exception;
    void setMeals(Long planId, SetMealsRequest request) throws Exception;
     PlanData getPlanData(Long planId, int daysId) throws Exception;
     void updatePlanStatus(Long planId, String status) throws Exception;
     List<Request> getRequestsByNutritionistIdFromToken(String jwtToken) throws Exception;
     Request getRequestById(Long requestId) throws Exception;
     void setPlanIdForRequest(Long requestId, Long planId) throws Exception;

}
