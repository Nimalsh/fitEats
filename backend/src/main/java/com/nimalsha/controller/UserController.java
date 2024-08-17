package com.nimalsha.controller;

import com.nimalsha.model.User;
import com.nimalsha.model.Request;

import com.nimalsha.request.CreateRequestRequest;
import com.nimalsha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;




    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }
    @PostMapping("/requests")
    public ResponseEntity<Request> createRequest(@RequestBody CreateRequestRequest req,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        // Create the request using the JWT token and the request data
        Request request = userService.createNewRequest(jwt, req);
        
        return new ResponseEntity<>(request, HttpStatus.CREATED);
    }
    

}
