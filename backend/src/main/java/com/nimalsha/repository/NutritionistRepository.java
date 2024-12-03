package com.nimalsha.repository;

import com.nimalsha.model.Nutritionist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NutritionistRepository extends JpaRepository<Nutritionist, String> {
    public Optional<Nutritionist> findById(String id);
    public List<Nutritionist> findAll();
}
