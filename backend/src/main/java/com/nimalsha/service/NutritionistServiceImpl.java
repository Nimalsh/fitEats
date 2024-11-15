package com.nimalsha.service;

import org.springframework.beans.factory.annotation.Autowired;
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
    // Check if the new status is valid
    
    // Retrieve the nutritionist request by ID
    Nutritionistrequests nutritionistRequest = nutritionistRequestRepository.findById(requestId)
            .orElseThrow(() -> new IllegalArgumentException("Nutritionist request not found with ID: " + requestId));

    // Update the status
    nutritionistRequest.setStatus(newStatus);
    nutritionistRequest.setUpdatedAt(LocalDateTime.now());

    // Save and return the updated request
    return nutritionistRequestRepository.save(nutritionistRequest);
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
