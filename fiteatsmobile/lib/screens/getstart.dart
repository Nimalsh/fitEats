import 'package:flutter/material.dart';

import 'user_login.dart';

class GetStartPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background image
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/image/food.jpg'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          // Overlay with content
          Container(
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.5), // Dark overlay
            ),
          ),
          // Main content
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Spacer(flex: 2),
              Text(
                'Fit Eats',
                style: TextStyle(
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32.0),
                child: Text(
                  'Welcome to Fit Eats, your go-to app for personalized meal planning and nutrition tracking. Start your journey towards a healthier lifestyle with us!',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.white,
                  ),
                ),
              ),
              Spacer(flex: 3),
              ElevatedButton(
               onPressed: () {
        Navigator.push(
               context,
            MaterialPageRoute(builder: (context) => LoginPage()),
            );
             },

                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green, // Button color
                  padding: EdgeInsets.symmetric(horizontal: 64.0, vertical: 16.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                ),
                child: Text(
                  'Get Started',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
              ),
              Spacer(flex: 2),
            ],
          ),
        ],
      ),
    );
  }
}
