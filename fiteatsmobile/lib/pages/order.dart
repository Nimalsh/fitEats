import 'package:delivery/pages/profile.dart';
import 'package:flutter/material.dart';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/components/sidebar.dart';
import 'package:delivery/pages/homepage.dart';

class OrderHistoryPage extends StatefulWidget {
  const OrderHistoryPage({super.key});

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
          MaterialPageRoute(builder: (context) => HomePage()),
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
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: _isSidebarOpen
          ? null
          : AppBar(
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
      body: Stack(
        children: [
          // Sidebar
          if (_isSidebarOpen) ...[
            Sidebar(
              isSidebarOpen: _isSidebarOpen,
              toggleSidebar: _toggleSidebar,
            ),
            // Overlay to darken the screen when sidebar is open
            GestureDetector(
              onTap: _toggleSidebar,
              child: Container(
                color: const Color.fromARGB(255, 244, 244, 244).withOpacity(0.1),
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height,
              ),
            ),
          ],
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