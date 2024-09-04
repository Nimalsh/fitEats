import 'dart:async';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:delivery/pages/profile.dart';
import 'package:delivery/services/user_service.dart';

class DeliveryStatusPage extends StatefulWidget {
  final int userId;

  DeliveryStatusPage({super.key, required this.userId});

  @override
  _DeliveryStatusPageState createState() => _DeliveryStatusPageState();
}

class _DeliveryStatusPageState extends State<DeliveryStatusPage> {
  int _selectedIndex = 1;
  String _notificationMessage = '';
  String? _fullName;
  late UserService _userService;

  // Delivery status options
  String _deliveryStatus = 'Picked Up';

  // Sample restaurant and customer details
  final String restaurantName = 'Joe\'s Diner';
  final String restaurantAddress = '123 Main St, San Francisco, CA';
  final String customerName = 'John Doe';
  final String customerAddress = '456 Elm St, San Francisco, CA';

  @override
  void initState() {
    super.initState();
    _userService = UserService('http://10.0.3.2:8080'); // Initialize UserService
    _fetchUserFullName();
    _startNotificationPolling(); // Start periodic polling
  }

  Future<void> _fetchUserFullName() async {
    try {
      final fullName = await _userService.getUserFullName(widget.userId);
      setState(() {
        _fullName = fullName;
      });
    } catch (e) {
      print('Error fetching user data: $e');
    }
  }

  Future<void> _fetchNotification() async {
    try {
      final response = await http.get(
        Uri.parse('http://10.0.3.2:8080/api/notifications/assign-driver'),
      );

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        setState(() {
          _notificationMessage = responseData['message'] ?? '';
        });
        if (_notificationMessage.isNotEmpty) {
          _showNotification(_notificationMessage);
        }
      } else {
        print('Failed to fetch notification: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching notification: $e');
    }
  }

  Future<void> _handleAssignDriver(int orderId) async {
    try {
      final response = await http.post(
        Uri.parse('http://10.0.3.2:8080/api/notifications/assign-driver'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, dynamic>{
          'orderId': orderId,
          'message': 'A new order with ID $orderId is available for assignment.',
        }),
      );

      if (response.statusCode == 200) {
        print('Driver assignment notification sent: ${response.body}');
        // Optionally fetch the latest notification after sending
        _fetchNotification();
      } else {
        print('Failed to send assignment notification: ${response.statusCode}');
      }
    } catch (e) {
      print('Failed to send assignment notification: $e');
    }
  }

  void _showNotification(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: Duration(seconds: 5),
      ),
    );
  }

  void _startNotificationPolling() {
    // Poll every 30 seconds (adjust as needed)
    Timer.periodic(Duration(seconds: 30), (Timer timer) {
      _fetchNotification();
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
        // Handle current page or default action
        break;
      case 2:
        // Add any additional navigation actions if needed
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
        // Handle default navigation or action
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Map will be shown here (commented out for now)
          /*
          GoogleMap(
            initialCameraPosition: CameraPosition(
              target: _initialPosition,
              zoom: 14,
            ),
            onMapCreated: (controller) {
              _mapController = controller;
            },
          ),
          */
          // Bottom tab to update delivery status and show details
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
                  SizedBox(height: 16.0),
                  Text(
                    'Latest Notification: $_notificationMessage',
                    style: TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16.0),
                  Text(
                    'Restaurant: $restaurantName',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  Text(
                    'Restaurant Address: $restaurantAddress',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  SizedBox(height: 16.0),
                  Text(
                    'Customer: $customerName',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  Text(
                    'Customer Address: $customerAddress',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  SizedBox(height: 16.0),
                  Text(
                    'Update Delivery Status',
                    style: TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16.0),
                  DropdownButton<String>(
                    value: _deliveryStatus,
                    isExpanded: true,
                    onChanged: (String? newValue) {
                      setState(() {
                        _deliveryStatus = newValue!;
                      });
                    },
                    items: <String>['Picked Up', 'On the Way', 'Delivered']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                  ),
                  SizedBox(height: 16.0),
                  Center(
                    child: ElevatedButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Status updated to $_deliveryStatus'),
                          ),
                        );
                      },
                      child: Text('Confirm Status'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color.fromARGB(255, 0, 0, 0),
                        padding: EdgeInsets.symmetric(
                            vertical: 16.0, horizontal: 24.0),
                      ),
                    ),
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
}
