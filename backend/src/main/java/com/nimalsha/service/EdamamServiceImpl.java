package com.nimalsha.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.HashMap;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class EdamamServiceImpl implements EdamamService {

    private static final String APP_ID = "cd6a6793";  // Replace with your actual Edamam App ID
    private static final String APP_KEY = "c1fe876e58468de5f05e3f4ca442b972";  // Replace with your actual Edamam App Key
    private static final String NEW_APP_ID = "f444c0cd";  // Replace with your actual Edamam App ID
    private static final String NEW_APP_KEY = "ec25332e684dbe915eebdcca58c723df";
    private final RestTemplate restTemplate = new RestTemplate();

    
    @Override
    public List<Map<String, Object>> getNutritionData(String foodName, String quantity, String foodPreparationStatus) throws Exception {
        // Build the query based on the presence of foodPreparationStatus
        StringBuilder queryBuilder = new StringBuilder(quantity);
        if (foodPreparationStatus != null && !foodPreparationStatus.isEmpty()) {
            queryBuilder.append(" ").append(foodPreparationStatus);
        }
        queryBuilder.append(" ").append(foodName);

        // URL encoding
        String encodedQuery = URLEncoder.encode(queryBuilder.toString().trim(), "UTF-8");

        String url = UriComponentsBuilder.fromHttpUrl("https://api.edamam.com/api/nutrition-data")
                .queryParam("app_id", APP_ID)
                .queryParam("app_key", APP_KEY)
                .queryParam("ingr", encodedQuery)
                .toUriString();

        System.out.println("Request URL: " + url);

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        Map<String, Object> response = responseEntity.getBody();
        System.out.println("Raw API Response: " + response);
       

        if (response == null || response.isEmpty()) {
            throw new Exception("No nutrition data found for query: " + queryBuilder.toString().trim());
        }

        Map<String, Object> totalNutrients = (Map<String, Object>) response.get("totalNutrients");

        Map<String, Object> nutrients = new HashMap<>();
        nutrients.put("calories", getNutrientValue(totalNutrients, "ENERC_KCAL"));
        nutrients.put("carbohydrates", getNutrientValue(totalNutrients, "CHOCDF"));
        nutrients.put("protein", getNutrientValue(totalNutrients, "PROCNT"));
        nutrients.put("sodium", getNutrientValue(totalNutrients, "NA"));
        nutrients.put("fiber", getNutrientValue(totalNutrients, "FIBTG"));
        nutrients.put("fat", getNutrientValue(totalNutrients, "FAT"));
        nutrients.put("sugars", getNutrientValue(totalNutrients, "SUGAR"));

        System.out.println("Parsed Nutrients: " + nutrients);

        return List.of(nutrients);
    }

    // Helper method to extract nutrient value
    private Double getNutrientValue(Map<String, Object> nutrients, String key) {
        Map<String, Object> nutrient = (Map<String, Object>) nutrients.get(key);
        if (nutrient != null) {
            return (Double) nutrient.get("quantity");
        }
        return 0.0;  // Return 0.0 if the nutrient is not found
    }


    public List<Map<String, Object>> getMealsForCalorieRangeAndMealType(double calorieRange, String mealType, String dietaryPreferences, String dietaryRestrictions) throws Exception {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("https://api.edamam.com/api/recipes/v2")
                .queryParam("type", "public")
                .queryParam("app_id", NEW_APP_ID)
                .queryParam("app_key", NEW_APP_KEY)
                .queryParam("mealType", mealType)
                .queryParam("calories", "0-" + (int) calorieRange)
                .queryParam("random", "true");
    
        // Add dietary preferences and restrictions if they are not null or empty and convert them to lowercase
        if (dietaryPreferences != null && !dietaryPreferences.isEmpty()) {
            uriBuilder.queryParam("diet", dietaryPreferences.toLowerCase());
        }
        if (dietaryRestrictions != null && !dietaryRestrictions.isEmpty()) {
            uriBuilder.queryParam("health", dietaryRestrictions.toLowerCase());
        }
    
        String url = uriBuilder.toUriString();
        System.out.println("Url: " + url);
    
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    
        Map<String, Object> response = responseEntity.getBody();
        if (response == null || !response.containsKey("hits")) {
            throw new Exception("No meals found for the specified calorie range and meal type: " + mealType);
        }
    
        List<Map<String, Object>> hits = (List<Map<String, Object>>) response.get("hits");
        List<Map<String, Object>> meals = new ArrayList<>();
    
        for (Map<String, Object> hit : hits) {
            Map<String, Object> recipe = (Map<String, Object>) hit.get("recipe");
            Map<String, Object> mealData = new HashMap<>();
            mealData.put("label", recipe.get("label"));
            mealData.put("calories", recipe.get("calories"));
            mealData.put("image", recipe.get("image"));
            mealData.put("ingredients", recipe.get("ingredients"));
            mealData.put("mealType", mealType);
            meals.add(mealData);
    
            System.out.println("Calories: " + recipe.get("calories"));
        }
    
        return meals;
    }

    

    public List<Map<String, Object>> getMealsForCalorieRangeAndMealType(double calorieRange, String mealType, String dietaryPreferences, String dietaryRestrictions, int duration) throws Exception {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("https://api.edamam.com/api/recipes/v2")
                .queryParam("type", "public")
                .queryParam("app_id", NEW_APP_ID)
                .queryParam("app_key", NEW_APP_KEY)
                .queryParam("mealType", mealType)
                .queryParam("calories", "0-" + (int) calorieRange)
                .queryParam("random", "true")
                .queryParam("to", duration);  // Request a specific number of results
    
        if (dietaryPreferences != null && !dietaryPreferences.isEmpty()) {
            uriBuilder.queryParam("diet", dietaryPreferences.toLowerCase());
        }
        if (dietaryRestrictions != null && !dietaryRestrictions.isEmpty()) {
            uriBuilder.queryParam("health", dietaryRestrictions.toLowerCase());
        }
    
        String url = uriBuilder.toUriString();
        System.out.println("Url: " + url);
    
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    
        Map<String, Object> response = responseEntity.getBody();
        if (response == null || !response.containsKey("hits")) {
            throw new Exception("No meals found for the specified calorie range and meal type: " + mealType);
        }
    
        List<Map<String, Object>> hits = (List<Map<String, Object>>) response.get("hits");
        List<Map<String, Object>> meals = new ArrayList<>();
    
        for (Map<String, Object> hit : hits) {
            Map<String, Object> recipe = (Map<String, Object>) hit.get("recipe");
            Map<String, Object> mealData = new HashMap<>();
            mealData.put("label", recipe.get("label"));
            mealData.put("calories", recipe.get("calories"));
            mealData.put("image", recipe.get("image"));
            mealData.put("ingredients", recipe.get("ingredients"));
            mealData.put("mealType", mealType);
            meals.add(mealData);
        }
    
        if (meals.size() < duration) {
            throw new Exception("Insufficient meals for " + mealType);
        }
    
        return meals;
    }
    
    
}
