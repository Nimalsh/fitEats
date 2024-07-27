import 'package:delivery/pages/finance.dart';
import 'package:delivery/pages/profile.dart';
import 'package:flutter/material.dart';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/homepage.dart';

class OrderHistoryPage extends StatefulWidget {
  final int userId;

  const OrderHistoryPage({super.key, required this.userId});

  @override
  _OrderHistoryPageState createState() => _OrderHistoryPageState();
}
class _OrderHistoryPageState extends State<OrderHistoryPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isSidebarOpen = false;
  bool _isSwitchOn = false;
  int _selectedIndex = 2;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
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

    // Example navigation logic
    switch (index) {
      case 0:
        Navigator.push(
          context,
         MaterialPageRoute(
            builder: (context) => HomePage(userId: widget.userId), // Pass userId here
          ),
        );
        break;
      case 1:
        // Handle current page or default action
        break;
      case 2:
        // Handle profile page navigation
        break;
        case 3:
        // Handle profile page navigation
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
  void _navigateToFinancePage() {
          Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => FinancePage(userId: widget.userId), // Pass userId here
          ),
        );
}

    void _navigateToProfilePage() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) =>  ProfilePage(userId: widget.userId)),
    );
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
      appBar: _isSidebarOpen
          ? null
          : AppBar(
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

              bottom: TabBar(
                controller: _tabController,
                tabs: const [
                  Tab(text: 'Requests'),
                  Tab(text: 'Completed'),
                ],
                
                labelColor: const Color.fromARGB(255, 12, 13, 13), // Change this to your desired color
                unselectedLabelColor: Colors.grey, // Change this to your desired color
                indicatorColor: const Color.fromARGB(255, 74, 74, 74), // Change this to your desired color
                labelStyle: const TextStyle(fontSize: 16, fontFamily: 'Poppins', fontWeight: FontWeight.bold), // Change the font size for selected tab
                unselectedLabelStyle: const TextStyle(fontSize: 14, fontFamily: 'Poppins'), // Change the font size for unselected tabs
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
                    const Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        "John Doe",
                        style: TextStyle(
                          fontSize: 22,
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
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
                  MaterialPageRoute(builder: (context) =>  HomePage(userId: widget.userId)),
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
                    MaterialPageRoute(builder: (context) =>  FinancePage(userId: widget.userId)),
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
          // Sidebar

          // Content
          if (!_isSidebarOpen)
            TabBarView(
              controller: _tabController,
              children: const [
                OngoingOrders(),
                CompletedOrders(),
              ],
            ),
        ],
      ),
      bottomNavigationBar: _isSidebarOpen
          ? null
          : BottomNavBar(
            currentIndex: _selectedIndex,
              selectedIndex: _selectedIndex,
              onItemTapped: _onItemTapped,
            ),
    );
  }
}

class OngoingOrders extends StatelessWidget {
  const OngoingOrders({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(8.0),
      children: const [
        SizedBox(height: 20),
        RequestCard(  
          orderNumber: 'Order #123',
          restaurant: 'Restaurant A',
          address:'123 Main St',
          price: '\$25',
        ),
      ],
    );
  }
}

 class RequestCard extends StatelessWidget {
  final String orderNumber;
  final String restaurant;
  final String price;
  final String address;

  const RequestCard({
    super.key,
    required this.orderNumber,
    required this.price, 
    required  this.restaurant,
    required  this.address,

  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      
      padding: const EdgeInsets.all(10.0),
      
      child: Container(
        
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
                        children:  [
                           Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                             const Text(
                                "Request",
                                style:  TextStyle(
                                  fontSize: 16,
                                  color: Color.fromARGB(255, 93, 92, 92),
                                ),
                              ),
                              Text(
                              orderNumber ,
                                style:const TextStyle(
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
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    "Pick Up",
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Color.fromARGB(255, 111, 111, 111),
                                    ),
                                  ),
                                  Text(
                                    restaurant ,
                                    style: const TextStyle(
                                      fontSize: 16,
                                      color: Color.fromARGB(255, 46, 135, 26),
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                 const SizedBox(height: 30),
                                const  Text(
                                    "Deliver",
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Color.fromARGB(255, 111, 111, 111),
                                    ),
                                  ),
                                  Text(
                                    address,
                                    style: const TextStyle(
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
                           Padding(
              padding: const EdgeInsets.only(left: 97.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      // Add your accept button logic here
                    },
                     style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(255, 40, 114, 40), // Change button color to red
                    ),
                    child: const Text(
                      "Accept",
                      style: TextStyle(
                        fontSize: 16,
                        fontFamily: 'Poppins',
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(width: 20),
                  ElevatedButton(
                    onPressed: () {
                      // Add your cancel button logic here
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(255, 182, 45, 35), // Change button color to red
                    ),
                    child: const Text(
                      "Cancel",
                      style: TextStyle(
                        fontSize: 16,
                        fontFamily: 'Poppins',
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
                      
                      ),
      ),
    );
  }
}



class CompletedOrders extends StatelessWidget {
  const CompletedOrders({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(8.0),
      children: const [
        OrderCard(
          orderNumber: 'Order #123',
          restaurant: 'Restaurant A',
          fee: '\$25',
          time: '12:00 PM',
          distance: '5 miles',
        ),
        Divider(),
        OrderCard(
          orderNumber: 'Order #124',
          restaurant: 'Restaurant B',
          fee: '\$30',
          time: '1:00 PM',
          distance: '10 miles',
        ),
        Divider(),
        OrderCard(
          orderNumber: 'Order #125',
          restaurant: 'Restaurant C',
          fee: '\$20',
          time: '2:00 PM',
          distance: '3 miles',
        ),
      ],
    );
  }
}

class OrderCard extends StatelessWidget {
  final String orderNumber;
  final String restaurant;
  final String fee;
  final String time;
  final String distance;

  const OrderCard({
    super.key,
    required this.orderNumber,
    required this.restaurant,
    required this.fee,
    required this.time,
    required this.distance,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(orderNumber),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Restaurant: $restaurant'),
          Text('Fee: $fee'),
          Text('Time: $time'),
          Text('Distance: $distance'),
        ],
      ),
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => OrderDetailsPage(
              orderNumber: orderNumber,
              restaurant: restaurant,
              fee: fee,
              time: time,
              distance: distance,
            ),
          ),
        );
      },
    );
  }
}

class OrderDetailsPage extends StatelessWidget {
  final String orderNumber;
  final String restaurant;
  final String fee;
  final String time;
  final String distance;

  const OrderDetailsPage({
    super.key,
    required this.orderNumber,
    required this.restaurant,
    required this.fee,
    required this.time,
    required this.distance,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Order Details: $orderNumber'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Order Number: $orderNumber'),
            Text('Restaurant: $restaurant'),
            Text('Fee: $fee'),
            Text('Time: $time'),
            Text('Distance: $distance'),
          ],
        ),
      ),
    );
  }
}