package com.nimalsha.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.DeliveryDriver;
import com.nimalsha.repository.DeliveryDriverRepository;

@Service
public class DeliveryDriverServiceImpl implements DeliveryDriverService {

    @Autowired
    private DeliveryDriverRepository deliveryDriverRepository;

    @Override
    public List<DeliveryDriver> getAllDeliveryDrivers() {
        List<DeliveryDriver> drivers = deliveryDriverRepository.findAll();

        return drivers;
    }

    @Override
    public DeliveryDriver saveDeliveryDriver(DeliveryDriver driver) {
        return deliveryDriverRepository.save(driver);
    }

    @Override
    public DeliveryDriver updatDeliveryDriver(DeliveryDriver driver) {
        return deliveryDriverRepository.save(driver);
    }
}
