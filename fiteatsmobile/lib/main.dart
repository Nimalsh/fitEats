import 'package:flutter/material.dart';
import 'screens/getstart.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'FIT eats',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: GetStartPage(),
    );
  }
}
