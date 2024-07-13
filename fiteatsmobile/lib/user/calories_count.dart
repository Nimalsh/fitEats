import 'package:flutter/material.dart';

class DailyCaloriesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Daily Calorie'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Date: ${DateTime.now().toLocal()}'.split(' ')[0],
              style: TextStyle(fontSize: 18),
            ),
            Text(
              'Calorie Goal: 2000',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView(
                children: [
                  MealItem(
                    mealName: 'Breakfast',
                    mealDetails: 'Oatmeal and fruit',
                  ),
                  MealItem(
                    mealName: 'Lunch',
                    mealDetails: 'Grilled chicken salad',
                  ),
                  MealItem(
                    mealName: 'Dinner',
                    mealDetails: 'Salmon and vegetables',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class MealItem extends StatelessWidget {
  final String mealName;
  final String mealDetails;

  const MealItem({
    Key? key,
    required this.mealName,
    required this.mealDetails,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(mealName),
        subtitle: Text(mealDetails),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Checkbox(
              value: false,
              onChanged: (bool? value) {
                // Handle checkbox change
              },
            ),
            IconButton(
              icon: Icon(Icons.shopping_cart),
              onPressed: () {
                // Handle meal ordering
              },
            ),
          ],
        ),
      ),
    );
  }
}
