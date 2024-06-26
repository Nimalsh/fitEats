package com.nimalsha.request;

import com.nimalsha.model.Category;
import com.nimalsha.model.IngredientsItem;
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
