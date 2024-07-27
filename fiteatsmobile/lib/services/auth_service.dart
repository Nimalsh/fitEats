import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:logger/logger.dart';

class AuthService {
  final String baseUrl;
  final Logger _logger = Logger();

  AuthService(this.baseUrl);

  Future<void> registerUser(Map<String, String> userData) async {
    try {
      _logger.i('Sending request to $baseUrl/api/drivers/register with data: $userData');

      final response = await http.post(
        Uri.parse('$baseUrl/api/drivers/register'),
        headers: {"Content-Type": "application/json"},
        body: json.encode(userData),
      ).timeout(const Duration(seconds: 120));

      _logger.i('Response status: ${response.statusCode}');
      _logger.i('Response body: ${response.body}');

      if (response.statusCode == 201) {
        _logger.i('User registered successfully');
      } else {
        final errorMessage = 'Failed to register user: ${response.reasonPhrase}';
        _logger.e(errorMessage);
        throw Exception(errorMessage);
      }
    } catch (error) {
      final errorMessage = 'Error during registration: $error';
      _logger.e(errorMessage);
      throw Exception(errorMessage);
    }
  }
 Future<int> loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/drivers/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['id']; // Ensure this matches your API response
    } else {
      throw Exception('Failed to login');
    }
  }
}