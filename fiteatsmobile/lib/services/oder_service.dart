import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/order_model.dart';


class OrderService {
  final String baseUrl = 'http://10.0.3.2:5454/api'; // Replace with your backend URL.

  Future<List<Order>> fetchUserOrders(String jwtToken) async {
    final response = await http.get(
      Uri.parse('$baseUrl/order/user'),
      headers: {
        'Authorization': jwtToken,
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> ordersJson = jsonDecode(response.body);
      return ordersJson.map((json) => Order.fromJson(json)).toList();
    } else {
      throw Exception('Failed to fetch orders');
    }
  }
}
