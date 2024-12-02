package com.nimalsha.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nimalsha.service.NutritionistService;
import com.nimalsha.request.CreateNutritionistRequest;
import com.nimalsha.model.Nutritionistrequests;
import com.nimalsha.repository.NutritionistrequestsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class NutritionistServiceImpl implements NutritionistService {

    @Autowired
    private NutritionistrequestsRepository nutritionistRequestRepository;

      @Autowired
    private JavaMailSender mailSender;

    @Override
    public Nutritionistrequests createNutritionistRequest(CreateNutritionistRequest request) throws IOException {
    Nutritionistrequests nutritionistRequest = new Nutritionistrequests();
    
    // Setting other fields
    nutritionistRequest.setFullName(request.getFullName());
    nutritionistRequest.setEmail(request.getEmail());
    nutritionistRequest.setQualifications(request.getQualifications());
    nutritionistRequest.setExperience(request.getExperience());
    nutritionistRequest.setSpecializations(request.getSpecializations());
    
    // Handling the document
    if (request.getDocuments() != null) {
        try {
            byte[] documentBytes = request.getDocuments().getBytes();
            nutritionistRequest.setDocuments(documentBytes);
        } catch (IOException e) {
            // Log the exception to troubleshoot
            e.printStackTrace();
            throw new IOException("Error while processing the uploaded document.");
        }
    } else {
        throw new IllegalArgumentException("Document file is missing.");
    }

    nutritionistRequest.setStatus("PENDING");
    nutritionistRequest.setCreatedAt(LocalDateTime.now());
    nutritionistRequest.setUpdatedAt(LocalDateTime.now());

    // Save the Nutritionistrequests entity to the repository
    return nutritionistRequestRepository.save(nutritionistRequest);
}

@Override
public Nutritionistrequests updateRequestStatus(Long requestId, String newStatus) throws IllegalArgumentException {
    // Retrieve the nutritionist request by ID
    Nutritionistrequests nutritionistRequest = nutritionistRequestRepository.findById(requestId)
            .orElseThrow(() -> new IllegalArgumentException("Nutritionist request not found with ID: " + requestId));

    // Update the status
    nutritionistRequest.setStatus(newStatus);
    nutritionistRequest.setUpdatedAt(LocalDateTime.now());

    // Save the updated request
    Nutritionistrequests updatedRequest = nutritionistRequestRepository.save(nutritionistRequest);

    // Send email notification
    String email = nutritionistRequest.getEmail();
    if (email != null && !email.isEmpty()) {
        try {
            sendStatusUpdateEmail(email, requestId, newStatus);
        } catch (Exception e) {
            // Log the exception but do not fail the operation
            System.err.println("Failed to send email notification: " + e.getMessage());
        }
    } else {
        System.out.println("No valid email address found for request ID: " + requestId);
    }

    return updatedRequest;
}

private void sendStatusUpdateEmail(String email, Long requestId, String status) {
    try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Nutritionist Request Status Update");
        message.setText("Dear User,\n\nYour nutritionist request with ID " + requestId +
                " has been updated to the following status: " + status + ".\n\nThank you.");

        mailSender.send(message);
    } catch (Exception e) {
        // Throw or log the exception based on your application's requirement
        throw new RuntimeException("Error while sending email: " + e.getMessage());
    }
}

 

@Override
public boolean doesNutritionistRequestExistByEmail(String email) {
    return nutritionistRequestRepository.findByEmail(email).isPresent();
}
@Override
public boolean doesNutritionistRequestExistByEmailAndStatusConfirmed(String email) {
    return nutritionistRequestRepository.findByEmailAndStatus(email, "confirmed").isPresent();
}
 
}

