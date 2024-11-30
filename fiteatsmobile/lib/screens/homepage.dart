import 'package:flutter/material.dart';

class ProfileContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Search bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search for restaurants',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
          // Title
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              'FitEats',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          // Promotions
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 6.0),
            child: Container(
              height: 200,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  PromotionCard(promoImage: 'assets/image/promotion1.png'),
                  PromotionCard(promoImage: 'assets/image/promotion2.png'),
                  PromotionCard(promoImage: 'assets/image/promotion3.png'),
                  PromotionCard(promoImage: 'assets/image/promotion4.png'),
                  PromotionCard(promoImage: 'assets/image/promotion5.png'),
                ],
              ),
            ),
          ),
          // Food categories
          Padding(
  padding: const EdgeInsets.symmetric(horizontal: 8.0), // Reduced padding
  child: Text(
    'Food Categories',
    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
  ),
),

          Container(
            height: 100,
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                CategoryCard(category: 'Rice', icon: Icons.rice_bowl),
                CategoryCard(category: 'Drinks', icon: Icons.local_drink),
                CategoryCard(category: 'Noodles', icon: Icons.restaurant),
                CategoryCard(category: 'Desserts', icon: Icons.icecream),
                CategoryCard(category: 'Noodles', icon: Icons.restaurant),
                CategoryCard(category: 'Desserts', icon: Icons.icecream),
                CategoryCard(category: 'Seafood', icon: Icons.food_bank),
                CategoryCard(category: 'Seafood', icon: Icons.food_bank),
              ],
            ),
          ),
          // Popular restaurants
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              'Popular Restaurants',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          Container(
            height: 200,
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                RestaurantCard(name: 'Restaurant 1', image: 'assets/image/restaurant.jpg'),
                RestaurantCard(name: 'Restaurant 2', image: 'assets/image/restaurant.jpg'),
                RestaurantCard(name: 'Restaurant 3', image: 'assets/image/restaurant.jpg'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
class CategoryCard extends StatelessWidget {
  final String category;
  final IconData icon;

  CategoryCard({required this.category, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80, // Set a fixed width to avoid overflow
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Column(
        children: [
          CircleAvatar(
            radius: 30,
            child: Icon(icon, size: 30),
          ),
          SizedBox(height: 8),
          Text(category, textAlign: TextAlign.center),
        ],
      ),
    );
  }
}

class RestaurantCard extends StatelessWidget {
  final String name;
  final String image;

  RestaurantCard({required this.name, required this.image});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      margin: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.asset(
              image,
              width: 150,
              height: 100,
              fit: BoxFit.cover,
            ),
          ),
          SizedBox(height: 8),
          Text(
            name,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 4),
          Text('Location: 123 Main St'),
        ],
      ),
    );
  }
}

class PromotionCard extends StatelessWidget {
  final String promoImage;

  PromotionCard({required this.promoImage});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.8, // Set width to 80% of screen
      margin: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.asset(
              promoImage,
              width: double.infinity,
              height: 150,
              fit: BoxFit.cover,
            ),
          ),
        ],
      ),
    );
  }
}
