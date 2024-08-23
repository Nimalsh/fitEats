package com.nimalsha.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class EdamamServiceImpl implements EdamamService {

    private final String appId = "cd6a6793";  // Replace with your actual Edamam App ID
    private final String appKey = "c1fe876e58468de5f05e3f4ca442b972";  // Replace with your actual Edamam App Key

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public Map<String, Object> getNutritionData(String foodName, String quantity) throws Exception {
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

        return response;
    }
}
