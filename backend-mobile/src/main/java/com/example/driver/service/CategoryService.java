package com.example.driver.service;

import java.util.*;

import com.example.driver.model.Category;

public interface CategoryService {
    
    public Category createCategory(String name, Long userId) throws Exception;

    public List<Category> findCategoryByRestaurantId(Long id)throws Exception;

    public Category findCategoryById(Long id) throws Exception;

}
