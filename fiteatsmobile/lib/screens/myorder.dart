import 'package:flutter/material.dart';

class MyOrderPage extends StatelessWidget {
  final List<Map<String, dynamic>> orders = [
    {
      'orderNumber': '#12345',
      'date': '2024-11-25',
      'restaurant': 'Healthy Bites',
      'totalPrice': 35.99,
      'status': 'Completed',
      'items': [
        {'name': 'Grilled Chicken Salad', 'price': 12.99},
        {'name': 'Oatmeal', 'price': 7.99},
        {'name': 'Smoothie', 'price': 15.00},
      ],
    },
    {
      'orderNumber': '#12346',
      'date': '2024-11-26',
      'restaurant': 'Fresh Diner',
      'totalPrice': 45.99,
      'status': 'Pending',
      'items': [
        {'name': 'Salmon with Veggies', 'price': 15.99},
        {'name': 'Fruit Salad', 'price': 10.99},
        {'name': 'Iced Tea', 'price': 5.00},
      ],
    },
    {
      'orderNumber': '#12347',
      'date': '2024-11-27',
      'restaurant': 'Veggie Hub',
      'totalPrice': 27.99,
      'status': 'Completed',
      'items': [
        {'name': 'Veggie Burger', 'price': 12.99},
        {'name': 'Caesar Salad', 'price': 9.99},
        {'name': 'Water', 'price': 5.00},
      ],
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Orders'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: orders.length,
        itemBuilder: (context, index) {
          final order = orders[index];
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
                  // Order Number and Date
                  Text(
                    'Order Number: ${order['orderNumber']}',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Date: ${order['date']}',
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Restaurant: ${order['restaurant']}',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 16),
                  
                  // Food Items
                  Text(
                    'Food Items:',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Column(
                    children: order['items'].map<Widget>((item) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4.0),
                        child: Row(
                          children: [
                            Expanded(
                              child: Text(
                                item['name'],
                                style: TextStyle(fontSize: 14),
                              ),
                            ),
                            Text(
                              '\$${item['price'].toStringAsFixed(2)}',
                              style: TextStyle(fontSize: 14, color: Colors.grey),
                            ),
                          ],
                        ),
                      );
                    }).toList(),
                  ),
                  SizedBox(height: 16),
                  
                  // Total Price
                  Text(
                    'Total Price: \$${order['totalPrice'].toStringAsFixed(2)}',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  
                  // Order Status
                  Text(
                    'Status: ${order['status']}',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: order['status'] == 'Completed' ? Colors.green : Colors.orange,
                    ),
                  ),
                  SizedBox(height: 16),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
