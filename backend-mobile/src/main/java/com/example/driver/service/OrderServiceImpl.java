package com.example.driver.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.driver.model.Address;
import com.example.driver.model.Cart;
import com.example.driver.model.CartItem;
import com.example.driver.model.Order;
import com.example.driver.model.OrderItem;
import com.example.driver.model.Restaurant;
import com.example.driver.model.User;
import com.example.driver.repository.AddressRepository;
import com.example.driver.repository.OrderItemRepository;
import com.example.driver.repository.OrderRepository;
import com.example.driver.repository.RestaurantRepository;
import com.example.driver.repository.UserRepository;
import com.example.driver.request.OrderRequest;

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

    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {

        Address shippAddress = order.getDeliveryAddress();

        Address savedAddress = addressRepository.save(shippAddress);

        if(!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        Restaurant restaurant = restaurantService.findRestaurantById(order.getRestuarantId());

        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            OrderItem saveOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(saveOrderItem);
        }

        Long totalPrice = cartService.calculateCartTotals(cart);

        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);

        Order saveOrder = orderRepository.save(createdOrder);
        restaurant.getOrders().add(saveOrder);

        return createdOrder;
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
