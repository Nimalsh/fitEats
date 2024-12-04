package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



import com.nimalsha.model.Autoplanextra;
import com.nimalsha.model.Bdinner;

@Repository
public interface AutoplanextrarRepository extends JpaRepository<Autoplanextra, Long> {
    List<Autoplanextra> findAll();
    
}
