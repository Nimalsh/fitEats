package com.nimalsha.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Data
public class Articles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  
    private String title;  
    private String content;  
    private String author;
    private Long authorId;  
    private LocalDate publishedDate;  
    private byte[] image;  

}
