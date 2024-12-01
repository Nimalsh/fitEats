package com.nimalsha.request;

import lombok.Data;

@Data // This will generate getters, setters, toString, etc.
public class CreatePlanRequest {
    private int duration;
    private long userId;
    private long nutritionistId;
}
