import 'package:flutter/material.dart';

class Sidebar extends StatelessWidget {
  final bool isSidebarOpen;
  final Function() toggleSidebar;

  const Sidebar({
    required this.isSidebarOpen,
    required this.toggleSidebar,
    Key? key,
  }) : super(key: key);

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
          // Dark overlay when sidebar is open
          if (isSidebarOpen)
            GestureDetector(
              onTap: toggleSidebar,
              child: Container(
                color: Colors.black.withOpacity(0.5),
                width: sidebarWidth,
                height: MediaQuery.of(context).size.height,
              ),
            ),
          // Sidebar content
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
                            // Close button container
                            Container(
                              width: 40,
                              height: 40,
                              decoration: BoxDecoration(
                                color: Color.fromARGB(255, 92, 92, 92).withOpacity(0.3),
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
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            "John Doe",
                            style: const TextStyle(
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
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 10, 10),
                    child: ListTile(
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
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 10, 10),
                    child: ListTile(
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
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 10, 10),
                    child: ListTile(
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
                        toggleSidebar(); // Close sidebar
                        // Additional logic for item 3
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 10, 10),
                    child: ListTile(
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
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 10, 10),
                    child: ListTile(
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
                  ),
                  // Logout button
                  const Expanded(child: SizedBox()),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(30, 10, 10, 50),
                    child: ListTile(
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
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
