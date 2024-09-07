package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nimalsha.model.Mealloglunch;
import java.util.List;

@Repository
public interface MealloglunchRepository extends JpaRepository<Mealloglunch, Long> {
    List<Mealloglunch> findByLunchId(Long lunchId);
}
