import 'package:fiteatsmobile/screens/Favourite.dart';
import 'package:fiteatsmobile/screens/complaint.dart';
import 'package:fiteatsmobile/screens/offers.dart';
import 'package:fiteatsmobile/screens/payments.dart';
import 'package:flutter/material.dart';

import 'logout.dart';
import 'nutrigoals.dart';
import 'restaurant.dart';

class MenuDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.greenAccent,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundImage: AssetImage('assets/image/profile.jpg'), // Replace with your profile image path
                ),
                SizedBox(height: 10),
                Text(
                  'tharika', // Replace with dynamic user name if needed
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  'tharika123@gmail.com', // Replace with dynamic user email if needed
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),

          ListTile(
            leading: Icon(Icons.food_bank),
            title: Text('Payments'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => PaymentPage()));
            },
          ),
          ListTile(
            leading: Icon(Icons.food_bank),
            title: Text('Offers'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => OffersPage()));
            },
          ),
          ListTile(
            leading: Icon(Icons.food_bank),
            title: Text('Complains'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => ComplaintPage()));
            },
          ),
          
          ListTile(
            leading: Icon(Icons.food_bank),
            title: Text('Nutrigoals'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => NutriGoals()));
            },
          ),
          ListTile(
            leading: Icon(Icons.restaurant),
            title: Text('Restaurant'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => RestaurantPage()));
            },

          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Favourite'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => FavouritePage()));
            },
          ),

          
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Setings'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => SettingsPage()));
            },
          ),

          ListTile(
            leading: Icon(Icons.logout),
            title: Text('Log out'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => LogoutPage()));
            },
          ),
          
        ],
      ),
    );
  }
}

// Placeholder pages for navigation
class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: Center(child: Text('Settings Page')),
    );
  }
}
