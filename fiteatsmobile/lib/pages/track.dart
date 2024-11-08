import 'dart:async';
import 'package:flutter/material.dart';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:delivery/pages/order.dart';
import 'package:delivery/pages/profile.dart';
import 'package:delivery/services/user_service.dart';
import 'package:delivery/services/notification_service.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class DeliveryStatusPage extends StatefulWidget {
  final int userId;

  DeliveryStatusPage({super.key, required this.userId});

  @override
  _DeliveryStatusPageState createState() => _DeliveryStatusPageState();
}

class _DeliveryStatusPageState extends State<DeliveryStatusPage> {
  int _selectedIndex = 1;
  String? _fullName;
  late UserService _userService;
  bool _showNotification = false;
  String _notificationMessage = '';
  late NotificationService _notificationService;
  final String baseUrl = 'http://10.0.3.2:8080';  // Replace with your server IP
  String _deliveryStatus = 'Picked Up';
  bool isAccepted = false; // Track if the notification is accepted
  String? _restaurantName;
  String? _restaurantAddress;
 String? _customerName;
 String? _customerAddress;

  @override
  void initState() {
    super.initState();

    // Initialize services
    _userService = UserService(baseUrl);
    _notificationService = NotificationService(baseUrl: baseUrl, driverId: widget.userId); 

    // Fetch user data and start polling notifications
    _fetchUserFullName();
    _startNotificationPolling(); 
  }

  Future<void> _fetchUserFullName() async {
    try {
      final fullName = await _userService.getUserFullName(widget.userId);

      if (mounted) {
        setState(() {
          _fullName = fullName;
        });
      }
    } catch (e) {
      print('Error fetching user data: $e');
    }
  }

  // Start polling for notifications
  void _startNotificationPolling() {
    _notificationService.startPollingNotifications((message) {
      setState(() {
        _notificationMessage = message;
        _showNotification = true;
      });
    });
  }
  void _handleAccept() async {
    await _notificationService.respondToNotification("Accepted");
    setState(() {
    _deliveryStatus = "Accepted";
      _restaurantName = "Indian Restaurant"; // Replace with actual data from backend
      _restaurantAddress = "11, Queen st, Colombo 01"; // Replace with actual data
      _showNotification = false;
    });
  }


  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });

    switch (index) {
      case 0:
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => HomePage(userId: widget.userId),
          ),
        );
        break;
      case 1:
        break;
      case 2:
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => OrderHistoryPage(userId: widget.userId),
          ),
        );
        break;
      case 3:
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ProfilePage(userId: widget.userId),
          ),
        );
        break;
      default:
        break;
    }
  }



 void _handlePickUp() async {
  await _notificationService.respondToNotification("Picked Up");
  setState(() {
    _deliveryStatus = "Picked Up";
    _restaurantName = "Indian Restaurant"; // Replace with actual data from backend
    _restaurantAddress = "11, Queen st, Colombo 01"; // Replace with actual data
    _customerName = "Customer Name"; // Replace with actual data from backend
    _customerAddress = "Customer Address"; // Replace with actual customer address
  });
}


  // Handle the "Delivered" status update
  void _handleDelivered() async {
    await _notificationService.respondToNotification("Delivered");
    setState(() {
      _deliveryStatus = "Delivered";
    });
  }

  // Handle "Cancelled" status update
  void _handleCancel() async {
    await _notificationService.respondToNotification("Cancelled");
    setState(() {
      isAccepted = false;
      _showNotification = false;
      _deliveryStatus = "Cancelled";
    });
  }


   @override
  Widget build(BuildContext context) { 
    return Scaffold(
      body: Stack(
        children: [
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              padding: const EdgeInsets.all(16.0),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20.0),
                  topRight: Radius.circular(20.0),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black12,
                    spreadRadius: 5,
                    blurRadius: 15,
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (_fullName != null)
                    Text(
                      'Driver: $_fullName',
                      style: const TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  const SizedBox(height: 16.0),
                  if (_showNotification && !isAccepted)
                    Column(
                      children: [
                        Text(
                          _notificationMessage,
                          style: const TextStyle(
                            fontSize: 18.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            ElevatedButton(
                              onPressed: _handleAccept,
                              child: const Text('Accept'),
                            ),
                            ElevatedButton(
                              onPressed: _handleCancel,
                              child: const Text('Decline'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  if (_deliveryStatus == "Accepted")
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Restaurant: $_restaurantName',
                          style: const TextStyle(
                            fontSize: 18.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8.0),
                        Text(
                          'Address: $_restaurantAddress',
                          style: const TextStyle(fontSize: 16.0),
                        ),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            ElevatedButton(
                              onPressed: _handlePickUp,
                              child: const Text('Pick Up'),
                            ),
                            ElevatedButton(
                              onPressed: _handleCancel,
                              child: const Text('Cancel'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  if (_deliveryStatus == "Picked Up")
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Customer: $_customerName',
            style: const TextStyle(fontSize: 18.0),
          ),
          IconButton(
            icon: Icon(Icons.contact_phone),
            onPressed: () {
              // Code to call customer
            },
          ),
        ],
      ),

                        Text(
                          'Customer Address: $_customerAddress',
                          style: const TextStyle(fontSize: 16.0),
                        ),
                        Text(
                          'Restaurant: $_restaurantName',
                          style: const TextStyle(
                            fontSize: 18.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8.0),
                        Text(
                          'Address: $_restaurantAddress',
                          style: const TextStyle(fontSize: 16.0),
                        ),
                        const SizedBox(height: 20),
                        ElevatedButton(
                          onPressed: _handleDelivered,
                          child: const Text('Mark as Delivered'),
                        ),
                      ],
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    bottomNavigationBar: BottomNavBar(
      currentIndex: _selectedIndex,
      selectedIndex: _selectedIndex,
      onItemTapped: _onItemTapped,
    ),
  );
}


  @override
  void dispose() {
    _notificationService.stopPollingNotifications();
    super.dispose();
  }
}
