package com.nimalsha.service;

import com.nimalsha.request.CreateNutritionistRequest;
import com.nimalsha.model.Nutritionistrequests;


public interface NutritionistService {
    Nutritionistrequests createNutritionistRequest(CreateNutritionistRequest request) throws Exception;
    Nutritionistrequests updateRequestStatus(Long requestId, String newStatus) throws Exception;
   boolean doesNutritionistRequestExistByEmail(String email) throws Exception;
    boolean doesNutritionistRequestExistByEmailAndStatusConfirmed(String email) throws Exception; 
  
}
