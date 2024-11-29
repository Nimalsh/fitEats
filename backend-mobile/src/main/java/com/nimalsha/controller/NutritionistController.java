package com.nimalsha.controller;



import com.nimalsha.model.Nutritionist;
import com.nimalsha.repository.NutritionistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/nutritionists")
public class NutritionistController {

    @Autowired
    private NutritionistRepository nutritionistRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Nutritionist> getNutritionistById(@PathVariable Long id) {
        // Directly using the repository's findById method
        return nutritionistRepository.findById(id)
                .map(ResponseEntity::ok) // If the Nutritionist is found
                .orElseGet(() -> ResponseEntity.notFound().build()); // If not found, return 404
    }
}
