import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:delivery/pages/finance.dart';
import 'package:delivery/pages/help.dart';
import 'package:delivery/pages/order.dart';
import 'package:delivery/pages/profile.dart';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/track.dart';
import 'package:delivery/services/user_service.dart'; // Import the UserService
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'login_page.dart';

class HomePage extends StatefulWidget {
  final int userId; 
  // Change from fullName to userId

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
 DateTime? selectedDate;


  @override
  void initState() {
    super.initState();
    _fetchUserFullName();
    _fetchDriverAvailability(); // Fetch initial availability
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

void _fetchDriverAvailability() async {
  try {
    final response = await http.get(Uri.parse('http://10.0.3.2:8080/api/drivers/${widget.userId}'));
    
    if (response.statusCode == 200) {
      // Print response body for debugging
      print(response.body);
      
      // Decode the response body
      final data = json.decode(response.body);
      
      // Use the data to set state
      setState(() {
        _isSwitchOn = data['available']; // Adjust the key based on the actual JSON response
      });
    } else {
      throw Exception('Failed to load driver data');
    }
  } catch (e) {
    // Handle errors
    print('Error fetching driver availability: $e');
  }
}


  void _toggleSidebar() {
    setState(() {
      _isSidebarOpen = !_isSidebarOpen;
    });
  }

  void _toggleSwitch(bool value) async {
    setState(() {
      _isSwitchOn = value;
    });

    try {
      await _userService.updateDriverAvailability(widget.userId, _isSwitchOn);
    } catch (e) {
      // Handle error and possibly revert the switch state
      print('Error updating driver availability: $e');
    }
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
         Navigator.push(
          context,
          MaterialPageRoute(builder: (context) =>  DeliveryStatusPage(userId: widget.userId)),
        );
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
  void _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );

    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
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
     ScreenUtil.init(context);

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: AppBar(
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
    body: SingleChildScrollView(
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [
      // Top Content
      Padding(
        padding: EdgeInsets.symmetric(horizontal: 20.0.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 0.02.sh),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: RichText(
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
                ),
                const CircleAvatar(
                  radius: 17,
                  backgroundImage: AssetImage("assets/images/profile_picture.png"),
                ),
              ],
            ),
            SizedBox(height: 0.03.sh),
            // Rectangle about last completed delivery
            Container(
              padding: EdgeInsets.all(14.0.w),
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
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "LAST ORDER",
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
                  SizedBox(height: 0.02.sh),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: EdgeInsets.only(left: 25.0.w),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Container(
                              padding: EdgeInsets.all(5.0.w),
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
                              padding: EdgeInsets.all(5.0.w),
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
                      SizedBox(width: 0.04.sw),
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
                          const Text(
                            "Restaurant A",
                            style: TextStyle(
                              fontSize: 16,
                              color: Color.fromARGB(255, 46, 135, 26),
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 0.04.sh),
                          const Text(
                            "Deliver",
                            style: TextStyle(
                              fontSize: 12,
                              color: Color.fromARGB(255, 111, 111, 111),
                            ),
                          ),
                          const Text(
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
                  SizedBox(height: 0.03.sh),
                  Padding(
                    padding: EdgeInsets.only(left: 15.0.w),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        const Icon(Icons.money, size: 20, color: Colors.black),
                        SizedBox(width: 0.01.sw),
                        const Text(
                          "LKR1000",
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                            fontFamily: 'Poppins',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(width: 0.03.sw), // Adjust the width as needed
                        const Icon(Icons.access_time, size: 20, color: Colors.black),
                        SizedBox(width: 0.01.sw),
                        const Text(
                          "12:30 PM",
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                            fontFamily: 'Poppins',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(width: 0.04.sw), // Adjust the width as needed
                        const Icon(Icons.directions_run, size: 20, color: Colors.black),
                        SizedBox(width: 0.01.sw),
                        const Text(
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
            SizedBox(height: 0.02.sh),
            // Date Filter
            Padding(
              padding: EdgeInsets.only(bottom: 2.h),
              child: Row(
                children: [
                  Text(
                    'Filter by Date:',
                    style: TextStyle(fontSize: 14.sp),
                  ),
                  SizedBox(width: 16.w),
                  ElevatedButton(
                    onPressed: () => _selectDate(context),
                    child: const Text(
                      'Select Date',
                    style: TextStyle(
                      fontSize: 13,
                      color: Colors.black,
                    ),),
                  ),
                ],
              ),
            ),
            SizedBox(height: 0.007.sh),
            // Statistics
            GridView.count(
              padding: EdgeInsets.only(top: 16.h),
              crossAxisCount: 2,
              mainAxisSpacing: 16.w,
              crossAxisSpacing: 16.w,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              childAspectRatio: 2.0,
              children: [
                _buildStatistic(
                  "Total No. of Orders",
                  "30",
                  Icons.done,
                  const Color.fromARGB(255, 49, 115, 11),
                  useCustomColor: true,
                ),
                _buildStatistic(
                  "Total Earnings",
                  "LKR 14 000",
                  Icons.money,
                  const Color.fromARGB(255, 49, 115, 11),
                  useCustomColor: true,
                ),
                _buildStatistic(
                  "Average Delivery Time",
                  "2 hrs",
                  Icons.access_time,
                  const Color.fromARGB(255, 49, 115, 11),
                  useCustomColor: true,
                ),
                _buildStatistic(
                  "Cancelled Orders",
                  "10",
                  Icons.cancel,
                  const Color.fromARGB(255, 49, 115, 11),
                  useCustomColor: true,
                ),
              ],
            ),
            // Total Earnings
            SizedBox(height: 0.03.sh),
            Container(
              padding: EdgeInsets.all(16.0.w),
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 255, 255, 255),
                borderRadius: BorderRadius.circular(8.0.r),
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
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const Text(
                    "RATING",
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 0.008.sh),
                  const Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
        "4.5",
        style: TextStyle(
          fontSize: 24,
          color: Color.fromARGB(255, 38, 113, 40),
          fontWeight: FontWeight.bold,
        ),
      ),
        Icon(Icons.star, color: Color.fromARGB(255, 38, 113, 40), size: 24),
        Icon(Icons.star, color:Color.fromARGB(255, 38, 113, 40), size: 24),
        Icon(Icons.star, color: Color.fromARGB(255, 38, 113, 40), size: 24),
        Icon(Icons.star, color:Color.fromARGB(255, 38, 113, 40), size: 24),
        Icon(Icons.star_half, color: Color.fromARGB(255, 38, 113, 40), size: 24),
        
        
      ],
    ),
                ],
              ),
            ),
            // Graph or other content as needed
            SizedBox(height: 0.05.sh), // Extra space for content below
          ],
        ),
      ),
      // Sidebar (if needed)
    ],
  ),
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
      padding:  EdgeInsets.all(5.0.w),
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 250, 250, 250),
        borderRadius: BorderRadius.circular(8.0.r),
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
           SizedBox(height: 0.004.sh),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 161, 161, 161).withOpacity(0.4),
                  borderRadius: BorderRadius.circular(8.0.r),
                ),
                child: Center(
                  child: Icon(
                    iconData,
                    size: 30,
                    color: iconColor,
                  ),
                ),
              ),
               SizedBox(width: 0.02.sw),
              Text(
                value,
                style: TextStyle(
                  fontSize: 20,
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
