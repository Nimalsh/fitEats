package com.nimalsha.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nimalsha.dto.OrderDTO;
import com.nimalsha.dto.OrderItemDTO;
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

    @Override
    public List<Order> getRestaurantOrdersWithCustomer(Long restaurantId) throws Exception {
        System.out.println("Fetching orders with customer details for restaurant ID: " + restaurantId);
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        // Lazy-loaded customer details are accessible here due to @ManyToOne relationship
        orders.forEach(order -> {
            User customer = order.getCustomer();
            System.out.println("Customer Name: " + customer.getFullName());
            System.out.println("Customer Email: " + customer.getEmail());
        });

        return orders;
    }

        @Override
    public List<OrderDTO> getRestaurantOrders(Long restaurantId) throws Exception {
        System.out.println("Fetching order details for restaurant ID: " + restaurantId);
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        // Map orders to OrderDTO
        return orders.stream().map(order -> {
            List<OrderItemDTO> itemDTOs = order.getItems().stream().map(item -> {
                // Log the ingredients of each order item
                System.out.println("OrderItem Ingredients: " + item.getIngredients());

                // Use the ingredients directly from the OrderItem model
                List<String> ingredients = item.getIngredients();

                return new OrderItemDTO(
                    item.getFood().getName(), 
                    item.getQuantity(), 
                    item.getTotalPrice(),
                    ingredients // Pass ingredients directly to DTO
                );
            }).collect(Collectors.toList());

            System.out.println("Mapped order ID " + order.getId() + " with " + itemDTOs.size() + " items.");
            
            return new OrderDTO(
                order.getId(),
                order.getCreatedAt(),
                order.getOrderStatus(),
                order.getTotalPrice(),
                itemDTOs,
                order.getCustomer() != null ? order.getCustomer().getFullName() : "Unknown Customer", // Set customer name
                order.getCustomer() != null ? order.getCustomer().getEmail() : "Unknown Email" // Set customer email
            );
        }).collect(Collectors.toList());
    }
    
}
