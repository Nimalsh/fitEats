package com.nimalsha.controller;

import com.nimalsha.model.Food;
import com.nimalsha.model.Restaurant;
import com.nimalsha.model.User;
import com.nimalsha.dto.CategoryDto;
import com.nimalsha.dto.FoodDto;
import com.nimalsha.request.CreateFoodRequest;
import com.nimalsha.response.MessageResponse;
import com.nimalsha.service.FoodService;
import com.nimalsha.service.RestaurantService;
import com.nimalsha.service.UserService;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<FoodDto> createFood(@RequestBody CreateFoodRequest req,
    @RequestHeader("Authorization") String jwt) throws Exception {
                User user = userService.findUserByJwtToken(jwt);
                Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
                Food savedFood = foodService.createFood(req, req.getCategory(), restaurant);

             // Map entity to DTO before returning
               FoodDto foodDTO = mapFoodEntityToDTO(savedFood);

                 return new ResponseEntity<>(foodDTO, HttpStatus.CREATED);
       }

    
  private FoodDto mapFoodEntityToDTO(Food food) {
        FoodDto foodDto = new FoodDto();
        // Map basic properties
        foodDto.setId(food.getId());
        foodDto.setName(food.getName());
        foodDto.setDescription(food.getDescription());
        foodDto.setPrice(food.getPrice());
        foodDto.setImages(food.getImages());
        foodDto.setVegetarian(food.isVegetarian());
        foodDto.setSeasonal(food.isSeasonal());

        // Map category
    

        return foodDto;
    }

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
