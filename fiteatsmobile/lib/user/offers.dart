import 'package:flutter/material.dart';

class OffersPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Special Offers'),
      ),
      body: ListView.builder(
        itemCount: offers.length,
        itemBuilder: (context, index) {
          return buildOfferCard(offers[index]);
        },
      ),
    );
  }

  // Sample offers data
  final List<Map<String, String>> offers = [
    {
      'title': '50% Off on Pizza',
      'description': 'Enjoy 50% off on all pizzas. Limited time offer!',
      'image': 'assets/image/pizza.jpg', // Example image path
    },
    {
      'title': 'Free Drink with Burger',
      'description': 'Buy a burger and get a free drink.',
      'image': 'assets/image/pizza.jpg',
    },
    {
      'title': 'Healthy Salad Deal',
      'description': 'Get a healthy salad at a discounted price.',
      'image': 'assets/image/pizza.jpg',
    },
    {
      'title': 'Buy 1 Get 1 Free',
      'description': 'Buy any main dish and get another one free!',
      'image': 'assets/image/pizza.jpg',
    },
  ];

  // Offer card widget
  Widget buildOfferCard(Map<String, String> offer) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      elevation: 4.0,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Row(
          children: [
            Image.asset(
              offer['image']!,
              width: 100,
              height: 100,
              fit: BoxFit.cover,
            ),
            SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    offer['title']!,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    offer['description']!,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
