import 'package:delivery/auth/login_or_register.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:delivery/themes/theme_provider.dart'; // Ensure correct path to your theme provider

void main() {
  runApp(
    ChangeNotifierProvider<ThemeProvider>(
      create: (context) => ThemeProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home:  const LoginOrRegister(),// Correct syntax
      theme: Provider.of<ThemeProvider>(context).themeData,
    );
  }
}
