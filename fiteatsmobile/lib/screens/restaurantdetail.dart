import 'package:flutter/material.dart';
import 'meal.dart';
import 'restaurant.dart';

class RestaurantDetailsPage extends StatefulWidget {
  final Restaurant restaurant;

  RestaurantDetailsPage({required this.restaurant});

  @override
  _RestaurantDetailsPageState createState() => _RestaurantDetailsPageState();
}

class _RestaurantDetailsPageState extends State<RestaurantDetailsPage> {
  List<String> selectedFoodTypes = [];
  List<String> selectedFoodCategories = [];

  final List<Map<String, dynamic>> meals = [
    {
      'name': 'Margherita Pizza',
      'type': 'Vegetarian',
      'category': 'Pizza',
      'image': 'assets/image/pizza.jpg',
    },
    {
      'name': 'Chicken Biryani',
      'type': 'Non-Vegetarian',
      'category': 'biriyani',
      'image': 'assets/image/food.jpg',
    },
    {
      'name': 'Veggie Burger',
      'type': 'Vegetarian',
      'category': 'Burger',
      'image': 'assets/image/burger.jpg',
    },
    {
      'name': 'Grilled Chicken',
      'type': 'Non-Vegetarian',
      'category': 'Chicken',
      'image': 'assets/image/food.jpg',
    },
    {
      'name': 'Seasonal Rice Dish',
      'type': 'Seasonal',
      'category': 'Rice',
      'image': 'assets/image/rice.jpg',
    },
  ];

  void _toggleSelection(String item, List<String> selectedList) {
    setState(() {
      if (selectedList.contains(item)) {
        selectedList.remove(item);
      } else {
        selectedList.add(item);
      }
    });
  }

  List<Map<String, dynamic>> getFilteredMeals() {
    return meals.where((meal) {
      bool matchesType = selectedFoodTypes.isEmpty || selectedFoodTypes.contains(meal['type']);
      bool matchesCategory = selectedFoodCategories.isEmpty || selectedFoodCategories.contains(meal['category']);
      return matchesType && matchesCategory;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.restaurant.name),
      ),
      body: SingleChildScrollView( // Added SingleChildScrollView here
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(10.0),
              child: Image.asset(
                widget.restaurant.image,
                width: double.infinity,
                height: 200,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(height: 16),
            Text(
              widget.restaurant.description,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 16),
            Text(
              'Location:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text(
              widget.restaurant.location,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 16),
            Text(
              'Available Time:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text(
              widget.restaurant.availableTime,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 16),
            Text(
              'Food Type:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Wrap(
              spacing: 8.0,
              children: ['All', 'Vegetarian', 'Non-Vegetarian', 'Seasonal'].map((type) {
                return FilterChip(
                  label: Text(type),
                  selected: selectedFoodTypes.contains(type),
                  onSelected: (selected) {
                    setState(() {
                      if (type == 'All') {
                        selectedFoodTypes.clear();
                      } else {
                        _toggleSelection(type, selectedFoodTypes);
                      }
                    });
                  },
                );
              }).toList(),
            ),
            SizedBox(height: 16),
            Text(
              'Food Category:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Wrap(
              spacing: 8.0,
              children: ['Pizza', 'Biriyani', 'Burger', 'Chicken', 'Rice'].map((category) {
                return FilterChip(
                  label: Text(category),
                  selected: selectedFoodCategories.contains(category),
                  onSelected: (selected) {
                    _toggleSelection(category, selectedFoodCategories);
                  },
                );
              }).toList(),
            ),
            SizedBox(height: 16),
            ListView.builder(
              shrinkWrap: true, // Added this
              physics: NeverScrollableScrollPhysics(), // Added this
              itemCount: getFilteredMeals().length,
              itemBuilder: (context, index) {
                final meal = getFilteredMeals()[index];
                return Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  elevation: 5,
                  margin: EdgeInsets.symmetric(vertical: 8.0),
                  child: InkWell(
                    onTap: ()  {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => MealPage(),
                  ),
                );
              },
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(10.0),
                            child: Image.asset(
                              meal['image'],
                              width: 80,
                              height: 80,
                              fit: BoxFit.cover,
                            ),
                          ),
                          SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                meal['name'],
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                meal['category'],
                                style: TextStyle(fontSize: 16, color: Colors.grey),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
