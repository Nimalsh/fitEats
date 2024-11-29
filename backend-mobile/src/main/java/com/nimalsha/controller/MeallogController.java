package com.nimalsha.controller;

import com.nimalsha.model.Meallog;
import com.nimalsha.model.User;
import com.nimalsha.service.MeallogService;
import com.nimalsha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MeallogController {

    @Autowired
    private MeallogService meallogService;

    @Autowired
    private UserService userService;

    // Endpoint to create or update a meallog
    @PostMapping("/meallog")
    public ResponseEntity<Meallog> createOrUpdateMeallog(@RequestParam("date") String date,
                                                         @RequestHeader("Authorization") String jwt) throws Exception {
        // Find the user based on the JWT token
        User user = userService.findUserByJwtToken(jwt);

        // Convert the provided date string to LocalDate
        LocalDate localDate = LocalDate.parse(date);

        // Create or update the meallog entry
        Meallog meallog = meallogService.createOrUpdateMeallog(user.getId(), localDate);

        // Return the created or updated meallog with HTTP status OK
        return new ResponseEntity<>(meallog, HttpStatus.OK);
    }

    @PostMapping("/meallog/addMeal")
public ResponseEntity<String> addMealToLog(@RequestParam("date") String date,
                                           @RequestParam("mealType") String mealType,
                                           @RequestParam("item") String item,
                                           @RequestParam("measurement") String measurement,
                                           @RequestParam("quantity") int quantity,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    LocalDate localDate = LocalDate.parse(date);

    meallogService.addMealToLog(user.getId(), localDate, mealType, item, measurement, quantity);

    return new ResponseEntity<>("Meal added successfully", HttpStatus.OK);
}


@GetMapping("/meallog/meals")
public ResponseEntity<Map<String, Object>> getMealsByDate(@RequestParam("date") String date,
                                                           @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    LocalDate localDate = LocalDate.parse(date);

    Map<String, Object> mealDetails = meallogService.getMealsByDate(user.getId(), localDate);

    return new ResponseEntity<>(mealDetails, HttpStatus.OK);
}

@PutMapping("/update-nutrition/{date}")
public ResponseEntity<String> updateNutrition(
    @PathVariable LocalDate date,
    @RequestBody Map<String, Double> nutritionValues) {

    try {
        // Call the service method to update the Nutriconsumption
        meallogService.updateNutritionConsumption(date, nutritionValues);
        return ResponseEntity.ok("Nutrition values updated successfully.");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error updating nutrition values: " + e.getMessage());
    }
}

@GetMapping("/get-nutrition/{date}")
public ResponseEntity<Map<String, Double>> getNutrition(@PathVariable LocalDate date) {
    try {
        Map<String, Double> nutritionValues = meallogService.getNutritionValues(date);
        return ResponseEntity.ok(nutritionValues);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}

@GetMapping("/meallog/status/{date}")
public ResponseEntity<String> getMeallogStatusByDate(@PathVariable("date") String date,
                                                     @RequestHeader("Authorization") String jwt) throws Exception {
    // Find the user based on the JWT token
    User user = userService.findUserByJwtToken(jwt);

    // Convert the provided date string to LocalDate
    LocalDate localDate = LocalDate.parse(date);

    // Retrieve the status of the Meallog for the specified date
    String status = meallogService.getStatusByDateAndUserId(localDate,user.getId());

    // Return the status with HTTP status OK
    return new ResponseEntity<>(status, HttpStatus.OK);
}



   
}
