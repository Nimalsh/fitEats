package com.nimalsha.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ArticlesDto {

    private Long id;
    private String title;
    private String content;
    private String author;
    private Long authorId;
    private LocalDate publishedDate;
    private String image; // Single Base64-encoded image string
    
}
