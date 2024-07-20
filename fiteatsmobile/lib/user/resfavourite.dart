
import 'package:flutter/material.dart';
import 'restaurant_menu.dart'; // Import the restaurant_menu.dart file

class RestaurantPage extends StatefulWidget {
  @override
  _RestaurantPageState createState() => _RestaurantPageState();
}

class _RestaurantPageState extends State<RestaurantPage> {
  final List<Map<String, dynamic>> restaurants = [
    {
      'image': 'assets/image/restaurant.jpg',
      'name': 'Restaurant One',
      'rating': 4.5,
      'location': '123 Main St, City',
      'isFavorite': false,
    },
    {
      'image': 'assets/image/restaurant.jpg',
      'name': 'Restaurant Two',
      'rating': 4.0,
      'location': '456 Maple Ave, City',
      'isFavorite': false,
    },
    {
      'image': 'assets/image/restaurant.jpg',
      'name': 'Restaurant Three',
      'rating': 4.8,
      'location': '789 Oak Dr, City',
      'isFavorite': false,
    },
    // Add more restaurants as needed
  ];

  void toggleFavorite(int index) {
    setState(() {
      restaurants[index]['isFavorite'] = !restaurants[index]['isFavorite'];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Restaurants'),
        backgroundColor: Colors.green,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          itemCount: restaurants.length,
          itemBuilder: (context, index) {
            final restaurant = restaurants[index];
            return Container(
              margin: const EdgeInsets.only(bottom: 16.0),
              height: MediaQuery.of(context).size.height * 0.25, // Quarter of the screen height
              child: Card(
                color: Colors.white,
                elevation: 4.0,
                child: Row(
                  children: [
                    Image.asset(
                      restaurant['image'],
                      width: MediaQuery.of(context).size.width * 0.4,
                      height: double.infinity,
                      fit: BoxFit.cover,
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              restaurant['name'],
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'Rating: ${restaurant['rating']}',
                              style: TextStyle(fontSize: 16),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'Location: ${restaurant['location']}',
                              style: TextStyle(fontSize: 16),
                            ),
                            SizedBox(height: 8,),
                            Row(

                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                ElevatedButton.icon(
                                  style: ElevatedButton.styleFrom(iconColor: Colors.green, ),
                                  onPressed: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(builder: (context) => RestaurantMenuPage()),
                                    );
                                  },
                                  icon: Icon(Icons.menu),
                                  label: Text('View Menu'),
                                ),
                                IconButton(
                                  icon: Icon(
                                    restaurant['isFavorite'] ? Icons.favorite : Icons.favorite_border,
                                    color: restaurant['isFavorite'] ? Colors.red : Colors.grey,
                                  ),
                                  onPressed: () {
                                    toggleFavorite(index);
                                  },
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
