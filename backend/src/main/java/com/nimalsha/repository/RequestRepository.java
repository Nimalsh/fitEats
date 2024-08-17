package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nimalsha.model.Request;
import java.util.List;
import java.util.Optional;

public interface RequestRepository extends JpaRepository<Request, Long> {
    // Additional custom queries if needed
    List<Request> findByNutritionistId(Long nutritionistId);
    Optional<Request> findById(Long id);
}

