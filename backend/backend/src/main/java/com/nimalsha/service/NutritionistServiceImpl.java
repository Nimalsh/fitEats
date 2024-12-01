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
    public Nutritionist updateNutritionist(String id, Nutritionist nutritionist) {
        Optional<Nutritionist> _nutritionist = nutritionistRepository.findById(id);

        if (_nutritionist.isPresent()) {
            return nutritionistRepository.save(nutritionist);
        }

        return null;
    }

    @Override
    public Nutritionist createNutritionist(Nutritionist nutritionist) {
        return nutritionistRepository.save(nutritionist);
    }
}
