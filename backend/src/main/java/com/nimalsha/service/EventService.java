package com.nimalsha.service;

import java.util.List;

import com.nimalsha.model.Event;
import com.nimalsha.model.Restaurant;
import com.nimalsha.request.CreateEventRequest;

public interface EventService {

    public Event createEvent(CreateEventRequest req, Restaurant restaurant);

    void deleteEvent(Long eventId) throws Exception;

    public List<Event> getRestaurantsEvents(Long restaurantId);

    public Event findEventById(Long eventId) throws Exception;

    List<Event> getAllEvents();


}   