import 'package:flutter/material.dart';

class NutritionistPage extends StatefulWidget {
  @override
  State<NutritionistPage> createState() => _NutritionistPageState();
}

class _NutritionistPageState extends State<NutritionistPage> {
  int? _selectedNutritionistIndex;

  final List<Map<String, dynamic>> nutritionists = [
    {
      'name': 'Nimal de silva',
      'photo': 'assets/image/profile.jpg',
      'qualifications': 'M.Sc. Nutrition, Certified Dietitian',
      'specializations': ['Weight Loss', 'Weight Gain', 'Other']
    },
    {
      'name': 'R rajapaksha',
      'photo': 'assets/image/profile.jpg',
      'qualifications': 'B.Sc. Nutrition, Registered Dietitian',
      'specializations': ['Weight Loss', 'Other']
    },
    {
      'name': 'M.wikramasinhe',
      'photo': 'assets/image/profile.jpg',
      'qualifications': 'Ph.D. Nutrition, Certified Health Coach',
      'specializations': ['Weight Gain', 'Other']
    },
    {
      'name': 'A.K. Disanayaka',
      'photo': 'assets/image/profile.jpg',
      'qualifications': 'B.Sc. Nutrition, Registered Dietitian',
      'specializations': ['Weight Loss', 'Other']
    },
    {
      'name': 'P.S.premadasa',
      'photo': 'assets/image/profile.jpg',
      'qualifications': 'B.Sc. Nutrition, Registered Dietitian',
      'specializations': ['Weight Loss', 'Other']
    },
  ];

  void _continue() {
    if (_selectedNutritionistIndex != null) {
      final selectedNutritionist = nutritionists[_selectedNutritionistIndex!];
      // Navigate to the next page or perform any action with the selected nutritionist
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => NextPage(selectedNutritionist: selectedNutritionist),
        ),
      );
    } else {
      // Show a message to select a nutritionist
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please select a nutritionist')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nutritionists'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: nutritionists.length,
              itemBuilder: (context, index) {
                final nutritionist = nutritionists[index];
                return Card(
                  margin: EdgeInsets.all(8.0),
                  child: ListTile(
                    leading: CircleAvatar(
                      radius: 30,
                      backgroundImage: AssetImage(nutritionist['photo']),
                    ),
                    title: Text(
                      nutritionist['name'],
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 8),
                        Text(
                          'Qualifications: ${nutritionist['qualifications']}',
                          style: TextStyle(fontSize: 16),
                        ),
                        SizedBox(height: 8),
                        Text(
                          'Specializations:',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 4),
                        Wrap(
                          spacing: 8.0,
                          children: nutritionist['specializations']
                              .map<Widget>((spec) => Chip(label: Text(spec)))
                              .toList(),
                        ),
                      ],
                    ),
                    trailing: Radio<int>(
                      value: index,
                      groupValue: _selectedNutritionistIndex,
                      onChanged: (int? value) {
                        setState(() {
                          _selectedNutritionistIndex = value;
                        });
                      },
                    ),
                    onTap: () {
                      setState(() {
                        _selectedNutritionistIndex = index;
                      });
                    },
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton(
              onPressed: _continue,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
                textStyle: TextStyle(fontSize: 18),
              ),
              child: Text('Continue'),
            ),
          ),
        ],
      ),
    );
  }
}

class NextPage extends StatelessWidget {
  final Map<String, dynamic> selectedNutritionist;

  NextPage({required this.selectedNutritionist});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(selectedNutritionist['name']),
      ),
      body: Center(
        child: Text('Details about ${selectedNutritionist['name']}'),
      ),
    );
  }
}
