package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.nimalsha.model.Meallogsnack;

import java.util.List;

@Repository
public interface MeallogsnackRepository extends JpaRepository<Meallogsnack, Long> {
    List<Meallogsnack> findBySnackId(Long snackId);
}
