import 'package:flutter/material.dart';
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:delivery/pages/order.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  int _selectedIndex = 3;
  bool _isEditingPersonalDetails = false;
  bool _isEditingVehicleDetails = false;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });

    switch (index) {
      case 0:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const HomePage()),
        );
        break;
      case 1:
        // Handle another page navigation
        break;
      case 2:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const OrderHistoryPage()),
        );
        break;
      case 3:
        // Handle current page or default action
        break;
      default:
        // Handle default navigation or action
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: AppBar(
        automaticallyImplyLeading: false, // Remove the back button
        backgroundColor: const Color.fromARGB(255, 251, 251, 251),
        elevation: 5,
        title: const Text(
          "Profile",
          style: TextStyle(
            color: Color.fromARGB(255, 3, 3, 3),
            fontFamily: 'Poppins',
            fontWeight: FontWeight.bold,
            fontSize: 24,
          ),
        ),
      ),
      body: Stack(
        children: [
          // Background image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Background_image.png'), // Replace with your background image path
                fit: BoxFit.cover,
              ),
            ),
          ),
          // White container with some transparency to show the background image
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: SingleChildScrollView(
              child: Container(
                padding: const EdgeInsets.all(20.0),
                color: Colors.white.withOpacity(0.9),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Stack(
                            children: [
                              const CircleAvatar(
                                radius: 50,
                                backgroundImage: AssetImage('assets/images/profile_picture.png'), // Replace with your profile image path
                              ),
                              Positioned(
                                bottom: 0,
                                right: 0,
                                child: IconButton(
                                  icon: const Icon(
                                    Icons.edit,
                                    color: Colors.white,
                                  ),
                                  onPressed: () {
                                    // Add your edit button logic here
                                  },
                                  color: const Color.fromARGB(255, 0, 0, 0).withOpacity(0.7),
                                  iconSize: 25,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          const Text(
                            'John Doe', // Replace with user's name
                            style: TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 10),
                          const Text(
                            'john.doe@example.com', // Replace with user's email
                            style: TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 16,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Divider(thickness: 1),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Personal Details',
                          style: TextStyle(
                            fontFamily: 'Poppins',
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        IconButton(
                          icon: Icon(_isEditingPersonalDetails ? Icons.check : Icons.edit),
                          onPressed: () {
                            setState(() {
                              _isEditingPersonalDetails = !_isEditingPersonalDetails;
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    _isEditingPersonalDetails ? _buildEditablePersonalDetailsSection() : _buildPersonalDetailsSection(),
                    const SizedBox(height: 20),
                    Align(
                      alignment: Alignment.centerRight,
                      child: ElevatedButton(
                        onPressed: () {
                          // Add your change password logic here
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color.fromARGB(255, 20, 193, 49),
                        ),
                        child: const Text(
                          'Change Password',
                          style: TextStyle(
                            fontFamily: 'Poppins',
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Divider(thickness: 1),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Vehicle Details',
                          style: TextStyle(
                            fontFamily: 'Poppins',
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        IconButton(
                          icon: Icon(_isEditingVehicleDetails ? Icons.check : Icons.edit),
                          onPressed: () {
                            setState(() {
                              _isEditingVehicleDetails = !_isEditingVehicleDetails;
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    _isEditingVehicleDetails ? _buildEditableVehicleDetailsSection() : _buildVehicleDetailsSection(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavBar(
        selectedIndex: _selectedIndex,
        currentIndex: _selectedIndex,
        onItemTapped: _onItemTapped,
      ),
    );
  }

  Widget _buildPersonalDetailsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildDetailRow('First Name', 'John'),
        _buildDetailRow('Last Name', 'Doe'),
        _buildDetailRow('Address', '123 Main St'),
        _buildDetailRow('NIC', '123456789V'),
        _buildDetailRow('Phone Number', '123-456-7890'),
        _buildDetailRow('Phone Number 2', '098-765-4321'),
      ],
    );
  }

  Widget _buildVehicleDetailsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildDetailRow('Vehicle Name', 'Toyota Prius'),
        _buildDetailRow('Model', '2015'),
        _buildDetailRow('Plate Number', 'ABC-1234'),
      ],
    );
  }

  Widget _buildEditablePersonalDetailsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildDetailRow('First Name', 'John'),
        _buildDetailRow('Last Name', 'Doe'),
        _buildEditableDetailRow('Address', '123 Main St'),
        _buildDetailRow('NIC', '123456789V'),
        _buildEditableDetailRow('Phone Number', '123-456-7890'),
        _buildEditableDetailRow('Phone Number 2', '098-765-4321'),
      ],
    );
  }

  Widget _buildEditableVehicleDetailsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildEditableDetailRow('Vehicle Name', 'Toyota Prius'),
        _buildEditableDetailRow('Model', '2015'),
        _buildEditableDetailRow('Plate Number', 'ABC-1234'),
      ],
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
          Text(
            value,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEditableDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
            ),
          ),
          SizedBox(
            width: 200,
            child: TextField(
              decoration: InputDecoration(
                hintText: value,
                hintStyle: const TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 16,
                ),
                border: const UnderlineInputBorder(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
