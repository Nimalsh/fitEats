package com.nimalsha.service;

import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.request.CreateRequestRequest;
import java.util.List;


public interface UserService {
    List<User> getAllUsers();
    List<User> getTodayUsers();
    User updateUser(User user);

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
    Request createNewRequest(String jwtToken, CreateRequestRequest req) throws Exception;
    List<Request> getRequestsByToken(String jwtToken) throws Exception; 
    
}
