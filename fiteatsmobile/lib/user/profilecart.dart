import 'package:flutter/material.dart';

class ProfileCartPage extends StatefulWidget {
  @override
  _ProfileCartPageState createState() => _ProfileCartPageState();
}

class _ProfileCartPageState extends State<ProfileCartPage> {
  final List<Map<String, dynamic>> foodItems = [
    {
      'name': 'Grilled Chicken Salad',
      'restaurant': 'Healthy Eats',
      'calories': 350,
      'description': 'A delicious and healthy mix of grilled chicken and fresh vegetables, topped with a light and tangy dressing, perfect for a nutritious meal.',
      'photo': 'assets/image/plate.png',
      'ingredients': 'Chicken, Lettuce, Tomatoes, Cucumbers, Olive Oil, Lemon Juice',
      'nutrition': 'Carbs: 20g, Protein: 30g, Fat: 10g',
    },
    {
      'name': 'Salmon with Veggies',
      'restaurant': 'Seafood Delight',
      'calories': 450,
      'description': 'Fresh salmon served with a side of steamed vegetables.',
      'photo': 'assets/image/food.jpg',
      'ingredients': 'Salmon, Broccoli, Carrots, Olive Oil, Garlic, Lemon Juice',
      'nutrition': 'Carbs: 15g, Protein: 40g, Fat: 20g',
    },
  ];

void _showFoodDetails(Map<String, dynamic> foodItem) {
  showModalBottomSheet(
    context: context,
    builder: (context) {
      return SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                foodItem['name'],
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              Image.asset(
                foodItem['photo'],
                fit: BoxFit.cover,
                width: double.infinity,
                height: 200,
              ),
              SizedBox(height: 16),
              Text(
                foodItem['description'],
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 16),
              Text(
                'Ingredients:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Text(
                foodItem['ingredients'],
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 16),
              Text(
                'Nutritional Content:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Text(
                foodItem['nutrition'],
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 16),
              Align(
                alignment: Alignment.center,
                child: ElevatedButton(
                  onPressed: () {
                    // Handle order now action
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
                    textStyle: TextStyle(fontSize: 18),
                  ),
                  child: Text('Order Now'),
                ),
              ),
              SizedBox(height: 16),
            ],
          ),
        ),
      );
    },
  );
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Cart'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: foodItems.length,
        itemBuilder: (context, index) {
          final foodItem = foodItems[index];
          return Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(15.0),
            ),
            elevation: 5,
            margin: EdgeInsets.symmetric(vertical: 8.0),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                
                
                children: [
                  Text(
                    foodItem['name'],
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Restaurant: ${foodItem['restaurant']}',
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Calories: ${foodItem['calories']}',
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                  SizedBox(height: 8),
                  Align(
                    alignment: Alignment.centerRight,

                    child: ElevatedButton(
                      onPressed: () {
                        _showFoodDetails(foodItem);
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.greenAccent,
                      ),
                      child: Text('See More'),
                    ),
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
