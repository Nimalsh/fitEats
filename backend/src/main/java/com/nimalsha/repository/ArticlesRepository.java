package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nimalsha.model.Articles;
import java.util.List;
import java.util.Optional;

public interface ArticlesRepository extends JpaRepository<Articles, Long> {
    
    Optional<Articles> findById(Long id);
    List<Articles> findByAuthorId(Long AuthorId);
    List<Articles> findAll();
    

}