package com.nimalsha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nimalsha.model.Food;
import com.nimalsha.model.User;
import com.nimalsha.service.FoodService;
import com.nimalsha.service.RestaurantService;
import com.nimalsha.service.UserService;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        List<Food> foods=foodService.searchFood(name);
        return new ResponseEntity<>(foods, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantsFood(
            @RequestParam(required = false) boolean vegetarian,
            @RequestParam(required = false) boolean seasonal,
            @RequestParam(required = false) boolean nonveg,
            @RequestParam(required = false) String food_category,
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        List<Food> foods=foodService.getRestaurantsFood(restaurantId,vegetarian,nonveg,seasonal,food_category);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

//     @GetMapping("/{foodId}")
//     public ResponseEntity<Food> getFoodById(
//         @PathVariable Long foodId,
//         @RequestHeader("Authorization") String jwt) throws Exception {
//     User user = userService.findUserByJwtToken(jwt);

//     Food food = foodService.findFoodById(foodId);
//     return new ResponseEntity<>(food, HttpStatus.OK);
// }

// @GetMapping("/{foodId}")
// public ResponseEntity<Food> getFoodDetails(@PathVariable Long foodId, @RequestHeader("Authorization") String jwt) throws Exception {
//     User user = userService.findUserByJwtToken(jwt);
//     Food food = foodService.findFoodById(foodId);
//     return new ResponseEntity<>(food, HttpStatus.OK);
// }


}
