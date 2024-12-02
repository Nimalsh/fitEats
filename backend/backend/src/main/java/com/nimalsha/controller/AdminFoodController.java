package com.nimalsha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nimalsha.model.Food;
import com.nimalsha.model.Restaurant;
import com.nimalsha.model.User;
import com.nimalsha.request.CreateFoodRequest;
import com.nimalsha.response.MessageResponse;
import com.nimalsha.service.FoodService;
import com.nimalsha.service.RestaurantService;
import com.nimalsha.service.UserService;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req,
                                           @RequestHeader("Authorization") String jwt) throws Exception {

        // 1. Fetch user from JWT token
        User user = userService.findUserByJwtToken(jwt);


        // 2. Get the restaurant by user ID
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req,req.getCategory(), restaurant);
        System.out.println("Restaurant ID: " + req.getRestaurantId());



        // 4. Return created food item
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        // 1. Fetch user from JWT token
        User user = userService.findUserByJwtToken(jwt);

        // 2. Delete food item
        foodService.deleteFood(id);

        // 3. Prepare success response
        MessageResponse res = new MessageResponse();
        res.setMessage("Food deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}")

    public ResponseEntity<Food> updateAvailabilityStatus(@PathVariable Long id,
                                                         @RequestHeader("Authorization") String jwt) throws Exception {
        // 1. Fetch user from JWT token
        User user = userService.findUserByJwtToken(jwt);


        // 2. Update food availability status
        Food food = foodService.updateAvailabilityStatus(id);

        // 3. Return updated food
        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @GetMapping("/{foodId}")

    public ResponseEntity<Food> getFoodDetails(@PathVariable Long foodId,
                                               @RequestHeader("Authorization") String jwt) throws Exception {
        // 1. Fetch user from JWT token
        User user = userService.findUserByJwtToken(jwt);

        // 2. Find food by ID
        Food food = foodService.findFoodById(foodId);

        // 3. Return food details

        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Food>> getFoodItemsByCategory(@PathVariable Long categoryId) {

        // 1. Fetch food items by category
        List<Food> foodItems = foodService.getFoodItemsByCategory(categoryId);

        // 2. Return the list of food items
        return ResponseEntity.ok(foodItems);
    }
}
