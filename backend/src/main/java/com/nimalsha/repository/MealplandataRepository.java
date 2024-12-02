package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.Mealplandata;
import java.util.List;



public interface MealplandataRepository extends JpaRepository<Mealplandata, Long> {

    Mealplandata findByPlanIdAndDaysId(Long planId, int daysId);
    List<Mealplandata> findByPlanId(Long planId);
   
}
