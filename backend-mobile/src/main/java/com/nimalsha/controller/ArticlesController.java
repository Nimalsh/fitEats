package com.nimalsha.controller;

import com.nimalsha.dto.ArticlesDto;
import com.nimalsha.model.Articles;
import com.nimalsha.model.User;
import com.nimalsha.request.CreateArticleRequest;
import com.nimalsha.service.ArticlesService;
import com.nimalsha.service.UserService;
import com.nimalsha.dto.ArticlesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.stream.Collectors;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Base64;

@RestController
@RequestMapping("/articles")
public class ArticlesController {

    @Autowired
    private ArticlesService articlesService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Articles> createArticle(
            @RequestHeader("Authorization") String jwt,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("image") MultipartFile image) {
        try {
            // Extract user details from the JWT token
            User user = userService.findUserByJwtToken(jwt);

            // Prepare the request object
            CreateArticleRequest request = new CreateArticleRequest();
            request.setTitle(title);
            request.setContent(content);
            request.setAuthorId(user.getId()); // Set authorId from user object
            request.setAuthor(user.getFullName()); // Set author name from user object
            request.setPublishedDate(LocalDate.now()); // Use the current date
            request.setImage(image.getBytes()); // Convert image file to byte array

            // Save the article
            Articles createdArticle = articlesService.createArticle(request);
            return ResponseEntity.ok(createdArticle);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Handle file processing errors
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Handle general errors
        }
    }


    @PutMapping("/update/{id}")
public ResponseEntity<Articles> updateArticle(
        @PathVariable Long id,
        @RequestParam(required = false) String title,
        @RequestParam(required = false) String content,
        @RequestParam(required = false) MultipartFile image) {
    try {
        byte[] imageBytes = (image != null) ? image.getBytes() : null;

        Articles updatedArticle = articlesService.updateArticle(id, title, content, imageBytes);
        return ResponseEntity.ok(updatedArticle);
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


@DeleteMapping("/{id}")
public ResponseEntity<String> deleteArticle(@PathVariable Long id) {
    articlesService.deleteArticle(id);
    return ResponseEntity.ok("Article deleted successfully.");
}

@GetMapping("/{id}")
public ResponseEntity<ArticlesDto> getArticle(@PathVariable Long id) {
    // Fetch the article by ID from the service layer
    Articles article = articlesService.viewArticle(id);

    // Convert the article entity to a DTO
    ArticlesDto articleDto = new ArticlesDto();
    articleDto.setId(article.getId());
    articleDto.setTitle(article.getTitle());
    articleDto.setContent(article.getContent());
    articleDto.setAuthor(article.getAuthor());
    articleDto.setPublishedDate(article.getPublishedDate());
    articleDto.setAuthorId(article.getAuthorId());

    // Convert the byte array to Base64 (if image exists)
    if (article.getImage() != null) {
        String base64Image = Base64.getEncoder().encodeToString(article.getImage());
        articleDto.setImage(base64Image); // Store it as a Base64 string
    }

    return ResponseEntity.ok(articleDto);
}


@GetMapping
    public ResponseEntity<List<ArticlesDto>> getAllArticles() {
        // Fetch all articles from the service layer
        List<Articles> articles = articlesService.getAllArticles();

        // Convert articles to DTOs with Base64 image data
        List<ArticlesDto> articlesDtoList = articles.stream()
            .map(article -> {
                ArticlesDto articleDto = new ArticlesDto();
                articleDto.setId(article.getId());
                articleDto.setTitle(article.getTitle());
                articleDto.setContent(article.getContent());
                articleDto.setAuthor(article.getAuthor());
                articleDto.setPublishedDate(article.getPublishedDate());
                articleDto.setAuthorId(article.getAuthorId());

                // Convert the byte array to Base64 (if image exists)
                if (article.getImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(article.getImage());
                    articleDto.setImage(base64Image); // Store it as a single Base64 string
                }

                return articleDto;
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(articlesDtoList);
    }

@GetMapping("/author")
public ResponseEntity<List<Articles>> getArticlesByAuthorId(
        @RequestHeader("Authorization") String jwt) {
    try {
        // Extract user details from the JWT token
        User user = userService.findUserByJwtToken(jwt);
        Long authorId = user.getId(); // Get the author ID from the user object

        // Fetch articles by the authorId
        List<Articles> articles = articlesService.findArticlesByAuthorId(authorId);

        return ResponseEntity.ok(articles); // Return articles for the author
    } catch (Exception e) {
        // Handle any errors (e.g., user not found or JWT issues)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null);
    }
}


}
