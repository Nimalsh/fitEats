import 'package:delivery/components/sidebar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:delivery/auth/login_or_register.dart';
import 'package:delivery/pages/homepage.dart';
import 'package:delivery/pages/profile.dart';
import 'package:delivery/pages/finance.dart';
import 'package:delivery/themes/theme_provider.dart'; 

void main() {
  runApp(
    ChangeNotifierProvider<ThemeProvider>(
      create: (context) => ThemeProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: Provider.of<ThemeProvider>(context).themeData,
      home: const LoginOrRegister(),
      routes: {
        '/home': (context) => const HomePage(),
        '/edit_profile': (context) => const ProfilePage(),
        '/finance': (context) => const FinancePage(),
        '/settings': (context) => const PlaceholderPage(pageName: 'Settings'),
        '/help': (context) => const PlaceholderPage(pageName: 'Help'),
        '/main': (context) => const MainScreen(),
      },
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  bool _isSidebarOpen = false;

  void _toggleSidebar() {
    setState(() {
      _isSidebarOpen = !_isSidebarOpen;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Navigator(
            onGenerateRoute: (settings) {
              Widget page;
              switch (settings.name) {
                case '/home':
                  page = const HomePage();
                  break;
                case '/edit_profile':
                  page = const ProfilePage();
                  break;
                case '/finance':
                  page = const FinancePage();
                  break;
                case '/settings':
                  page = const PlaceholderPage(pageName: 'Settings');
                  break;
                case '/help':
                  page = const PlaceholderPage(pageName: 'Help');
                  break;
                default:
                  page = const HomePage();
              }
              return MaterialPageRoute(
                builder: (context) => page,
                settings: settings,
              );
            },
          ),
          Sidebar(
            isSidebarOpen: _isSidebarOpen,
            toggleSidebar: _toggleSidebar,
          ),
        ],
      ),
    );
  }
}

class PlaceholderPage extends StatelessWidget {
  final String pageName;

  const PlaceholderPage({required this.pageName, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(pageName),
      ),
      body: Center(
        child: Text('$pageName Page Placeholder'),
      ),
    );
  }
}

