package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.nimalsha.model.Bmiplan;
import java.util.Optional;
import java.util.List;



public interface BmiplanRepository extends JpaRepository<Bmiplan, Long> {
    Optional<Bmiplan> findById(Long planId);
    List<Bmiplan> findByUserIdAndStatus(Long userId, String status);
}