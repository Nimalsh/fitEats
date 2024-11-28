package com.nimalsha.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.Driver;
import com.nimalsha.repository.DriverrRepository;

@Service
public class DriverrService {

    @Autowired
    private DriverrRepository driverrRepository;

    // Method to check if a driver is available
    public boolean isDriverAvailable(Long driverId) {
        return driverrRepository.findById(driverId)
            .map(Driver::isAvailable)
            .orElse(false);
    }
    
    // Get available drivers
    public List<Long> getAvailableDrivers() {
        return driverrRepository.findAvailableDrivers();
    }
    
    public void assignOrderToDriver(Long driverId) {
        // Logic to assign the order to the driver
        System.out.println("Order assigned to driver " + driverId);
        // Add the actual assignment logic here
    }


}
