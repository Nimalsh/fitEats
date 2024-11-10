package com.example.driver.service;

import com.example.driver.model.Category;
import com.example.driver.model.Food;
import com.example.driver.model.Restaurant;
import com.example.driver.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId)throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonveg,
                                         boolean isSeasonal,
                                         String foodCategory );

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws  Exception;

    public Food updateAvailabilityStatus(Long foodId) throws  Exception;
}
