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

}
