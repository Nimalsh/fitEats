package com.nimalsha.service;

import com.nimalsha.config.JwtProvider;
import com.nimalsha.model.User;
import com.nimalsha.model.Request;
import com.nimalsha.repository.RequestRepository;
import com.nimalsha.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nimalsha.request.CreateRequestRequest;
import java.util.List;

@Service
public class UserServiceImp implements  UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RequestRepository requestRepository;


    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email =jwtProvider.getEmailFromJwtToken(jwt);
        User user=findUserByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new Exception("user not found");
        }
        return user;
    }

    public Request createNewRequest(String jwtToken, CreateRequestRequest req) throws Exception {
        // Find the user by JWT token
        User user = findUserByJwtToken(jwtToken);
    
        // Create a new Request object
        Request request = new Request();
        request.setTitle(req.getTitle());
        request.setUserId(user.getId()); // Use the ID of the user obtained from JWT
       
        request.setNutritionistId(102L);
        request.setName(user.getFullName());
        request.setStatus(req.getStatus());
        request.setCurrentWeight(req.getCurrentWeight());
        request.setWeightGoal(req.getWeightGoal());
        request.setDuration(req.getDuration()); 
        request.setAge(req.getAge());
        request.setHeight(req.getHeight());
        request.setGender(req.getGender());
        request.setDietaryPreferences(req.getDietaryPreferences());
        request.setDietaryRestrictions(req.getDietaryRestrictions());
        request.setActivityLevel(req.getActivityLevel());
        request.setMealsPerDay(req.getMealsPerDay());
    
        // Save the request to the repository
        return requestRepository.save(request);
    }

    @Override
    public List<Request> getRequestsByToken(String jwtToken) throws Exception {
        // Find the user by JWT token
        User user = findUserByJwtToken(jwtToken);

        // Fetch and return the requests associated with the user
        return requestRepository.findByUserId(user.getId());
    }
    
}
