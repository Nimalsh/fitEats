package com.example.driver.request;

import com.example.driver.model.Address;

import lombok.Data;

@Data
public class OrderRequest {

    private Long restuarantId;
    private Address deliveryAddress;
    
}
