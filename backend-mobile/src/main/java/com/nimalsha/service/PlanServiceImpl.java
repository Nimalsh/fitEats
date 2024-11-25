package com.nimalsha.service;

import com.nimalsha.model.Mealstatus;
import com.nimalsha.model.Plan;
import com.nimalsha.model.PlanData;
import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.repository.PlanRepository;
import com.nimalsha.repository.MealstatusRepository;
import com.nimalsha.repository.PlanDataRepository;
import com.nimalsha.repository.RequestRepository;
import com.nimalsha.request.CreatePlanRequest;
import com.nimalsha.request.SetMealsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    
    @Autowired
    private MealstatusRepository MealstatusRepository;
    @Override
    public Plan createPlan(CreatePlanRequest request) throws Exception {
        Plan plan = new Plan();
        plan.setDuration(request.getDuration());
        plan.setUserId(request.getUserId());
        plan.setStatus("In Progress");
        plan.setNutritionistId(request.getNutritionistId());
    
        Plan savedPlan = planRepository.save(plan);
    
        for (int day = 1; day <= request.getDuration(); day++) {
            PlanData planData = new PlanData();
            planData.setPlanId(savedPlan.getPlanId());
            planData.setUserId(request.getUserId());
            planData.setDaysId(day);
            planData.setBreakfast("");
            planData.setLunch("");
            planData.setDinner("");
            planDataRepository.save(planData);
        }
    
        for (int day = 1; day <= request.getDuration(); day++) {
            Mealstatus mealstatus = new Mealstatus();
            mealstatus.setPlanId(savedPlan.getPlanId());
            mealstatus.setUserId(request.getUserId());
            mealstatus.setDaysId(day);
            mealstatus.setMarked(false);
            mealstatus.setBreakfast(false);
            mealstatus.setLunch(false);
            mealstatus.setDinner(false);
            MealstatusRepository.save(mealstatus);
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
    request.setCompletedDate(LocalDate.now());

    // Save the updated request
    requestRepository.save(request);
}

@Override
public void updateRequestStatus(Long requestId, String status) throws Exception {
    // Find the request by requestId
    Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new Exception("Request not found for requestId: " + requestId));

    // Update the status
    request.setStatus(status);

    // Update the relevant date field based on the status
    LocalDate currentDate = LocalDate.now(); // Get the current date
    switch (status.toLowerCase()) {
        case "started":
            request.setStartedDate(currentDate);
            break;
        case "replied":
            request.setRepliedDate(currentDate);
            break;
        case "completed":
            request.setCompletedDate(currentDate);
            break;
        default:
            throw new IllegalArgumentException("Invalid status: " + status);
    }

    // Save the updated request
    requestRepository.save(request);
}

@Override
public void updateMealStatus(Long planId, int daysId, String... mealTypes) throws Exception {
    // Find the meal status record for the given planId and daysId
    Optional<Mealstatus> optionalMealstatus = MealstatusRepository.findByPlanIdAndDaysId(planId, daysId);
    if (optionalMealstatus.isPresent()) {
        Mealstatus mealstatus = optionalMealstatus.get();

        // Initialize all meal types to false
        mealstatus.setBreakfast(false);
        mealstatus.setLunch(false);
        mealstatus.setDinner(false);

        // Loop through each meal type and update the corresponding field to true
        for (String mealType : mealTypes) {
            switch (mealType.toLowerCase()) {
                case "breakfast":
                    mealstatus.setBreakfast(true);
                    break;
                case "lunch":
                    mealstatus.setLunch(true);
                    break;
                case "dinner":
                    mealstatus.setDinner(true);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid meal type: " + mealType);
            }
        }

        // Save the updated meal status
        MealstatusRepository.save(mealstatus);
    } else {
        throw new Exception("Mealstatus not found for planId: " + planId + ", daysId: " + daysId);
    }
}

public Mealstatus getMealStatus(Long planId, int daysId) throws Exception {
    return MealstatusRepository.findByPlanIdAndDaysId(planId, daysId)
            .orElseThrow(() -> new Exception("Mealstatus not found for planId: " + planId + ", daysId: " + daysId));
}

@Override
public int countCompletedMeals(Long planId) throws Exception {
    // Fetch all Mealstatus records for the given planId
    List<Mealstatus> mealstatusList = MealstatusRepository.findByPlanId(planId);
    
    if (mealstatusList.isEmpty()) {
        throw new Exception("No Mealstatus records found for planId: " + planId);
    }

    // Initialize a counter for completed meals
    int completedMealsCount = 0;

    // Loop through each Mealstatus record
    for (Mealstatus mealstatus : mealstatusList) {
        // Increment the counter for each meal that is set to true
        if (mealstatus.isBreakfast()) {
            completedMealsCount++;
        }
        if (mealstatus.isLunch()) {
            completedMealsCount++;
        }
        if (mealstatus.isDinner()) {
            completedMealsCount++;
        }
    }

    return completedMealsCount;
}

@Override
public Request getRequestByPlanId(Long planId) throws Exception {
    return requestRepository.findByPlanId(planId)
            .orElseThrow(() -> new Exception("Request not found for planId: " + planId));
}

@Override
public Request updateAchievedWeightByPlanId(Long planId, double achievedWeight) throws Exception {
    // Find the request by planId
    Request request = requestRepository.findByPlanId(planId)
            .orElseThrow(() -> new Exception("Request not found for planId: " + planId));
    
    // Update the achieved weight
    request.setAchivedweight(achievedWeight);

    // Save the updated request back to the database
    return requestRepository.save(request);
}


@Override
public void updateRequestDescriptionAndComplete(Long requestId, String description) throws Exception {
    // Find the request by ID
    Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new Exception("Request not found for requestId: " + requestId));

    // Update the description field
    request.setReply(description);

    // Set the status to "Completed"
    request.setStatus("Completed");

    // Save the updated request
    requestRepository.save(request);
}

@Override
public void putcomments(Long requestId, String comments) throws Exception {
    // Find the request by ID
    Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new Exception("Request not found for requestId: " + requestId));

   
    request.setComments(comments);

    
    requestRepository.save(request);
}






}
