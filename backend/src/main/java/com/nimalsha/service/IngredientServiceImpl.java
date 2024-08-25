package com.nimalsha.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.IngredientCategory;
import com.nimalsha.model.IngredientsItem;
import com.nimalsha.model.Restaurant;
import com.nimalsha.repository.IngredientCategoryRepository;
import com.nimalsha.repository.IngredientItemRepository;

@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private NutritionService nutritionService;


    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        IngredientCategory category = new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);

        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(categoryId);
        
        if (restaurant == null) {
            throw new Exception("Restaurant not found with id: " + restaurantId);
        }
        if (category == null) {
            throw new Exception("Category not found with id: " + categoryId);
        }
        
        // Fetch nutrition data
        Map<String, Double> nutritionData = nutritionService.getNutritionData(ingredientName);
        
        IngredientsItem item = new IngredientsItem();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(category);
        item.setCalories(nutritionData.getOrDefault("calories", 0.0));
        item.setProtein(nutritionData.getOrDefault("protein", 0.0));
        item.setTotalCarbohydrate(nutritionData.getOrDefault("carbohydrates", 0.0));
        item.setTotalFat(nutritionData.getOrDefault("fat", 0.0));
        item.setCarbohydrates(nutritionData.getOrDefault("carbohydrates", 0.0));
        item.setFat(nutritionData.getOrDefault("fat", 0.0));
        
        IngredientsItem ingredientsItem = ingredientItemRepository.save(item);
        category.getIngredientItems().add(ingredientsItem);
        
        return ingredientsItem;
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long Id) throws Exception {
         Optional<IngredientCategory> opt=ingredientCategoryRepository.findById(Id);

         if(opt.isEmpty()) {
            throw new Exception("ingredient category not found");
         }
        return opt.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaureantId(Long id) throws Exception {
        restaurantService.findRestaurantById(id);
        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public List<IngredientsItem> findRestaurantIngredients(Long restaurantId) {
        
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long Id) throws Exception {
        Optional<IngredientsItem> optionalIngredientsItems = ingredientItemRepository.findById(Id);

        if(optionalIngredientsItems.isEmpty()) {
            throw new Exception("ingredient not found");
        }
        IngredientsItem ingredientsItem = optionalIngredientsItems.get();
        ingredientsItem.setInStoke(!ingredientsItem.isInStoke());
        return ingredientItemRepository.save(ingredientsItem);
    }


    
}
