package com.nimalsha.service;

import java.util.List;

import com.nimalsha.model.Category;
import com.nimalsha.model.Food;
import com.nimalsha.model.Restaurant;
import com.nimalsha.request.CreateFoodRequest;

public interface FoodService {
    public Food createFood(CreateFoodRequest req, Restaurant restaurant);

    void deleteFood(Long foodId)throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonveg,
                                         boolean isSeasonal,
                                         String foodCategory );

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws  Exception;

    public Food updateAvailabilityStatus(Long foodId) throws  Exception;

    public List<Food> getFoodItemsByCategory(Long categoryId);

    public Category getCategory(Long foodId) throws Exception;
}
