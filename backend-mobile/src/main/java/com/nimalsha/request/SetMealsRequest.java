package com.nimalsha.request;

import lombok.Data;

@Data
public class SetMealsRequest {
    private int daysId; // Specify the day to be updated
    private String mealType; // "breakfast", "lunch", or "dinner"
    private String mealValue; // The value of the meal to be updated
}
