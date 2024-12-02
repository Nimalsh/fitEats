package com.nimalsha.service;

import com.nimalsha.model.Meallog;
import com.nimalsha.model.Meallogbreakfast;
import com.nimalsha.model.Meallogdinner;
import com.nimalsha.model.Mealloglunch;
import com.nimalsha.model.Meallogsnack;
import com.nimalsha.model.Nutriconsumption;
import com.nimalsha.repository.MeallogRepository;
import com.nimalsha.repository.MeallogbreakfastRepository;
import com.nimalsha.repository.MeallogdinnerRepository;
import com.nimalsha.repository.MealloglunchRepository;
import com.nimalsha.repository.MeallogsnackRepository;
import com.nimalsha.repository.NutriconsumptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;
import java.util.Map;
import java.util.List;

@Service
public class MeallogServiceImpl implements MeallogService{

    @Autowired
    private MeallogRepository meallogRepository;

     @Autowired
    private MeallogbreakfastRepository meallogbreakfastRepository;

    @Autowired
    private MealloglunchRepository mealloglunchRepository;

    @Autowired
    private MeallogdinnerRepository meallogdinnerRepository;

    @Autowired
    private MeallogsnackRepository meallogsnackRepository;

    
    @Override
    public Meallog createOrUpdateMeallog(Long userId, LocalDate date) throws Exception {
        // Check if there's an existing Meallog entry for the specified date
        Optional<Meallog> existingMeallogByDate = meallogRepository.findByDate(date);
    
        if (existingMeallogByDate.isPresent()) {
            // A Meallog entry already exists for the specified date
            throw new Exception("A Meallog entry already exists for the specified date.");
        }
    
        // Retrieve the list of Meallogs for the user
        List<Meallog> meallogList = meallogRepository.findByUserId(userId);
    
        Long meallogId;
    
        if (meallogList != null && !meallogList.isEmpty()) {
            // Get the Meallog ID from the first record in the list
            meallogId = meallogList.get(0).getMeallogId();
        } else {
            // No existing Meallog, create a new unique meallogId
            meallogId = generateUniqueId();
        }
    
        // Create a new Meallog entry
        Meallog newMeallog = new Meallog();
        newMeallog.setUserId(userId);
        newMeallog.setDate(date);
        newMeallog.setMeallogId(meallogId); // Use the existing or new meallogId
        newMeallog.setBreakfastId(generateUniqueId());
        newMeallog.setLunchId(generateUniqueId());
        newMeallog.setDinnerId(generateUniqueId());
        newMeallog.setSnackId(generateUniqueId());
        newMeallog.setStatus("set");
    
        return meallogRepository.save(newMeallog);
    }
    
    // Helper method to generate unique IDs for meals
    private Long generateUniqueId() {
        return Math.abs(UUID.randomUUID().getMostSignificantBits());
    }
    
    @Override
    public void addMealToLog(Long userId, LocalDate date, String mealType, String item, String measurement, int quantity) throws Exception {
        // Find Meallog by user ID and date
        Meallog meallog = meallogRepository.findByUserIdAndDate(userId, date)
            .orElseThrow(() -> new Exception("Meallog not found for the specified user and date."));

        switch (mealType.toLowerCase()) {
            case "breakfast":
                Meallogbreakfast breakfast = new Meallogbreakfast();
                breakfast.setBreakfastId(meallog.getBreakfastId());
                breakfast.setItem(item);
                breakfast.setMeasurement(measurement);
                breakfast.setQuantity(quantity);
                meallogbreakfastRepository.save(breakfast);
                break;

            case "lunch":
                Mealloglunch lunch = new Mealloglunch();
                lunch.setLunchId(meallog.getLunchId());
                lunch.setItem(item);
                lunch.setMeasurement(measurement);
                lunch.setQuantity(quantity);
                mealloglunchRepository.save(lunch);
                break;

            case "dinner":
                Meallogdinner dinner = new Meallogdinner();
                dinner.setDinnerId(meallog.getDinnerId());
                dinner.setItem(item);
                dinner.setMeasurement(measurement);
                dinner.setQuantity(quantity);
                meallogdinnerRepository.save(dinner);
                break;

            case "snack":
                Meallogsnack snack = new Meallogsnack();
                snack.setSnackId(meallog.getSnackId());
                snack.setItem(item);
                snack.setMeasurement(measurement);
                snack.setQuantity(quantity);
                meallogsnackRepository.save(snack);
                break;

            default:
                throw new IllegalArgumentException("Invalid meal type provided.");
        }
    }


      @Override
    public Map<String, Object> getMealsByDate(Long userId, LocalDate date) throws Exception {
        Meallog meallog = meallogRepository.findByUserIdAndDate(userId, date)
            .orElseThrow(() -> new Exception("Meallog not found for the specified user and date."));

        Map<String, Object> mealDetails = new HashMap<>();

        // Retrieve breakfast items if they exist
        if (meallog.getBreakfastId() != null) {
            List<Meallogbreakfast> breakfasts = meallogbreakfastRepository.findByBreakfastId(meallog.getBreakfastId());
            mealDetails.put("breakfast", breakfasts);
        }

        // Retrieve lunch items if they exist
        if (meallog.getLunchId() != null) {
            List<Mealloglunch> lunches = mealloglunchRepository.findByLunchId(meallog.getLunchId());
            mealDetails.put("lunch", lunches);
        }

        // Retrieve dinner items if they exist
        if (meallog.getDinnerId() != null) {
            List<Meallogdinner> dinners = meallogdinnerRepository.findByDinnerId(meallog.getDinnerId());
            mealDetails.put("dinner", dinners);
        }

        // Retrieve snack items if they exist
        if (meallog.getSnackId() != null) {
            List<Meallogsnack> snacks = meallogsnackRepository.findBySnackId(meallog.getSnackId());
            mealDetails.put("snack", snacks);
        }

        return mealDetails;
    }
    @Override
    public Meallog updateNutritionConsumption(LocalDate date, Map<String, Double> nutritionValues) {
        // Fetch the existing Meallog record for the given date
        Optional<Meallog> optionalConsumption = meallogRepository.findByDate(date);
    
        // If no Meallog data is found, throw an exception
        Meallog consumption = optionalConsumption.orElseThrow(() -> 
            new RuntimeException("No Nutriconsumption data found for the given date.")
        );
    
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
    
        // Save the updated Meallog and return it
        return meallogRepository.save(consumption);
    }

    @Override
public Map<String, Double> getNutritionValues(LocalDate date) {
    // Find the Nutriconsumption record by planId and daysId
    Optional<Meallog> optionalConsumption = meallogRepository.findByDate(date);
    
    // If no Meallog data is found, throw an exception
    Meallog consumption = optionalConsumption.orElseThrow(() -> 
        new RuntimeException("No Nutriconsumption data found for the given date.")
    );

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
public String getStatusByDateAndUserId(LocalDate date, Long userId) {
    // Find the Meallog by date and userId
    Optional<Meallog> optionalMeallog = meallogRepository.findByUserIdAndDate(userId, date);
    
    // Check if the Meallog exists and return the status
    if (optionalMeallog.isPresent()) {
        Meallog meallog = optionalMeallog.get();
        return meallog.getStatus();
    } else {
        // If no Meallog is found, return "Not Found"
        return "Not Found";
    }
}



    
}



