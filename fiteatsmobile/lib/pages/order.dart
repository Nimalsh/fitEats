import 'package:delivery/pages/finance.dart';
import 'package:delivery/pages/help.dart';
import 'package:delivery/pages/profile.dart';
import 'package:delivery/services/user_service.dart';
import 'package:flutter/material.dart';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'login_page.dart';

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
    String? _fullName;
    

 late final UserService _userService; 
 // Make UserService a late final variable
  @override
  void initState() {
    super.initState();
    _userService = UserService('http://10.0.3.2:8080');
    _tabController = TabController(length: 2, vsync: this);
     _fetchUserFullName();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
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
     ScreenUtil.init(context);

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: _isSidebarOpen
          ? null
          : AppBar(
              backgroundColor: const Color.fromARGB(255, 251, 251, 251),
              elevation: 5,
             
title: Row(
      children: [
        const Expanded(
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(" "), // Use an empty text or adjust if needed
          ),
        ),
        Align(
          alignment: Alignment.centerRight,
          child: Row(
            mainAxisSize: MainAxisSize.min, // Makes sure Row only takes as much space as its content
            children: [
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
              width: 295.0.w,
        child: Container(
          color: const Color.fromARGB(255, 232, 231, 231),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
               SizedBox(height: 0.07.sh),
              Padding(
                padding:  EdgeInsets.symmetric(horizontal: 20.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          width: 70.0.w,
                          height: 70.0.w,
                          decoration: BoxDecoration(
                            image: const DecorationImage(
                              image: AssetImage("assets/images/profile_picture.png"),
                              fit: BoxFit.cover,
                            ),
                            borderRadius: BorderRadius.circular(8.0.r),
                          ),
                        ),
                        Container(
                          width: 30.0.w,
                          height: 30.0.h,
                          decoration: BoxDecoration(
                            color: const Color.fromARGB(255, 92, 92, 92).withOpacity(0.3),
                            borderRadius: BorderRadius.circular(5.0.r),
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
                     SizedBox(height: 0.022.sh),
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
               SizedBox(height: 0.04.sh),
              // Menu items
              ListTile(
                contentPadding:  EdgeInsets.only(left: 40.0.w),
                leading: Container(
                width: 50.0.w,
                height: 50.0.h,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0.r),
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
               SizedBox(height: 0.01.sh), 
              ListTile(
                contentPadding:  EdgeInsets.only(left: 40.0.w),
                leading:Container(
                width: 50.0.w,
                height: 50.0.h,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0.r),
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
               SizedBox(height: 0.01.sh), 

              ListTile(
                contentPadding:  EdgeInsets.only(left: 40.0.w),
                leading: Container(
                width: 50.0.w,
                height: 50.0.h,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0.r),
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
               SizedBox(height: 0.01.sh), 

              ListTile(
                contentPadding:  EdgeInsets.only(left: 40.0.w),
                leading: Container(
                width: 50.0.w,
                height: 50.0.h,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0.r),
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
               SizedBox(height: 0.01.sh), 

              ListTile(
                contentPadding:  EdgeInsets.only(left: 40.0.w),
                leading:  Container(
                width: 50.0.w,
                height: 50.0.h,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0.r),
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
                  // Additional logic for item 3
                 Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => HelpPage(), // Pass userId here
          ),
        );
                },
              ),
              // Logout button
              SizedBox(height: 0.28.sh), 
           
              ListTile(
                contentPadding:  EdgeInsets.only(left: 40.0.w),
                leading: const Icon(Icons.logout, size: 26, color: Color.fromARGB(255, 78, 78, 78)),
                title: const Text('Logout', style: TextStyle(color: Color.fromARGB(255, 46, 46, 46), fontWeight: FontWeight.bold)),
                 onTap: () async {
              // Implement logout logic here
              SharedPreferences prefs = await SharedPreferences.getInstance();
              await prefs.remove('userToken'); // Clear the saved token (or any other key you're using)

              // Navigate back to the login page
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => LoginPage(onTap: () {})),
                (Route<dynamic> route) => false,
              );
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
      padding:  EdgeInsets.all(7.0.w),
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
        
                      padding:  EdgeInsets.all(16.0.w),
                      decoration: BoxDecoration(
                        
                        color: const Color.fromARGB(255, 255, 253, 253),
                        borderRadius: BorderRadius.circular(8.0.r),
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
                           SizedBox(height: 0.02.sh),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                padding:  EdgeInsets.only(left: 26.0.w),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Container(
                                      padding:  EdgeInsets.all(5.0.w),
                                      decoration: BoxDecoration(
                                        color: Colors.grey.withOpacity(0.2),
                                        borderRadius: BorderRadius.circular(5.0.r),
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
                                      padding:  EdgeInsets.all(5.0.w),
                                      decoration: BoxDecoration(
                                        color: Colors.grey.withOpacity(0.2),
                                        borderRadius: BorderRadius.circular(5.0.r),
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
                               SizedBox(width: 0.01.sw),
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
                                  SizedBox(height: 0.04.sh),
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
                           SizedBox(height: 0.03.sh),
                           Padding(
              padding:  EdgeInsets.only(left: 80.0.w),
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
                   SizedBox(width: 17.0.w),
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
      padding: EdgeInsets.all(8.0.r),
      children: const [
        OrderCard(
          orderNumber: 'Order #12',
          restaurant: 'Elite Restaurant',
          address: '11, Main st, Colombo 06',
          amount: 'Rs 1125',
          time: '5:00 PM',
          deliveredtime: '5:20 PM',
          date: '12/05/2024',
          distance: '7 KM',
          fee: 'Rs 125',
          tips: 'Rs 0',
          paymentMethod: 'Card',
          rating: 4.5,
          review: 'Great service!',
        ),
        Divider(),
        OrderCard(
          orderNumber: 'Order #34',
          restaurant: 'Al Maas Restaurant',
          address: '121, Rober st, Colombo 05',
          amount: 'Rs 890',
          time: '12:00 PM',
          deliveredtime: '12:30 PM',
          date: '12/05/2024',
          distance: '10 KM',
          fee: 'Rs 100',
          tips: 'Rs 50',
          paymentMethod: 'Cash',
          rating: 4.0,
          review: 'Quick delivery.',
        ),
        Divider(),
        OrderCard(
          orderNumber: 'Order #38',
          restaurant: 'Hill Restaurant',
          address: '11, Main st, Colombo 08',
          amount: 'Rs 2500',
          time: '10:00 AM',
          deliveredtime: '10:20 PM',
          date: '11/05/2024',
          distance: '5 KM',
          fee: 'Rs 150',
          tips: 'Rs 80',
          paymentMethod: 'Card',
          rating: 4.8,
          review: 'Excellent!',
        ),
      ],
    );
  }
}

class OrderCard extends StatelessWidget {
  final String orderNumber;
  final String restaurant;
  final String address;
  final String amount;
  final String time;
  final String deliveredtime;
  final String date;
  final String distance;
  final String fee;
  final String tips;
  final String paymentMethod;
  final double rating;
  final String review;

  const OrderCard({
    super.key,
    required this.orderNumber,
    required this.restaurant,
    required this.address,
    required this.amount,
    required this.time,
    required this.deliveredtime,
    required this.date,
    required this.distance,
    required this.fee,
    required this.tips,
    required this.paymentMethod,
    required this.rating,
    required this.review,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(orderNumber),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Restaurant: $restaurant'),
          Text('Address: $address'),
          Text('Amount: $amount'),
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
              address: address,
              amount: amount,
              time: time,
              deliveredtime: deliveredtime,
              date: date,
              distance: distance,
              fee: fee,
              tips: tips,
              paymentMethod: paymentMethod,
              rating: rating,
              review: review,
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
  final String address;
  final String amount;
  final String time;
  final String deliveredtime;
  final String date;
  final String distance;
  final String fee;
  final String tips;
  final String paymentMethod;
  final double rating;
  final String review;

  const OrderDetailsPage({
    super.key,
    required this.orderNumber,
    required this.restaurant,
    required this.address,
    required this.amount,
    required this.time,
    required this.deliveredtime,
    required this.date,
    required this.distance,
    required this.fee,
    required this.tips,
    required this.paymentMethod,
    required this.rating,
    required this.review,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Order Details: $orderNumber'),
      ),
      body: Stack(
        children: [
          // Background Container
          Container(
            decoration: BoxDecoration(
              color: const Color.fromARGB(255, 236, 236, 236),
              // Add a background image here if needed
              // image: DecorationImage(
              //   image: AssetImage('assets/background_image.png'),
              //   fit: BoxFit.cover,
              // ),
            ),
            // Make sure the container fills the screen
            width: double.infinity,
            height: double.infinity,
          ),
          // Main content
          Padding(
            padding: EdgeInsets.all(16.0.w),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSectionTitle('General Order Details'),
                  _buildDetailRow('Restaurant:', restaurant),
                  _buildDetailRow('Delivery Address:', address),
                  _buildDetailRow('Amount:', amount),
                  _buildDetailRow('Picked up Time:', time),
                  _buildDetailRow('Delivered Time:', deliveredtime),
                  _buildDetailRow('Date:', date),
                  SizedBox(height: 0.02.sh),
                  _buildSectionTitle('Delivery Details'),
                  _buildDetailRow('Distance:', distance),
                  _buildDetailRow('Delivery Amount:', fee),
                  _buildDetailRow('Tip:', tips),
                  _buildDetailRow('Payment Method:', paymentMethod),
                  SizedBox(height: 0.02.sh),
                  _buildSectionTitle('Review & Rating'),
                  _buildDetailRowWithIcon(
                    'Rating:',
                    rating.toString(),
                    Icons.star,
                  ),
                  _buildDetailRowWithIcon(
                    'Review:',
                    review,
                    Icons.comment,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        title,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 18,
          color: Color.fromARGB(181, 0, 0, 0),
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Text(
            label,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
          SizedBox(width: 0.01.sw),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                fontSize: 16,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailRowWithIcon(String label, String value, IconData icon) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Icon(icon, color: const Color.fromARGB(235, 0, 0, 0)),
          SizedBox(width: 0.01.sw),
          Text(
            label,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
          SizedBox(width: 0.01.sw),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                fontSize: 16,
              ),
            ),
          ),
        ],
      ),
    );
  }
}