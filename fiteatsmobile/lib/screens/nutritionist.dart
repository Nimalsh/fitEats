// nutritionist_page.dart (Screen)

import 'package:flutter/material.dart';
import '../models/nutritionist.dart';
import '../services/nutritionist.dart';
import 'nextpage.dart';
 // Import the model

class NutritionistPage extends StatefulWidget {
  @override
  _NutritionistPageState createState() => _NutritionistPageState();
}

class _NutritionistPageState extends State<NutritionistPage> {
  int? _selectedNutritionistIndex;
  late NutritionistService _nutritionistService;
  late Future<List<Nutritionist>> _nutritionists;
  
  get nutritionists => null;

  @override
  void initState() {
    super.initState();
    _nutritionistService = NutritionistService(baseUrl: 'http://10.0.3.2:5454'); // Set base URL to match Spring Boot backend
    _nutritionists = _nutritionistService.fetchNutritionists();
  }

  void _continue() {
    if (_selectedNutritionistIndex != null) {
       final selectedNutritionist = Nutritionist.fromJson(nutritionists[_selectedNutritionistIndex!]);
      
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
      body: FutureBuilder<List<Nutritionist>>(
        future: _nutritionists,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No nutritionists found.'));
          }

          final nutritionists = snapshot.data!;

          return Column(
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
                          backgroundImage: AssetImage(nutritionist.photo),
                        ),
                        title: Text(
                          nutritionist.name,
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
                              'Qualifications: ${nutritionist.qualifications}',
                              style: TextStyle(fontSize: 16),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'Specializations: ',
                              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 4),
                            Wrap(
                              spacing: 8.0,
                              children: nutritionist.specializations
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
          );
        },
      ),
    );
  }
}
