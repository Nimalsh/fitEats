import 'package:flutter/material.dart';

class BmiPage extends StatefulWidget {
  @override
  _BmiPageState createState() => _BmiPageState();
}

class _BmiPageState extends State<BmiPage> {
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _heightController = TextEditingController();
  double _bmi = 0;
  String _bmiMessage = '';

  void _calculateBmi() {
    final double weight = double.parse(_weightController.text);
    final double height = double.parse(_heightController.text) / 100; // Convert cm to meters
    setState(() {
      _bmi = weight / (height * height);
      _bmiMessage = _getBmiMessage(_bmi);
    });
  }

  String _getBmiMessage(double bmi) {
    if (bmi < 18.5) {
      return 'You are underweight. Consider consulting with a nutritionist.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'You are healthy. Keep up the good work!';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'You are overweight. Consider a balanced diet and exercise.';
    } else {
      return 'You are obese. Please consult with a healthcare provider.';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BMI Calculator'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(
              'assets/image/profile.jpg',
              height: 150,
            ),
            SizedBox(height: 16),
            TextField(
              controller: _weightController,
              decoration: InputDecoration(
                labelText: 'Weight (kg)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
                prefixIcon: Icon(Icons.fitness_center),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 16),
            TextField(
              controller: _heightController,
              decoration: InputDecoration(
                labelText: 'Height (cm)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
                prefixIcon: Icon(Icons.height),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _calculateBmi,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
                textStyle: TextStyle(fontSize: 18),
              ),
              child: Text('Calculate BMI'),
            ),
            SizedBox(height: 24),
            if (_bmi > 0)
              Column(
                children: [
                  Text(
                    'Your BMI is ${_bmi.toStringAsFixed(1)}',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 16),
                  Text(
                    _bmiMessage,
                    style: TextStyle(fontSize: 18),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
