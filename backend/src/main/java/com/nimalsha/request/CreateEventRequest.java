package com.nimalsha.request;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class CreateEventRequest {
    
    public String name;
    public String location;
    private String description;
    public Date startedAt;
    public Date endAt;
    private List<String> images;
    private Long restaurantId;
}
