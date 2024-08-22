package com.nimalsha.request;

import java.util.Date;

import lombok.Data;

@Data
public class CreateEventRequest {
    
    public String name;
    public String location;
    private String description;
    public Date startedAt;
    public Date endAt;
    private String images;
    private Long restaurantId;
}
