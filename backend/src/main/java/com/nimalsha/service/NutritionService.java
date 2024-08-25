 package com.nimalsha.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NutritionService {

    @Value("${nutritionix.api.url}")
    private String apiUrl;

    @Value("${nutritionix.api.key}")
    private String apiKey;

    @Value("${nutritionix.api.app.id}")
    private String appId;

    private static final double DEFAULT_NUTRITION_VALUE = 0.0;

    public Map<String, Double> getNutritionData(String ingredientName) {
        RestTemplate restTemplate = new RestTemplate();

        // Prepare the request body
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("query", ingredientName);

        // Prepare the headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-app-id", appId);
        headers.set("x-app-key", apiKey);

        // Create the request entity
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        // Initialize the nutrition data map
        Map<String, Double> nutritionData = new HashMap<>();
        nutritionData.put("calories", DEFAULT_NUTRITION_VALUE);
        nutritionData.put("protein", DEFAULT_NUTRITION_VALUE);
        nutritionData.put("fat", DEFAULT_NUTRITION_VALUE);
        nutritionData.put("carbohydrates", DEFAULT_NUTRITION_VALUE);
        nutritionData.put("total_sugar", DEFAULT_NUTRITION_VALUE);
        nutritionData.put("total_vitamins", DEFAULT_NUTRITION_VALUE);
        nutritionData.put("total_iron", DEFAULT_NUTRITION_VALUE);

        try {
            // Send the request and receive a response
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                // Extract the foods array from the response body
                Map<String, Object> responseBody = response.getBody();
                
                // Debugging output to inspect the response
                System.out.println("API Response: " + responseBody);

                if (responseBody.containsKey("foods")) {
                    List<?> foodsList = (List<?>) responseBody.get("foods");
                    if (!foodsList.isEmpty()) {
                        Map<String, Object> foods = (Map<String, Object>) foodsList.get(0);

                        // Extract the nutrition data
                        nutritionData.put("calories", extractNumber(foods.get("nf_calories")));
                        nutritionData.put("protein", extractNumber(foods.get("nf_protein")));
                        nutritionData.put("fat", extractNumber(foods.get("nf_total_fat")));
                        nutritionData.put("carbohydrates", extractNumber(foods.get("nf_total_carbohydrate")));
                        nutritionData.put("total_sugar", extractNumber(foods.get("nf_sugars")));
                        nutritionData.put("total_iron", extractNumber(foods.get("nf_iron_mg")));
                        nutritionData.put("total_vitamins", extractNumber(foods.get("nf_vitamin_d_mcg")));

                    }
                }
            }
        } catch (Exception e) {
            // Log the exception
            System.err.println("Failed to fetch nutrition data: " + e.getMessage());
        }

        return nutritionData;
    }

    private Double extractNumber(Object value) {
        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }
        return DEFAULT_NUTRITION_VALUE;
    }

    private Double calculateTotalVitamins(Map<String, Object> foods) {
        double totalVitamins = DEFAULT_NUTRITION_VALUE;
        totalVitamins += extractNumber(foods.get("nf_vitamin_a_dv"));
        totalVitamins += extractNumber(foods.get("nf_vitamin_c_dv"));
        totalVitamins += extractNumber(foods.get("nf_vitamin_d_mcg"));
        totalVitamins += extractNumber(foods.get("nf_vitamin_e_dv"));
        totalVitamins += extractNumber(foods.get("nf_vitamin_k_dv"));
        return totalVitamins;
    }
}
