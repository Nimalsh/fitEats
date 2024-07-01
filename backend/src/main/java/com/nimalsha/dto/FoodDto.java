package com.nimalsha.dto;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;


@Data
@Embeddable
public class FoodDto {
     private Long id;
    private String name;
    private String description;
    private Long price;
    private List<String> images;
    private boolean vegetarian;
    private boolean seasonal;
   
}
