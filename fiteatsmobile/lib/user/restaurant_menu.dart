// restaurant_menu.dart
import 'package:flutter/material.dart';

class RestaurantMenuPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Restaurant Menu'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            // Add menu items here
            ListTile(
              leading: Icon(Icons.fastfood),
              title: Text('Menu Item 1'),
              subtitle: Text('Description of menu item 1'),
            ),
            ListTile(
              leading: Icon(Icons.fastfood),
              title: Text('Menu Item 2'),
              subtitle: Text('Description of menu item 2'),
            ),
            ListTile(
              leading: Icon(Icons.fastfood),
              title: Text('Menu Item 3'),
              subtitle: Text('Description of menu item 3'),
            ),
            // Add more menu items as needed
          ],
        ),
      ),
    );
  }
}
