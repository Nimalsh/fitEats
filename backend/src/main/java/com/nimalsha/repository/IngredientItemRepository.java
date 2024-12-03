package com.nimalsha.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.IngredientsItem;
import java.util.Optional;

public interface IngredientItemRepository extends JpaRepository<IngredientsItem,Long> {
 
    List<IngredientsItem> findByRestaurantId(Long id);
    Optional<IngredientsItem> findByName(String name);
} 

