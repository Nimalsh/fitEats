package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.nimalsha.model.Meallog;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MeallogRepository extends JpaRepository<Meallog, Long> {
    List<Meallog> findByUserId(Long userId);

    Optional<Meallog> findByDate(LocalDate date);
    // Optional: Add a method to find by userId and date if needed
    Optional<Meallog> findByUserIdAndDate(Long userId, LocalDate date);

    
   
    
}