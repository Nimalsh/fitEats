package com.nimalsha.service;

import java.util.*;

import com.nimalsha.model.Category;

public interface CategoryService {
    
    public Category createCategory(String name, Long userId) throws Exception;

    public List<Category> findCategoryByRestaurantId(Long id)throws Exception;

    public Category findCategoryById(Long id) throws Exception;

}
