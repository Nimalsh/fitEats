import 'package:flutter/material.dart';

class StatusPage extends StatefulWidget {
  @override
  _StatusPageState createState() => _StatusPageState();
}

class _StatusPageState extends State<StatusPage> {
  // Simulated storage for daily calories
  List<DailyCalorie> _dailyCalories = [];

  @override
  void initState() {
    super.initState();
    // Simulate loading data from persistent storage
    _loadData();
  }

  void _loadData() {
    // This is where you'd load data from a database or shared preferences
    setState(() {
      _dailyCalories = [
        DailyCalorie(date: '2023-07-11', calories: 1800),
        DailyCalorie(date: '2023-07-12', calories: 2000),
         DailyCalorie(date: '2023-07-10', calories: 1800),
        DailyCalorie(date: '2023-07-09', calories: 2000),
          DailyCalorie(date: '2023-07-08', calories: 1800),
        DailyCalorie(date: '2023-07-07', calories: 2000),
          DailyCalorie(date: '2023-07-06', calories: 1800),
        DailyCalorie(date: '2023-07-05', calories: 2000), // Add more data as needed
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Calorie Status'),
      ),
      body: ListView.builder(
        itemCount: _dailyCalories.length,
        itemBuilder: (context, index) {
          final day = _dailyCalories[index];
          return ListTile(
            title: Text('Date: ${day.date}'),
            subtitle: Text('Calories: ${day.calories}'),
          );
        },
      ),
    );
  }
}

class DailyCalorie {
  final String date;
  final int calories;

  DailyCalorie({required this.date, required this.calories});
}
