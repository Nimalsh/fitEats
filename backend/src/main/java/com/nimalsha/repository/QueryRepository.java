package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nimalsha.model.Queries;
import java.util.List;
import java.util.Optional;

public interface QueryRepository extends JpaRepository<Queries, Long> {
    // Additional custom queries if needed
    List<Queries> findByNutritionistId(Long nutritionistId);
    Optional<Queries> findById(Long id);
   
    List<Queries> findByUserId(Long userId);
    List<Queries> findAll();

}

