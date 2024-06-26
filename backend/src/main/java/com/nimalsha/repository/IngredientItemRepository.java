package com.nimalsha.repository;

import com.nimalsha.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientItemRepository extends JpaRepository<IngredientsItem, Long> {
    Optional<IngredientsItem> findByName(String name);
}
