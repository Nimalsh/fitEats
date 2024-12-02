package com.nimalsha.model;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDriver {
    @Id
    // @GeneratedValue(generator = "uuid")
    // @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String deliveryId;
    private String deliveryName;
    private String vehicleNumber;
    private String email;
    private String contactNumber;
    private Date signUpDate;
    // private Boolean blocked;

    // @PrePersist
    // public void generatePrefixOfId() {
    //     this.deliveryID = "DD" + (this.deliveryID  == null ? UUID.randomUUID().toString() : this.deliveryID);
    // }
}
