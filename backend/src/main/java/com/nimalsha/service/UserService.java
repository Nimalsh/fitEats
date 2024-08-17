package com.nimalsha.service;

import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.request.CreateRequestRequest;


public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
    Request createNewRequest(String jwtToken, CreateRequestRequest req) throws Exception;
    
    
}
