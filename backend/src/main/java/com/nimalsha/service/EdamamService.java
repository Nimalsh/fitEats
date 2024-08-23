package com.nimalsha.service;

import java.util.Map;
import java.util.List;

public interface EdamamService {


    public List<Map<String, Object>> getNutritionData(String foodName, String quantity) throws Exception;
}
