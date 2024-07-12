import 'package:delivery/pages/finance.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:delivery/pages/profile.dart';
import 'package:flutter/material.dart';

class Sidebar extends StatelessWidget {
  final bool isSidebarOpen;
  final Function() toggleSidebar;

  const Sidebar({
    required this.isSidebarOpen,
    required this.toggleSidebar,
    super.key, required void Function(BuildContext context, int index) selectedItem, required void Function(String newItem) onItemSelected,
  });

  @override
  Widget build(BuildContext context) {
    final double sidebarWidth = MediaQuery.of(context).size.width;

    return AnimatedPositioned(
      duration: const Duration(milliseconds: 300),
      left: isSidebarOpen ? 0 : -sidebarWidth,
      top: 0,
      bottom: 0,
      width: sidebarWidth,
      child: Stack(
        children: [
          if (isSidebarOpen)
            GestureDetector(
              onTap: toggleSidebar,
              child: Container(
                color: Colors.black.withOpacity(0.5),
                width: sidebarWidth,
                height: MediaQuery.of(context).size.height,
              ),
            ),
          Positioned(
            left: 0,
            top: 0,
            bottom: 0,
            width: sidebarWidth,
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
                  _buildSidebarItem(
                    context,
                    icon: Icons.home,
                    text: 'Home',
                    onClicked: () => selectedItem(context, 0)
                  ),
                  _buildSidebarItem(
                    context,
                    icon: Icons.person,
                    text: 'Edit Profile',
                    onClicked: () => selectedItem(context, 1)
                  ),
                  _buildSidebarItem(
                    context,
                    icon: Icons.attach_money,
                    text: 'Finance',
                    onClicked: () => selectedItem(context, 2)
                  ),
                  _buildSidebarItem(
                    context,
                    icon: Icons.settings,
                    text: 'Settings',
                    onClicked: () => selectedItem(context, 3)
                  ),
                  _buildSidebarItem(
                    context,
                    icon: Icons.help,
                    text: 'Help',
                    onClicked: () => selectedItem(context, 4)
                  ),
                  const Expanded(child: SizedBox()),
                  _buildSidebarItem(
                    context,
                    icon: Icons.logout,
                    text: 'Logout',
                    onClicked: () => selectedItem(context, 5)
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSidebarItem(BuildContext context, {required IconData icon, required String text, VoidCallback? onClicked}) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(30, 10, 10, 10),
      child: ListTile(
        leading: Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            color: Colors.grey.withOpacity(0.2),
            borderRadius: BorderRadius.circular(8.0),
          ),
          child: Icon(
            icon,
            size: 26,
            color: const Color.fromARGB(255, 78, 78, 78),
          ),
        ),
        title: Text(
          text,
          style: const TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        onTap: onClicked,
      
      ),
    );
  }


  
 void selectedItem(BuildContext context, int index) {

  switch (index) {
      case 0:
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => const HomePage()));
        break;
      case 1:
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => const ProfilePage()));
        break;
      case 2:
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => const FinancePage()));
        break;
      case 3:
       
        break;
      case 4:
    
        break;
      case 5:
        // Implement logout logic here
        break;
      default:
        break;
 }
}
}