package com.nimalsha.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nimalsha.model.Bbreakfast;
import com.nimalsha.model.Bmidata;
import com.nimalsha.model.Bdinner;
import com.nimalsha.model.Blunch;
import com.nimalsha.repository.BbreakfastRepository;
import com.nimalsha.repository.BmidataRepository;
import com.nimalsha.repository.BdinnerRepository;
import com.nimalsha.repository.BlunchRepository;
import com.nimalsha.model.Bmiplan;
import com.nimalsha.model.Bsnack;
import com.nimalsha.model.Nutriconsumption;
import com.nimalsha.repository.BmiplanRepository;
import com.nimalsha.repository.BsnackRepository;
import com.nimalsha.repository.NutriconsumptionRepository;
import com.nimalsha.request.AddMealRequest;
import com.nimalsha.request.CreatebmiplanRequest;
import java.util.Map;
import java.util.UUID;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class BmiServiceImpl implements BmiService {

    @Autowired
    private BmiplanRepository bmiplanRepository;

    @Autowired
    private BmidataRepository bmidataRepository;

    @Autowired
    private BbreakfastRepository bbreakfastRepository;

    @Autowired
    private BdinnerRepository bdinnerRepository;

    @Autowired
    private BlunchRepository blunchRepository;

    @Autowired
    private BsnackRepository bsnackRepository;

    @Autowired
    private NutriconsumptionRepository NutriconsumptionRepository;

    @Override
public Bmiplan createPlan(CreatebmiplanRequest request) throws Exception {
    // Create and save Bmiplan
    Bmiplan bmiplan = new Bmiplan();
    bmiplan.setDuration(request.getDuration());
    bmiplan.setUserId(request.getUserId());
    bmiplan.setStatus(request.getStatus());
    bmiplan.setWeight(request.getWeight());
    bmiplan.setHeight(request.getHeight());
    bmiplan.setBmi(request.getBmi());
    bmiplan.setTarget(request.getTarget());
    bmiplan = bmiplanRepository.save(bmiplan);

    // Create and save Bmidata for each day
    for (int day = 1; day <= request.getDuration(); day++) {
        Bmidata bmidata = new Bmidata();
        bmidata.setPlanId(bmiplan.getPlanId());
        bmidata.setDaysId(day);

        // Generate UUIDs for IDs
        Long breakfastId = generateUniqueLongId();
        Long lunchId = generateUniqueLongId();
        Long dinnerId = generateUniqueLongId();
        Long snackId = generateUniqueLongId();

        // Assign UUIDs to Bmidata
        bmidata.setBreakfastId(breakfastId);
        bmidata.setLunchId(lunchId);
        bmidata.setDinnerId(dinnerId);
        bmidata.setSnackId(snackId);

        bmidataRepository.save(bmidata);
    }

    for (int day = 1; day <= request.getDuration(); day++) {
        Nutriconsumption consumption = new Nutriconsumption();
        consumption.setPlanId(bmiplan.getPlanId());
        consumption.setDaysId(day);

        NutriconsumptionRepository.save(consumption);
    }

    return bmiplan;
}
  
private Long generateUniqueLongId() {
    // Generate a unique Long ID using a timestamp or other logic
    return System.currentTimeMillis(); // Example
}




    @Override
    public Long getMealId(Long planId, int daysId, String mealName) {
        Bmidata bmidata = bmidataRepository.findByPlanIdAndDaysId(planId, daysId);

        if (bmidata == null) {
            throw new RuntimeException("No data found for the given planId and daysId.");
        }

        switch (mealName.toLowerCase()) {
            case "breakfast":
                return bmidata.getBreakfastId();
            case "lunch":
                return bmidata.getLunchId();
            case "dinner":
                return bmidata.getDinnerId();
            case "snack":
                return bmidata.getSnackId();
            default:
                throw new IllegalArgumentException("Invalid meal name: " + mealName);
        }
    }

    @Override
    public void addMealToDay(Long planId, int daysId, String mealName, AddMealRequest addMealRequest) {
     
        try {
            // Retrieve the meal ID for the given meal type and plan/day
            Long mealId = getMealId(planId, daysId, mealName);
            
            // Create a new meal instance based on mealName
            switch (mealName.toLowerCase()) {
                case "breakfast":
                    Bbreakfast breakfast = new Bbreakfast();
                    breakfast.setBreakfastId(mealId);
                    breakfast.setItem(addMealRequest.getItem());
                    breakfast.setMeasurement(addMealRequest.getMeasurement());
                    breakfast.setQuantity(addMealRequest.getQuantity());
                    bbreakfastRepository.save(breakfast);
                    break;

                case "lunch":
                    Blunch lunch = new Blunch();
                    lunch.setLunchId(mealId);
                    lunch.setItem(addMealRequest.getItem());
                    lunch.setMeasurement(addMealRequest.getMeasurement());
                    lunch.setQuantity(addMealRequest.getQuantity());
                    blunchRepository.save(lunch);
                    break;

                case "dinner":
                    Bdinner dinner = new Bdinner();
                    dinner.setDinnerId(mealId);
                    dinner.setItem(addMealRequest.getItem());
                    dinner.setMeasurement(addMealRequest.getMeasurement());
                    dinner.setQuantity(addMealRequest.getQuantity());
                    bdinnerRepository.save(dinner);
                    break;

                case "snack":
                    Bsnack snack = new Bsnack();
                    snack.setSnackId(mealId);
                    snack.setItem(addMealRequest.getItem());
                    snack.setMeasurement(addMealRequest.getMeasurement());
                    snack.setQuantity(addMealRequest.getQuantity());
                    bsnackRepository.save(snack);
                    break;

                default:
                    throw new IllegalArgumentException("Invalid meal name: " + mealName);
            }
        } catch (Exception e) {
            System.out.println("Error occurred while adding meal: " + e.getMessage());
            e.printStackTrace(); // Print the stack trace for debugging
            throw e; // Rethrow the exception to propagate it upwards
        }
    }

    @Override
    public Map<String, List<?>> getMealsForDay(Long planId, int daysId) {
        // Retrieve Bmidata to get meal IDs
        Bmidata bmidata = bmidataRepository.findByPlanIdAndDaysId(planId, daysId);
        if (bmidata == null) {
            throw new RuntimeException("No data found for the given planId and daysId.");
        }

        // Retrieve records for each meal type
        Long breakfastId = bmidata.getBreakfastId();
        Long lunchId = bmidata.getLunchId();
        Long dinnerId = bmidata.getDinnerId();
        Long snackId = bmidata.getSnackId();

        // Fetch all records for each meal ID
        List<Bbreakfast> breakfasts = bbreakfastRepository.findByBreakfastId(breakfastId);
        List<Blunch> lunches = blunchRepository.findByLunchId(lunchId);
        List<Bdinner> dinners = bdinnerRepository.findByDinnerId(dinnerId);
        List<Bsnack> snacks = bsnackRepository.findBySnackId(snackId);

        // Structure the results in a map
        Map<String, List<?>> mealMap = new HashMap<>();
        mealMap.put("breakfasts", breakfasts);
        mealMap.put("lunchs", lunches);
        mealMap.put("dinners", dinners);
        mealMap.put("snacks", snacks);

        return mealMap;
    }

    @Override

public Nutriconsumption updateNutritionConsumption(Long planId, int daysId, Map<String, Double> nutritionValues) {
    // Fetch the existing Nutriconsumption record for the given planId and daysId
    Nutriconsumption consumption = NutriconsumptionRepository.findByPlanIdAndDaysId(planId, daysId);

    if (consumption == null) {
        throw new RuntimeException("No Nutriconsumption data found for the given planId and daysId.");
    }

    // Update the nutritional values by adding the provided values to the existing ones
    consumption.setCalories(
        (consumption.getCalories() != null ? consumption.getCalories() : 0) + 
        (nutritionValues.getOrDefault("calories", 0.0))
    );
    consumption.setCarbohydrates(
        (consumption.getCarbohydrates() != null ? consumption.getCarbohydrates() : 0) + 
        (nutritionValues.getOrDefault("carbohydrates", 0.0))
    );
    consumption.setFiber(
        (consumption.getFiber() != null ? consumption.getFiber() : 0) + 
        (nutritionValues.getOrDefault("fiber", 0.0))
    );
    consumption.setSugars(
        (consumption.getSugars() != null ? consumption.getSugars() : 0) + 
        (nutritionValues.getOrDefault("sugars", 0.0))
    );
    consumption.setProtein(
        (consumption.getProtein() != null ? consumption.getProtein() : 0) + 
        (nutritionValues.getOrDefault("protein", 0.0))
    );
    consumption.setFat(
        (consumption.getFat() != null ? consumption.getFat() : 0) + 
        (nutritionValues.getOrDefault("fat", 0.0))
    );
    consumption.setSodium(
        (consumption.getSodium() != null ? consumption.getSodium() : 0) + 
        (nutritionValues.getOrDefault("sodium", 0.0))
    );

    // Save the updated Nutriconsumption record
    return NutriconsumptionRepository.save(consumption);
}

@Override
public Map<String, Double> getNutritionValues(Long planId, int daysId) {
    // Find the Nutriconsumption record by planId and daysId
    Nutriconsumption consumption = NutriconsumptionRepository.findByPlanIdAndDaysId(planId, daysId);
    
    if (consumption == null) {
        throw new RuntimeException("No Nutriconsumption data found for the given planId and daysId.");
    }

    // Prepare a map to hold the nutritional values
    Map<String, Double> nutritionValues = new HashMap<>();
    nutritionValues.put("carbohydrates", consumption.getCarbohydrates() != null ? consumption.getCarbohydrates() : 0.0);
    nutritionValues.put("sodium", consumption.getSodium() != null ? consumption.getSodium() : 0.0);
    nutritionValues.put("fiber", consumption.getFiber() != null ? consumption.getFiber() : 0.0);
    nutritionValues.put("sugars", consumption.getSugars() != null ? consumption.getSugars() : 0.0);
    nutritionValues.put("protein", consumption.getProtein() != null ? consumption.getProtein() : 0.0);
    nutritionValues.put("fat", consumption.getFat() != null ? consumption.getFat() : 0.0);
    nutritionValues.put("calories", consumption.getCalories() != null ? consumption.getCalories() : 0.0);

    return nutritionValues;
}
     
}

    

