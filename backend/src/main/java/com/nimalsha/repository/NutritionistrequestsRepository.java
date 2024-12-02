package com.nimalsha.repository;

import com.nimalsha.model.Nutritionistrequests;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NutritionistrequestsRepository extends JpaRepository<Nutritionistrequests, Long> {

    Optional<Nutritionistrequests> findByEmail(String email);
    Optional<Nutritionistrequests> findByEmailAndStatus(String email, String status);

}
