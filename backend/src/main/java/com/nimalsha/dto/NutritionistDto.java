package com.nimalsha.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NutritionistDto {
    private Long id;
    private String fullName;
    private String email;
    private String specializations;
    private int experience;
    private String qualifications;
}
