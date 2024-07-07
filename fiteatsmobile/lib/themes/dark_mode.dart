import 'package:flutter/material.dart';


final ThemeData darkMode = ThemeData(
   fontFamily: 'Poppins',
  colorScheme: ColorScheme.dark(
    surface: const Color.fromARGB(255, 20, 20, 20),
    primary: const Color.fromARGB(255, 122, 122, 122),
    secondary: const Color.fromARGB(255, 30, 30, 30),
    tertiary: const Color.fromARGB(255, 47, 47, 47),
    inversePrimary: Colors.grey.shade300,
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
