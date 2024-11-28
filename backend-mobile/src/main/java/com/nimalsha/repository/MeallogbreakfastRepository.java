package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nimalsha.model.Meallogbreakfast;
import java.util.List;

@Repository
public interface MeallogbreakfastRepository extends JpaRepository<Meallogbreakfast, Long> {
    List<Meallogbreakfast> findByBreakfastId(Long breakfastId);
    
}