package com.nimalsha.service;


import com.nimalsha.model.Articles;
import com.nimalsha.model.Queries;
import com.nimalsha.request.CreateArticleRequest;

import java.util.List;


public interface ArticlesService {

     Articles createArticle(CreateArticleRequest request); 
     public Articles updateArticle(Long articleId, String title, String content, byte[] image);
     void deleteArticle(Long articleId);

    Articles viewArticle(Long articleId);

    List<Articles> getAllArticles();

    List<Articles> findArticlesByAuthorId(Long authorId);

   

    
}