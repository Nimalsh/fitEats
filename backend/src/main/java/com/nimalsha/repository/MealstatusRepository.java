package com.nimalsha.repository;

import com.nimalsha.model.Mealstatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;


public interface MealstatusRepository extends JpaRepository<Mealstatus, Long> {
    Optional<Mealstatus> findByPlanIdAndDaysId(Long planId, int daysId);
    List<Mealstatus> findByPlanId(Long planId);
}
