package com.nimalsha.service;

import com.nimalsha.model.User;
import com.nimalsha.model.Userdetails;
import com.nimalsha.model.Request;
import com.nimalsha.request.CreateRequestRequest;
import com.nimalsha.request.CreateothergoalRequest;
import com.nimalsha.request.UserdetailsRequest;

import java.util.List;


public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
    Request createNewRequest(String jwtToken, CreateRequestRequest req) throws Exception;
    List<Request> getRequestsByToken(String jwtToken) throws Exception;
    public Userdetails createUserDetails(String jwtToken, UserdetailsRequest req) throws Exception; 
    
    public Userdetails getUserDetailsByToken(String jwtToken) throws Exception;
    public Userdetails updateWeightAndHeightByToken(String jwtToken, UserdetailsRequest req, Long planId) throws Exception;
    public Request createotherRequest(String jwtToken, CreateothergoalRequest req) throws Exception;
    
}
