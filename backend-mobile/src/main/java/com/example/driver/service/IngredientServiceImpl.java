package com.example.driver.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.driver.model.IngredientCategory;
import com.example.driver.model.IngredientsItem;
import com.example.driver.model.Restaurant;
import com.example.driver.repository.IngredientCategoryRepository;
import com.example.driver.repository.IngredientItemRepository;

@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;


    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        IngredientCategory category = new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);

        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId)
            throws Exception {
        
                Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
                IngredientCategory category = findIngredientCategoryById(categoryId);
                
                IngredientsItem item = new IngredientsItem();
                item.setName(ingredientName);
                item.setRestaurant(restaurant);
                item.setCategory(category);

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
