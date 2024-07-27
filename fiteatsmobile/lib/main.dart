import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:delivery/auth/login_or_register.dart';
import 'package:delivery/themes/theme_provider.dart';
import 'package:delivery/services/auth_service.dart';

void main() {
  final authService = AuthService('http://10.0.3.2:8080'); // Update with your actual local IP address

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider<ThemeProvider>(
          create: (context) => ThemeProvider(),
        ),
        Provider<AuthService>.value(value: authService),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: Provider.of<ThemeProvider>(context).themeData,
      home: const LoginOrRegister(),
    );
  }
}
