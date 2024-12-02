package com.nimalsha.controller;

import com.nimalsha.model.Mealstatus;
import com.nimalsha.model.Plan;
import com.nimalsha.model.PlanData;
import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.request.CreatePlanRequest;
import com.nimalsha.request.SetMealsRequest;
import com.nimalsha.service.UserService;
import com.nimalsha.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/plan")
public class PlanController {

    @Autowired
    private PlanService planService;

    @Autowired
    private UserService userService;

    

    @PostMapping("/create")
    public ResponseEntity<Plan> createPlan(@RequestBody CreatePlanRequest request,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        // No need to retrieve the User object, directly use the request fields
        Plan createdPlan = planService.createPlan(request);
        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
    }

    @PutMapping("/{planId}/set-breakfast")
    public ResponseEntity<Void> setBreakfast(@PathVariable Long planId,
                                             @RequestBody SetMealsRequest request) throws Exception {
        request.setMealType("breakfast");
        planService.setMeals(planId, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{planId}/set-lunch")
    public ResponseEntity<Void> setLunch(@PathVariable Long planId,
                                         @RequestBody SetMealsRequest request) throws Exception {
        request.setMealType("lunch");
        planService.setMeals(planId, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{planId}/set-dinner")
    public ResponseEntity<Void> setDinner(@PathVariable Long planId,
                                          @RequestBody SetMealsRequest request) throws Exception {
        request.setMealType("dinner");
        planService.setMeals(planId, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
      @GetMapping("/{planId}/day/{daysId}")
    public ResponseEntity<PlanData> getPlanData(@PathVariable Long planId, @PathVariable int daysId) throws Exception {
        PlanData planData = planService.getPlanData(planId, daysId);
        return ResponseEntity.ok(planData);
    }
    @PutMapping("/{planId}/status")
    public ResponseEntity<String> updatePlanStatus(
        @PathVariable Long planId,
        @RequestBody String status) {
    try {
        planService.updatePlanStatus(planId, status);
        return ResponseEntity.ok("Plan status updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
   }

   @GetMapping("/requests")
   public ResponseEntity<List<Request>> getRequestsByNutritionistIdFromToken(
           @RequestHeader("Authorization") String jwtToken) throws Exception {
       List<Request> requests = planService.getRequestsByNutritionistIdFromToken(jwtToken);
       return new ResponseEntity<>(requests, HttpStatus.OK);
   }

   @GetMapping("/requests/{requestId}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long requestId) throws Exception {
        Request request = planService.getRequestById(requestId);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/requests/{requestId}/set-plan")
public ResponseEntity<String> setPlanIdForRequest(
    @PathVariable Long requestId,
    @RequestBody Long planId) {
    try {
        planService.setPlanIdForRequest(requestId, planId);
        return ResponseEntity.ok("Plan ID set and request status updated to In Progress");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}

@PutMapping("/requests/complete/{planId}")
public ResponseEntity<String> completeRequestByPlanId(@PathVariable Long planId) {
    try {
        planService.completeRequestByPlanId(planId);
        return ResponseEntity.ok("Request status updated to Completed");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
@PutMapping("/requests/{requestId}/status/{status}")
public ResponseEntity<String> updateRequestStatus(
    @PathVariable Long requestId,
    @PathVariable String status) {
    try {
        planService.updateRequestStatus(requestId, status);
        return ResponseEntity.ok("Request status updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
  
@PutMapping("/{planId}/day/{daysId}/update-meal-status")
public ResponseEntity<String> updateMealStatus(
        @PathVariable Long planId,
        @PathVariable int daysId,
        @RequestBody List<String> mealTypes) {
    try {
        // Convert the list to an array and pass it to the service method
        planService.updateMealStatus(planId, daysId, mealTypes.toArray(new String[0]));
        return ResponseEntity.ok("Meal status updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}

   @GetMapping("/{planId}/day/{daysId}/meal-status")
    public ResponseEntity<Mealstatus> getMealStatus(
            @PathVariable Long planId,
            @PathVariable int daysId) {
        try {
            Mealstatus mealstatus = planService.getMealStatus(planId, daysId);
            return ResponseEntity.ok(mealstatus);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{planId}/completed-meals-count")
    public ResponseEntity<Integer> countCompletedMeals(@PathVariable Long planId) {
        try {
            int completedMealsCount = planService.countCompletedMeals(planId);
            return ResponseEntity.ok(completedMealsCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/plan/{planId}")
    public ResponseEntity<Request> getRequestByPlanId(@PathVariable Long planId) {
        try {
            Request request = planService.getRequestByPlanId(planId);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null); // Or return a more descriptive error message
        }
    }

    @PutMapping("/{planId}/achieved-weight")
    public Request updateAchievedWeight(@PathVariable Long planId, @RequestParam double achievedWeight) throws Exception {
        return planService.updateAchievedWeightByPlanId(planId, achievedWeight);
    }


    @PutMapping("/requests/{requestId}/update-description-and-complete")
public ResponseEntity<String> updateRequestDescriptionAndComplete(
        @PathVariable Long requestId,
        @RequestBody String description) {
    try {
        // Call the service to update the request
        planService.updateRequestDescriptionAndComplete(requestId, description.trim());
        return ResponseEntity.ok("Request updated with new description and marked as Completed");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found for requestId: " + requestId);
    }
}

@PutMapping("/requests/{requestId}/putcomments")
public ResponseEntity<String> putcomments(
        @PathVariable Long requestId,
        @RequestBody String comments) {
    try {
        // Call the service to update the request
        planService.putcomments(requestId, comments.trim());
        return ResponseEntity.ok("Request updated with comments");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found for requestId: " + requestId);
    }
}


}





