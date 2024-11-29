package com.nimalsha.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.nimalsha.dto.OrderDTO;
import com.nimalsha.dto.OrderItemDTO;
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
import com.nimalsha.repository.UserRepository;
import com.nimalsha.request.OrderRequest;

@Service
public class OrderServiceImpl implements OrderService {

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
        System.out.println("Cancelling order with ID: " + orderId);
        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
        System.out.println("Order with ID " + orderId + " has been canceled.");
    }

    @Transactional
    @Override
    public Order createOrder(OrderRequest orderRequest, User user) throws Exception {
        System.out.println("Creating order for user: " + user.getFullName());
        Cart cart = cartService.findCartByUserId(user.getId());
        if (cart == null || cart.getItems().isEmpty()) {
            System.out.println("Cart is empty for user: " + user.getFullName());
            throw new Exception("Cart is empty!");
        }

        Restaurant restaurant = cart.getItems().get(0).getFood().getRestaurant();
        System.out.println("Restaurant for order: " + restaurant.getName());

        Address savedAddress = addressRepository.save(orderRequest.getDeliveryAddress());
        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
            System.out.println("Saved new address for user: " + user.getFullName());
        }

        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            System.out.println("Adding item: " + cartItem.getFood().getName() + ", Quantity: " + cartItem.getQuantity());
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
        
        System.out.println("Order created with total price: " + createdOrder.getTotalPrice());
        return orderRepository.save(createdOrder);
    }

    @Override
    public List<Order> getRestaurantOrder(Long restaurantId, String orderStatus) throws Exception {
        System.out.println("Fetching orders for restaurant ID: " + restaurantId + " with status: " + orderStatus);
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        if (orderStatus != null) {
            orders = orders.stream()
                    .filter(order -> order.getOrderStatus().equalsIgnoreCase(orderStatus))
                    .collect(Collectors.toList());
            System.out.println("Filtered orders by status: " + orderStatus);
        }

        return orders;
    }

    @Override
    public List<OrderDTO> getRestaurantOrders(Long restaurantId) throws Exception {
        System.out.println("Fetching order details for restaurant ID: " + restaurantId);
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        // Map orders to OrderDTO
        return orders.stream().map(order -> {
            List<OrderItemDTO> itemDTOs = order.getItems().stream().map(item -> 
                new OrderItemDTO(
                    item.getFood().getName(), 
                    item.getQuantity(), 
                    item.getTotalPrice()
                )
            ).collect(Collectors.toList());

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

    @Override
    public List<OrderDTO> getUsersOrder(Long userId) throws Exception {
        System.out.println("Fetching orders for user ID: " + userId);
        List<Order> orders = orderRepository.findByCustomerId(userId);

        // Convert the list of orders to OrderDTOs
        return orders.stream().map(order -> {
            List<OrderItemDTO> itemDTOs = order.getItems().stream()
                    .map(item -> new OrderItemDTO(item.getFood().getName(), item.getQuantity(), item.getTotalPrice()))
                    .collect(Collectors.toList());

            System.out.println("Mapped user order ID: " + order.getId());

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

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        System.out.println("Updating order ID: " + orderId + " to status: " + orderStatus);
        Order order = findOrderById(orderId);
        if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
            order.setOrderStatus(orderStatus);
            System.out.println("Order ID " + orderId + " status updated to: " + orderStatus);
            return orderRepository.save(order);
        }
        System.out.println("Invalid status attempt for order ID: " + orderId);
        throw new Exception("Please select a valid order status");
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
        System.out.println("Fetching order by ID: " + orderId);
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if(optionalOrder.isEmpty()) {
            System.out.println("Order not found with ID: " + orderId);
            throw new Exception("Order not found");
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
}
