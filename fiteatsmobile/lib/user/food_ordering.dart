import 'package:flutter/material.dart';
import 'cart.dart'; // Import CartPage
import 'cart_item.dart'; // Import CartItem

class FoodOrderingPage extends StatefulWidget {
  @override
  _FoodOrderingPageState createState() => _FoodOrderingPageState();
}

class _FoodOrderingPageState extends State<FoodOrderingPage> {
  final List<FoodItem> foodItems = [
    FoodItem(
      name: 'Oatmeal and Fruit',
      image: 'assets/image/plate.png',
      description: 'Healthy oatmeal with fresh fruits.',
      price: 5.99,
      calories: 300,
      restaurant: 'Healthy Bites',
    ),
    FoodItem(
      name: 'Grilled Chicken Salad',
      image: 'assets/image/plate.png',
      description: 'Grilled chicken with fresh salad greens.',
      price: 7.99,
      calories: 500,
      restaurant: 'Green Leaf',
    ),
    FoodItem(
      name: 'Salmon and Vegetables',
      image: 'assets/image/plate.png',
      description: 'Grilled salmon served with steamed vegetables.',
      price: 12.99,
      calories: 700,
      restaurant: 'Seafood Delight',
    ),
    FoodItem(
      name: 'Salmon and Vegetables',
      image: 'assets/image/plate.png',
      description: 'Grilled salmon served with steamed vegetables.',
      price: 12.99,
      calories: 700,
      restaurant: 'Seafood Delight',
    ),
    FoodItem(
      name: 'Salmon and Vegetables',
      image: 'assets/image/plate.png',
      description: 'Grilled salmon served with steamed vegetables.',
      price: 12.99,
      calories: 700,
      restaurant: 'Seafood Delight',
    ),
    FoodItem(
      name: 'Salmon and Vegetables',
      image: 'assets/image/plate.png',
      description: 'Grilled salmon served with steamed vegetables.',
      price: 12.99,
      calories: 700,
      restaurant: 'Seafood Delight',
    ),
    FoodItem(
      name: 'Salmon and Vegetables',
      image: 'assets/image/plate.png',
      description: 'Grilled salmon served with steamed vegetables.',
      price: 12.99,
      calories: 700,
      restaurant: 'Seafood Delight',
    ),
  ];

  final List<CartItem> cartItems = [];

  void addToCart(FoodItem foodItem, List<String> customizations) {
    setState(() {
      cartItems.add(CartItem(foodItem: foodItem, customizations: customizations));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Food Ordering'),
        actions: [
          IconButton(
            icon: Icon(Icons.shopping_cart),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => CartDetailsPage(cartItems: cartItems)),
              );
            },
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: foodItems.length,
        itemBuilder: (context, index) {
          final foodItem = foodItems[index];
          return Card(
            color: Color.fromARGB(255, 174, 246, 177),
            margin: EdgeInsets.all(15.00),
            child: ListTile(
              leading: Image.asset(
                foodItem.image,
                width: 100,
                height: 150,
                fit: BoxFit.cover,
              ),
              title: Text(foodItem.name),
              trailing: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => FoodDetailPage(
                        foodItem: foodItem,
                        addToCart: addToCart,
                      ),
                    ),
                  );
                },
                child: Text('See More'),
              ),
            ),
          );
        },
      ),
    );
  }
}

class FoodDetailPage extends StatefulWidget {
  final FoodItem foodItem;
  final Function(FoodItem, List<String>) addToCart;

  const FoodDetailPage({Key? key, required this.foodItem, required this.addToCart}) : super(key: key);

  @override
  _FoodDetailPageState createState() => _FoodDetailPageState();
}

class _FoodDetailPageState extends State<FoodDetailPage> {
  final List<String> vegetables = [
    'Tomato',
    'Lettuce',
    'Onion',
    'Cucumber',
    'Pepper',
  ];

  late Map<String, bool> selectedVegetables;

  @override
  void initState() {
    super.initState();
    selectedVegetables = {
      for (var veg in vegetables) veg: false,
    };
  }

  void _addToCart() {
    final selectedVegList = selectedVegetables.entries
        .where((entry) => entry.value)
        .map((entry) => entry.key)
        .toList();
    widget.addToCart(widget.foodItem, selectedVegList);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.foodItem.name),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.asset(
              widget.foodItem.image,
              width: double.infinity,
              height: 200,
              fit: BoxFit.cover,
            ),
            SizedBox(height: 20),
            Text(
              widget.foodItem.description,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              'Price: \$${widget.foodItem.price}',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text(
              'Calories: ${widget.foodItem.calories}',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 10),
            Text(
              'Restaurant: ${widget.foodItem.restaurant}',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 20),
            Text(
              'Customize your meal with vegetables:',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: ListView(
                children: vegetables.map((veg) {
                  return CheckboxListTile(
                    title: Text(veg),
                    value: selectedVegetables[veg],
                    onChanged: (bool? value) {
                      setState(() {
                        selectedVegetables[veg] = value!;
                      });
                    },
                  );
                }).toList(),
              ),
            ),
            ElevatedButton(
              onPressed: _addToCart,
              child: Text('ADD TO CART'),
            ),
          ],
        ),
      ),
    );
  }
}

class FoodItem {
  final String name;
  final String image;
  final String description;
  final double price;
  final int calories;
  final String restaurant;

  FoodItem({
    required this.name,
    required this.image,
    required this.description,
    required this.price,
    required this.calories,
    required this.restaurant,
  });
}
