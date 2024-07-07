import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final bool obscureText;
  final IconData? prefixIcon;

  const MyTextField({
    super.key,
    required this.controller,
    required this.hintText,
    required this.obscureText,
    required this.prefixIcon,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 500, // Set the desired width here
        padding: const EdgeInsets.symmetric(horizontal: 25.0),
        child: TextField(
          controller: controller,
          obscureText: obscureText,
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white.withOpacity(0.2), // Transparent background
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(30), // Rounded borders
              borderSide: BorderSide(color: Theme.of(context).colorScheme.tertiary),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(30), // Rounded borders
              borderSide: BorderSide(color: Theme.of(context).colorScheme.primary),
            ),
            hintText: hintText,
            hintStyle: TextStyle(color: Theme.of(context).colorScheme.surface),
            prefixIcon: prefixIcon != null ? Icon(prefixIcon) : null,
          ),
          style: const TextStyle(color: Colors.white), // Text color
        ),
      ),
    );
  }
}
