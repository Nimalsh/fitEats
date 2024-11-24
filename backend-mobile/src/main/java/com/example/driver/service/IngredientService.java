package com.example.driver.service;

import java.util.List;

import com.example.driver.model.IngredientCategory;
import com.example.driver.model.IngredientsItem;

public interface IngredientService {

    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;
 
    public IngredientCategory findIngredientCategoryById(Long Id) throws Exception;

    public List<IngredientCategory> findIngredientCategoryByRestaureantId(Long id) throws Exception;

    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception;

    public List<IngredientsItem> findRestaurantIngredients(Long restaurantId);

    public IngredientsItem updateStock(Long Id) throws Exception;
}
