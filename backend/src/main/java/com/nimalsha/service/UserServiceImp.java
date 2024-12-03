package com.nimalsha.service;

import com.nimalsha.config.JwtProvider;
import com.nimalsha.model.User;
import com.nimalsha.model.Userdetails;
import com.nimalsha.model.Bmiplan;
import com.nimalsha.model.Request;
import com.nimalsha.repository.RequestRepository;
import com.nimalsha.repository.UserdetailsRepository;
import com.nimalsha.repository.BmiplanRepository;
import com.nimalsha.repository.UserRepository;
import com.nimalsha.request.UserUpdateRequest;
import com.nimalsha.request.UserdetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nimalsha.request.CreateRequestRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import com.nimalsha.request.CreateothergoalRequest;
@Service
public class UserServiceImp implements  UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserdetailsRepository userdetailsRepository;

    @Autowired
    private BmiplanRepository bmiplanRepository;


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
       
        request.setNutritionistId(req.getNutritionistId());
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
        request.setRequestDate(LocalDate.now());
        request.setNutritionistName(req.getNutritionistName());
        // Save the request to the repository
        return requestRepository.save(request);
    }
    @Override
    public Request createotherRequest(String jwtToken, CreateothergoalRequest req) throws Exception {
        // Find the user by JWT token
        User user = findUserByJwtToken(jwtToken);
    
        // Create a new Request object
        Request request = new Request();
        request.setTitle(req.getTitle());
        request.setUserId(user.getId()); // Use the ID of the user obtained from JWT
        request.setDescription(req.getDescription());
        request.setNutritionistId(req.getNutritionistId());
        request.setName(user.getFullName());
        request.setStatus(req.getStatus());
        request.setCurrentWeight(req.getCurrentWeight());
        
        
        request.setAge(req.getAge());
        request.setHeight(req.getHeight());
        request.setGender(req.getGender());
        request.setDietaryPreferences(req.getDietaryPreferences());
        request.setDietaryRestrictions(req.getDietaryRestrictions());
        request.setActivityLevel(req.getActivityLevel());
        request.setMealsPerDay(req.getMealsPerDay());
        request.setRequestDate(LocalDate.now());
        request.setNutritionistName(req.getNutritionistName());
        
        
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
    @Override
    public Userdetails createUserDetails(String jwtToken, UserdetailsRequest req) throws Exception {
        User user = findUserByJwtToken(jwtToken);
        
        Userdetails userdetails = new Userdetails();
        
        userdetails.setUserId(user.getId());
        userdetails.setUsername(user.getFullName()); // Assuming User has a getUsername() method
        userdetails.setCurrentWeight(req.getCurrentWeight());
        userdetails.setAge(req.getAge());
        userdetails.setHeight(req.getHeight());
        userdetails.setGender(req.getGender().toLowerCase()); // Convert to lowercase
        userdetails.setDietaryPreferences(req.getDietaryPreferences().toLowerCase()); // Convert to lowercase
        userdetails.setDietaryRestrictions(req.getDietaryRestrictions().toLowerCase()); // Convert to lowercase
        userdetails.setActivityLevel(req.getActivityLevel().toLowerCase()); // Convert to lowercase
        userdetails.setSpecials(req.getSpecials().toLowerCase());
        double heightInMeters = req.getHeight() / 100.0; // Convert height from cm to meters
        double bmi = req.getCurrentWeight() / (heightInMeters * heightInMeters);
        userdetails.setBmi(bmi);


        return userdetailsRepository.save(userdetails);
    }

    @Override
public Userdetails updateWeightAndHeightByToken(String jwtToken, UserdetailsRequest req, Long planId) throws Exception {
    // Find the user by JWT token
    User user = findUserByJwtToken(jwtToken);

    // Find existing user details or create new if not found
    Userdetails userdetails = userdetailsRepository.findByUserId(user.getId());
    if (userdetails == null) {
        userdetails = new Userdetails();
        userdetails.setUserId(user.getId());
    }

    // Update the user details
    userdetails.setCurrentWeight(req.getCurrentWeight());
    userdetails.setHeight(req.getHeight());

    // Calculate BMI
    double heightInMeters = userdetails.getHeight() / 100.0;
    double bmi = userdetails.getCurrentWeight() / (heightInMeters * heightInMeters);
    userdetails.setBmi(bmi);

    // Save the updated user details
    userdetails = userdetailsRepository.save(userdetails);

    // Find the BMI plan by planId
    Optional<Bmiplan> optionalBmiplan = bmiplanRepository.findById(planId);
    if (optionalBmiplan.isPresent()) {
        Bmiplan bmiplan = optionalBmiplan.get();

        // Update the plan status to "finished"
        bmiplan.setStatus("finished");

        // Save the updated BMI plan
        bmiplanRepository.save(bmiplan);
    } else {
        throw new Exception("BMI Plan not found with ID: " + planId);
    }

    return userdetails;
}


    @Override
    public Userdetails getUserDetailsByToken(String jwtToken) throws Exception {
        User user = findUserByJwtToken(jwtToken);
        Userdetails userdetails = userdetailsRepository.findByUserId(user.getId());
        if (userdetails == null) {
            throw new Exception("User details not found");
        }
        return userdetails;
    }



        @Override
        public User updateProfile(String jwtToken, UserUpdateRequest userUpdateRequest) {
            // Get the email from JWT token
            String email = jwtProvider.getEmailFromJwtToken(jwtToken);

            // Find the user by email
            User user = userRepository.findByEmail(email);


            // Update the user's profile information
            if (userUpdateRequest.getFullName() != null) {
                user.setFullName(userUpdateRequest.getFullName());
            }
            if (userUpdateRequest.getEmail() != null) {
                user.setEmail(userUpdateRequest.getEmail());
            }
            if (userUpdateRequest.getNewPassword() != null && !userUpdateRequest.getNewPassword().isEmpty()) {
                // Handle password update logic, ensure it meets security standards (e.g., hash the password)
                user.setPassword(userUpdateRequest.getNewPassword());
            }

            // Save the updated user
            return userRepository.save(user);
        }


}
