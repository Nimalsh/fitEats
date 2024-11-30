import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

import 'nutritionist.dart';

class LossFormPage extends StatefulWidget {
  @override
  _LossFormPageState createState() => _LossFormPageState();
}

class _LossFormPageState extends State<LossFormPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _currentWeightController = TextEditingController();
  final TextEditingController _weightLossController = TextEditingController();
  final TextEditingController _durationController = TextEditingController();
  double _currentWeight = 0;
  double _weightLoss = 0;
  int _duration = 0;

  void _calculateAndNavigate() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _currentWeight = double.parse(_currentWeightController.text);
        _weightLoss = double.parse(_weightLossController.text);
        _duration = int.parse(_durationController.text);
      });
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => NextPage(
            ageController: _ageController,
            gender: _gender,
            heightController: _heightController,
            activityLevel: _activityLevel,
            dietaryPreferences: _dietaryPreferences,
            mealsPerDay: _mealsPerDay, dietaryRestrictions: [],
          ),
        ),
      );
    }
  }

  final TextEditingController _ageController = TextEditingController();
  String _gender = 'Male';
  final TextEditingController _heightController = TextEditingController();
  String _activityLevel = 'Sedentary';
  List<String> _dietaryPreferences = [];
  int _mealsPerDay = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Weight Loss Plan'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Weight Loss Plan',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _currentWeightController,
                decoration: InputDecoration(labelText: 'Current Weight (Kg)'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your current weight';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _weightLossController,
                decoration: InputDecoration(labelText: 'Weight Loss (Kg)'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the weight you want to lose';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _durationController,
                decoration: InputDecoration(labelText: 'Duration (weeks)'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the duration in weeks';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              Text(
                'Weight Loss Progress',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  height: 200,
                  child: LineChart(
                    LineChartData(
                      gridData: FlGridData(show: true),
                      titlesData: FlTitlesData(
                        leftTitles: AxisTitles(
                          sideTitles: SideTitles(
                            showTitles: true,
                            interval: 5,
                          ),
                        ),
                        bottomTitles: AxisTitles(
                          sideTitles: SideTitles(
                            showTitles: true,
                            interval: 1,
                          ),
                        ),
                      ),
                      borderData: FlBorderData(show: true),
                      lineBarsData: [
                        LineChartBarData(
                          spots: List.generate(
                            _duration,
                            (index) {
                              double weight = _currentWeight - ((_weightLoss / _duration) * (index + 1));
                              return FlSpot(index + 1, weight);
                            },
                          ),
                          isCurved: true,
                          color: Colors.blue,
                          barWidth: 3,
                          belowBarData: BarAreaData(show: false),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              SizedBox(height: 16),
              Align(
                alignment: Alignment.centerRight,
                child: ElevatedButton(
                  onPressed: _calculateAndNavigate,
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                  child: Text('Next'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


class NextPage extends StatefulWidget {
  final TextEditingController ageController;
  final String gender;
  final TextEditingController heightController;
  final String activityLevel;
  final List<String> dietaryPreferences;
   final List<String> dietaryRestrictions; 
  final int mealsPerDay;

  NextPage({
    required this.ageController,
    required this.gender,
    required this.heightController,
    required this.activityLevel,
    required this.dietaryPreferences,
    required this.dietaryRestrictions,
    required this.mealsPerDay,
  });

  @override
  _NextPageState createState() => _NextPageState();
}

class _NextPageState extends State<NextPage> {
  late TextEditingController _ageController;
  late String _gender;
  late TextEditingController _heightController;
  late String _activityLevel;
  late List<String> _dietaryPreferences;
  late List<String> _dietaryRestrictions;
  late int _mealsPerDay;

  @override
  void initState() {
    super.initState();
    _ageController = widget.ageController;
    _gender = widget.gender;
    _heightController = widget.heightController;
    _activityLevel = widget.activityLevel;
    _dietaryPreferences = widget.dietaryPreferences;
    _dietaryRestrictions = widget.dietaryRestrictions;
    _mealsPerDay = widget.mealsPerDay;
  }

  void _submitForm() {
    // Handle form submission
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => NutritionistPage()),
    );
  }

  @override
Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Personal Information'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Please provide your personal information',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: _ageController,
              decoration: InputDecoration(labelText: 'Age'),
              keyboardType: TextInputType.number,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your age';
                }
                return null;
              },
            ),
            SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _gender,
              items: ['Male', 'Female']
                  .map((gender) => DropdownMenuItem(value: gender, child: Text(gender)))
                  .toList(),
              onChanged: (value) {
                setState(() {
                  _gender = value!;
                });
              },
              decoration: InputDecoration(labelText: 'Gender'),
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: _heightController,
              decoration: InputDecoration(labelText: 'Height (cm)'),
              keyboardType: TextInputType.number,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your height';
                }
                return null;
              },
            ),
            SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _activityLevel,
              items: [
                'Sedentary',
                'Lightly active',
                'Moderately active',
                'Very active',
                'Super active'
              ].map((activity) => DropdownMenuItem(value: activity, child: Text(activity)))
                  .toList(),
              onChanged: (value) {
                setState(() {
                  _activityLevel = value!;
                });
              },
              decoration: InputDecoration(labelText: 'Activity Level'),
            
            ),


SizedBox(height: 16),
Text(
  'Dietary Preferences',
  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
),
MultiSelectChip(
  allItems: [
    'Vegetarian',
    'Vegan',
    'Keto',
    'Gluten-Free',
    'Paleo',
    'Pescatarian',
    'Lactose Intolerant',
    'Low Fat',
    'Low Carbohydrate',
    'Flexitarian'
  ],
  selectedItems: _dietaryPreferences,
  onSelectionChanged: (selectedList) {
    setState(() {
      _dietaryPreferences = selectedList;
    });
  },
),
SizedBox(height: 16),
Text(
  'Dietary Restrictions',
  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
),
MultiSelectChip(
  allItems: [
    'Nut-Free',
    'Gluten-Free',
    'Lactose Intolerant',
    'Shellfish-Free',
    'Dairy-Free',
    'Egg-Free',
    'Vegan',
    'Kosher',
    'Halal',
    'Vegetarian'
  ],
  selectedItems: _dietaryRestrictions,
  onSelectionChanged: (selectedList) {
    setState(() {
      _dietaryRestrictions = selectedList;
    });
  },
),
SizedBox(height: 16),
DropdownButtonFormField<int>(
  value: _mealsPerDay,
  items: [2, 3]
      .map((meals) => DropdownMenuItem(value: meals, child: Text(meals.toString())))
      .toList(),
  onChanged: (value) {
    setState(() {
      _mealsPerDay = value!;
    });
  },
  decoration: InputDecoration(labelText: 'Number of Meals and Snacks per Day'),
),

            SizedBox(height: 16),
            Align(
              alignment: Alignment.centerRight,
              child: ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                child: Text('process'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class MultiSelectChip extends StatefulWidget {
  final List<String> allItems;
  final List<String> selectedItems;
  final Function(List<String>) onSelectionChanged;

  MultiSelectChip({
    required this.allItems,
    required this.selectedItems,
    required this.onSelectionChanged,
  });

  @override
  _MultiSelectChipState createState() => _MultiSelectChipState();
}

class _MultiSelectChipState extends State<MultiSelectChip> {
  List<String> selectedChoices = [];

  @override
  void initState() {
    selectedChoices = widget.selectedItems;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8.0,
      children: widget.allItems.map((item) {
        return ChoiceChip(
          label: Text(item),
          selected: selectedChoices.contains(item),
          onSelected: (selected) {
            setState(() {
              selectedChoices.contains(item)
                  ? selectedChoices.remove(item)
                  : selectedChoices.add(item);
              widget.onSelectionChanged(selectedChoices);
            });
          },
        );
      }).toList(),
    );
  }
}

// class NutritionistPage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Nutritionist Page'),
//       ),
//       body: Center(
//         child: Text('This is the Nutritionist Page'),
//       ),
//     );
//   }
// }
