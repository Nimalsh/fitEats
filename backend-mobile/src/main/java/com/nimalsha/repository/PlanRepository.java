package com.nimalsha.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.Plan;
public interface PlanRepository extends JpaRepository<Plan, Long> {
    // Additional queries if needed
}
