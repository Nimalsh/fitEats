import 'package:fiteatsmobile/user/user_login.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter/material.dart';

void main() =>runApp(
      DevicePreview(
        builder: (context) => MyApp(), // Wrap your app
      ),
    );
 
class MyApp extends StatelessWidget {
  

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'FIT eats',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginPage(),
    );
  }
}
