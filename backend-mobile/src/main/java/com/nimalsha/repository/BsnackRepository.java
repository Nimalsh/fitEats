package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.nimalsha.model.Bsnack;

@Repository
public interface BsnackRepository extends JpaRepository<Bsnack, Long> {
    List<Bsnack> findBySnackId(Long snackId);
}