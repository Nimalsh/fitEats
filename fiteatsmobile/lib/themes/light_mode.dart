import 'package:flutter/material.dart';

final ThemeData lightMode = ThemeData(
  fontFamily: 'Poppins', // Set your desired font family
  brightness: Brightness.light,
  colorScheme: ColorScheme.light(
    surface: Colors.grey.shade300,
    primary: Colors.grey.shade500,
    secondary: Colors.grey.shade100,
    tertiary: Colors.white,
    inversePrimary: Colors.grey.shade700,
  ),
  textTheme: const TextTheme(
    bodyLarge: TextStyle(fontFamily: 'Poppins'),
    bodyMedium: TextStyle(fontFamily: 'Poppins'),
    displayLarge: TextStyle(fontFamily: 'Poppins'),
    displayMedium: TextStyle(fontFamily: 'Poppins'),
    displaySmall: TextStyle(fontFamily: 'Poppins'),
    headlineMedium: TextStyle(fontFamily: 'Poppins'),
    headlineSmall: TextStyle(fontFamily: 'Poppins'),
    titleLarge: TextStyle(fontFamily: 'Poppins'),
    titleMedium: TextStyle(fontFamily: 'Poppins'),
    titleSmall: TextStyle(fontFamily: 'Poppins'),
    bodySmall: TextStyle(fontFamily: 'Poppins'),
    labelLarge: TextStyle(fontFamily: 'Poppins'),
    labelSmall: TextStyle(fontFamily: 'Poppins'),
  ),
);
