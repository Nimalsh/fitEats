package com.nimalsha.controller;

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
        User user = userService.findUserByJwtToken(jwt);
        Plan createdPlan = planService.createPlan(user, request);
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




}
