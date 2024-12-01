package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.nimalsha.model.Nutriconsumption;
import java.util.List;

@Repository
public interface NutriconsumptionRepository extends JpaRepository<Nutriconsumption, Long> {
    Nutriconsumption findByPlanIdAndDaysId(Long planId, int daysId);
}
