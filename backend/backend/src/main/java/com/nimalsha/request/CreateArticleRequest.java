package com.nimalsha.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateArticleRequest {
    private String title;           // Title of the article
    private String content;         // Content of the article
    private Long authorId;          // ID of the author
    private String author;          // Name of the author (optional, if required)
    private LocalDate publishedDate; // Published date of the article
    private byte[] image;           // Image data in byte array (optional)
}

