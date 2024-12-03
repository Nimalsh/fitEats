class CartItem {
  final String name;
  final double price;

  CartItem({required this.name, required this.price});

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      name: json['name'],
      price: json['price'].toDouble(),
    );
  }
}

class Order {
  final String orderNumber;
  final String date;
  final String restaurant;
  final double totalPrice;
  final String status;
  final List<CartItem> items;

  Order({
    required this.orderNumber,
    required this.date,
    required this.restaurant,
    required this.totalPrice,
    required this.status,
    required this.items,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      orderNumber: json['orderNumber'],
      date: json['date'],
      restaurant: json['restaurant'],
      totalPrice: json['totalPrice'].toDouble(),
      status: json['status'],
      items: (json['items'] as List)
          .map((item) => CartItem.fromJson(item))
          .toList(),
    );
  }
}
