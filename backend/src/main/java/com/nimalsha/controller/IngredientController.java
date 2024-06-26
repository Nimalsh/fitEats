package com.nimalsha.controller;

import org.springframework.web.bind.annotation.RestController;

import com.nimalsha.model.IngredientCategory;
import com.nimalsha.model.IngredientsItem;
import com.nimalsha.request.IngredientCategoryRequest;
import com.nimalsha.request.IngredientRequest;
import com.nimalsha.service.IngredientService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/api/admin/ingredients") 

public class IngredientController {
    
    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/category") 
    private ResponseEntity<IngredientCategory> createIngredientCategory(
        @RequestBody IngredientCategoryRequest req
    ) throws Exception{
        IngredientCategory item = ingredientService.createIngredientCategory(req.getName(), req.getRestaurantId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping() 
    private ResponseEntity<IngredientsItem> createIngredientItem(
        @RequestBody IngredientRequest req
    ) throws Exception{
        IngredientsItem item = ingredientService.createIngredientItem(req.getRestaurantId(), req.getName(), req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock") 
    private ResponseEntity<IngredientsItem> updateIngredientStock(
        @PathVariable Long id
    ) throws Exception{
        IngredientsItem item = ingredientService. updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}") 
    private ResponseEntity<List<IngredientsItem>> getRestaurantIngredient(
        @PathVariable Long id
    ) throws Exception{
        List<IngredientsItem> items = ingredientService.findRestaurantIngredients(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}/category") 
    private ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(
        @PathVariable Long id
    ) throws Exception{
        List<IngredientCategory> items = ingredientService.findIngredientCategoryByRestaureantId(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
}
