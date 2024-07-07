import 'package:delivery/pages/register_next.dart';
import 'package:flutter/material.dart';
import '../components/my_button.dart';
import '../components/my_textfield.dart';
import '../components/custom_dropdown.dart'; // Import the custom dropdown

class RegisterPage extends StatefulWidget {
  final void Function()? onTap;

  const RegisterPage({
    Key? key,
    required this.onTap,
  }) : super(key: key);

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final TextEditingController fullNameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController telephoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  String? selectedGender;

  void navigateToRegisterDetailsPage() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => RegisterDetailsPage(
          onBack: () {
            Navigator.pop(context); // Navigate back to RegisterPage
          },
          onNext: () {
            // Handle onNext logic if needed
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              "assets/images/Background_image.png",
              fit: BoxFit.cover,
            ),
          ),
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Container(
                padding: const EdgeInsets.all(24.0),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 70, 70, 70).withOpacity(0.6),
                  borderRadius: BorderRadius.circular(16),
                ),
                constraints: BoxConstraints(
                  minHeight: MediaQuery.of(context).size.height * 0.7,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Image.asset(
                      "assets/images/logo.jpg",
                      width: 100,
                      height: 100,
                    ),
                    const SizedBox(height: 25),
                    Text(
                      "Let's Create an Account",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 16,
                        color: Theme.of(context).colorScheme.surface,
                      ),
                    ),
                    const SizedBox(height: 25),
                    MyTextField(
                      controller: fullNameController,
                      hintText: "Full Name",
                      obscureText: false,
                      prefixIcon: Icons.person,
                    ),
                    const SizedBox(height: 16),
                    MyTextField(
                      controller: emailController,
                      hintText: "Email",
                      obscureText: false,
                      prefixIcon: Icons.email,
                    ),
                    const SizedBox(height: 16),
                    MyTextField(
                      controller: addressController,
                      hintText: "Address",
                      obscureText: false,
                      prefixIcon: Icons.home,
                    ),
                    const SizedBox(height: 16),
                    MyTextField(
                      controller: telephoneController,
                      hintText: "Telephone Number",
                      obscureText: false,
                      prefixIcon: Icons.phone,
                    ),
                    const SizedBox(height: 16),
                    CustomDropdown(
                      value: selectedGender,
                      items: const ['Male', 'Female'],
                      icon: Icons.person,
                      hintText: "Gender",
                      onChanged: (newValue) {
                        setState(() {
                          selectedGender = newValue;
                        });
                      },
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () {
                        // Add your upload image logic here
                      },
                      child: const Text("Upload Image"),
                    ),
                    const SizedBox(height: 24),
                    MyButton(
                      text: "Next",
                      onTap: navigateToRegisterDetailsPage, // Call the method here
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Already have an account?",
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.surface,
                          ),
                        ),
                        const SizedBox(width: 4),
                        GestureDetector(
                          onTap: widget.onTap,
                          child: Text(
                            "Login now",
                            style: TextStyle(
                              color: Theme.of(context).colorScheme.surface,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
