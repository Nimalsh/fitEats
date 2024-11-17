package com.example.driver.request;

import com.example.driver.model.Category;
import com.example.driver.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;
    private String description;
    private Long price;

    private Category category;
    private List<String> images;

    private Long restaurantId;
    private boolean vegetarian;
    private boolean seasonal;
    private List<IngredientDTO> ingredients;

    @Data
    public static class IngredientDTO {
        private String ingredientName;
        private double quantity;
    }
}
