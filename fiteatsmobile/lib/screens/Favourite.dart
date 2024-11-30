import 'package:flutter/material.dart';

class FavouritePage extends StatefulWidget {
  @override
  _FavouritePageState createState() => _FavouritePageState();
}

class _FavouritePageState extends State<FavouritePage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Sample items for demonstration
  final List<Map<String, dynamic>> items = [
    {
      'image': 'assets/image/pizza.jpg',
      'name': 'Pizza Margherita',
      'restaurant': 'Restaurant A',
      'description': 'A classic pizza with fresh mozzarella and basil.',
      'isFavorite': false,
    },
    {
      'image': 'assets/image/burger.jpg',
      'name': 'Cheeseburger',
      'restaurant': 'Restaurant B',
      'description': 'Juicy beef patty with melted cheese and all the toppings.',
      'isFavorite': false,
    },
    {
      'image': 'assets/image/salad.jpg',
      'name': 'Greek Salad',
      'restaurant': 'Restaurant C',
      'description': 'A refreshing salad with feta, olives, and cucumbers.',
      'isFavorite': false,
    },
    {
      'image': 'assets/image/pasta.jpg',
      'name': 'Spaghetti Carbonara',
      'restaurant': 'Restaurant D',
      'description': 'Pasta with a creamy sauce, pancetta, and Parmesan.',
      'isFavorite': false,
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Favourites'),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(48),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: TabBar(
              controller: _tabController,
              isScrollable: true,
              tabs: [
                Tab(text: 'All'),
                Tab(text: 'Pizza'),
                Tab(text: 'Sides'),
                Tab(text: 'Drinks'),
                Tab(text: 'Desserts'),
              ],
            ),
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: List.generate(
          5,
          (index) => buildTabContent(), // Using the same content for simplicity
        ),
      ),
    );
  }

  Widget buildTabContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: items.map((item) {
          return Card(
            margin: EdgeInsets.symmetric(horizontal: 8.0, vertical: 8.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
            elevation: 4,
            child: Container(
              width: 200,
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10.0),
                    child: Image.asset(
                      item['image'],
                      height: 120,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    item['name'],
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 4),
                  Text(
                    'From: ${item['restaurant']}',
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 8),
                  Text(
                    item['description'],
                    style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Align(
                    alignment: Alignment.centerRight,
                    child: IconButton(
                      icon: Icon(
                        item['isFavorite'] ? Icons.favorite : Icons.favorite_border,
                        color: item['isFavorite'] ? Colors.red : Colors.grey,
                      ),
                      onPressed: () {
                        setState(() {
                          item['isFavorite'] = !item['isFavorite'];
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
