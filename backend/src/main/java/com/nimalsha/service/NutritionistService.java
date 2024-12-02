package com.nimalsha.service;

import com.nimalsha.request.CreateNutritionistRequest;

import java.util.List;

import com.nimalsha.dto.NutritionistDto;
import com.nimalsha.dto.NutritionistrequestDto;
import com.nimalsha.model.Nutritionist;
import com.nimalsha.model.Nutritionistrequests;


public interface NutritionistService {
    Nutritionistrequests createNutritionistRequest(CreateNutritionistRequest request) throws Exception;
    Nutritionistrequests updateRequestStatus(Long requestId, String newStatus) throws Exception;
   boolean doesNutritionistRequestExistByEmail(String email) throws Exception;
    boolean doesNutritionistRequestExistByEmailAndStatusConfirmed(String email) throws Exception;
    
     
     List<NutritionistDto> getAllNutritionist();
     public List<NutritionistrequestDto> getAllNutritionistRequests();
       public byte[] getDocumentByRequestId(Long requestId);
  
}
