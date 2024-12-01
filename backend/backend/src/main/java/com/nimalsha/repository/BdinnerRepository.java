package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.nimalsha.model.Bdinner;

@Repository
public interface BdinnerRepository extends JpaRepository<Bdinner, Long> {
    List<Bdinner> findByDinnerId(Long dinnerId);
}