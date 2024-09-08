package com.nimalsha.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.model.Address;
import com.nimalsha.model.Cart;
import com.nimalsha.model.CartItem;
import com.nimalsha.model.Order;
import com.nimalsha.model.OrderItem;
import com.nimalsha.model.Restaurant;
import com.nimalsha.model.User;
import com.nimalsha.repository.AddressRepository;
import com.nimalsha.repository.OrderItemRepository;
import com.nimalsha.repository.OrderRepository;
import com.nimalsha.repository.RestaurantRepository;
import com.nimalsha.repository.UserRepository;
import com.nimalsha.request.OrderRequest;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CartService cartService;

    @Override
    public void cancleOder(Long orderId) throws Exception {
        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
        
    }
    @Transactional
    @Override
    public Order createOrder(OrderRequest orderRequest, User user) throws Exception {
        Cart cart = cartService.findCartByUserId(user.getId());
        if (cart == null || cart.getItems().isEmpty()) {
            throw new Exception("Cart is empty!");
        }

        Restaurant restaurant = cart.getItems().get(0).getFood().getRestaurant();

        Address savedAddress = addressRepository.save(orderRequest.getDeliveryAddress());
        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            orderItem.setOrder(createdOrder); // Set the relationship

            orderItems.add(orderItem);
        }

        createdOrder.setItems(orderItemRepository.saveAll(orderItems));
        createdOrder.setTotalPrice(cartService.calculateCartTotals(cart));
        createdOrder.setTotalItem(orderItems.size());

        return orderRepository.save(createdOrder);
    }



    @Override
    public List<Order> getRestaurantOrder(Long restaurantId, String oderStatus) throws Exception {
        
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        if(oderStatus != null) {                     //If need the order status
            orders = orders.stream().filter(order->
             order.getOrderStatus().equals(oderStatus)).collect(Collectors.toList() );
        }

        return orders;
    }

    @Override
    public List<Order> getUsersOrder(Long userId) throws Exception {
         
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
         Order order = findOrderById(orderId);
         if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
         }
         throw new Exception("Please select a valid order status");
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
         Optional<Order> optionalOrder = orderRepository.findById(orderId);

         if(optionalOrder.isEmpty()) {
            throw new Exception("Oder not found");
         }

        return optionalOrder.get();
    }
    
}
