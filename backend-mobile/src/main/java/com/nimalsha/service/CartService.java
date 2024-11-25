package com.nimalsha.service;

import com.nimalsha.model.Cart;
import com.nimalsha.model.CartItem;
import com.nimalsha.model.User;
import com.nimalsha.request.AddCartItemRequest;

public interface CartService {
    
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    public CartItem updCartItem(Long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;
}
