package com.nimalsha.controller;

import com.nimalsha.model.Nutritionist;
import com.nimalsha.repository.NutritionistRepository;
import com.nimalsha.service.NutritionistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class NutritionistController {

    private NutritionistService nutritionistService;

    @GetMapping("/nutritionist")
    public ResponseEntity<List<Nutritionist>> getAllNutritionists() {
        return new ResponseEntity<>(nutritionistService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/nutritionist")
    public ResponseEntity<Nutritionist> createNutritionist(@RequestBody Nutritionist nutritionist) {
        Nutritionist _nutritionist = nutritionistService.createNutritionist(nutritionist);

        return new ResponseEntity<>(_nutritionist, HttpStatus.OK);
    }

    @PatchMapping("/nutritionist/{id}")
    public ResponseEntity<Nutritionist> updateNutritionist(@PathVariable String id, @RequestBody Nutritionist nutritionist) {
        Nutritionist _nutritionist = nutritionistService.updateNutritionist(id, nutritionist);

        return new ResponseEntity<>(_nutritionist, HttpStatus.OK);
    }
}
