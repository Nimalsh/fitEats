package com.nimalsha.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Data // Lombok will generate getters, setters, toString, equals, and hashCode methods
public class Queries {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long QueryId;
    private String query;
    private String username;
    private Long userId;
    private Long nutritionistId; 
    private String nutritionistName;
    private String status;
    private String reply;
    private LocalDate postDate; 
    private LocalDate repliedDate;  
}
