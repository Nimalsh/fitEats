package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nimalsha.model.Meallogdinner;
import java.util.List;

@Repository
public interface MeallogdinnerRepository extends JpaRepository<Meallogdinner, Long> {
    List<Meallogdinner> findByDinnerId(Long dinnerId);
}