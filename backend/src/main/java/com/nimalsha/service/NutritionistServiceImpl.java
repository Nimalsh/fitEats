package com.nimalsha.service;

import com.nimalsha.model.Nutritionist;
import com.nimalsha.repository.NutritionistRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class NutritionistServiceImpl implements NutritionistService {
    @Autowired
    private NutritionistRepository nutritionistRepository;

    @Override
    public List<Nutritionist> getAll() {
        return nutritionistRepository.findAll();
    }

    @Override
    public Nutritionist updateNutritionist(String id, Nutritionist updatedNutritionist) {
            return nutritionistRepository.findById(id).map(existingNutritionist -> {
        existingNutritionist.setNutritionistName(updatedNutritionist.getNutritionistName());
        existingNutritionist.setSLMCregistration(updatedNutritionist.getSLMCregistration());
        existingNutritionist.setEmail(updatedNutritionist.getEmail());
        existingNutritionist.setContactNo(updatedNutritionist.getContactNo());
        existingNutritionist.setBlocked(updatedNutritionist.getBlocked());
        return nutritionistRepository.save(existingNutritionist);
    }).get();
    }

    @Override
    public Nutritionist createNutritionist(Nutritionist nutritionist) {
        return nutritionistRepository.save(nutritionist);
    }
}
