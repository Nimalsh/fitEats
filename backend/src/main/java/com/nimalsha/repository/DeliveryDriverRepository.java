package com.nimalsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nimalsha.model.DeliveryDriver;

@Repository
public interface DeliveryDriverRepository extends JpaRepository<DeliveryDriver, String> {
}
