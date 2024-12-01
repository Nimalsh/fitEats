// package com.nimalsha.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestHeader;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.nimalsha.model.Event;
// import com.nimalsha.model.Restaurant;
// import com.nimalsha.model.User;
// import com.nimalsha.request.CreateEventRequest;
// import com.nimalsha.response.MessageResponse;
// import com.nimalsha.service.EventService;
// import com.nimalsha.service.RestaurantService;
// import com.nimalsha.service.UserService;


// @RestController
// @RequestMapping("api/admin/events")
// public class AdminEventController {
    
//     @Autowired
//     private EventService eventService;

//     @Autowired
//     private UserService userService;

//     @Autowired
//     private RestaurantService restaurantService;

//     @PostMapping
//     public ResponseEntity<Event> createEvent(@RequestBody CreateEventRequest req,
//     @RequestHeader("Authorization") String jwt) throws Exception {
//         User user = userService.findUserByJwtToken(jwt);
//         Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
//         Event event = eventService.createEvent(req, restaurant);
//         return new ResponseEntity<>(event, HttpStatus.CREATED);
//     } 

//     @DeleteMapping("/{id}")
//     public ResponseEntity<MessageResponse> deleteEvent(@PathVariable Long id,
//                                                        @RequestHeader("Authorization") String jwt ) throws Exception {

//         User user = userService.findUserByJwtToken(jwt);

//         eventService.deleteEvent(id);

//         MessageResponse res = new MessageResponse();
//         res.setMessage("event delted successfully");
//         return new ResponseEntity<>(res, HttpStatus.CREATED);
//                                                        }
    

// }
