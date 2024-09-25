package com.example.driver.dto;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class CategoryDto {

  private Long id;
    private String name;
}
