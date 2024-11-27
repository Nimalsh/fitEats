package com.nimalsha.controller;
import com.nimalsha.model.User;
import com.nimalsha.model.Queries;
import com.nimalsha.service.UserService;
import com.nimalsha.service.QueriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/queries")

public class QueriesController {

    @Autowired
    private UserService userService;

    @Autowired
    private QueriesService queriesService;


    @PostMapping("/add-query")
    public ResponseEntity<String> addQuery(
            @RequestHeader("Authorization") String jwt,
            @RequestBody String queryString) {
        try {
            // Find the user details using the JWT token
            User user = userService.findUserByJwtToken(jwt);

            // Call the service to save the query
            queriesService.createAndSaveQuery(user.getId(), user.getFullName(), queryString.trim());

            return ResponseEntity.ok("Query added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add query: " + e.getMessage());
        }
    }


    @PostMapping("/add-reply/{queryId}")
    public ResponseEntity<String> addReply(
            @PathVariable Long queryId,
            @RequestHeader("Authorization") String jwt,
            @RequestBody String reply) {
        try {
            // Find the user details using the JWT token
            User user = userService.findUserByJwtToken(jwt);
    
            // Call the service to save the reply
            queriesService.replyQuery(queryId, reply.trim(), user.getId(), user.getFullName());
    
            return ResponseEntity.ok("Reply added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add reply: " + e.getMessage());
        }
    }
    
    @GetMapping("/user/queries")
public ResponseEntity<?> getQueriesByUserId(@RequestHeader("Authorization") String jwt) {
    try {
        // Extract user details from JWT token
        User user = userService.findUserByJwtToken(jwt);
        
        // Retrieve queries for the user
        List<Queries> queries = queriesService.findQueriesByUserId(user.getId());

        if (queries.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No queries found for userId: " + user.getId());
        }

        return ResponseEntity.ok(queries);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to retrieve queries: " + e.getMessage());
    }
}

  


@GetMapping("/nutritionist/queries")
   
    public ResponseEntity<?> getRepliedbyme(@RequestHeader("Authorization") String jwt) {
        try {
            // Extract user details from JWT token
            User user = userService.findUserByJwtToken(jwt);
            
            // Retrieve queries for the user
            List<Queries> queries = queriesService.findQueriesByNutritionistId(user.getId());
    
            if (queries.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No queries found for userId: " + user.getId());
            }
    
            return ResponseEntity.ok(queries);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve queries: " + e.getMessage());
        }
    }

    @GetMapping("/all")
public ResponseEntity<?> getAllQueries() {
    List<Queries> queries = queriesService.getAllQueries();
    if (queries.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No queries found");
    }
    return ResponseEntity.ok(queries);
}


@GetMapping("/{queryId}")
public ResponseEntity<?> getQueryById(@PathVariable Long queryId) {
    try {
        Queries query = queriesService.getQueryById(queryId);
        return ResponseEntity.ok(query);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}

    
}
