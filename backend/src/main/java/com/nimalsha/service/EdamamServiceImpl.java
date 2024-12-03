package com.nimalsha.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class EdamamServiceImpl implements EdamamService {

    private final String appId = "cd6a6793";  // Replace with your actual Edamam App ID
    private final String appKey = "c1fe876e58468de5f05e3f4ca442b972";  // Replace with your actual Edamam App Key

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<Map<String, Object>> getNutritionData(String foodName, String quantity) throws Exception {
        // Build the URL with the food name and quantity
        String url = UriComponentsBuilder.fromHttpUrl("https://api.edamam.com/api/nutrition-data")
                .queryParam("app_id", appId)
                .queryParam("app_key", appKey)
                .queryParam("ingr", quantity + " " + foodName)
                .toUriString();

        // Make the API call
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        // Handle the response
        if (response == null || response.isEmpty()) {
            throw new Exception("No nutrition data found for query: " + foodName);
        }

        // Extract required nutrients
        Map<String, Object> totalNutrients = (Map<String, Object>) response.get("totalNutrients");

        // Create a map to hold the desired nutrient values
        Map<String, Object> nutrients = new HashMap<>();
        nutrients.put("calories", getNutrientValue(totalNutrients, "ENERC_KCAL"));
        nutrients.put("carbohydrates", getNutrientValue(totalNutrients, "CHOCDF"));
        nutrients.put("protein", getNutrientValue(totalNutrients, "PROCNT"));
        nutrients.put("sodium", getNutrientValue(totalNutrients, "NA"));
        nutrients.put("fiber", getNutrientValue(totalNutrients, "FIBTG"));
        nutrients.put("fat", getNutrientValue(totalNutrients, "FAT"));
        nutrients.put("sugars", getNutrientValue(totalNutrients, "SUGAR"));

        // Wrap the nutrients map in a list
        return List.of(nutrients);
    }

    // Helper method to extract nutrient value
    private Double getNutrientValue(Map<String, Object> nutrients, String key) {
        Map<String, Object> nutrient = (Map<String, Object>) nutrients.get(key);
        if (nutrient != null) {
            return (Double) nutrient.get("quantity");
        }
        return 0.0;
    }
}
