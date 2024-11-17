package com.nimalsha.controller;

import org.springframework.web.bind.annotation.*;

import com.nimalsha.model.Category;
import com.nimalsha.model.User;
import com.nimalsha.service.CategoryService;
import com.nimalsha.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api")  

public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/admin/category") 
    public ResponseEntity<Category> createCategory(@RequestBody Category category, @RequestHeader("Authorization")String jwt) throws Exception {
        User user=userService.findUserByJwtToken(jwt);

        Category createdCategory =categoryService.createCategory(category.getName(), user.getId());

        return new ResponseEntity<>( createdCategory, HttpStatus.CREATED);

    }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantCategory(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Category> categories = categoryService.findCategoryByRestaurantId(id);
        return new ResponseEntity<>(categories, HttpStatus.CREATED);
    }


}
