import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/userdetails.dart';

class UserService {
  final String baseUrl = "http://10.0.3.2:5454/api/users";

  Future<UserDetails> fetchUserDetails(String jwt) async {
    final response = await http.get(
      Uri.parse('$baseUrl/userdetails'),
      headers: {'Authorization': jwt},
    );

    if (response.statusCode == 200) {
      return UserDetails.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load user details');
    }
  }
}
