package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.nimalsha.model.Nutritionist;
import java.util.List;

@Repository
public interface NutritionistRepository extends JpaRepository<Nutritionist, Long> {
   
}