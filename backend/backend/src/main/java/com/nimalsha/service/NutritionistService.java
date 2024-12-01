package com.nimalsha.service;

import com.nimalsha.model.Nutritionist;

import java.util.List;

public interface NutritionistService {
    public List<Nutritionist> getAll();
    public Nutritionist updateNutritionist(String id, Nutritionist nutritionist);
    public Nutritionist createNutritionist(Nutritionist nutritionist);
}
