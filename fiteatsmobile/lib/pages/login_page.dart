import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:logger/logger.dart';
import '../components/my_button.dart';
import '../components/my_textfield.dart';
import 'homepage.dart';
import '../services/auth_service.dart';

class LoginPage extends StatefulWidget {
  final void Function() onTap;

  const LoginPage({super.key, required this.onTap});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final Logger _logger = Logger();
  final AuthService authService = AuthService('http://10.0.3.2:8080'); // Replace with your backend URL

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  Future<void> login() async {
    final email = emailController.text;
    final password = passwordController.text;

    // Show a loading indicator
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return const Center(child: CircularProgressIndicator());
      },
    );

    try {
      final userId = await authService.loginUser(email, password);

      if (!mounted) return; // Check if the widget is still mounted

      // Dismiss the loading indicator
      Navigator.of(context).pop();

      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => HomePage(userId: userId)),
      );
    } catch (e) {
      _logger.e('Error during login: $e');

      if (!mounted) return; // Check if the widget is still mounted

      // Dismiss the loading indicator
      Navigator.of(context).pop();

      // Show an error message
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('An error occurred during login. Please try again later.')),
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
              padding:  EdgeInsets.symmetric(horizontal: 24.0.w),
              child: Container(
                padding:  EdgeInsets.all(12.0.w),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 70, 70, 70).withOpacity(0.6),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
              
                     SizedBox(height: 0.03.sh),
                    const Text(
                      "FitEats",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 40,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      "Driver",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 25,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                     SizedBox(height: 0.03.sh),
                    MyTextField(
                      controller: emailController,
                      hintText: "Email",
                      obscureText: false,
                      prefixIcon: Icons.email,
                    ),
                     SizedBox(height: 0.02.sh),
                    MyTextField(
                      controller: passwordController,
                      hintText: "Password",
                      obscureText: true,
                      prefixIcon: Icons.lock,
                    ),
                    const SizedBox(height: 25),
                    GestureDetector(
                      onTap: () {
                        // Implement your forgot password logic here
                      },
                      child: Padding(
                        padding:  EdgeInsets.only(left: 90.0.w),
                        child: Text(
                          "Forgot Password?",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 16,
                            color: Theme.of(context).colorScheme.surface,
                          ),
                        ),
                      ),
                    ),
                     SizedBox(height: 0.03.sh),
                    MyButton(
                      text: "Sign In",
                      onTap: () => login(),
                    ),
                     SizedBox(height: 0.02.sh),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Not a Member?",
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.surface,
                          ),
                        ),
                         SizedBox(width: 0.01.sw),
                        GestureDetector(
                          onTap: widget.onTap, // Invoke the onTap callback
                          child: Text(
                            "Register now",
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
