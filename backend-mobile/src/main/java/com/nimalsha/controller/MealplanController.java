package com.nimalsha.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nimalsha.model.Mealplan;
import com.nimalsha.model.Mealplandata;
import com.nimalsha.model.Request;
import com.nimalsha.request.CreatemealplanRequest;

import com.nimalsha.service.MealplanService;
import com.nimalsha.service.UserService;

import jakarta.persistence.EntityNotFoundException;

import com.nimalsha.model.User;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Mealplan")
public class MealplanController {

    @Autowired
    private MealplanService MealplanService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Mealplan> createPlan(
        @RequestBody CreatemealplanRequest request,
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
            Mealplan bmiplan = MealplanService.createPlan(request);

            return ResponseEntity.status(HttpStatus.CREATED)
                                 .body(bmiplan); // Return the created Bmiplan object

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null); // Return null body for internal server error
        }
    }


      @GetMapping("/mealplandata/{planId}")
    public ResponseEntity<List<Mealplandata>> getMealplandataByPlanId(@PathVariable Long planId) {
        try {
            List<Mealplandata> mealplandataList = MealplanService.getMealplandataByPlanId(planId);

            if (mealplandataList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if no data found
            }

            return ResponseEntity.ok(mealplandataList); // Return the list of Mealplandata records

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/mealplandata/{planId}/{daysId}")
public ResponseEntity<Mealplandata> getMealplandataByPlanIdAndDaysId(
        @PathVariable Long planId, 
        @PathVariable int daysId) {
    Mealplandata mealplandata = MealplanService.getMealplandataByPlanIdAndDaysId(planId, daysId);
    if (mealplandata == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    return ResponseEntity.ok(mealplandata);
}


@PutMapping("/updateMealStatus/{planId}/{daysId}")
public ResponseEntity<String> updateMealStatus(
        @PathVariable Long planId, 
        @PathVariable int daysId, 
        @RequestBody List<String> mealTypes, 
        @RequestHeader("Authorization") String jwt) {
    try {
        // Authenticate user from JWT
        User user = userService.findUserByJwtToken(jwt);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Unauthorized user.");
        }

        // Call the service method to update the meal status
        MealplanService.updateMealStatus(planId, daysId, mealTypes);

        return ResponseEntity.status(HttpStatus.OK)
                             .body("Meal statuses updated successfully.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Error updating meal statuses: " + e.getMessage());
    }
}

@GetMapping("/mealstatus/total/{planId}")
public ResponseEntity<Integer> getTotalMealStatusCount(@PathVariable Long planId) {
    try {
        int totalMeals = MealplanService.getTotalMealStatusCountForPlan(planId);
        return ResponseEntity.ok(totalMeals);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(-1); // Return -1 or other error indicator if something goes wrong
    }
}

@GetMapping("/{planId}")
public ResponseEntity<Mealplan> getMealplanByPlanId(@PathVariable Long planId) {
    try {
        Mealplan mealplan = MealplanService.getMealplandByPlanId(planId);
        return ResponseEntity.ok(mealplan);
    } catch (EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(null); // Return 404 if Mealplan is not found
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(null); // Return 500 for other server errors
    }
}

@PutMapping("/complete/{planId}")
public ResponseEntity<?> completeMealplan(@PathVariable Long planId) {
    try {
        Mealplan updatedMealplan = MealplanService.updatemealplanstatus(planId);

        if (updatedMealplan != null) {
            return ResponseEntity.ok(updatedMealplan);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mealplan not found for planId: " + planId);
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while updating the meal plan status: " + e.getMessage());
    }
}

@PutMapping("/updateMeal/{planId}/{daysId}/{mealType}")
public ResponseEntity<String> updateMealForPlanDayAndType(
        @PathVariable Long planId,
        @PathVariable int daysId,
        @PathVariable String mealType) {

    try {
        // Call the service method to update the meal data for the specified planId, daysId, and mealType
        MealplanService.updateMealForPlanDayAndType(planId, daysId, mealType);

        // Return a success response
        return ResponseEntity.ok("Meal updated successfully for day " + daysId + " and meal type " + mealType);

    } catch (Exception e) {
        // Return an error response if there was an exception
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating meal: " + e.getMessage());
    }
}

@PutMapping("/updateMeal/{planId}/{weight}")
public ResponseEntity<?> updateMealPlanWeight(
        @PathVariable Long planId, 
        @PathVariable double weight) {
    try {
        // Call the service to update the meal plan's afterweight
        Mealplan updatedMealplan = MealplanService.updatemealplanweight(planId, weight);

        if (updatedMealplan == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Mealplan not found for planId: " + planId);
        }

        return ResponseEntity.ok(updatedMealplan);
    } catch (Exception e) {
        // Catching the exception and returning an error response
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating mealplan: " + e.getMessage());
    }
}


@GetMapping("/myplans")
    public ResponseEntity<List<Mealplan>> getRequestsByToken(@RequestHeader("Authorization") String jwt) throws Exception {
        List<Mealplan> requests = MealplanService.getRequestsByToken(jwt);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }
    }

