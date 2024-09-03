package com.nimalsha.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class EdamamServiceImpl implements EdamamService {

    private static final String APP_ID = "cd6a6793";  // Replace with your actual Edamam App ID
    private static final String APP_KEY = "c1fe876e58468de5f05e3f4ca442b972";  // Replace with your actual Edamam App Key

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
}
