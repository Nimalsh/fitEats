package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.nimalsha.model.Mealplan;
import java.util.Optional;
import java.util.List;



public interface MealplanRepository extends JpaRepository<Mealplan, Long> {
    Optional<Mealplan> findById(Long planId);
    List<Mealplan> findByUserIdAndStatus(Long userId, String status);
    List<Mealplan> findByUserId(Long userId);
  
}
