package com.nimalsha.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
       User user= userService.findUserByJwtToken(jwt);
       Restaurant restaurant=restaurantService.getRestaurantByUserId(user.getId());
       Food food=foodService.createFood(req,req.getCategory(),restaurant);
      return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

//     @PostMapping
//     public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req,
//                                        @RequestHeader("Authorization") String jwt) throws Exception {
//     try {
//         User user = userService.findUserByJwtToken(jwt);
//         Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
//         Food food = foodService.createFood(req, req.getCategory(), restaurant);
//         return new ResponseEntity<>(food, HttpStatus.CREATED);
//     } catch (Exception e) {
//         // Log the error
//         System.out.println("Error creating food: " + e.getMessage());
//         e.printStackTrace();
//         return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        foodService.deleteFood(id);

        MessageResponse res=new MessageResponse();
        res.setMessage("food deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateAvailabilityStatus (@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwtToken(jwt);

        Food food=foodService.updateAvailabilityStatus(id);

        MessageResponse res=new MessageResponse();
        res.setMessage("food deleted successfully");
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
}
