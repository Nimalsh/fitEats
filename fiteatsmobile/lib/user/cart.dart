import 'package:flutter/material.dart';
import 'cart_item.dart'; // Import the CartItem model
import 'payments.dart'; // Import the PaymentPage

class CartDetailsPage extends StatelessWidget {
  final List<CartItem> cartItems;

  const CartDetailsPage({Key? key, required this.cartItems}) : super(key: key);

  double _calculateTotal() {
    return cartItems.fold(0, (sum, item) => sum + item.foodItem.price);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Cart Details'),
        backgroundColor: Colors.green,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: cartItems.length,
              itemBuilder: (context, index) {
                final cartItem = cartItems[index];
                return StatefulBuilder(
                  builder: (BuildContext context, StateSetter setState) {
                    return GestureDetector(
                      onLongPress: () {
                        setState(() {
                          // Change background color on long press
                        });
                      },
                      child: Card(
                        margin: EdgeInsets.all(10),
                        color: Colors.white, // Default card color
                        child: ListTile(
                          leading: Image.asset(
                            cartItem.foodItem.image,
                            width: 50,
                            height: 50,
                            fit: BoxFit.cover,
                          ),
                          title: Text(cartItem.foodItem.name),
                          subtitle: Text('Customizations: ${cartItem.customizations.join(', ')}'),
                          trailing: Text('\$${cartItem.foodItem.price.toStringAsFixed(2)}'),
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => PaymentPage(total: _calculateTotal()),
                              ),
                            );
                          },
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Total: \$${_calculateTotal().toStringAsFixed(2)}',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => PaymentPage(total: _calculateTotal()),
                      ),
                    );
                  },
                  child: Text('Proceed to Payment'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}


