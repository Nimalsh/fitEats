package com.example.driver.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.driver.model.Driver;
import com.example.driver.repository.DriverRepository;
import com.example.driver.request.NotificationRequest;

@Service
public class DriiverService {

    private final DriverRepository driverRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public DriiverService(DriverRepository driverRepository, RestTemplate restTemplate) {
        this.driverRepository = driverRepository;
        this.restTemplate = restTemplate;
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
            driver.setAvailable(updatedDriver.isAvailable());
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

    // Find a driver by email
    public Driver findByEmail(String email) {
        return driverRepository.findByEmail(email);
    }

    // Assign a driver to an order and send a notification via HTTP
public void notifyDriver(Long orderId, String message) {
    String url = "http://10.0.3.2:8080/api/notifications/assign-driver";
    NotificationRequest notificationRequest = new NotificationRequest(message);

    try {
        restTemplate.postForObject(url, notificationRequest, String.class);
        System.out.println("Notification sent successfully");
    } catch (HttpClientErrorException | HttpServerErrorException ex) {
        System.err.println("HTTP Error: " + ex.getStatusCode() + " - " + ex.getResponseBodyAsString());
    } catch (ResourceAccessException ex) {
        System.err.println("Network Error: " + ex.getMessage());
    } catch (RestClientException ex) {
        System.err.println("Error sending notification: " + ex.getMessage());
    }
}


}