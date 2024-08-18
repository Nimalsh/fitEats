package com.nimalsha.service;

import com.nimalsha.model.Plan;
import com.nimalsha.model.PlanData;
import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.repository.PlanRepository;
import com.nimalsha.repository.PlanDataRepository;
import com.nimalsha.repository.RequestRepository;
import com.nimalsha.request.CreatePlanRequest;
import com.nimalsha.request.SetMealsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PlanDataRepository planDataRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RequestRepository requestRepository;

    @Override
    public Plan createPlan(User user, CreatePlanRequest request) throws Exception {
        Plan plan = new Plan();
        plan.setDuration(request.getDuration());
        plan.setUserId(user.getId());
        plan.setStatus("In Progress");

        Plan savedPlan = planRepository.save(plan);

        for (int day = 1; day <= request.getDuration(); day++) {
            PlanData planData = new PlanData();
            planData.setPlanId(savedPlan.getPlanId());
            planData.setUserId(user.getId());
            planData.setDaysId(day);

            planData.setBreakfast("");
            planData.setLunch("");
            planData.setDinner("");

            planDataRepository.save(planData);
        }

        return savedPlan;
    }
    @Override
public PlanData getPlanData(Long planId, int daysId) throws Exception {
    return planDataRepository.findByPlanIdAndDaysId(planId, daysId)
            .orElseThrow(() -> new Exception("PlanData not found for planId: " + planId + ", daysId: " + daysId));
}


    @Override
    public void setMeals(Long planId, SetMealsRequest request) throws Exception {
        Optional<PlanData> optionalPlanData = planDataRepository.findByPlanIdAndDaysId(planId, request.getDaysId());
        if (optionalPlanData.isPresent()) {
            PlanData planData = optionalPlanData.get();

            // Update only the specified meal
            switch (request.getMealType().toLowerCase()) {
                case "breakfast":
                    planData.setBreakfast(request.getMealValue());
                    break;
                case "lunch":
                    planData.setLunch(request.getMealValue());
                    break;
                case "dinner":
                    planData.setDinner(request.getMealValue());
                    break;
                default:
                    throw new IllegalArgumentException("Invalid meal type: " + request.getMealType());
            }

            planDataRepository.save(planData);
        } else {
            throw new Exception("PlanData not found for planId: " + planId + ", daysId: " + request.getDaysId());
        }
    }

    @Override
    public void updatePlanStatus(Long planId, String status) throws Exception {
        Optional<Plan> optionalPlan = planRepository.findById(planId);
        if (optionalPlan.isPresent()) {
            Plan plan = optionalPlan.get();
            plan.setStatus(status);  // Assuming the Plan entity has a 'status' field
            planRepository.save(plan);
        } else {
            throw new Exception("Plan not found for planId: " + planId);
        }
    }

    public List<Request> getRequestsByNutritionistIdFromToken(String jwtToken) throws Exception {
        // Get user from JWT token
        User user = userService.findUserByJwtToken(jwtToken);
        
        // Retrieve nutritionistId from user
        Long nutritionistId = user.getId(); // Assuming user ID is the same as nutritionist ID

        // Fetch requests by nutritionistId
        return requestRepository.findByNutritionistId(nutritionistId);
    }

    @Override
public Request getRequestById(Long requestId) throws Exception {
    return requestRepository.findById(requestId)
            .orElseThrow(() -> new Exception("Request not found for id: " + requestId));
}
   
@Override
public void setPlanIdForRequest(Long requestId, Long planId) throws Exception {
    Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new Exception("Request not found"));

    // Set the planId
    request.setPlanId(planId);

    // Update the status to "In Progress"
    request.setStatus("In Progress");

    // Save the updated request
    requestRepository.save(request);
}

@Override
public void completeRequestByPlanId(Long planId) throws Exception {
    // Find the request by planId
    Request request = requestRepository.findByPlanId(planId)
            .orElseThrow(() -> new Exception("Request not found for planId: " + planId));

    // Update the status to "Completed"
    request.setStatus("Completed");

    // Save the updated request
    requestRepository.save(request);
}







}
