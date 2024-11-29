package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nimalsha.model.Bbreakfast;
import java.util.List;

@Repository
public interface BbreakfastRepository extends JpaRepository<Bbreakfast, Long> {
    List<Bbreakfast> findByBreakfastId(Long breakfastId);
}