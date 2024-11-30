import 'package:flutter/material.dart';
import 'restaurantdetail.dart';


class Restaurant {
  final String name;
  final String description;
  final String location;
  final String availableTime;
  final String image;
  bool isFavorite;

  Restaurant({
    required this.name,
    required this.description,
    required this.location,
    required this.availableTime,
    required this.image,
    this.isFavorite = false,
  });
}

class RestaurantPage extends StatefulWidget {
  @override
  _RestaurantPageState createState() => _RestaurantPageState();
}

class _RestaurantPageState extends State<RestaurantPage> {
  final List<Restaurant> restaurants = [
    Restaurant(
      name: 'Healthy Eats',
      description: 'A restaurant that serves fresh and healthy meals.',
      location: '123 Health St, Wellness City',
      availableTime: '8:00 AM - 10:00 PM',
      image: 'assets/image/restaurant.jpg',
    ),
    Restaurant(
      name: 'Seafood Delight',
      description: 'Delicious seafood meals with a variety of dishes.',
      location: '456 Ocean Ave, Seaside Town',
      availableTime: '11:00 AM - 11:00 PM',
      image: 'assets/image/restaurant.jpg',
    ),
  ];

  void _toggleFavorite(Restaurant restaurant) {
    setState(() {
      restaurant.isFavorite = !restaurant.isFavorite;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Restaurants'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: restaurants.length,
        itemBuilder: (context, index) {
          final restaurant = restaurants[index];
          return Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(15.0),
            ),
            elevation: 5,
            margin: EdgeInsets.symmetric(vertical: 8.0),
            child: InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => RestaurantDetailsPage(restaurant: restaurant),
                  ),
                );
              },
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(10.0),
                      child: Image.asset(
                        restaurant.image,
                        width: double.infinity,
                        height: 150,
                        fit: BoxFit.cover,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      restaurant.name,
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      restaurant.description,
                      style: TextStyle(fontSize: 16, color: Colors.grey),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Location: ${restaurant.location}',
                      style: TextStyle(fontSize: 16, color: Colors.grey),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Available Time: ${restaurant.availableTime}',
                      style: TextStyle(fontSize: 16, color: Colors.grey),
                    ),
                    SizedBox(height: 8),
                    Align(
                      alignment: Alignment.centerRight,
                      child: IconButton(
                        icon: Icon(
                          restaurant.isFavorite ? Icons.favorite : Icons.favorite_border,
                          color: restaurant.isFavorite ? Colors.red : Colors.grey,
                        ),
                        onPressed: () {
                          _toggleFavorite(restaurant);
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
