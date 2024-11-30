import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class CaloriesCountPage extends StatefulWidget {
  @override
  _CaloriesCountPageState createState() => _CaloriesCountPageState();
}

class _CaloriesCountPageState extends State<CaloriesCountPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final int _duration = 7; // Example duration for the meal plan

  final List<Map<String, dynamic>> meals = [
    {
      'mealName': 'Oatmeal',
      'quantity': '1 cup',
      'nutrients': {'carbs': 27, 'protein': 5, 'fat': 3, 'calories': 150},
    },
    {
      'mealName': 'Grilled Chicken Salad',
      'quantity': '1 plate',
      'nutrients': {'carbs': 10, 'protein': 30, 'fat': 10, 'calories': 250},
    },
    {
      'mealName': 'Salmon with Veggies',
      'quantity': '1 plate',
      'nutrients': {'carbs': 20, 'protein': 25, 'fat': 15, 'calories': 300},
    },
  ];

  List<Map<String, bool>> _mealCompletionStatus = List.generate(7, (index) => {
        'breakfast': false,
        'lunch': false,
        'dinner': false,
      });

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _duration, vsync: this);
  }

  void _showCompletionMessage() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Meals for the day completed!')),
    );
  }

  Widget _buildMealCard(String mealName, String quantity, int dayIndex, String mealType) {
    return Card(
      elevation: 4.0,
      margin: EdgeInsets.symmetric(vertical: 8.0),
      child: ListTile(
        title: Text(mealName),
        subtitle: Text(quantity),
        trailing: Checkbox(
          value: _mealCompletionStatus[dayIndex][mealType],
          onChanged: (bool? value) {
            setState(() {
              _mealCompletionStatus[dayIndex][mealType] = value!;
            });
          },
        ),
      ),
    );
  }

  Widget _buildMealPlan(int dayIndex) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Breakfast',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        _buildMealCard(meals[0]['mealName'], meals[0]['quantity'], dayIndex, 'breakfast'),
        SizedBox(height: 16),
        Text(
          'Lunch',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        _buildMealCard(meals[1]['mealName'], meals[1]['quantity'], dayIndex, 'lunch'),
        SizedBox(height: 16),
        Text(
          'Dinner',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        _buildMealCard(meals[2]['mealName'], meals[2]['quantity'], dayIndex, 'dinner'),
        SizedBox(height: 16),
        Align(
          alignment: Alignment.center,
          child: ElevatedButton(
            onPressed: () {
              _showCompletionMessage();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green,
              padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
              textStyle: TextStyle(fontSize: 18),
            ),
            child: Text('Completed'),
          ),
        ),
      ],
    );
  }

  List<PieChartSectionData> _buildNutritionalSummary() {
    final nutrients = {
      'carbs': 0,
      'protein': 0,
      'fat': 0,
      'calories': 0,
    };

    for (var meal in meals) {
      nutrients['carbs'] = (nutrients['carbs'] as int) + (meal['nutrients']['carbs'] as int? ?? 0);
      nutrients['protein'] = (nutrients['protein'] as int) + (meal['nutrients']['protein'] as int? ?? 0);
      nutrients['fat'] = (nutrients['fat'] as int) + (meal['nutrients']['fat'] as int? ?? 0);
      nutrients['calories'] = (nutrients['calories'] as int) + (meal['nutrients']['calories'] as int? ?? 0);
    }

    return [
      PieChartSectionData(
        value: nutrients['carbs']?.toDouble(),
        title: 'Carbs',
        color: Colors.blue,
      ),
      PieChartSectionData(
        value: nutrients['protein']?.toDouble(),
        title: 'Protein',
        color: Colors.red,
      ),
      PieChartSectionData(
        value: nutrients['fat']?.toDouble(),
        title: 'Fat',
        color: Colors.green,
      ),
      PieChartSectionData(
        value: nutrients['calories']?.toDouble(),
        title: 'Calories',
        color: Colors.orange,
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Daily Meals'),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          tabs: List.generate(
            _duration,
            (index) => Tab(text: 'Day ${index + 1}'),
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: List.generate(
          _duration,
          (index) => SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildMealPlan(index),
                SizedBox(height: 16),
                Text(
                  'Nutritional Summary',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                Container(
                  height: 200,
                  child: PieChart(
                    PieChartData(
                      sections: _buildNutritionalSummary(),
                      sectionsSpace: 0,
                      centerSpaceRadius: 40,
                      borderData: FlBorderData(show: false),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
}
