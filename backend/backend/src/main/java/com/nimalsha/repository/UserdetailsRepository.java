package com.nimalsha.repository;

import com.nimalsha.model.User;
import com.nimalsha.model.Userdetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserdetailsRepository extends JpaRepository<Userdetails, Long> {
    public Userdetails findByUserId(Long userId);
}