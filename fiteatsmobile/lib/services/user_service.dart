// lib/services/user_service.dart

import 'dart:convert';
import 'package:http/http.dart' as http;

class UserService {
  final String baseUrl;

  UserService(this.baseUrl);

  Future<String> getUserFullName(int userId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/drivers/$userId'),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['fullName']; // Ensure this is a string in your API response
    } else {
      throw Exception('Failed to load user data');
    }
  }
Future<void> updateUserDetails(int userId, Map<String, dynamic> updatedData) async {
  const String baseUrl = 'http://10.0.3.2:8080'; // Define your base URL here

  // Remove null values from the map
  final filteredData = updatedData..removeWhere((key, value) => value == null);

  final response = await http.put(
    Uri.parse('$baseUrl/api/drivers/$userId'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(filteredData),
  );

  if (response.statusCode != 200) {
    // Handle error by logging the response status and body
    print('Failed to update user details. Status code: ${response.statusCode}');
    print('Response body: ${response.body}');
    throw Exception('Failed to update user details');
  }
}
 Future<void> updateDriverAvailability(int userId, bool availability) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/drivers/$userId'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'availability': availability}),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update driver availability');
    }
  }
}