package com.nimalsha.service;


import com.nimalsha.model.Queries;

import java.util.List;


public interface QueriesService {

    public void createAndSaveQuery(Long userId, String username, String queryString) throws Exception;
    public void replyQuery(Long queryId, String reply, Long nutritionistId, String nutritionistName) throws Exception;
    public List<Queries> findQueriesByUserId(Long userId);
    public List<Queries> findQueriesByNutritionistId(Long nutritionistId);
    public List<Queries> getAllQueries();
    public Queries getQueryById(Long queryId) throws Exception;

    
}
 