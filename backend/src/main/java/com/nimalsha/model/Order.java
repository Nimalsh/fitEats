// package com.nimalsha.model;

// import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// import java.util.Date;
// import java.util.List;

// @Entity
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Table(name = "orders")
// public class Order {

//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Long id;

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "customer_id")
//     private User customer;

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "restaurant_id")
//     private Restaurant restaurant;

//     private Long totalAmount;

//     private String orderStatus;

//     private Date createdAt;

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "delivery_address_id")
//     private Address deliveryAddress;

//     @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
//     private List<OrderItem> items;

//     private int totalItem;

//     private Long totalPrice;
// }

package com.nimalsha.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private User customer; // No change here, customer is already mapped

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    private Long totalAmount;

    private String orderStatus;

    private Date createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_address_id")
    private Address deliveryAddress;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    private int totalItem;

    private Long totalPrice;
    
    // Add a method to return customer details (optional, depending on how you access them in the response)
    public String getCustomerName() { // Added method
        return customer != null ? customer.getFullName() : "Unknown Customer";
    }

    public String getCustomerEmail() { // Added method
        return customer != null ? customer.getEmail() : "Unknown Email";
    }
}

