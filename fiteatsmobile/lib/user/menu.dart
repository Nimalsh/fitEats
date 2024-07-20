// menu.dart
import 'package:flutter/material.dart';

import 'food_ordering.dart';
import 'resfavourite.dart';


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
            child: Text(
              'Menu',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Settings'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context, MaterialPageRoute(builder: (context) => SettingsPage()));
            },
          ),
          ListTile(
            leading: Icon(Icons.brightness_6),
            title: Text('Dark Mode'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              // Implement dark mode toggle logic here
            },
          ),
          ListTile(
            leading: Icon(Icons.restaurant),
            title: Text('Restaurant'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context, MaterialPageRoute(builder: (context) => RestaurantPage()));
            },
          ),
          ListTile(
            leading: Icon(Icons.local_dining),
            title: Text('Food Ordering'),
            onTap: () {
              Navigator.pop(context); // Close the drawer
              Navigator.push(context, MaterialPageRoute(builder: (context) => FoodOrderingPage()));
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

// class FoodOrderingPage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: Text('Food Ordering')),
//       body: Center(child: Text('Food Ordering Page')),
//     );
//   }
// }

// class RestaurantPage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: Text('Restaurant')),
//       body: Center(child: Text('Restaurant Page')),
//     );
//   }
// }
