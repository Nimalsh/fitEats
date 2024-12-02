package com.nimalsha.repository;

import com.nimalsha.model.PlanData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanDataRepository extends JpaRepository<PlanData, Long> {
    Optional<PlanData> findByPlanIdAndDaysId(Long planId, int daysId);
}
