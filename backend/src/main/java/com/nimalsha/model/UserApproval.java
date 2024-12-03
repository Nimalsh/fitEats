package com.nimalsha.model;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UserApproval {
    @Id
    private String requestId; 
    private String userType;
    private String userName;
    private LocalDate requestDate;
    private String fullName;
    private String sex;
    private String address;
    private Boolean waiting;
}
