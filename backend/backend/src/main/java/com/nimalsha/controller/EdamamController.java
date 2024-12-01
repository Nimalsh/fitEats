package com.nimalsha.controller;

import com.nimalsha.service.EdamamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nutrition")
public class EdamamController {

    private final EdamamService edamamService;

    @Autowired
    public EdamamController(EdamamService edamamService) {
        this.edamamService = edamamService;
    }

    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> getNutritionData(
            @RequestParam String foodName,
            @RequestParam String quantity) {

        try {
            // Call the updated service method
            List<Map<String, Object>> nutritionData = edamamService.getNutritionData(foodName, quantity);
            return new ResponseEntity<>(Map.of("nutrition", nutritionData), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
