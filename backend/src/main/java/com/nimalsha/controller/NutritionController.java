package com.nimalsha.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class NutritionController {

    private static final String APP_ID = "84bdc52f"; // Replace with your actual App ID
    private static final String APP_KEY = "255b4c35849779905cec26e588b4971d"; // Replace with your actual API Key

    @GetMapping("/nutrition-content")
    public ResponseEntity<String> getNutrition(@RequestParam String foodName) {
        String apiUrl = "https://api.edamam.com/api/nutrition-data?app_id=" + APP_ID + "&app_key=" + APP_KEY + "&ingr=" + foodName;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(apiUrl, String.class);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
