import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:logger/logger.dart';
import '../components/my_button.dart';
import '../components/my_textfield.dart';
import '../services/auth_service.dart';

class ForgotPasswordPage extends StatefulWidget {
  @override
  _ForgotPasswordPageState createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final TextEditingController emailController = TextEditingController();
  final Logger _logger = Logger();
  final AuthService authService = AuthService('http://10.0.3.2:8080'); // Replace with your backend URL

  @override
  void dispose() {
    emailController.dispose();
    super.dispose();
  }

  Future<void> recoverPassword() async {
    final email = emailController.text;

    // Show a loading indicator
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return const Center(child: CircularProgressIndicator());
      },
    );

    try {

      if (!mounted) return; // Check if the widget is still mounted

      // Dismiss the loading indicator
      Navigator.of(context).pop();

      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Password recovery email sent.')),
      );

      Navigator.of(context).pop(); // Navigate back to the login page
    } catch (e) {
      _logger.e('Error during password recovery: $e');

      if (!mounted) return; // Check if the widget is still mounted

      // Dismiss the loading indicator
      Navigator.of(context).pop();

      // Show an error message
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('An error occurred during password recovery. Please try again later.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context);

    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/images/Background_image.png"),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Center(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.0.w),
              child: Container(
                padding: EdgeInsets.all(14.0.w),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 70, 70, 70).withOpacity(0.6),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.arrow_back, color: Colors.white),
                          onPressed: () {
                            Navigator.of(context).pop(); // Navigate back to the login page
                          },
                        ),
                      ],
                    ),
                    SizedBox(height: 0.03.sh),
                    const Text(
                      "Password Recovery",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 35,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 0.02.sh),
                    const Text(
                      "Enter your email address",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 20,
                        color: Colors.white,
                      ),
                    ),
                    SizedBox(height: 0.03.sh),
                    MyTextField(
                      controller: emailController,
                      hintText: "Email Address",
                      obscureText: false,
                      prefixIcon: Icons.email,
                    ),
                    SizedBox(height: 0.03.sh),
                    MyButton(
                      text: "Recover Password",
                      onTap: () => recoverPassword(),
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
