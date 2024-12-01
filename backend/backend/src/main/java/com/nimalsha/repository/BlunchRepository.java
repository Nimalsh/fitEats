package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.nimalsha.model.Blunch;

@Repository
public interface BlunchRepository extends JpaRepository<Blunch, Long> {
    List<Blunch> findByLunchId(Long lunchId);
}
