// Controller
package com.nimalsha.controller;

import com.nimalsha.model.Complaint;
import com.nimalsha.service.ComplaintService;
import com.nimalsha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nimalsha.model.User;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ComplaintController {

    @Autowired
    private UserService userService;
    @Autowired
    private ComplaintService complaintService;

    // Create Complaint
    @PostMapping("/complaint")
    public ResponseEntity<Complaint> addComplaint(
            @RequestBody Complaint complaint,
            @RequestHeader("Authorization") String jwt) {
        try {
            // Extract user details using the JWT token
            User user = userService.findUserByJwtToken(jwt);

            // Set user-related data (e.g., email) from the extracted user
            complaint.setEmail(user.getEmail()); // Assuming User entity has an getEmail method

            // Create the complaint
            Complaint savedComplaint = complaintService.createComplaint(complaint);

            // Return the saved complaint
            return new ResponseEntity<>(savedComplaint, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exceptions and return a bad request response
            return ResponseEntity.badRequest().body(null);
        }
    }
// Get All Complaints

    // Get All Complaints
    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        try {
            List<Complaint> complaints = complaintService.getAllComplaints();
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get Complaint by ID
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
        try {
            Complaint complaint = complaintService.getComplaintById(id);
            return ResponseEntity.ok(complaint);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Delete Complaint by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        try {
            complaintService.deleteComplaint(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}