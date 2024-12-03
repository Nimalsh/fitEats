package com.nimalsha.controller;

import com.nimalsha.model.USER_ROLE;
import com.nimalsha.model.User;
import com.nimalsha.model.Request;

import com.nimalsha.request.CreateRequestRequest;
import com.nimalsha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/active-user-count")
    public ResponseEntity<Integer> getActiveUserCount() {
        List<User> users = userService.getAllUsers();

        int count = 0;
        for (User user : users) {
            if (!user.getBlocked() && user.getRole() == USER_ROLE.ROLE_CUSTOMER) {
                count++;
            }
        }

        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/total-user-count")
    public ResponseEntity<Integer> getTotalUserCount() {
        List<User> users = userService.getAllUsers();

        int count = 0;
        for (User user : users) {
            if (user.getRole() == USER_ROLE.ROLE_CUSTOMER) {
                count++;
            }
        }

        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/today-user-count")
    public ResponseEntity<Integer> getTodayUserCount() {
        List<User> users = userService.getTodayUsers();

        int count = 0;
        for (User user : users) {
            if (user.getRole() == USER_ROLE.ROLE_CUSTOMER) {
                count++;
            }
        }

        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
    }

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

    @GetMapping("/my-requests")
    public ResponseEntity<List<Request>> getRequestsByToken(@RequestHeader("Authorization") String jwt) throws Exception {
        // Retrieve the requests associated with the user identified by the JWT token
        List<Request> requests = userService.getRequestsByToken(jwt);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }
    

}
