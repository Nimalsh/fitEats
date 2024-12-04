package com.nimalsha.service;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.Mealplandata;
import com.nimalsha.model.Request;
import com.nimalsha.model.User;
import com.nimalsha.model.Autoplanextra;
import com.nimalsha.model.Mealplan;
import com.nimalsha.repository.BmidataRepository;
import com.nimalsha.repository.BmiplanRepository;
import com.nimalsha.repository.MealplanRepository;
import com.nimalsha.repository.MealplandataRepository;
import com.nimalsha.request.CreatemealplanRequest;
import com.nimalsha.service.EdamamServiceImpl;
import com.nimalsha.service.UserServiceImp;
import com.nimalsha.repository.AutoplanextrarRepository;

import jakarta.persistence.EntityNotFoundException;
@Service
public class MealplanServiceImpl implements MealplanService {


 @Autowired
    private MealplanRepository mealplanRepository;

    @Autowired
    private MealplandataRepository mealplandataRepository;

    @Autowired
    private EdamamServiceImpl edamamService;

    @Autowired
    private UserServiceImp userservice;

    @Autowired
    private AutoplanextrarRepository autoplanextraRepository;



         
    @Override
    public Mealplan createPlan(CreatemealplanRequest request) throws Exception {
        Mealplan mealPlan = new Mealplan();
        mealPlan.setDuration(request.getDuration());
        mealPlan.setUserId(request.getUserId());
      
        mealPlan.setWeight(request.getWeight());
        mealPlan.setHeight(request.getHeight());
        mealPlan.setBmi(request.getBmi());
        mealPlan.setTarget(request.getTarget());
        mealPlan.setActivitylevel(request.getActivitylevel());
        mealPlan.setGender(request.getGender());
        mealPlan.setAge(request.getAge());
       
        mealPlan.setDietaryPreferences(request.getDietaryPreferences());
        mealPlan.setDietaryRestrictions(request.getDietaryRestrictions());
        mealPlan.setStatus(request.getStatus());
        mealPlan.setTitle(request.getTitle());
      
        // Calculate caloric needs and macros
        double calories = calculateCaloricNeeds(request);
        mealPlan.setCalories(calories);
        mealPlan.setProtein(0.3 * calories / 4);
        mealPlan.setFat(0.3 * calories / 9);
        mealPlan.setCarbohydrates(0.4 * calories / 4);
        mealPlan.setFiber(25);
        mealPlan.setSodium(2300);
        mealPlan.setSugar(25);
    
        // Save meal plan
        mealPlan = mealplanRepository.save(mealPlan);
      
        // Generate daily meal data
        double dailyCalories = calories / 3;
        
            // Fallback: Fetch meals from DB if API call fails
            try {
                List<Map<String, Object>> breakfastMeals = edamamService.getMealsForCalorieRangeAndMealType(dailyCalories, "breakfast", request.getDietaryPreferences(), request.getDietaryRestrictions(), request.getDuration());
                List<Map<String, Object>> lunchMeals = edamamService.getMealsForCalorieRangeAndMealType(dailyCalories, "lunch", request.getDietaryPreferences(), request.getDietaryRestrictions(), request.getDuration());
                List<Map<String, Object>> dinnerMeals = edamamService.getMealsForCalorieRangeAndMealType(dailyCalories, "dinner", request.getDietaryPreferences(), request.getDietaryRestrictions(), request.getDuration());
            
                if (breakfastMeals.size() < request.getDuration() || lunchMeals.size() < request.getDuration() || dinnerMeals.size() < request.getDuration()) {
                    throw new Exception("Insufficient meal data for the requested duration.");
                }
            
                // Assign each day's meals from the fetched lists
                for (int day = 1; day <= request.getDuration(); day++) {
                    Mealplandata mealplandata = new Mealplandata();
                    mealplandata.setPlanId(mealPlan.getPlanId());
                    mealplandata.setDaysId(day);
            
                    // Set data for each meal using helper method
                    setMealData(mealplandata::setBreakfast, mealplandata::setBreakfastIngredients, mealplandata::setBreakfastImage, mealplandata::setBreakfastCalories, breakfastMeals.get(day - 1));
                    setMealData(mealplandata::setLunch, mealplandata::setLunchIngredients, mealplandata::setLunchImage, mealplandata::setLunchCalories, lunchMeals.get(day - 1));
                    setMealData(mealplandata::setDinner, mealplandata::setDinnerIngredients, mealplandata::setDinnerImage, mealplandata::setDinnerCalories, dinnerMeals.get(day - 1));
            
                    mealplandataRepository.save(mealplandata);
                }
                 } catch (Exception apiException) {
                System.err.println("API error: " + apiException.getMessage());
        
                // Fallback: Fetch meals from DB if API call fails
                List<Autoplanextra> autoplanextras = autoplanextraRepository.findAll();
                if (autoplanextras.isEmpty()) {
                    throw new Exception("No meal data available in the database.");
                }
        
                // Assign DB meals to Mealplandata
                assignMealsFromDatabase(mealPlan, request.getDuration(), autoplanextras);
            }
        
                return mealPlan;
            }
        
