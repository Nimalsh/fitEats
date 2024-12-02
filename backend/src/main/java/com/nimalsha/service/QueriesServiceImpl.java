package com.nimalsha.service;

import com.nimalsha.model.Queries;
import com.nimalsha.repository.QueryRepository;
import com.nimalsha.repository.RequestRepository;
import com.nimalsha.request.SetMealsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class QueriesServiceImpl implements QueriesService {

     @Autowired
    private QueryRepository QueryRepository;


@Override
public void createAndSaveQuery(Long userId, String username, String queryString) throws Exception {
    // Create a new Queries object
    Queries newQuery = new Queries();
    
    // Set the fields for the query
    newQuery.setQuery(queryString);
    newQuery.setUserId(userId);
    newQuery.setUsername(username); // Assuming the username represents the nutritionist's name
    newQuery.setStatus("Pending"); // Setting a default status as "Pending"
    newQuery.setPostDate(LocalDate.now()); // Set the current date as postDate

    
    QueryRepository.save(newQuery);
}


@Override
public void replyQuery(Long queryId, String reply, Long nutritionistId, String nutritionistName) throws Exception {
    // Fetch the query by its ID
    Queries existingQuery = QueryRepository.findById(queryId)
            .orElseThrow(() -> new Exception("Query with ID " + queryId + " not found"));

    // Update the fields for the reply
    existingQuery.setReply(reply);
    existingQuery.setNutritionistId(nutritionistId);
    existingQuery.setNutritionistName(nutritionistName);
    existingQuery.setStatus("Replied"); // Set the status to "Replied"
    existingQuery.setRepliedDate(LocalDate.now()); // Set the current date as the reply date

    // Save the updated query object back to the repository
    QueryRepository.save(existingQuery);
}


@Override
public List<Queries> findQueriesByUserId(Long userId) {
    return QueryRepository.findByUserId(userId);
}
@Override
public List<Queries> findQueriesByNutritionistId(Long nutritionistId) {
    return QueryRepository.findByNutritionistId(nutritionistId);
}

@Override
public List<Queries> getAllQueries() {
    return QueryRepository.findAll();
}

@Override
    public Queries getQueryById(Long queryId) throws Exception {
        return QueryRepository.findById(queryId)
                .orElseThrow(() -> new Exception("Query not found for ID: " + queryId));
    }

    
}
