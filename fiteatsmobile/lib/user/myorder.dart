import 'package:flutter/material.dart';

class MyOrderPage extends StatelessWidget {
  final List<Map<String, dynamic>> orders = [
    {
      'photo': 'assets/image/plate.png',
      'name': 'Grilled Chicken Salad',
      'price': 12.99,
      'status': 'Completed',
    },
    {
      'photo': 'assets/image/plate.png',
      'name': 'Salmon with Veggies',
      'price': 15.99,
      'status': 'Pending',
    },
    {
      'photo': 'assets/image/plate.png',
      'name': 'Oatmeal',
      'price': 7.99,
      'status': 'Completed',
    },

     {
      'photo': 'assets/image/plate.png',
      'name': 'Oatmeal',
      'price': 7.99,
      'status': 'pending',
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
              child: Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10.0),
                    child: Image.asset(
                      order['photo'],
                      width: 80,
                      height: 80,
                      fit: BoxFit.cover,
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          order['name'],
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          '\$${order['price'].toStringAsFixed(2)}',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.grey,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          'Status: ${order['status']}',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: order['status'] == 'Completed' ? Colors.green : Colors.orange,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    order['status'] == 'Completed' ? Icons.check_circle : Icons.hourglass_empty,
                    color: order['status'] == 'Completed' ? Colors.green : Colors.orange,
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
