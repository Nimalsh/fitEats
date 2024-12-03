package com.nimalsha.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Nutritionist {
    @Id
    private String nutritionistID;
    private String nutritionistName;
    private String SLMCregistration;
    private String email;
    private String contactNo;
    private Date signUpDate;
    private Boolean blocked;
}
