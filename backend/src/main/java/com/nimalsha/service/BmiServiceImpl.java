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
import com.nimalsha.service.UserServiceImp;
import com.nimalsha.model.User;
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

    @Autowired
    private UserServiceImp userService;


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
        bmiplan.setActivitylevel(request.getActivitylevel());
        bmiplan.setGender(request.getGender());
        bmiplan.setAge(request.getAge());
        bmiplan.setStatus("Active");

        double currentWeight = request.getWeight();
        double targetWeight = request.getTarget();
        int durationDays = request.getDuration(); // Duration in days
        int age = request.getAge();
        String gender = request.getGender();

        double bmr = calculateBMR(currentWeight, request.getHeight(), age, gender);
        double tdee = calculateTDEE(bmr, request.getActivitylevel());

        double weightDifference = currentWeight - targetWeight;
        double dailyWeightChange = 0.143; // Weight change needed per day

        // Calculate daily caloric need adjustment
        double maxCalorieChange = 500; // Maximum safe daily caloric adjustment
        double dailyCalorieChange = Math.min(dailyWeightChange * 7700, maxCalorieChange);

        double calories;
        if (weightDifference > 0) { // Weight loss
            calories = Math.max(tdee - dailyCalorieChange, 1200); // Minimum 1200 kcal/day
        } else if (weightDifference < 0) { // Weight gain
            calories = tdee + dailyCalorieChange;
        } else {
            calories = tdee; // Maintain current weight
        }

        double protein = 0.3 * calories / 4; // 30% of calories from protein
        double fat = 0.3 * calories / 9; // 30% of calories from fat
        double carbohydrates = 0.4 * calories / 4; // 40% of calories from carbohydrates
        double fiber = 25; // daily fiber intake in grams
        double sodium = 2300; // daily sodium intake in milligrams
        double sugar = 25; // daily sugar intake in grams

        bmiplan.setCalories(calories);
        bmiplan.setProtein(protein);
        bmiplan.setFat(fat);
        bmiplan.setCarbohydrates(carbohydrates);
        bmiplan.setFiber(fiber);
        bmiplan.setSodium(sodium);
        bmiplan.setSugar(sugar);

        bmiplan = bmiplanRepository.save(bmiplan);

        // Create and save Bmidata for each day with calculated values
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

            // Set calculated values

            bmidataRepository.save(bmidata);
        }

        // Create and save Nutriconsumption data
        for (int day = 1; day <= request.getDuration(); day++) {
            Nutriconsumption consumption = new Nutriconsumption();
            consumption.setPlanId(bmiplan.getPlanId());
            consumption.setDaysId(day);

            NutriconsumptionRepository.save(consumption);
        }

        return bmiplan;
    }

// Example BMR calculation using the Mifflin-St Jeor formula
private double calculateBMR(double weight, double height, int age, String gender) {
    if (gender.equalsIgnoreCase("male")) {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

// Example TDEE calculation based on activity level
private double calculateTDEE(double bmr, String activityLevel) {
    switch (activityLevel.toLowerCase()) {
        case "sedentary":
            return bmr * 1.2;
        case "light":
            return bmr * 1.375;
        case "moderate":
            return bmr * 1.55;
        case "active":
            return bmr * 1.725;
        case "very active":
            return bmr * 1.9;
        default:
            return bmr; // Default to sedentary if no match
    }
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
     


@Override
public Bmiplan getBmiplanByPlanId(Long planId) {
    // Use the repository to fetch the Bmiplan by planId
    return bmiplanRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("No BMI plan found with ID: " + planId));
}

@Override
public List<Bmiplan> getActivePlansByUserId(Long userId) {
    // Assuming you have a method in your repository to find plans by userId and status
    return bmiplanRepository.findByUserIdAndStatus(userId, "Active");
}

}


    

