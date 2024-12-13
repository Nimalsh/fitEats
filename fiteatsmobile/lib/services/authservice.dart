import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/auth_responce.dart';
import '../models/login_request.dart';

class AuthService {
  final String baseUrl;

  AuthService({required this.baseUrl});

  Future<AuthResponse> login(LoginRequest request) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/signin'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(request.toJson()),
    );

    if (response.statusCode == 200) {
      return AuthResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to log in: ${response.body}');
    }
  }
}
