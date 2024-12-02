package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nutritionist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userid;

    private String fullName; // Nutritionist's full name
    private String email;    // Nutritionist's email address
    private String specializations; // Specializations, can be a comma-separated string
    private int experience;  // Number of years of experience
    private String qualifications;

    @Lob
    private byte[] documents; // Supporting documents in binary format

    
}
