import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final bool obscureText;

  const MyTextField({
    Key? key,
    required this.controller,
    required this.hintText,
    required this.obscureText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        hintText: hintText,
        filled: true,
        fillColor: Colors.white.withOpacity(0.2), // Transparent background
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16), // Rounded borders
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16), // Rounded borders
          borderSide: BorderSide(color: Colors.white.withOpacity(0.5)), // Border color
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16), // Rounded borders
          borderSide: BorderSide(color: Theme.of(context).colorScheme.primary), // Focused border color
        ),
        hintStyle: TextStyle(color: Colors.white.withOpacity(0.8)),
      ),
      style: TextStyle(color: Colors.white),
    );
  }
}
