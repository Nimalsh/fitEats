package com.nimalsha.controller;


import com.nimalsha.config.JwtProvider;
import com.nimalsha.model.Cart;
import com.nimalsha.model.Nutritionist;
import com.nimalsha.model.Nutritionistrequests;
import com.nimalsha.model.USER_ROLE;
import com.nimalsha.model.User;
import com.nimalsha.repository.CartRepository;
import com.nimalsha.repository.UserRepository;
import com.nimalsha.request.CreateNutritionistRequest;
import com.nimalsha.request.LoginRequest;
import com.nimalsha.response.AuthResponse;
import com.nimalsha.service.CustomerUserDetailsService;
import com.nimalsha.service.NutritionistService;
import com.nimalsha.repository.NutritionistrequestsRepository;
import com.nimalsha.repository.NutritionistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private CartRepository cartRepository;

     @Autowired
    private NutritionistService nutritionistService;

    @Autowired
    private NutritionistrequestsRepository nutritionistrequestsRepository ;

    @Autowired
    private NutritionistRepository nutritionistRepository ;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExist=userRepository.findByEmail(user.getEmail());
        if(isEmailExist!=null){
            throw new Exception(("Email is already used with another account"));
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(createdUser);

        Cart cart =new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

          // Check role by ordinal value (assuming ROLE_NUTRITION is stored as 3)
          if (user.getRole().ordinal() == USER_ROLE.ROLE_NUTRITION.ordinal()) {
            Optional<Nutritionistrequests> requestOptional = nutritionistrequestsRepository.findByEmail(user.getEmail());
            if (requestOptional.isPresent()) {
                Nutritionistrequests request = requestOptional.get();
    
                // Create a new Nutritionist entity and assign fields from the request
                Nutritionist nutritionist = new Nutritionist();
                nutritionist.setFullName(request.getFullName());
                nutritionist.setEmail(request.getEmail());
                nutritionist.setSpecializations(request.getSpecializations());
                nutritionist.setExperience(request.getExperience());
                nutritionist.setDocuments(request.getDocuments());
                nutritionist.setQualifications(request.getQualifications());
                nutritionist.setUserid(savedUser.getId());
    
                // Save the Nutritionist to the database
                nutritionistRepository.save(nutritionist);
    
                
             
            } else {
                throw new Exception("No matching nutritionist request found for the given email");
            }
        }


        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt=jwtProvider.generateToken(authentication);

        AuthResponse authResponse =new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public  ResponseEntity<AuthResponse> signin(@RequestBody  LoginRequest req){
        String username= req.getEmail();
        String password= req.getPassword();

        Authentication authentication=authenticate(username,password);

        Collection<? extends GrantedAuthority>authorities=authentication.getAuthorities();
        String role= authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        String jwt=jwtProvider.generateToken(authentication);

        AuthResponse authResponse =new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login success");
        authResponse.setRole(USER_ROLE.valueOf(role));


        return  new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails=customerUserDetailsService.loadUserByUsername(username);

        if(userDetails==null){
            throw new BadCredentialsException("Invalid username...");
        }

        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw  new BadCredentialsException(("Invalid password..."));
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }

    @PostMapping("/nutritionist-request")
    public ResponseEntity<String> createNutritionistRequest(
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam("qualifications") String qualifications,
            @RequestParam("experience") int experience,
            @RequestParam("specializations") String specializations,
            @RequestPart("documents") MultipartFile documents) {
        
        try {
            CreateNutritionistRequest request = new CreateNutritionistRequest();
            request.setFullName(fullName);
            request.setEmail(email);
            request.setQualifications(qualifications);
            request.setExperience(experience);
            request.setSpecializations(specializations);
            request.setDocuments(documents);
            
            // Pass the request to the service layer
            nutritionistService.createNutritionistRequest(request);
            
            return ResponseEntity.status(201).body("Nutritionist request submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to process nutritionist request");
        }
    }

    @PostMapping("/check-nutritionist-request")
public ResponseEntity<Boolean> checkNutritionistRequestByEmail(@RequestParam("email") String email) {
    try {
        boolean exists = nutritionistService.doesNutritionistRequestExistByEmail(email);
        return ResponseEntity.ok(exists);
    } catch (Exception e) {
        e.printStackTrace();  // This will print the error stack trace to the console
        return ResponseEntity.status(500).body(false);
    }
}

    @PostMapping("/check-nutritionist-request-confirmed")
    public ResponseEntity<Boolean> checkNutritionistRequestByEmailAndStatus(
            @RequestParam("email") String email) {
        try {
            boolean exists = nutritionistService.doesNutritionistRequestExistByEmailAndStatusConfirmed(email);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(false); // Return false in case of error
        }
    }

}
