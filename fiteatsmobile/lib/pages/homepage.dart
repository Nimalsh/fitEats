import 'package:delivery/pages/finance.dart';
import 'package:delivery/pages/order.dart';
import 'package:delivery/pages/profile.dart';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/services/user_service.dart'; // Import the UserService
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  final int userId; // Change from fullName to userId

  const HomePage({super.key, required this.userId}); // Accept userId

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _isSidebarOpen = false;
  bool _isSwitchOn = false;
  String? _fullName;
final UserService _userService = UserService('http://10.0.3.2:8080'); // Initialize UserService

  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _fetchUserFullName();
  }

  void _fetchUserFullName() async {
    try {
      final fullName = await _userService.getUserFullName(widget.userId);
      setState(() {
        _fullName = fullName;
      });
    } catch (e) {
      // Handle error, for example, show an error message
      print('Error fetching user data: $e');
    }
  }

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
        // Handle navigation for other items if needed
        break;
      case 2:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) =>  OrderHistoryPage(userId: widget.userId)),
        );
        break;
      case 3:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) =>  ProfilePage(userId: widget.userId)),
        );
        break;
      default:
        // Handle default navigation or action
        break;
    }
  }
 // void _navigateToFinancePage() {
 // Navigator.push(
   // context,
   // MaterialPageRoute(builder: (context) => const FinancePage()),
 // );
// }

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
            drawer: Drawer(
              width: 330.0,
        child: Container(
          color: const Color.fromARGB(255, 232, 231, 231),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 50),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          width: 70,
                          height: 70,
                          decoration: BoxDecoration(
                            image: const DecorationImage(
                              image: AssetImage("assets/images/profile_picture.png"),
                              fit: BoxFit.cover,
                            ),
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: const Color.fromARGB(255, 92, 92, 92).withOpacity(0.3),
                            borderRadius: BorderRadius.circular(5),
                          ),
                          child: IconButton(
                            icon: const Icon(Icons.close, color: Color.fromARGB(255, 0, 0, 0)),
                            onPressed: () {
                              Navigator.of(context).pop(); // Close drawer
                            },
                          ),
                        ),
                      ],
                    ),
                                      const SizedBox(height: 10),
                    _fullName != null ? Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        _fullName!,
                        style: const TextStyle(
                          fontSize: 22,
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ) : const CircularProgressIndicator(),
                  ],

                ),
              ),
              const SizedBox(height: 30),
              // Menu items
              ListTile(
                contentPadding: const EdgeInsets.only(left: 40.0),
                leading: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: const Icon(
                  Icons.home,
                  size: 26,
                  color: Color.fromARGB(255, 78, 78, 78),
                ),
              ),
                title: const Text('Home', style: TextStyle(color: Color.fromARGB(255, 46, 46, 46), fontSize: 20, fontWeight: FontWeight.bold)),
                onTap: () {
                  Navigator.pop(context); // Close drawer
                  // Additional logic for item 1
                 Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => HomePage(userId: widget.userId),
                    ),
                 );
                },
              ),
              const SizedBox(height: 8), 
              ListTile(
                contentPadding: const EdgeInsets.only(left: 40.0),
                leading:Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: const Icon(
                  Icons.person,
                  size: 26,
                  color: Color.fromARGB(255, 78, 78, 78),
                ),
              ),
                title: const Text('Edit Profile', style: TextStyle(color: Color.fromARGB(255, 46, 46, 46),fontSize: 20, fontWeight: FontWeight.bold)),
                onTap: () {
                  Navigator.pop(context); // Close drawer
                  // Additional logic for item 2
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) =>  ProfilePage(userId: widget.userId)),
                  );
                },
              ),
              const SizedBox(height: 8), 

              ListTile(
                contentPadding: const EdgeInsets.only(left: 40.0),
                leading: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: const Icon(
                  Icons.attach_money,
                  size: 26,
                  color: Color.fromARGB(255, 78, 78, 78),
                ),
              ),
                title: const Text('Finance', style: TextStyle(color:Color.fromARGB(255, 46, 46, 46), fontSize: 20, fontWeight: FontWeight.bold)),
                onTap: () {
                  Navigator.pop(context); // Close drawer
                  // Additional logic for item 3
                 Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => FinancePage(userId: widget.userId), // Pass userId here
          ),
        );
                },
              ),
              const SizedBox(height: 8), 

              ListTile(
                contentPadding: const EdgeInsets.only(left: 40.0),
                leading: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: const Icon(
                  Icons.settings,
                  size: 26,
                  color: Color.fromARGB(255, 78, 78, 78),
                ),
              ),
                title: const Text('Settings', style: TextStyle(color:Color.fromARGB(255, 46, 46, 46), fontSize: 20, fontWeight: FontWeight.bold)),
                onTap: () {
                  Navigator.pop(context); // Close drawer
                  // Additional logic for item 4
                },
              ),
              const SizedBox(height: 8), 

              ListTile(
                contentPadding: const EdgeInsets.only(left: 40.0),
                leading:  Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: const Icon(
                  Icons.help,
                  size: 26,
                  color: Color.fromARGB(255, 78, 78, 78),
                ),
              ),
                title: const Text('Help', style: TextStyle(color:Color.fromARGB(255, 46, 46, 46), fontSize: 20, fontWeight: FontWeight.bold)),
                onTap: () {
                  Navigator.pop(context); // Close drawer
                  // Additional logic for item 5
                },
              ),
              // Logout button
              const SizedBox(height: 255), 
           
              ListTile(
                contentPadding: const EdgeInsets.only(left: 40.0),
                leading: const Icon(Icons.logout, size: 26, color: Color.fromARGB(255, 78, 78, 78)),
                title: const Text('Logout', style: TextStyle(color: Color.fromARGB(255, 46, 46, 46), fontWeight: FontWeight.bold)),
                onTap: () {
                  // Implement logout logic here
                },
              ),
            ],
          ),
        ),
      ),
      body: Stack(
        children: [
          // Content
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
                                text: _fullName ?? 'Loading...',
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
                      const Padding(
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
                        const Color.fromARGB(255, 49, 115, 11),
                        useCustomColor: true,
                      ),
                      _buildStatistic(
                        "Completed Deliveries",
                        "120",
                        Icons.done,
                        const Color.fromARGB(255, 49, 115, 11),
                        useCustomColor: true,
                      ),
                      _buildStatistic(
                        "Rating",
                        "4.5",
                        Icons.star,
                        const Color.fromARGB(255, 49, 115, 11),
                        useCustomColor: true,
                      ),
                      _buildStatistic(
                        "Cancelled Deliveries",
                        "10",
                        Icons.cancel,
                        const Color.fromARGB(255, 49, 115, 11),
                        useCustomColor: true,
                      ),
                    ],
                  ),
                ),
                // Total Earnings
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(255, 255, 255, 255),
                    borderRadius: BorderRadius.circular(8.0),
                    boxShadow: [
                      BoxShadow(
                        color: const Color.fromARGB(255, 158, 158, 158).withOpacity(0.5),
                        spreadRadius: 2,
                        blurRadius: 5,
                        offset: const Offset(0, 3),
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
                ), const SizedBox(height: 60),
                // Graph or other content as needed
              ],
            ),
          ),
          // Sidebar
      
        ],
      ),
      bottomNavigationBar: !_isSidebarOpen
          ? BottomNavBar(
            currentIndex: _selectedIndex,
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
            color: const Color.fromARGB(255, 158, 158, 158).withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
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
                  color: const Color.fromARGB(255, 161, 161, 161).withOpacity(0.4),
                  borderRadius: BorderRadius.circular(8.0),
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