            private void assignMealsFromDatabase(Mealplan mealPlan, int duration, List<Autoplanextra> autoplanextras) {
                for (int day = 1; day <= duration; day++) {
                    Autoplanextra autoplanextra = autoplanextras.get((day - 1) % autoplanextras.size());
                    Mealplandata mealplandata = new Mealplandata();
                    mealplandata.setPlanId(mealPlan.getPlanId());
                    mealplandata.setDaysId(day);
            
                    mealplandata.setBreakfast(autoplanextra.getBreakfast());
                    mealplandata.setBreakfastIngredients(autoplanextra.getBreakfastIngredients());
                    mealplandata.setBreakfastImage(autoplanextra.getBreakfastImage());
                    mealplandata.setBreakfastCalories(autoplanextra.getLunchCalories());
            
                    mealplandata.setLunch(autoplanextra.getLunch());
                    mealplandata.setLunchIngredients(autoplanextra.getLunchIngredients());
                    mealplandata.setLunchImage(autoplanextra.getBreakfastImage());
                    mealplandata.setLunchCalories(autoplanextra.getLunchCalories());
            
                    mealplandata.setDinner(autoplanextra.getDinner());
                    mealplandata.setDinnerIngredients(autoplanextra.getDinnerIngredients());
                    mealplandata.setDinnerImage(autoplanextra.getBreakfastImage());
                    mealplandata.setDinnerCalories(autoplanextra.getLunchCalories());
            
                    mealplandataRepository.save(mealplandata);
                }
            }
    

    
     
    private void setMealData(
        Consumer<String> labelSetter,
        Consumer<String> ingredientsSetter,
        Consumer<String> imageSetter,
        Consumer<Double> caloriesSetter,
        Map<String, Object> mealData) {
    
        try {
            System.out.println("Meal Data: " + mealData);
    
            labelSetter.accept(mealData.getOrDefault("label", "").toString());
    
            List<Map<String, Object>> ingredientsList = (List<Map<String, Object>>) mealData.get("ingredients");
            String ingredientList = ingredientsList != null
                ? ingredientsList.stream()
                    .map(ingredient -> ingredient.get("text") != null ? ingredient.get("text").toString() : "")
                    .collect(Collectors.joining(", "))
                : "";
            ingredientsSetter.accept(ingredientList);
    
            String image = mealData.get("image") != null ? mealData.get("image").toString() : "";
            imageSetter.accept(image);
    
            double calories = mealData.get("calories") != null ? Double.parseDouble(mealData.get("calories").toString()) : 0.0;
            caloriesSetter.accept(calories);
        } catch (Exception e) {
            System.err.println("Error setting meal data: " + e.getMessage());
            e.printStackTrace();
        }
    }
    // Helper methods
    private double calculateCaloricNeeds(CreatemealplanRequest request) {
        double bmr = calculateBMR(request.getWeight(), request.getHeight(), request.getAge(), request.getGender());
        double tdee = calculateTDEE(bmr, request.getActivitylevel());
        double dailyWeightChange = 0.143;
        double calorieAdjustment = dailyWeightChange * 7700;
        return request.getWeight() > request.getTarget() ? tdee - calorieAdjustment : tdee + calorieAdjustment;
    }
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


@Override
public List<Mealplandata> getMealplandataByPlanId(Long planId) {
    return mealplandataRepository.findByPlanId(planId);
}

@Override
public Mealplan getMealplandByPlanId(Long planId) {
    return mealplanRepository.findById(planId)
            .orElseThrow(() -> new EntityNotFoundException("Mealplan not found for planId: " + planId));
}
@Override
public Mealplan updatemealplanstatus(Long planId) {
   
    Mealplan mealplan = mealplanRepository.findById(planId).orElse(null);
    
    if (mealplan != null) {
        // Set status to "Completed"
        mealplan.setStatus("Completed");
        
        // Save the updated Mealplan back to the repository
        mealplanRepository.save(mealplan);
    } else {
        
        System.out.println("Mealplan not found for planId: " + planId);
    }
    
   
    return mealplan;
}

@Override
public Mealplan updatemealplanweight(Long planId, double weight) {
   
    // Fetch the Mealplan by its ID
    Mealplan mealplan = mealplanRepository.findById(planId).orElse(null);
    
    if (mealplan != null) {
        // Set the afterweight field to the provided weight
        mealplan.setAfterweight(weight);  // Assuming 'setAfterweight' is a setter method in the Mealplan class
        
        // Save the updated Mealplan back to the repository
        mealplanRepository.save(mealplan);
    } else {
        System.out.println("Mealplan not found for planId: " + planId);
    }
    
    return mealplan;
}




@Override
public Mealplandata getMealplandataByPlanIdAndDaysId(Long planId, int daysId) {
    return mealplandataRepository.findByPlanIdAndDaysId(planId, daysId);
}

@Override
public void updateMealStatus(Long planId, int daysId, List<String> mealTypes) throws Exception {
    // Fetch the mealplandata for the given planId and daysId
    Mealplandata mealplandata = mealplandataRepository.findByPlanIdAndDaysId(planId, daysId);
    
    if (mealplandata == null) {
        throw new Exception("Meal plan data not found for planId " + planId + " and daysId " + daysId);
    }

    // Update the status of the specified meal types to true
    for (String mealType : mealTypes) {
        switch (mealType.toLowerCase()) {
            case "breakfast":
                mealplandata.setBreakfaststatus(true);
                break;
            case "lunch":
                mealplandata.setLunchstatus(true);
                break;
            case "dinner":
                mealplandata.setDinnerstatus(true);
                break;
            default:
                throw new Exception("Invalid meal type: " + mealType);
        }
    }

    // Save the updated meal plan data
    mealplandataRepository.save(mealplandata);
}



@Override
public int getTotalMealStatusCountForPlan(Long planId) {
    // Find all Mealplandata for the given planId
    List<Mealplandata> mealplandataList = mealplandataRepository.findByPlanId(planId);
    
    if (mealplandataList.isEmpty()) {
        throw new RuntimeException("No meal plan data found for planId: " + planId);
    }

    int totalMeals = 0;

    // Loop through each Mealplandata and count the number of true values
    for (Mealplandata meal : mealplandataList) {
        if (meal.isBreakfaststatus()) {
            totalMeals++;
        }
        if (meal.isLunchstatus()) {
            totalMeals++;
        }
        if (meal.isDinnerstatus()) {
            totalMeals++;
        }
    }

    return totalMeals;
}

@Override
public void updateMealForPlanDayAndType(Long planId, int daysId, String mealType) throws Exception {
    // Fetch the existing Mealplandata record for the specified planId and daysId
    Mealplandata mealplandata = mealplandataRepository.findByPlanIdAndDaysId(planId, daysId);
    
    if (mealplandata == null) {
        throw new RuntimeException("Meal plan data not found for planId " + planId + " and daysId " + daysId);
    }

    // Retrieve the Mealplan to get daily calories and dietary preferences
    Mealplan mealPlan = mealplanRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("Mealplan not found for planId: " + planId));
    double dailyCalories = mealPlan.getCalories() / 3; // Assuming 3 meals per day

