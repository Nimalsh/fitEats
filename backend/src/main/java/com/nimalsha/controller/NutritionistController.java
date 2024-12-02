package com.nimalsha.controller;
import com.nimalsha.model.Nutritionist;
import com.nimalsha.model.Nutritionistrequests;
import com.nimalsha.repository.NutritionistRepository;
import com.nimalsha.service.UserService;
import com.nimalsha.service.NutritionistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.nimalsha.dto.NutritionistDto;
import com.nimalsha.dto.NutritionistrequestDto;

@RestController
@RequestMapping("api/nutritionists")
public class NutritionistController {

    @Autowired
    private NutritionistRepository nutritionistRepository;

    @Autowired
    private NutritionistService nutritionistService;


    @GetMapping("/{id}")
    public ResponseEntity<Nutritionist> getNutritionistById(@PathVariable Long id) {
        // Directly using the repository's findById method
        return nutritionistRepository.findById(id)
                .map(ResponseEntity::ok) // If the Nutritionist is found
                .orElseGet(() -> ResponseEntity.notFound().build()); // If not found, return 404
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<NutritionistDto>> getAllNutritionistRequests() {
        List<NutritionistDto> nutritionists = nutritionistService.getAllNutritionist();
        return ResponseEntity.ok(nutritionists);
    }

    @GetMapping("/admin/requests/all")
    public ResponseEntity<List<NutritionistrequestDto>> getAllNRequests() {
        List<NutritionistrequestDto> nutritionistRequests = nutritionistService.getAllNutritionistRequests();
        return ResponseEntity.ok(nutritionistRequests);
    }
    @CrossOrigin(origins = "http://localhost:3000") 
    @GetMapping("/{requestId}/document")
     public ResponseEntity<byte[]> getDocument(@PathVariable Long requestId) {
    byte[] document = nutritionistService.getDocumentByRequestId(requestId);
    
    if (document == null) {
        return ResponseEntity.notFound().build();
    }
    
    return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=document-" + requestId + ".pdf")
            .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
            .body(document);
}


}
