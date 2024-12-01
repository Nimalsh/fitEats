package com.nimalsha.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.Articles;
import com.nimalsha.repository.ArticlesRepository;
import com.nimalsha.request.CreateArticleRequest;
import java.util.Optional;
import java.util.List;

@Service
public class ArticlesServiceImpl implements ArticlesService {

    @Autowired
    private ArticlesRepository articleRepository;
    @Override
    public Articles createArticle(CreateArticleRequest request) {
        Articles article = new Articles();
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setAuthorId(request.getAuthorId());
        article.setAuthor(request.getAuthor());
        article.setPublishedDate(request.getPublishedDate());
        article.setImage(request.getImage());

        return articleRepository.save(article);
    }


    @Override
public Articles updateArticle(Long articleId, String title, String content, byte[] image) {
    Optional<Articles> optionalArticle = articleRepository.findById(articleId);

    if (optionalArticle.isPresent()) {
        Articles article = optionalArticle.get();

        // Update only provided fields
        if (title != null && !title.isEmpty()) {
            article.setTitle(title);
        }
        if (content != null && !content.isEmpty()) {
            article.setContent(content);
        }
        if (image != null && image.length > 0) {
            article.setImage(image);
        }

        return articleRepository.save(article);
    } else {
        throw new RuntimeException("Article not found with id: " + articleId);
    }
}


@Override
public void deleteArticle(Long articleId) {
    if (articleRepository.existsById(articleId)) {
        articleRepository.deleteById(articleId);
    } else {
        throw new RuntimeException("Article not found with id: " + articleId);
    }
}

@Override
public Articles viewArticle(Long articleId) {
    return articleRepository.findById(articleId)
            .orElseThrow(() -> new RuntimeException("Article not found with id: " + articleId));
}

@Override
public List<Articles> getAllArticles() {
    return articleRepository.findAll();
}

@Override
public List<Articles> findArticlesByAuthorId(Long authorId) {
    return articleRepository.findByAuthorId(authorId);
}

    
}
