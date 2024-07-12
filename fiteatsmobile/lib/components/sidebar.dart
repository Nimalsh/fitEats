import 'package:delivery/pages/finance.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:delivery/pages/profile.dart';
import 'package:flutter/material.dart';
 // Import the finance page

class Sidebar extends StatelessWidget {
  final bool isSidebarOpen;
  final Function() toggleSidebar;


  const Sidebar({super.key, 
    required this.isSidebarOpen,
    required this.toggleSidebar,
// Accept navigateToFinancePage parameter
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
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
                          onPressed: toggleSidebar,
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
            const SizedBox(height: 20),
            // Menu items
            ListTile(
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
              title: const Text('Home', style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
              onTap: () {
                toggleSidebar(); // Close sidebar
                // Additional logic for item 1
                  Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const HomePage()),
                );// Call the function passed from HomePage

              },
            ),
            ListTile(
              leading: Container(
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
              title: const Text('Edit Profile', style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
              onTap: () {
                toggleSidebar(); // Close sidebar
                // Additional logic for item 2
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ProfilePage()),
                );// Call the function passed from HomePage

              },
            ),
            ListTile(
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
              title: const Text('Finance', style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
              onTap: () {
               // Close sidebar
                 // Call the function passed from HomePage
                  Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const FinancePage()),
                );
              },
            ),
            ListTile(
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
              title: const Text('Settings', style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
              onTap: () {
                toggleSidebar(); // Close sidebar
                // Additional logic for item 4
              },
            ),
            ListTile(
              leading: Container(
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
              title: const Text('Help', style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
              onTap: () {
                toggleSidebar(); // Close sidebar
                // Additional logic for item 5
              },
            ),
            // Logout button
            const Expanded(child: SizedBox()),
            ListTile(
              leading: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: const Icon(
                  Icons.logout,
                  size: 26,
                  color: Color.fromARGB(255, 78, 78, 78),
                ),
              ),
              title: const Text('Logout', style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold)),
              onTap: () {
                // Implement logout logic here
              },
            ),
          ],
        ),
      ),
    );
  }
}
