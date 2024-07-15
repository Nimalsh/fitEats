import 'package:flutter/material.dart';
import 'food_ordering.dart'; // Import the FoodOrderingPage

class DietPlanPage extends StatelessWidget {
  final List<DietPlan> dietPlans = [
    DietPlan(
      date: '2024-07-14',
      mealName: 'Oatmeal and Fruit',
      timeSlot: 'Breakfast',
      calories: 300,
      description: 'Healthy oatmeal with fresh fruits.',
    ),
    DietPlan(
      date: '2024-07-14',
      mealName: 'Grilled Chicken Salad',
      timeSlot: 'Lunch',
      calories: 500,
      description: 'Grilled chicken with fresh salad greens.',
    ),
    DietPlan(
      date: '2024-07-14',
      mealName: 'Salmon and Vegetables',
      timeSlot: 'Dinner',
      calories: 700,
      description: 'Grilled salmon served with steamed vegetables.',
    ),

     DietPlan(
      date: '2024-07-13',
      mealName: 'Oatmeal and Fruit',
      timeSlot: 'Breakfast',
      calories: 300,
      description: 'Healthy oatmeal with fresh fruits.',
    ),
    DietPlan(
      date: '2024-07-13',
      mealName: 'Grilled Chicken Salad',
      timeSlot: 'Lunch',
      calories: 500,
      description: 'Grilled chicken with fresh salad greens.',
    ),
    DietPlan(
      date: '2024-07-13',
      mealName: 'Salmon and Vegetables',
      timeSlot: 'Dinner',
      calories: 700,
      description: 'Grilled salmon served with steamed vegetables.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Diet Plan'),
        backgroundColor: Colors.green,
      ),
      body: ListView.builder(
        itemCount: dietPlans.length,
        itemBuilder: (context, index) {
          final dietPlan = dietPlans[index];
          return Card(
            margin: EdgeInsets.all(10),
            child: ListTile(
              leading: Icon(Icons.restaurant),
              title: Text('${dietPlan.mealName} (${dietPlan.timeSlot})'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Date: ${dietPlan.date}'),
                  Text('Calories: ${dietPlan.calories}'),
                  Text('Description: ${dietPlan.description}'),
                ],
              ),
              trailing: IconButton(
                icon: Icon(Icons.shopping_cart),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => FoodOrderingPage()),
                  );
                },
              ),
            ),
          );
        },
      ),
    );
  }
}

class DietPlan {
  final String date;
  final String mealName;
  final String timeSlot;
  final int calories;
  final String description;

  DietPlan({
    required this.date,
    required this.mealName,
    required this.timeSlot,
    required this.calories,
    required this.description,
  });
}
