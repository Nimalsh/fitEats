package com.nimalsha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimalsha.model.DeliveryDriver;
import com.nimalsha.service.DeliveryDriverService;

@RestController
@RequestMapping("/api/delivery/")
public class DeliveryDriverController {
    
    @Autowired
    private DeliveryDriverService deliveryDriverService;

    @PostMapping("/delivery-driver")
    public ResponseEntity<DeliveryDriver> addNewDeliveryDriver(@RequestBody DeliveryDriver deliveryDriver) {
        DeliveryDriver driver = deliveryDriverService.saveDeliveryDriver(deliveryDriver);

        return new ResponseEntity<>(driver, HttpStatus.OK);
    }

    @GetMapping("/delivery-drivers")
    public ResponseEntity<List<DeliveryDriver>> getAllDeliveryDrivers() {
        List<DeliveryDriver> drivers = deliveryDriverService.getAllDeliveryDrivers();

        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }

    @PutMapping("/delivery-driver")
    public ResponseEntity<DeliveryDriver> updateDeliveryDriver(@RequestBody DeliveryDriver deliveryDriver) {
        DeliveryDriver driver = deliveryDriverService.updatDeliveryDriver(deliveryDriver);

        return new ResponseEntity<>(driver, HttpStatus.OK);
    }
}
