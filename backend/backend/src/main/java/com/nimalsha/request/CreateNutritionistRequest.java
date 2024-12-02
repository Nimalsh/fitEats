package com.nimalsha.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateNutritionistRequest {
    private String fullName;
    private String email;
    private String qualifications;
    private int experience;
    private String specializations;
    private MultipartFile documents;
}

