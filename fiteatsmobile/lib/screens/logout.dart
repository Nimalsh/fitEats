import 'package:flutter/material.dart';

class LogoutPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Logout'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            _showLogoutDialog(context);
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Color.fromARGB(255, 54, 244, 82),
            padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
            textStyle: TextStyle(fontSize: 18),
          ),
          child: Text('Log Out'),
        ),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirm Logout'),
          content: Text('Are you sure you want to log out?'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
                _logout(context);
              },
              child: Text('Log Out'),
            ),
          ],
        );
      },
    );
  }

  void _logout(BuildContext context) {
    // Implement your logout logic here, e.g., clearing user session data, etc.
    // For demonstration, we'll just navigate to a login screen or home screen.

    // Example: Navigating to the login screen after logout
    Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
  }
}
