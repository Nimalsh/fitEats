import 'package:flutter/material.dart';

import 'bmi_analysis.dart';
import 'personalizePlan.dart';

class NutriGoals extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nutri Goals'),
        actions: [
          IconButton(
            icon: Icon(Icons.shopping_cart),
            onPressed: () {
              // Navigate to cart page
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Top Image Section
          ClipPath(
            clipper: BottomWaveClipper(),
            child: Container(
              height: MediaQuery.of(context).size.height * 0.4,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/image/nutrigoals.jpg'), // Ensure the path is correct
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          // Navigation Grid Section
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16.0,
                mainAxisSpacing: 16.0,
                children: [
                  buildNavButton(
                    context,
                    'BMI Analysis',
                    Icons.analytics,
                    BmiPage(),
                  ),
                  buildNavButton(
                    context,
                    'Lose Weight',
                    Icons.fitness_center,
                    LoseWeightPage(),
                  ),
                  buildNavButton(
                    context,
                    'Meal Log',
                    Icons.restaurant_menu,
                    MealLogPage(),
                  ),
                  buildNavButton(
                    context,
                    'Personalize Plan',
                    Icons.person,
                    PersonalizePlanPage(),
                  ),
                  buildNavButton(
                    context,
                    'Nutri Queries',
                    Icons.question_answer,
                    NutriQueriesPage(),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget buildNavButton(BuildContext context, String title, IconData icon, Widget page) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.all(16.0),
        backgroundColor: Colors.greenAccent, // Button color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
      ),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => page),
        );
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 40,
            color: Colors.white,
          ),
          SizedBox(height: 8),
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class BottomWaveClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0, size.height - 40);
    var firstControlPoint = Offset(size.width / 4, size.height);
    var firstEndPoint = Offset(size.width / 2, size.height - 40);
    var secondControlPoint = Offset(size.width * 3 / 4, size.height - 80);
    var secondEndPoint = Offset(size.width, size.height - 40);
    path.quadraticBezierTo(firstControlPoint.dx, firstControlPoint.dy, firstEndPoint.dx, firstEndPoint.dy);
    path.quadraticBezierTo(secondControlPoint.dx, secondControlPoint.dy, secondEndPoint.dx, secondEndPoint.dy);
    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}

// Placeholder pages for navigation
class LoseWeightPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Lose Weight')),
      body: Center(child: Text('Lose Weight Page')),
    );
  }
}

class MealLogPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Meal Log')),
      body: Center(child: Text('Meal Log Page')),
    );
  }
}

class NutriQueriesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Nutri Queries')),
      body: Center(child: Text('Nutri Queries Page')),
    );
  }
}
