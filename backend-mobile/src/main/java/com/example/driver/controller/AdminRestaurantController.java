// package com.example.driver.controller;

// import com.example.driver.model.Restaurant;
// import com.example.driver.model.User;
// import com.example.driver.request.CreateRestaurantRequest;
// import com.example.driver.response.MessageResponse;
// import com.example.driver.service.RestaurantService;
// import com.example.driver.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/admin/restaurant")
// public class AdminRestaurantController {

//     @Autowired
//     private RestaurantService restaurantService;
//     @Autowired
//     private UserService userService;

//     @PostMapping()
//     private ResponseEntity<Restaurant> createRestaurant(
//             @ RequestBody CreateRestaurantRequest req,
//             @RequestHeader("Authorization") String jwt
//             )throws Exception{
//         User user=userService.findUserByJwtToken(jwt);

//         Restaurant restaurant=restaurantService.createRestaurant(req,user);

//         return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
//     }

//     @PutMapping("/{id}")
//     private ResponseEntity<Restaurant> updateRestaurant(
//             @RequestBody CreateRestaurantRequest req,
//             @RequestHeader("Authorization") String jwt,
//             @PathVariable Long id
//     )throws Exception{
//         User user=userService.findUserByJwtToken(jwt);

//         Restaurant restaurant=restaurantService.updateRestaurant(id,req);

//         return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
//     }

//     @DeleteMapping("/{id}")
//     private ResponseEntity<MessageResponse> deleteRestaurant(
//             @RequestHeader("Authorization") String jwt,
//             @PathVariable Long id
//     )throws Exception{
//         User user=userService.findUserByJwtToken(jwt);

//         restaurantService.deleteRestaurant(id);

//         MessageResponse res=new MessageResponse();
//         res.setMessage("restaurant delete successfully");

//         return new ResponseEntity<>(res, HttpStatus.OK);
//     }

//     @PutMapping("/{id}/status")
//     private ResponseEntity<Restaurant> updateRestaurantStatus(
//             @RequestHeader("Authorization") String jwt,
//             @PathVariable Long id
//     )throws Exception{
//         User user=userService.findUserByJwtToken(jwt);

//         Restaurant restaurant=restaurantService.updateRestaurantStatus(id);


//         return new ResponseEntity<>(restaurant, HttpStatus.OK);
//     }

//     @GetMapping("/user")
// public ResponseEntity<Restaurant> findRestaurantByUserId(
//         @RequestHeader("Authorization") String jwt
// ) throws Exception {
//     User user = userService.findUserByJwtToken(jwt);
//     Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
//     return new ResponseEntity<>(restaurant, HttpStatus.OK);
// }

//     @PutMapping("/user")
//     private ResponseEntity<Restaurant> findRestaurantByUserId(
//             @RequestHeader("Authorization") String jwt
//     )throws Exception{
//         User user=userService.findUserByJwtToken(jwt);

//         Restaurant restaurant=restaurantService.getRestaurantByUserId(user.getId());


//         return new ResponseEntity<>(restaurant, HttpStatus.OK);
//     }


// }

package com.example.driver.controller;

import com.example.driver.model.Restaurant;
import com.example.driver.model.User;
import com.example.driver.request.CreateRestaurantRequest;
import com.example.driver.response.MessageResponse;
import com.example.driver.service.RestaurantService;
import com.example.driver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurant")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.createRestaurant(req, user);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurant(id, req);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        restaurantService.deleteRestaurant(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Restaurant deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}

