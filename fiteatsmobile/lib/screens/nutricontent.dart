import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

import 'payments.dart';

class NutritionContentPage extends StatelessWidget {
  final Map<String, dynamic> meal = {
    'name': 'Grilled Chicken Salad',
    'servingSize': '200 grams',
    'calories': 350,
    'macronutrients': {
      'carbohydrates': 45,
      'protein': 20,
      'fat': 15,
      'fiber': 4,
      'sugar': 5,
    },
    'micronutrients': {
      'vitaminA': 20,
      'vitaminC': 15,
      'iron': 10,
      'calcium': 8,
      'sodium': 60,
    },
    'ingredients': 'Chicken, Lettuce, Tomatoes, Cucumbers, Olive Oil, Lemon Juice',
    'keywords': ['Healthy', 'Low Carb', 'Protein-rich'],
  };

  List<PieChartSectionData> _createSections(Map<String, double> data) {
    List<PieChartSectionData> sections = [];
    data.forEach((key, value) {
      sections.add(
        PieChartSectionData(
          value: value,
          title: key,
          color: Colors.primaries[sections.length % Colors.primaries.length],
        ),
      );
    });
    return sections;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nutrition Content'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                meal['name'],
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text('Serving Size: ${meal['servingSize']}'),
              Text('Calories: ${meal['calories']} kcal'),
              SizedBox(height: 16),
              Text(
                'Macronutrients',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Container(
                height: 200,
                child: PieChart(
                  PieChartData(
                    sections: _createSections({
                      'Carbs': meal['macronutrients']['carbohydrates'].toDouble(),
                      'Protein': meal['macronutrients']['protein'].toDouble(),
                      'Fat': meal['macronutrients']['fat'].toDouble(),
                      'Fiber': meal['macronutrients']['fiber'].toDouble(),
                      'Sugar': meal['macronutrients']['sugar'].toDouble(),
                    }),
                    sectionsSpace: 0,
                    centerSpaceRadius: 40,
                    borderData: FlBorderData(show: false),
                  ),
                ),
              ),
              SizedBox(height: 16),
              Text(
                'Micronutrients',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Container(
                height: 200,
                child: PieChart(
                  PieChartData(
                    sections: _createSections({
                      'Vitamin A': meal['micronutrients']['vitaminA'].toDouble(),
                      'Vitamin C': meal['micronutrients']['vitaminC'].toDouble(),
                      'Iron': meal['micronutrients']['iron'].toDouble(),
                      'Calcium': meal['micronutrients']['calcium'].toDouble(),
                      'Sodium': meal['micronutrients']['sodium'].toDouble(),
                    }),
                    sectionsSpace: 0,
                    centerSpaceRadius: 40,
                    borderData: FlBorderData(show: false),
                  ),
                ),
              ),
              SizedBox(height: 16),
              Text(
                'Ingredients',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Text(meal['ingredients']),
              SizedBox(height: 16),
              Text(
                'Key Words',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Wrap(
                spacing: 8.0,
                children: meal['keywords'].map<Widget>((keyword) {
                  return Chip(label: Text(keyword));
                }).toList(),
              ),
              SizedBox(height: 32),
              Center(
                child: ElevatedButton(
                  onPressed: () {
              Navigator.push(
                          context,
                      MaterialPageRoute(builder: (context) => PaymentPage()),
                          );
                   },

                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
                    textStyle: TextStyle(fontSize: 18),
                  ),
                  child: Text('Order Now'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
