import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/finance.dart';

import 'package:delivery/pages/order.dart';
import 'package:delivery/pages/profile.dart';
import 'package:flutter/material.dart';
import 'package:delivery/components/sidebar.dart'; // Import the sidebar widget

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _isSidebarOpen = false;
  bool _isSwitchOn = false;
  final String username = "John Doe"; // Replace with actual username

  int _selectedIndex = 0;

  void _toggleSidebar() {
    setState(() {
      _isSidebarOpen = !_isSidebarOpen;
    });
  }

  void _toggleSwitch(bool value) {
    setState(() {
      _isSwitchOn = value;
    });
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    // Implement navigation logic based on index
    switch (index) {
      case 0:
        // Navigate to Home page or handle accordingly
        break;
      case 1:
        // Navigate to Order page
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const OrderHistoryPage()),
        );
        break;
      case 2:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const OrderHistoryPage()),
        );
        break;
      case 3:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const ProfilePage()),
        );
        break;
      default:
        // Handle default navigation or action
        break;
    }
  }

  void selectedItem(BuildContext context, int index) {
    setState(() {
      _isSidebarOpen = false; // Close the sidebar when an item is selected
    });

    switch (index) {
      case 0:
        _onItemTapped(0); // Call the function to handle the navigation in HomePage
        break;
      case 1:
        _onItemTapped(3); // Assuming ProfilePage is at index 3 in your BottomNavBar
        break;
      case 2:
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => const FinancePage()));
        break;
      case 3:
        // Handle Settings or any other specific logic as needed
        break;
      case 4:
        // Handle Help or any other specific logic as needed
        break;
      case 5:
        // Implement logout logic here
        break;
      default:
        break;
    }
  }

  void _showNotificationDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Notifications'),
          content: const Text('You have new notifications.'),
          actions: <Widget>[
            TextButton(
              child: const Text('Close'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 251, 251, 251),
        elevation: 5,
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: _toggleSidebar,
          iconSize: 35,
          color: const Color.fromARGB(255, 3, 3, 3),
        ),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Text(" "),
                const SizedBox(width: 200),
                Switch(
                  value: _isSwitchOn,
                  onChanged: _toggleSwitch,
                ),
                IconButton(
                  icon: const Icon(Icons.notifications),
                  onPressed: _showNotificationDialog,
                  iconSize: 27,
                  color: const Color.fromARGB(255, 3, 3, 3),
                ),
              ],
            ),
          ],
        ),
      ),
      body: Stack(
        children: [
          // Sidebar
          Sidebar(
            isSidebarOpen: _isSidebarOpen,
            toggleSidebar: _toggleSidebar,
            selectedItem: selectedItem,
          ),
          // Overlay to darken the screen when sidebar is open
          if (_isSidebarOpen)
            GestureDetector(
              onTap: _toggleSidebar,
              child: Container(
                color: const Color.fromARGB(255, 244, 244, 244).withOpacity(0.1),
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height,
              ),
            ),
          // Content
          if (!_isSidebarOpen)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          RichText(
                            text: TextSpan(
                              children: [
                                const TextSpan(
                                  text: "Hello, ",
                                  style: TextStyle(
                                    fontSize: 22,
                                    color: Color.fromARGB(255, 13, 12, 12),
                                    fontFamily: 'Poppins',
                                  ),
                                ),
                                TextSpan(
                                  text: "$username!",
                                  style: const TextStyle(
                                    fontSize: 22,
                                    color: Color.fromARGB(255, 13, 12, 12),
                                    fontFamily: 'Poppins',
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const CircleAvatar(
                        radius: 17,
                        backgroundImage: AssetImage("assets/images/profile_picture.png"),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // Rectangle about last completed delivery
                  Container(
                    padding: const EdgeInsets.all(16.0),
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 255, 253, 253),
                      borderRadius: BorderRadius.circular(8.0),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.5),
                          spreadRadius: 5,
                          blurRadius: 7,
                          offset: const Offset(0, 3), // changes position of shadow
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "COMPLETED DELIVERY",
                              style: TextStyle(
                                fontSize: 16,
                                color: Color.fromARGB(255, 126, 125, 125),
                              ),
                            ),
                            Text(
                              "Order #12345",
                              style: TextStyle(
                                fontSize: 16,
                                color: Color.fromARGB(255, 126, 125, 125),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(left: 26.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(5.0),
                                    decoration: BoxDecoration(
                                      color: Colors.grey.withOpacity(0.2),
                                      borderRadius: BorderRadius.circular(5.0),
                                    ),
                                    child: const Icon(
                                      Icons.food_bank,
                                      size: 30,
                                      color: Colors.black,
                                    ),
                                  ),
                                  Container(
                                    width: 2,
                                    height: 30,
                                    color: Colors.grey[400],
                                  ),
                                  Container(
                                    padding: const EdgeInsets.all(5.0),
                                    decoration: BoxDecoration(
                                      color: Colors.grey.withOpacity(0.2),
                                      borderRadius: BorderRadius.circular(5.0),
                                    ),
                                    child: const Icon(
                                      Icons.location_pin,
                                      size: 30,
                                      color: Colors.black,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 16),
                            const Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Pick Up",
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Color.fromARGB(255, 111, 111, 111),
                                  ),
                                ),
                                Text(
                                  "Restaurant A",
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Color.fromARGB(255, 46, 135, 26),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                SizedBox(height: 30),
                                Text(
                                  "Drop Off",
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Color.fromARGB(255, 111, 111, 111),
                                  ),
                                ),
                                Text(
                                  "123 Main St",
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Color.fromARGB(255, 216, 24, 10),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            const Spacer(),
                            Column(
                              children: [
                                const Icon(
                                  Icons.monetization_on,
                                  size: 30,
                                  color: Colors.black,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  "\$10.50",
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.green[800],
                                  ),
                                ),
                                const SizedBox(height: 16),
                                const Icon(
                                  Icons.access_time,
                                  size: 30,
                                  color: Colors.black,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  "15 mins",
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.blue[800],
                                  ),
                                ),
                                const SizedBox(height: 16),
                                const Icon(
                                  Icons.directions_car,
                                  size: 30,
                                  color: Colors.black,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  "5 miles",
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.orange[800],
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Add other content for your home page here
                ],
              ),
            ),
        ],
      ),
      bottomNavigationBar: !_isSidebarOpen
          ? BottomNavBar(
              selectedIndex: _selectedIndex,
              onItemTapped: _onItemTapped,
              currentIndex: _selectedIndex, // Ensure to pass the correct currentIndex
            )
          : null,
    );
  }
}
