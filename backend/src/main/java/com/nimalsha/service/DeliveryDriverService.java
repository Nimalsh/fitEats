package com.nimalsha.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.DeliveryDriver;
import com.nimalsha.repository.DeliveryDriverRepository;

public interface DeliveryDriverService {
    public List<DeliveryDriver> getAllDeliveryDrivers();
    public DeliveryDriver saveDeliveryDriver(DeliveryDriver driver);
    public DeliveryDriver updatDeliveryDriver(DeliveryDriver driver);
}
