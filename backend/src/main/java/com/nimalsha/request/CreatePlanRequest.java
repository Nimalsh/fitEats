package com.nimalsha.request;

import lombok.Data;

@Data // This will generate getters, setters, toString, etc.
public class CreatePlanRequest {
    private int duration;
}
