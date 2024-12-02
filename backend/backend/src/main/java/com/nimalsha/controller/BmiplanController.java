package com.nimalsha.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nimalsha.model.Bmiplan;
import com.nimalsha.request.CreatebmiplanRequest;
import com.nimalsha.request.AddMealRequest;
import com.nimalsha.service.BmiService;
import com.nimalsha.service.UserService;
import com.nimalsha.model.User;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bmi-plans")
public class BmiplanController {

    @Autowired
    private BmiService bmiService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Bmiplan> createPlan(
        @RequestBody CreatebmiplanRequest request,
        @RequestHeader("Authorization") String jwt) {

        try {
            // Authenticate user from JWT
            User user = userService.findUserByJwtToken(jwt);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                     .body(null); // Return null body for unauthorized
            }

            // Pass userId from the authenticated user to the createPlan method
            request.setUserId(user.getId()); // Set the userId in the request object
            Bmiplan bmiplan = bmiService.createPlan(request);

            return ResponseEntity.status(HttpStatus.CREATED)
                                 .body(bmiplan); // Return the created Bmiplan object

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null); // Return null body for internal server error
        }
    }

    @PostMapping("/add-meal")
    public ResponseEntity<String> addMealToDay(
        @RequestParam Long planId,
        @RequestParam int daysId,
        @RequestParam String mealName,
        @RequestBody AddMealRequest request, // Correctly matches the request body class
        @RequestHeader("Authorization") String jwt) {

        try {
            // Authenticate user from JWT
            User user = userService.findUserByJwtToken(jwt);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                     .body("Unauthorized"); // Return unauthorized message
            }

            // Pass the request object to the service method
            bmiService.addMealToDay(
                planId,
                daysId,
                mealName,
                request // Pass the entire request object
            );

            return ResponseEntity.status(HttpStatus.OK)
                                 .body("Meal added successfully"); // Return success message

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error occurred while adding meal"); // Return error message
        }
    }

    
    @GetMapping("/meals")
    public ResponseEntity<Map<String, List<?>>> getMealsForDay(
        @RequestParam Long planId,
        @RequestParam int daysId,
        @RequestHeader("Authorization") String jwt) {

        try {
            // Authenticate user from JWT
            User user = userService.findUserByJwtToken(jwt);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                     .body(null); // Return null body for unauthorized
            }

            // Retrieve meals for the given planId and daysId
            Map<String, List<?>> mealMap = bmiService.getMealsForDay(planId, daysId);

            return ResponseEntity.status(HttpStatus.OK)
                                 .body(mealMap); // Return the meal map

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null); // Return null body for internal server error
        }
    }

    @PutMapping("/update-nutrition/{planId}/{daysId}")
    public ResponseEntity<String> updateNutrition(
        @PathVariable Long planId,
        @PathVariable int daysId,
        @RequestBody Map<String, Double> nutritionValues) {

        try {
            // Call the service method to update the Nutriconsumption
            bmiService.updateNutritionConsumption(planId, daysId, nutritionValues);
            return ResponseEntity.ok("Nutrition values updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating nutrition values: " + e.getMessage());
        }
    }

    @GetMapping("/get-nutrition/{planId}/{daysId}")
    public ResponseEntity<Map<String, Double>> getNutrition(@PathVariable Long planId, @PathVariable int daysId) {
        try {
            Map<String, Double> nutritionValues = bmiService.getNutritionValues(planId, daysId);
            return ResponseEntity.ok(nutritionValues);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{planId}")
    public ResponseEntity<Bmiplan> getBmiplanByPlanId(
        @PathVariable Long planId,
        @RequestHeader("Authorization") String jwt) {

        try {
            // Authenticate user from JWT
            User user = userService.findUserByJwtToken(jwt);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            // Call service method to get the Bmiplan
            Bmiplan bmiplan = bmiService.getBmiplanByPlanId(planId);
            return ResponseEntity.ok(bmiplan);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/active-plans")
public ResponseEntity<List<Bmiplan>> getActivePlansByUserId(
    @RequestHeader("Authorization") String jwt) {

    try {
        // Authenticate user from JWT
        User user = userService.findUserByJwtToken(jwt);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // Get active plans for the authenticated user
        List<Bmiplan> activePlans = bmiService.getActivePlansByUserId(user.getId());
        return ResponseEntity.ok(activePlans);

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

}

}