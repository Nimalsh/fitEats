import 'package:flutter/material.dart';
import 'food_ordering.dart';

class DailyCaloriesPage extends StatefulWidget {
  @override
  _DailyCaloriesPageState createState() => _DailyCaloriesPageState();
}

class _DailyCaloriesPageState extends State<DailyCaloriesPage> {
  final Map<String, int> mealCalories = {
    'Breakfast': 300,
    'Lunch': 500,
    'Dinner': 700,
  };
  final Map<String, bool> selectedMeals = {
    'Breakfast': false,
    'Lunch': false,
    'Dinner': false,
  };

  int _totalCalories = 0;

  void _onSubmit() {
    int total = 0;
    selectedMeals.forEach((meal, selected) {
      if (selected) {
        total += mealCalories[meal]!;
      }
    });

    setState(() {
      _totalCalories = total;
    });

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Total Calories'),
        content: Text('Total Calories Consumed: $_totalCalories'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('OK'),
          ),
        ],
      ),
    );
  }

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
              'Date: ${DateTime.now().toLocal().toString().split(' ')[0]}',
              style: TextStyle(fontSize: 18),
            ),
            Text(
              'Calorie Goal: 2000',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView(
                children: mealCalories.keys.map((meal) {
                  return MealItem(
                    mealName: meal,
                    mealDetails: '$meal - ${mealCalories[meal]} calories',
                    isSelected: selectedMeals[meal]!,
                    onChanged: (bool? value) {
                      setState(() {
                        selectedMeals[meal] = value!;
                      });
                    },
                  );
                }).toList(),
              ),
            ),
            ElevatedButton(
              onPressed: _onSubmit,
              child: Text('Submit'),
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
  final bool isSelected;
  final ValueChanged<bool?>? onChanged;

  const MealItem({
    Key? key,
    required this.mealName,
    required this.mealDetails,
    required this.isSelected,
    this.onChanged,
  }) : super(key: key);
  
  get foodItem => null;

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
              value: isSelected,
              onChanged: onChanged,
            ),
            IconButton(
              icon: Icon(Icons.shopping_cart),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => FoodOrderingPage(),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
