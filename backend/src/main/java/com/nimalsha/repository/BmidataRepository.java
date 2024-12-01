package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nimalsha.model.Bmidata;



public interface BmidataRepository extends JpaRepository<Bmidata, Long> {

    Bmidata findByPlanIdAndDaysId(Long planId, int daysId);
}
