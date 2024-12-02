package com.nimalsha.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nimalsha.model.Driver;
import com.nimalsha.repository.DriverRepository;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    // Create a new driver
    @Transactional
    public Driver saveDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    // Get a driver by ID
    public Optional<Driver> getDriverById(Long id) {
        return driverRepository.findById(id);
    }

    // Get all drivers
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Update a driver
    @Transactional
    public Driver updateDriver(Long id, Driver updatedDriver) {
        return driverRepository.findById(id).map(driver -> {
            driver.setFullName(updatedDriver.getFullName());
            driver.setEmail(updatedDriver.getEmail());
            driver.setAddress(updatedDriver.getAddress());
            driver.setTelephoneNumber(updatedDriver.getTelephoneNumber());
            driver.setGender(updatedDriver.getGender());
            driver.setProfileImagePath(updatedDriver.getProfileImagePath());
            driver.setLicenseImagePath(updatedDriver.getLicenseImagePath());
            driver.setNationalId(updatedDriver.getNationalId());
            driver.setVehicleName(updatedDriver.getVehicleName());
            driver.setVehicleModel(updatedDriver.getVehicleModel());
            driver.setPlateNumber(updatedDriver.getPlateNumber());
            driver.setPassword(updatedDriver.getPassword());
            driver.setAvailable(updatedDriver.isAvailable());  // Update availability status
            return driverRepository.save(driver);
        }).orElseThrow(() -> new RuntimeException("Driver not found with id " + id));
    }

    // Update driver availability by ID
    @Transactional
    public void updateDriverAvailability(Long id, Boolean isAvailable) {
        Optional<Driver> driverOptional = driverRepository.findById(id);
        if (driverOptional.isPresent()) {
            Driver driver = driverOptional.get();
            driver.setAvailable(isAvailable);
            driverRepository.save(driver);
        } else {
            throw new RuntimeException("Driver not found with id " + id);
        }
    }

    // Delete a driver by ID
    @Transactional
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }

    public Driver findByEmail(String email) {
        return driverRepository.findByEmail(email);
    }
}
