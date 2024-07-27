import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:delivery/components/bottom_nav_bar.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:delivery/pages/order.dart';

class ProfilePage extends StatefulWidget {
  final int userId;

  const ProfilePage({super.key, required this.userId});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  int _selectedIndex = 3;
  bool _isEditingPersonalDetails = false;
  bool _isEditingVehicleDetails = false;

  Map<String, String> _personalDetails = {};
  Map<String, String> _vehicleDetails = {};

  @override
  void initState() {
    super.initState();
    _fetchUserData();
  }

  Future<void> _fetchUserData() async {
    final response = await http.get(Uri.parse('http://10.0.3.2:8080/api/drivers/${widget.userId}'));
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      setState(() {
        _personalDetails = {
          'Full Name': data['fullName'] ?? 'N/A',
          'Address': data['address'] ?? 'N/A',
          'Phone Number': data['telephoneNumber'] ?? 'N/A',
          'NIC': data['nationalId'] ?? 'N/A',
          'Gender': data['gender'] ?? 'N/A',
          'Email': data['email'] ?? 'N/A',
        };
        _vehicleDetails = {
          'Vehicle Name': data['vehicleName'] ?? 'N/A',
          'Model': data['vehicleModel'] ?? 'N/A',
          'Plate Number': data['plateNumber'] ?? 'N/A',
        };
      });
    } else {
      print('Failed to load user data');
    }
  }
Future<void> _updateUserDetails() async {
  // Fetch current user data to compare changes
  final response = await http.get(Uri.parse('http://10.0.3.2:8080/api/drivers/${widget.userId}'));
  if (response.statusCode != 200) {
    print('Failed to fetch current user data');
    return;
  }

  final currentData = jsonDecode(response.body);

  // Prepare updated details based on the current data and changes
  final updatedDetails = {
    if (_personalDetails['Full Name'] != currentData['fullName']) 'fullName': _personalDetails['Full Name']!,
    if (_personalDetails['Address'] != currentData['address']) 'address': _personalDetails['Address']!,
    if (_personalDetails['Phone Number'] != currentData['telephoneNumber']) 'telephoneNumber': _personalDetails['Phone Number']!,
    if (_personalDetails['NIC'] != currentData['nationalId']) 'nationalId': _personalDetails['NIC']!,
    if (_personalDetails['Email'] != currentData['email']) 'email': _personalDetails['Email']!,
    if (_personalDetails['Gender'] != currentData['gender']) 'gender': _personalDetails['Gender']!,
    if (_vehicleDetails['Vehicle Name'] != currentData['vehicleName']) 'vehicleName': _vehicleDetails['Vehicle Name']!,
    if (_vehicleDetails['Model'] != currentData['vehicleModel']) 'vehicleModel': _vehicleDetails['Model']!,
    if (_vehicleDetails['Plate Number'] != currentData['plateNumber']) 'plateNumber': _vehicleDetails['Plate Number']!,
  };

  // Make PUT request only if there are changes
  if (updatedDetails.isNotEmpty) {
    final updateResponse = await http.put(
      Uri.parse('http://10.0.3.2:8080/api/drivers/${widget.userId}'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(updatedDetails),
    );

    if (updateResponse.statusCode == 200) {
      print('User details updated successfully');
      _fetchUserData(); // Refresh user data
    } else {
      print('Failed to update user details');
    }
  } else {
    print('No changes detected, update skipped');
  }
}


  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });

    switch (index) {
      case 0:
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => HomePage(userId: widget.userId),
          ),
        );
        break;
      case 1:
        break;
      case 2:
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => OrderHistoryPage(userId: widget.userId)),
        );
        break;
      case 3:
        break;
      default:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 236, 236),
      appBar: AppBar(
        automaticallyImplyLeading: false,
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
      body: _personalDetails.isEmpty ? const Center(child: CircularProgressIndicator()) : Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Background_image.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
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
                                backgroundImage: AssetImage('assets/images/profile_picture.png'),
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
                                  },
                                  color: const Color.fromARGB(255, 0, 0, 0).withOpacity(0.7),
                                  iconSize: 25,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          Text(
                            _personalDetails['Full Name'] ?? 'N/A',
                            style: const TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            _personalDetails['Email'] ?? 'N/A',
                            style: const TextStyle(
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
                            if (_isEditingPersonalDetails) {
                              _updateUserDetails();
                            }
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
                            if (_isEditingVehicleDetails) {
                              _updateUserDetails();
                            }
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
      children: _personalDetails.entries.map((entry) => _buildDetailRow(entry.key, entry.value)).toList(),
    );
  }

  Widget _buildVehicleDetailsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: _vehicleDetails.entries.map((entry) => _buildDetailRow(entry.key, entry.value)).toList(),
    );
  }

  Widget _buildEditablePersonalDetailsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: _personalDetails.entries.map((entry) => _buildEditableDetailRow(entry.key, entry.value)).toList(),
    );
  }

  Widget _buildEditableVehicleDetailsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: _vehicleDetails.entries.map((entry) => _buildEditableDetailRow(entry.key, entry.value)).toList(),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '$label: ',
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                fontFamily: 'Poppins',
                fontSize: 16,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEditableDetailRow(String label, String value) {
    final isEditable = label != 'NIC' && label != 'Email';

    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '$label: ',
            style: const TextStyle(
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          Expanded(
            child: isEditable
                ? TextField(
                    decoration: InputDecoration(
                      hintText: value,
                    ),
                    onChanged: (newValue) {
                      setState(() {
                        if (_personalDetails.containsKey(label)) {
                          _personalDetails[label] = newValue;
                        } else {
                          _vehicleDetails[label] = newValue;
                        }
                      });
                    },
                  )
                : Text(
                    value,
                    style: const TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 16,
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
