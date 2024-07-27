import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:delivery/auth/login_or_register.dart';
import 'package:delivery/themes/theme_provider.dart';
import 'package:delivery/services/auth_service.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:device_preview/device_preview.dart';


void main() {
  final authService = AuthService('http://10.0.3.2:8080'); // Update with your actual local IP address

  runApp(   
     DevicePreview(
      enabled: true,
   builder: (context) => ScreenUtilInit(
      designSize: const Size(360, 690),
      builder: (context, child) {
        return MultiProvider(
          providers: [
            ChangeNotifierProvider<ThemeProvider>(
              create: (context) => ThemeProvider(),
            ),
            Provider<AuthService>.value(value: authService),
          ],
          child: child,
        );
      },
      child: const MyApp(), // Provide MyApp as child
    ),
     ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      locale: DevicePreview.locale(context), // Add the locale from DevicePreview
      builder: DevicePreview.appBuilder, 
      theme: Provider.of<ThemeProvider>(context).themeData,
      home: const LoginOrRegister(),
    );
  }
}
