package com.nimalsha.controller;

import com.nimalsha.model.User;
import com.nimalsha.model.Userdetails;
import com.nimalsha.model.Request;

import com.nimalsha.request.CreateRequestRequest;
import com.nimalsha.request.UserdetailsRequest;
import com.nimalsha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nimalsha.request.CreateothergoalRequest;
import java.util.List;
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

    @PostMapping("/otherrequests")
    public ResponseEntity<Request> createotherRequest(@RequestBody CreateothergoalRequest req,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        // Create the request using the JWT token and the request data
        Request request = userService.createotherRequest(jwt, req);
        
        return new ResponseEntity<>(request, HttpStatus.CREATED);
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<Request>> getRequestsByToken(@RequestHeader("Authorization") String jwt) throws Exception {
        // Retrieve the requests associated with the user identified by the JWT token
        List<Request> requests = userService.getRequestsByToken(jwt);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

     @PostMapping("/create/userdetails")
    public ResponseEntity<Userdetails> createUserDetails(
            @RequestBody UserdetailsRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {
        
        // Call the service method to create user details
        Userdetails userdetails = userService.createUserDetails(jwt, req);
        
        // Return the created user details with HTTP status 201 (Created)
        return new ResponseEntity<>(userdetails, HttpStatus.CREATED);
    }
   
    @PutMapping("/update-weight-height/{planId}")
    public ResponseEntity<Userdetails> updateWeightAndHeight(
            @RequestHeader("Authorization") String jwt,
            @RequestBody UserdetailsRequest req,
            @PathVariable("planId") Long planId) throws Exception {
        // Update weight and height using the JWT token, request data, and plan ID
        Userdetails updatedUserDetails = userService.updateWeightAndHeightByToken(jwt, req, planId);
        return new ResponseEntity<>(updatedUserDetails, HttpStatus.OK);
    }

    @GetMapping("/userdetails")
    public ResponseEntity<Userdetails> getUserDetailsByToken(@RequestHeader("Authorization") String jwt) throws Exception {
        Userdetails userdetails = userService.getUserDetailsByToken(jwt);
        return new ResponseEntity<>(userdetails, HttpStatus.OK);
    }

    

}
