package com.nimalsha.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.Event;
import com.nimalsha.model.Restaurant;
import com.nimalsha.repository.EventRepository;
import com.nimalsha.request.CreateEventRequest;

@Service
public class EventServiceImpl implements EventService{
        
    @Autowired
    private EventRepository eventRepository; 

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public Event createEvent(CreateEventRequest req, Restaurant restaurant) {

        Event event = new Event();
        event.setRestaurant(restaurant);
        event.setName(req.getName());
        event.setLocation(req.getLocation());
        event.setDescription(req.getDescription());
        event.setStartedAt(req.getStartedAt());
        event.setEndAt(req.getEndAt());
        Event savedEvent = eventRepository.save(event);
        restaurant.getEvents().add(savedEvent);
        return savedEvent;
    } 

    @Override
    public void deleteEvent(Long eventId) throws Exception {
        Event event = findEventById(eventId);
        event.setRestaurant(null);
        eventRepository.delete(event);
    }

    // @Override
    // public List<Event> getRestaurantsEvents(Long restaurantId) {
    //     return eventRepository.findByRestaurantId(restaurantId);
    // }

    @Override
    public List<Event> getRestaurantsEvents(Long restaurantId)  {  // Changed method name
            List<Event> events = eventRepository.findByRestaurantId(restaurantId);
            return events;
         }

    

    @Override
    public Event findEventById(Long eventId) throws Exception {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);

        if(optionalEvent.isEmpty()) {
            throw new Exception("event not exists...");
        }

        return optionalEvent.get();
    }
}
