import 'package:flutter/material.dart';

class NutritionistPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> nutritionists = [
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

    return Scaffold(
      appBar: AppBar(
        title: Text('Nutritionists'),
      ),
      body: ListView.builder(
        itemCount: nutritionists.length,
        itemBuilder: (context, index) {
          return Card(
            margin: EdgeInsets.all(8.0),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 30,
                        backgroundImage:
                            AssetImage(nutritionists[index]['photo']),
                      ),
                      SizedBox(width: 16),
                      Text(
                        nutritionists[index]['name'],
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Qualifications: ${nutritionists[index]['qualifications']}',
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
                    children: nutritionists[index]['specializations']
                        .map<Widget>((spec) => Chip(label: Text(spec)))
                        .toList(),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
