package com.nimalsha.request;

import lombok.Data;

@Data
public class AddMealRequest {
    private String item;
    private String measurement;
    private int quantity;
}
 