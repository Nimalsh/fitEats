package com.example.driver.service;

import com.example.driver.model.Category;
import com.example.driver.model.Food;
import com.example.driver.model.foodIngredient;
import com.example.driver.model.IngredientsItem;
import com.example.driver.model.Restaurant;
import com.example.driver.repository.FoodRepository;
import com.example.driver.repository.IngredientItemRepository;

import com.example.driver.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
       
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());
         List<foodIngredient> foodIngredients = new ArrayList<>();
        for (CreateFoodRequest.IngredientDTO ingredientDTO : req.getIngredients()) {
            IngredientsItem ingredient = ingredientItemRepository.findByName(ingredientDTO.getIngredientName())
                    .orElseThrow(() -> new RuntimeException("Ingredient not found"));

            foodIngredient foodIngredient = new foodIngredient();
            foodIngredient.setFood(food);
            foodIngredient.setIngredient(ingredient);
            foodIngredient.setQuantity(ingredientDTO.getQuantity());

            foodIngredients.add(foodIngredient);
        }


        food.setFoodIngredients(foodIngredients);
        Food savedFood=foodRepository.save(food);
        restaurant.getFoods().add(savedFood);
        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food= findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.delete(food);

    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId,
                                         boolean isVegetarian,
                                         boolean isNonveg,
                                         boolean isSeasonal,
                                         String foodCategory) {
       List<Food> foods=foodRepository.findByRestaurantId(restaurantId);

       if(isVegetarian){
           foods=filterByVegetarian(foods,isVegetarian);
       }

       if(isNonveg){
           foods=filterByNonVeg(foods,isNonveg);
       }

        if(isSeasonal){
            foods=filterBySeasonal(foods,isSeasonal);
        }

        if(foodCategory!=null && !foodCategory.equals("")){
            foods=filterByCategory(foods,foodCategory);
        }
        return foods;
    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if(food.getFoodCategory()!=null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }return false;
        }).collect(Collectors.toList());
    }


    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
        return foods.stream().filter(food -> food.isSeasonal()==isSeasonal).collect(Collectors.toList());

    }

    private List<Food> filterByNonVeg(List<Food> foods, boolean isNonveg) {
        return foods.stream().filter(food -> food.isVegetarian()==false).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian()==isVegetarian).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> optionalFood=foodRepository.findById(foodId);

        if(optionalFood.isEmpty()){
            throw new Exception("food not exist...");
        }
        return optionalFood.get();
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {
        Food food=findFoodById(foodId);
        food.setAvailable((!food.isAvailable()));
        return foodRepository.save(food);
    }
}
