// lib/pages/register_next.dart

import 'package:delivery/components/my_button.dart';
import 'package:flutter/material.dart';
import 'package:logger/logger.dart';
import '../components/my_textfield.dart';
import '../services/auth_service.dart';

class RegisterDetailsPage extends StatefulWidget {
  final void Function() onBack;
  final void Function() onNext;
  final Map<String, String> userData;
  final AuthService authService;

  const RegisterDetailsPage({
    super.key,
    required this.onBack,
    required this.onNext,
    required this.userData,
    required this.authService,
  });

  @override
  State<RegisterDetailsPage> createState() => _RegisterDetailsPageState();
}

class _RegisterDetailsPageState extends State<RegisterDetailsPage> {
  final TextEditingController nationalIdController = TextEditingController();
  final TextEditingController vehicleNameController = TextEditingController();
  final TextEditingController vehicleModelController = TextEditingController();
  final TextEditingController plateNumberController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final Logger _logger = Logger();

  void registerDriver() {
    widget.userData['nationalId'] = nationalIdController.text;
    widget.userData['vehicleName'] = vehicleNameController.text;
    widget.userData['vehicleModel'] = vehicleModelController.text;
    widget.userData['plateNumber'] = plateNumberController.text;
    widget.userData['password'] = passwordController.text;

     _logger.d("Password before sending to auth service: ${widget.userData['password']}");

    widget.authService.registerUser(widget.userData).then((_) {
      // Handle success (e.g., navigate to another page or show a success message)
      _logger.i('User Registered successfully');
      widget.onNext(); // Proceed to the next action
    }).catchError((error) {
      // Handle error (e.g., show an error message)
      _logger.e('Failed to register user: $error');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to register user: $error')),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              "assets/images/Background_image.png",
              fit: BoxFit.cover,
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                padding: const EdgeInsets.fromLTRB(24.0, 40.0, 0, 0),
                child: IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: widget.onBack,
                  iconSize: 32,
                ),
              ),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(24.0, 16.0, 24.0, 24.0),
                  child: Container(
                    padding: const EdgeInsets.all(24.0),
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 70, 70, 70).withOpacity(0.6),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const SizedBox(height: 25),
                        MyTextField(
                          controller: nationalIdController,
                          hintText: 'National ID',
                          obscureText: false,
                          prefixIcon: Icons.perm_identity,
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: vehicleNameController,
                          hintText: 'Vehicle Name',
                          obscureText: false,
                          prefixIcon: Icons.directions_car,
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: vehicleModelController,
                          hintText: 'Vehicle Model',
                          obscureText: false,
                          prefixIcon: Icons.car_rental,
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: plateNumberController,
                          hintText: 'Plate Number',
                          obscureText: false,
                          prefixIcon: Icons.confirmation_number,
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: passwordController,
                          hintText: 'Password',
                          obscureText: true,
                          prefixIcon: Icons.lock,
                        ),
                        const SizedBox(height: 16.0),
                        MyTextField(
                          controller: confirmPasswordController,
                          hintText: 'Confirm Password',
                          obscureText: true,
                          prefixIcon: Icons.lock,
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton(
                          onPressed: () {
                            // Add your upload image logic here
                          },
                          child: const Text("Upload License Image"),
                        ),
                        const SizedBox(height: 24),
                        MyButton(
                          text: "Register",
                          onTap: registerDriver, // Register the driver here
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
