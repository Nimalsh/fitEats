package com.nimalsha.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class NutritionistrequestDto {
    private Long id;
    private String fullName;
    private String email;
    private String specializations;
    private int experience;
    private String qualifications;
    private String status;
   

}