package com.example.driver.service;

import com.example.driver.model.Cart;
import com.example.driver.model.CartItem;
import com.example.driver.model.User;
import com.example.driver.request.AddCartItemRequest;

public interface CartService {
    
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    public CartItem updCartItem(Long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;
}
