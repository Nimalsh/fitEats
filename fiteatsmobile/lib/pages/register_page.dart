// lib/pages/register_page.dart

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import '../components/my_button.dart';
import '../components/my_textfield.dart';
import '../components/custom_dropdown.dart';
import '../services/auth_service.dart';
import '../utils/file_utils.dart'; // Import the utility file
import 'register_next.dart';

class RegisterPage extends StatefulWidget {
  final void Function()? onTap;

  const RegisterPage({
    super.key,
    required this.onTap,
  });

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
  final AuthService authService = AuthService('http://10.0.3.2:8080'); // Update with your actual URL

  final ImagePicker _picker = ImagePicker();
  File? _image;

  Future<void> _pickImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      final savedImagePath = await saveImagePermanently(pickedFile.path);
      setState(() {
        _image = File(savedImagePath);
      });
    }
  }

  String? selectedGender;

  void navigateToRegisterDetailsPage() {
    final Map<String, String> userData = {
      'fullName': fullNameController.text,
      'email': emailController.text,
      'address': addressController.text,
      'telephoneNumber': telephoneController.text,
      'gender': selectedGender ?? '',
    };

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
          userData: userData, // Pass user data to the next page
          authService: authService, // Pass the AuthService instance to the next page
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
     ScreenUtil.init(context);


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
              padding:  EdgeInsets.symmetric(horizontal: 20.0.w),
              child: Container(
                padding:  EdgeInsets.all(20.0.w),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 70, 70, 70).withOpacity(0.6),
                  borderRadius: BorderRadius.circular(16.0.r),
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
                     SizedBox(height: 0.03.sh),
                    Text(
                      "Let's Create an Account",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 16,
                        color: Theme.of(context).colorScheme.surface,
                      ),
                    ),
                     SizedBox(height: 0.03.sh),
                    MyTextField(
                      controller: fullNameController,
                      hintText: "Full Name",
                      obscureText: false,
                      prefixIcon: Icons.person,
                    ),
                     SizedBox(height: 0.02.sh),
                    MyTextField(
                      controller: emailController,
                      hintText: "Email",
                      obscureText: false,
                      prefixIcon: Icons.email,
                    ),
                     SizedBox(height: 0.02.sh),
                    MyTextField(
                      controller: addressController,
                      hintText: "Address",
                      obscureText: false,
                      prefixIcon: Icons.home,
                    ),
                     SizedBox(height: 0.02.sh),
                    MyTextField(
                      controller: telephoneController,
                      hintText: "Telephone Number",
                      obscureText: false,
                      prefixIcon: Icons.phone,
                    ),
                     SizedBox(height: 0.02.sh),
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
                     SizedBox(height: 0.03.sh),
                    ElevatedButton(
                      onPressed: _pickImage,
                      child: const Text("Upload Image"),
                    ),
                     SizedBox(height: 0.03.sh),
                    if (_image != null)
                      Image.file(
                        _image!,
                        height: 50.0.h,
                      ),
                    MyButton(
                      text: "Next",
                      onTap: navigateToRegisterDetailsPage,
                    ),
                     SizedBox(height: 0.02.sh),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Already have an account?",
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.surface,
                          ),
                        ),
                         SizedBox(width: 0.01.sw),
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