    // Fetch a new meal for the specified meal type from EdamamServiceImpl
    List<Map<String, Object>> meals = edamamService.getMealsForCalorieRangeAndMealType(
            dailyCalories, mealType, mealPlan.getDietaryPreferences(), mealPlan.getDietaryRestrictions()
    );

    if (meals.isEmpty()) {
        throw new Exception("No meal data available for the specified calorie range and meal type");
    }

    // Get the first meal from the fetched list to update the meal data
    Map<String, Object> newMeal = meals.get(0);

    // Before setting the new meal data, clear the existing meal fields for the specified meal type
    clearExistingMealData(mealplandata, mealType);

    // Use switch-case to determine which meal type to update in Mealplandata
    switch (mealType.toLowerCase()) {
        case "breakfast":
            setMealData(
                mealplandata::setBreakfast,
                mealplandata::setBreakfastIngredients,
                mealplandata::setBreakfastImage,
                mealplandata::setBreakfastCalories,
                newMeal
            );
            break;
        case "lunch":
            setMealData(
                mealplandata::setLunch,
                mealplandata::setLunchIngredients,
                mealplandata::setLunchImage,
                mealplandata::setLunchCalories,
                newMeal
            );
            break;
        case "dinner":
            setMealData(
                mealplandata::setDinner,
                mealplandata::setDinnerIngredients,
                mealplandata::setDinnerImage,
                mealplandata::setDinnerCalories,
                newMeal
            );
            break;
        default:
            throw new Exception("Invalid meal type: " + mealType);
    }

    // Save the updated Mealplandata
    mealplandataRepository.save(mealplandata);
}

/**
 * Helper method to clear the existing meal data for the specified meal type
 */
private void clearExistingMealData(Mealplandata mealplandata, String mealType) {
    switch (mealType.toLowerCase()) {
        case "breakfast":
            mealplandata.setBreakfast(null);
            mealplandata.setBreakfastIngredients(null);
            mealplandata.setBreakfastImage(null);
            mealplandata.setBreakfastCalories(0.0);
            break;
        case "lunch":
            mealplandata.setLunch(null);
            mealplandata.setLunchIngredients(null);
            mealplandata.setLunchImage(null);
            mealplandata.setLunchCalories(0.0);
            break;
        case "dinner":
            mealplandata.setDinner(null);
            mealplandata.setDinnerIngredients(null);
            mealplandata.setDinnerImage(null);
            mealplandata.setDinnerCalories(0.0);
            break;
        default:
            throw new IllegalArgumentException("Invalid meal type: " + mealType);
    }
}

 @Override
    public List<Mealplan> getRequestsByToken(String jwtToken) throws Exception {
        // Find the user by JWT token
        User user = userservice.findUserByJwtToken(jwtToken);

        // Fetch and return the requests associated with the user
        return mealplanRepository.findByUserId(user.getId());
    }



}
