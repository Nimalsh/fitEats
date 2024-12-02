package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nutritionistrequests {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String fullName;
    private String email;
    private String qualifications;

    private int experience; // Number of years of experience
    private String specializations; // Areas of expertise, can be a comma-separated string

    @Lob
    private byte[] documents; // Supporting documents in binary format

   
    private String status; 
    private String comments; // Comments by admin

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

