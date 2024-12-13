import 'package:flutter/material.dart';
import '../models/userdetails.dart';
import '../services/userservices.dart';

class MyProfilePage extends StatefulWidget {
  final String jwt; // Pass JWT token from the parent widget or context

  MyProfilePage({required this.jwt, required String jwtToken});

  @override
  _MyProfilePageState createState() => _MyProfilePageState();
}

class _MyProfilePageState extends State<MyProfilePage> {
  late Future<UserDetails> _userDetails;

  @override
  void initState() {
    super.initState();
    _userDetails = UserService().fetchUserDetails(widget.jwt);
  }

  Widget _buildProfileDetail(String title, String detail) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 2,
            child: Text(
              title,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
          ),
          Expanded(
            flex: 3,
            child: Text(
              detail,
              style: TextStyle(
                fontSize: 16,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Profile'),
      ),
      body: FutureBuilder<UserDetails>(
        future: _userDetails,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final user = snapshot.data!;
            return SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: CircleAvatar(
                      radius: 50,
                      backgroundImage: AssetImage('assets/image/profile.jpg'),
                    ),
                  ),
                  SizedBox(height: 16),
                  _buildProfileDetail('Username', user.username),
                  _buildProfileDetail('Age', user.age.toString()),
                  _buildProfileDetail('Gender', user.gender),
                  _buildProfileDetail('Height', '${user.height} cm'),
                  _buildProfileDetail('Current Weight', '${user.currentWeight} kg'),
                  _buildProfileDetail('BMI', user.bmi.toStringAsFixed(1)),
                  _buildProfileDetail('Activity Level', user.activityLevel),
                  _buildProfileDetail('Dietary Preferences', user.dietaryPreferences),
                  _buildProfileDetail('Dietary Restrictions', user.dietaryRestrictions),
                  _buildProfileDetail('Specials', user.specials),
                ],
              ),
            );
          } else {
            return Center(child: Text('No data found.'));
          }
        },
      ),
    );
  }
}
