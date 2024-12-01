package com.nimalsha.request;

import com.nimalsha.model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Long restuarantId;
    private Address deliveryAddress;
}
