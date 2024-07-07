import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/order.dart';
import 'package:delivery/pages/profile.dart';
import 'package:flutter/material.dart';
import 'package:delivery/components/sidebar.dart'; // Import the sidebar widget

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

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
    // For example:
  switch (index) {
      case 0:
        // Navigate to Home page or handle accordingly
        break;
     case 1:
     
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
      backgroundColor: Color.fromARGB(255, 236, 236, 236),
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
                const Text(
                  " ",
                ),
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
                          const  Column(
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
                                  "Deliver",
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Color.fromARGB(255, 111, 111, 111),
                                  ),
                                ),
                                Text(
                                  "123 Main St, Cityville",
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Color.fromARGB(255, 46, 135, 26),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 18),
                      const  Padding(
  padding: EdgeInsets.only(left: 26.0),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.start,
    children: [
      Icon(Icons.attach_money, size: 20, color: Colors.black),
      SizedBox(width: 8),
      Text(
        "\$25",
        style: TextStyle(
          fontSize: 16,
          color: Colors.black,
          fontFamily: 'Poppins',
          fontWeight: FontWeight.bold,
        ),
      ),
      SizedBox(width: 20), // Adjust the width as needed
      Icon(Icons.access_time, size: 20, color: Colors.black),
      SizedBox(width: 8),
      Text(
        "12:30 PM",
        style: TextStyle(
          fontSize: 16,
          color: Colors.black,
          fontFamily: 'Poppins',
          fontWeight: FontWeight.bold,
        ),
      ),
      SizedBox(width: 20), // Adjust the width as needed
      Icon(Icons.directions_run, size: 20, color: Colors.black),
      SizedBox(width: 8),
      Text(
        "5 km",
        style: TextStyle(
          fontSize: 16,
          color: Colors.black,
          fontFamily: 'Poppins',
          fontWeight: FontWeight.bold,
        ),
      ),
    ],
  ),
),
                      ],
                    ),
                  ),
                  const SizedBox(height: 5),
                  // Statistics
                  Expanded(
                    child: GridView.count(
                      padding: const EdgeInsets.only(top: 20.0),
                      crossAxisCount: 2,
                      mainAxisSpacing: 16.0,
                      crossAxisSpacing: 16.0,
                      childAspectRatio: 2.0,
                      children: [
                        _buildStatistic(
                          "Average Delivery Time",
                          "2 hrs",
                          Icons.access_time,
                        const  Color.fromARGB(255, 49, 115, 11),
                          useCustomColor: true,
                        ),
                        _buildStatistic(
                          "Completed Deliveries",
                          "120",
                          Icons.done,
                        const  Color.fromARGB(255, 49, 115, 11),
                          useCustomColor: true,
                        ),
                        _buildStatistic(
                          "Rating",
                          "4.5",
                          Icons.star,
                        const  Color.fromARGB(255, 49, 115, 11),
                          useCustomColor: true,
                        ),
                        _buildStatistic(
                          "Cancelled Deliveries",
                          "10",
                          Icons.cancel,
                        const  Color.fromARGB(255, 49, 115, 11),
                          useCustomColor: true,
                        ),
                      ],
                    ),
                  ),
                  // Adjust spacing as needed
                  // Total Earnings
                  Container(
                    padding: const EdgeInsets.all(16.0),
                    decoration: BoxDecoration(
                      color:const  Color.fromARGB(255, 255, 255, 255),
                      borderRadius: BorderRadius.circular(8.0),
                      boxShadow: [
                        BoxShadow(
                          color: const Color.fromARGB(255, 158, 158, 158).withOpacity(0.5), // Color of the shadow
                          spreadRadius: 2, // Spread radius
                          blurRadius: 5, // Blur radius
                          offset: const Offset(0, 3), // Offset of the shadow
                        ),
                      ],
                    ),
                    child: const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Total Earnings",
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          "\$10,000",
                          style: TextStyle(
                            fontSize: 24,
                            color: Color.fromARGB(255, 38, 113, 40),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Adjust spacing as needed
                  // Graph
                  const SizedBox(height: 60),
                ],
              ),
            ),
        ],
      ),
      bottomNavigationBar: !_isSidebarOpen
          ? BottomNavBar(
              selectedIndex: _selectedIndex,
              onItemTapped: _onItemTapped,
            )
          : null,
    );
  }

  Widget _buildStatistic(
    String label,
    String value,
    IconData iconData,
    Color iconColor, {
    bool useCustomColor = false,
  }) {
    Color textColor = useCustomColor ? iconColor : Colors.white;

    return Container(
      padding: const EdgeInsets.all(5.0),
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 250, 250, 250),
        borderRadius: BorderRadius.circular(8.0),
        boxShadow: [
          BoxShadow(
            color: const Color.fromARGB(255, 158, 158, 158).withOpacity(0.5), // Color of the shadow
            spreadRadius: 2, // Spread radius
            blurRadius: 5, // Blur radius
            offset: const Offset(0, 3), // Offset of the shadow
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          const SizedBox(height: 4),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color:Color.fromARGB(255, 161, 161, 161).withOpacity(0.4), // Adjust opacity and color as needed
                  borderRadius: BorderRadius.circular(8.0), // Adjust border radius as needed
                ),
                child: Center(
                  child: Icon(
                    iconData,
                    size: 30,
                    color: iconColor,
                  ),
                ),
              ),
              const SizedBox(width: 4),
              Text(
                value,
                style: TextStyle(
                  fontSize: 24,
                  color: textColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
