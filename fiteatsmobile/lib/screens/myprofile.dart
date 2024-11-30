import 'package:flutter/material.dart';

class MyProfilePage extends StatelessWidget {
  final Map<String, dynamic> profileDetails = {
    'subscription': 'Premium',
    'age': 28,
    'gender': 'Female',
    'height': '5\'6" (167 cm)',
    'weight_loss': '5 kg',
    'goal': 'Weight Loss',
    'duration': '8 weeks',
    'deadline': '2023-12-31',
    'activity_level': 'Moderately active',
    'dietary_preference': ['Vegetarian', 'Low Carb'],
    'meals_per_day': 3,
  };

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
      body:SingleChildScrollView(
      
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
            _buildProfileDetail('Subscription', profileDetails['subscription']),
            _buildProfileDetail('Age', profileDetails['age'].toString()),
            _buildProfileDetail('Gender', profileDetails['gender']),
            _buildProfileDetail('Height', profileDetails['height']),
            _buildProfileDetail('Weight Loss', profileDetails['weight_loss']),
            _buildProfileDetail('Goal', profileDetails['goal']),
            _buildProfileDetail('Duration', profileDetails['duration']),
            _buildProfileDetail('Deadline', profileDetails['deadline']),
            _buildProfileDetail('Activity Level', profileDetails['activity_level']),
            _buildProfileDetail(
              'Dietary Preference',
              profileDetails['dietary_preference'].join(', '),
            ),
            _buildProfileDetail(
              'Number of Meals per Day',
              profileDetails['meals_per_day'].toString(),
            ),
          ],
        
      ),
      ),
    );
  }
}
