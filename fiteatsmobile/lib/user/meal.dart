import 'package:flutter/material.dart';

class MealPage extends StatefulWidget {
  @override
  _MealPageState createState() => _MealPageState();
}

class _MealPageState extends State<MealPage> {
  // Initial calorie count
  int _calorieCount = 50;

  // Ingredient selection
  Set<String> _selectedIngredients = {};

  // Calorie values for each ingredient
  final Map<String, int> _ingredientCalories = {
    'cashews': 15,
    'ground beef': 25,
    'bacon strips': 42,
    'chicken breast': 16,
    'turkey patty': 14,
    'cheddar cheese': 13,
    'swiss cheese': 10,
    'blue cheese': 10,
    'mozzarella': 85,
    'lettuce': 5,
    'tomato': 22,
    'onion': 40,
    'pickles': 5,
    'avocado': 16,
    'mushrooms': 15,
    'ketchup': 20,
    'mustard': 10,
    'Mayonnaise': 34,
    'BBQ sauce': 30,
    'ranch dressing': 43,
  };

  void _updateCalories(String ingredient, bool isSelected) {
    setState(() {
      if (isSelected) {
        _selectedIngredients.add(ingredient);
        _calorieCount += _ingredientCalories[ingredient]!;
      } else {
        _selectedIngredients.remove(ingredient);
        _calorieCount -= _ingredientCalories[ingredient]!;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Meal Details'),
        backgroundColor: Colors.greenAccent,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Meal Image, Price, Description
            Image.asset(
              'assets/image/biriyani.jpg',
              height: 200,
              fit: BoxFit.cover,
            ),
            SizedBox(height: 16),
            Text(
              'Price: \$12.99',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              'Delicious meal with various ingredients.',
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
            ),
            SizedBox(height: 16),

            // Calorie Count Display
            Text(
              'Calories: $_calorieCount cal',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.blueAccent),
            ),
            SizedBox(height: 16),

            // Ingredients Selection
            Expanded(
              child: ListView(
                children: [
                  _buildIngredientSection('Nuts and Seeds', ['cashews']),
                  _buildIngredientSection('Protein', ['ground beef', 'bacon strips', 'chicken breast', 'turkey patty']),
                  _buildIngredientSection('Dairy', ['cheddar cheese', 'swiss cheese', 'blue cheese', 'mozzarella']),
                  _buildIngredientSection('Vegetable', ['lettuce', 'tomato', 'onion', 'pickles', 'avocado', 'mushrooms']),
                  _buildIngredientSection('Condiments', ['ketchup', 'mustard', 'Mayonnaise', 'BBQ sauce', 'ranch dressing']),
                ],
              ),
            ),
            SizedBox(height: 16),

            // Buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.greenAccent,
                        padding: EdgeInsets.symmetric(vertical: 16),
                        textStyle: TextStyle(fontSize: 18),
                      ),
                      onPressed: () {
                        Navigator.pushNamed(context, '/profileCartPage');
                      },
                      child: Text('Add to Cart'),
                    ),
                  ),
                ),
                SizedBox(width: 8),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.greenAccent,
                        padding: EdgeInsets.symmetric(vertical: 16),
                        textStyle: TextStyle(fontSize: 18),
                      ),
                      onPressed: () {
                        Navigator.pushNamed(context, '/nutricontent');
                      },
                      child: Text('Nutrition Content'),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildIngredientSection(String title, List<String> ingredients) {
    return ExpansionTile(
      title: Text(
        title,
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
      ),
      children: ingredients.map((ingredient) {
        return CheckboxListTile(
          title: Text(ingredient),
          value: _selectedIngredients.contains(ingredient),
          onChanged: (bool? value) {
            _updateCalories(ingredient, value ?? false);
          },
        );
      }).toList(),
    );
  }
}
