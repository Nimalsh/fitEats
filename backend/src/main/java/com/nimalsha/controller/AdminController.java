package com.nimalsha.controller;

import com.nimalsha.service.EdamamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.nimalsha.service.NutritionistServiceImpl;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private NutritionistServiceImpl nutritionistService;

    /**
     * Admin endpoint to update the status of a nutritionist request.
     * 
     * @param requestId the ID of the nutritionist request
     * @param newStatus the new status to set (e.g., "Suspended", "Confirmed")
     * @return ResponseEntity with a success or error message
     */
    @PutMapping("/nutritionist-request/{requestId}/status")
    public ResponseEntity<String> updateRequestStatus(
            @PathVariable Long requestId,
            @RequestParam String newStatus) {
        try {
            // Update the request status using the service
            nutritionistService.updateRequestStatus(requestId, newStatus);
            return ResponseEntity.ok("Request status updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
